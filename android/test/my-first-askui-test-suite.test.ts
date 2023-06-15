import { UiControlClient } from 'askui';
import { aui, auiAndroid } from './helper/jest.setup';

describe('jest with askui', () => {
  
  xit('annotate', async () => {
    await aui.annotateInteractively();
    await auiAndroid.annotateInteractively();
  });

  xit('passes ReCaptcha test', async () => {
    // Navigate to https://www.google.com/recaptcha/api2/demo
    await aui.mouseLeftClick().exec();
    await aui.click().checkbox().exec();
  });

  it('Login in Github with 2 FA and Lastpass App on Android device', async () => {

    await aui.mouseLeftClick().exec();

    await aui.click().text().withText('Sign in').exec();

    await aui
      .typeIn('askui-two-factor5', { isSecret: true, secretMask: '**' })
      .textfield()
      .below()
      .text()
      .withText('Username or email address')
      .exec();
    await aui
      .pressKey('escape')
      .exec();
    await aui
      .typeIn('t=YUNRZ6)_b/', { isSecret: true, secretMask: '**' })
      .textfield()
      .below()
      .text()
      .withText('Password')
      .exec();

    await aui.pressKey('tab').exec();
    await aui.pressKey('enter').exec();

    // wake up the phone
    await auiAndroid.pressAndroidKey('wakeup').exec()

    // start lastpass authenticator app
    await auiAndroid.execOnShell("monkey -p com.lastpass.authenticator 1").exec()

    await waitUntil(auiAndroid.expect().text().withText('Github').exists().exec())

    const codeElements =
      await auiAndroid
        .get()
        .text()
        .below()
        .text()
        .withText('GitHub')
        .exec();

    // Using code[0], so the nearest element is selected
    // strip all non numeric characters from string
    console.log(codeElements);
    const code = codeElements[0].text.replace(/\D/g, '');
    console.log(code);

    await aui.pressKey('tab').exec();
    await aui
      .typeIn(code, { isSecret: true, secretMask: '**' })
      .textfield()
      .above()
      .text()
      .withText('Verify')
      .exec();
  });

  xit ('automates Google Maps Canvas', async () => {
  
    // Automate search for Würzburg
    await aui.mouseLeftClick().exec();
    await aui.click().text().withText('Search Google Maps').exec();
    await aui.type('Würzburg').exec();
    await aui.pressKey('enter').exec();
  
    await aui.click().text().withText('Würzburg Residence').exec();
  });


  xit('Fills out a complex authentication form with text captcha', async () => {
    
    // Navigate to https://authenticationtest.com/bootstrapAuth/
    await aui.mouseLeftClick().exec();

    const captcha = await aui.get().text().above().textfield().contains().text().withText('123456').exec();
    const captchaText = captcha[0].text;
    console.log('Found captcha text: ' + captchaText);

    const realCaptcha = captchaText.substring(captchaText.indexOf("'")+1, captchaText.lastIndexOf("'"));
    console.log("Captcha is: " + realCaptcha);

    await aui.typeIn(realCaptcha).textfield().contains().text().withText('123456').exec();

    await aui.typeIn('bootstrap@authenticationtest.com').textfield().contains().text().withText('E-Mail Address').exec();
    await aui.typeIn('pa$$w0rd').textfield().contains().text().withText('Password').exec();

    await aui.click().button().withText('Log In').exec();
  });

  xit('should fill up the textfields and push buttons', async () => {

    await auiAndroid.click().button().withText('reset').exec();
    await auiAndroid.waitFor(2000).exec();
    
    // click on the textfield and type characters
    // repeat this as many times as the textfields
    await auiAndroid.click().text().withTextRegex('nter[\\s]{0,1}your[\\s]{0,1}usernam').exec();
    await auiAndroid.waitFor(1000).exec();
    await setTextAndroid('askui', auiAndroid);
    await auiAndroid.pressAndroidKey("back").exec();

    await auiAndroid.click().text().withTextRegex('nter[\\s]{0,1}your[\\s]{0,1}emai').exec();
    await auiAndroid.waitFor(1000).exec();
    await setTextAndroid('johannes.dienst@askui.com', auiAndroid);
    await auiAndroid.pressAndroidKey("back").exec();
    
    // Click and type the address
    await auiAndroid.click().text().withTextRegex('nter[\\s]{0,1}your[\\s]{0,1}addres').exec();
    await auiAndroid.waitFor(1000).exec();
    await setTextAndroid('Emmy-Noether-Strasse 17', auiAndroid);
    await auiAndroid.pressAndroidKey("back").exec();

    // Pressing enter is the equivalent to pressing the return button on the on-screen-keyboard
    // This gets rid of the focus from the textfield
    await auiAndroid.pressAndroidKey('enter').exec();
    
    // Press the 'Submit' button
    await auiAndroid.click().button().withText('Submit').exec();
    
    // We will have a popup window that has two buttons. Press the 'Refuse' button
    await auiAndroid.click().text().withText('Refuse').exec();

    // Here we press multiple toggle buttons one by one
    await auiAndroid.click().text().withText('Banana').exec();
    await auiAndroid.click().text().withText('Mango').exec();
    await auiAndroid.click().text().withText('Sunny').exec();
    await auiAndroid.click().text().withText('Rainy').exec();
    await auiAndroid.click().text().withText('Windy').exec();
    
    // Fuzzy
    await auiAndroid.click().button().withText('Submit').exec();
    await auiAndroid.click().text().withText('Refuse').exec();
    
    await auiAndroid.moveMouseRelativelyTo(0, 100).text().withText("Windy").exec();
    await auiAndroid.mouseToggleDown().exec();
    await auiAndroid.moveMouseRelatively(-1500, 0).exec();
    await auiAndroid.mouseToggleUp().exec();
  });

});

async function waitUntil(askuiCommand: Promise<void>, maxTry = 5) {
  try {
    await askuiCommand
  }
  catch (error) {
    if (maxTry == 0) {
      throw error
    }
    console.log(`Retry predicting command, ${maxTry} tries left`)
    await aui.waitFor(2000).exec()
    await waitUntil(askuiCommand, maxTry - 1)
  }
}

async function execOnAndroidShell(keycode: number, uiControlClient: UiControlClient) {
  await uiControlClient.execOnShell('input keyevent "' + keycode + '"').exec();
}

async function setTextAndroid(text: String, uiControlClient: UiControlClient) {
  for (var i = 0; i < text.length; i++) {
      const elementCode = text.charCodeAt(i);
      const elementChar = text.charAt(i);
      console.log("setText()", elementCode);
      console.log("setText()", elementChar);
      if (elementCode >= 48 && elementCode <= 57){
        /** 0~9 **/
        await execOnAndroidShell(elementCode-41, uiControlClient);
      }
      else if (elementCode >= 65 && elementCode <= 90) {
        /** A~Z **/
        await uiControlClient.execOnShell('input keyboard text "' + elementChar + '"').exec();
      }
      else if (elementCode >= 97 && elementCode <= 122) {
        /** a~z **/
        await execOnAndroidShell(elementCode-68, uiControlClient);
      }
      else {
        if ('@' === elementChar) {
          await execOnAndroidShell(77, uiControlClient);
        }
        if (';' === elementChar) {
          await execOnAndroidShell(74, uiControlClient);
        }
        if ('=' === elementChar) {
          await execOnAndroidShell(70, uiControlClient);
        }
        if (',' === elementChar) {
          await execOnAndroidShell(159, uiControlClient);
        }
        if ('-' === elementChar) {
          await execOnAndroidShell(69, uiControlClient);
        }
        if ('.' === elementChar) {
          await execOnAndroidShell(56, uiControlClient);
        }
        if ('/' === elementChar) {
          await execOnAndroidShell(76, uiControlClient);
        }
        if ('`' === elementChar) {
          await execOnAndroidShell(68, uiControlClient);
        }
        if ("'" === elementChar) {
          await execOnAndroidShell(75, uiControlClient);
        }
        if ('[' === elementChar) {
          await execOnAndroidShell(71, uiControlClient);
        }
        if (']' === elementChar) {
          await execOnAndroidShell(72, uiControlClient);
        }
        if ('\\' === elementChar) {
          await execOnAndroidShell(73, uiControlClient);
        }
        if (' ' === elementChar) {
          await execOnAndroidShell(62, uiControlClient);
        }
        if ('#' === elementChar) {
          await execOnAndroidShell(18, uiControlClient);
        }
        if ('*' === elementChar) {
          await execOnAndroidShell(17, uiControlClient);
        }
        if ('(' === elementChar) {
          await execOnAndroidShell(162, uiControlClient);
        } 
        if (')' === elementChar) {
          await execOnAndroidShell(163, uiControlClient);
        }
        if ('+' === elementChar) {
          await execOnAndroidShell(157, uiControlClient);
        }
        if ('!' === elementChar) {
          await uiControlClient.execOnShell('input keyboard text "!"').exec();
        }
        if ('$' === elementChar) {
          await uiControlClient.execOnShell('input keyboard text "$"').exec();
        }
        if ('%' === elementChar) {
          await uiControlClient.execOnShell('input keyboard text "%"').exec();
        }
        if ('^' === elementChar) {
          await uiControlClient.execOnShell('input keyboard text "^"').exec();
        }
        if ('&' === elementChar) {
          await uiControlClient.execOnShell('input keyboard text "&"').exec();
        }
        // TODO How to do "
        if ('"' === elementChar) {
          await execOnAndroidShell(75, uiControlClient);
        }
        if ('{' === elementChar) {
          await uiControlClient.execOnShell('input keyboard text "{"').exec();
        }
        if ('}' === elementChar) {
          await uiControlClient.execOnShell('input keyboard text "}"').exec();
        }
        if (':' === elementChar) {
          await uiControlClient.execOnShell('input keyboard text ":"').exec();
        }
        if ('|' === elementChar) {
          await uiControlClient.execOnShell('input keyboard text "|"').exec();
        }
        if ('<' === elementChar) {
          await uiControlClient.execOnShell('input keyboard text "<"').exec();
        }
        if ('>' === elementChar) {
          await uiControlClient.execOnShell('input keyboard text ">"').exec();
        }
        if ('?' === elementChar) {
          await uiControlClient.execOnShell('input keyboard text "?"').exec();
        }
        if ('~' === elementChar) {
          await uiControlClient.execOnShell('input keyboard text "~"').exec();
        }
        // TODO
        if ('_' === elementChar) {
          await uiControlClient.execOnShell('input keyboard text "_"').exec();
        }
      }
    }
}


