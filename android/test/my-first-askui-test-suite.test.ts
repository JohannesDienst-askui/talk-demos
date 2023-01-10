import { UiControlClient } from 'askui';
import { aui, auiAndroid } from './helper/jest.setup';

describe('jest with askui', () => {

  xit('annotate', async () => {
    await aui.annotateInteractively();
  });

  xit ('automates Google Maps Canvas', async () => {
  
    // Automate search for Würzburg
    await aui.mouseLeftClick().exec();
    await aui.click().text().withText('Search Google Maps').exec();
    await aui.type('Würzburg').exec();
    await aui.pressKey('enter').exec();
  
    await aui.click().text().withText('Würzburg Residence').exec();
  });

  xit('passes ReCaptcha test', async () => {

    // Navigate to https://www.google.com/recaptcha/api2/demo
    await aui.mouseLeftClick().exec();
    await aui.click().checkboxUnchecked().exec();
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
    await auiAndroid.type('askui').exec();
    await auiAndroid.click().text().withTextRegex('nter[\\s]{0,1}your[\\s]{0,1}emai').exec();
    await auiAndroid.waitFor(1000).exec();
    await auiAndroid.type('askui@askui.com').exec();
    
    // Click and type the address
    await auiAndroid.click().text().withTextRegex('nter[\\s]{0,1}your[\\s]{0,1}addres').exec();
    await auiAndroid.waitFor(1000).exec();
    await auiAndroid.type('Emmy-Noether-Straße 17').exec();
    
    // Pressing enter is the equivelant to pressing the return button on the on-screen-keyboard
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

  xit('Login in Github with 2 FA and Lastpass App on Android device', async () => {

    await aui.mouseLeftClick().exec();
    await aui.click().text().withText('Sign in').exec();
    await aui
      .typeIn('<Github username>', { isSecret: true, secretMask: '**' })
      .textfield()
      .below()
      .text()
      .withText('Username or email address')
      .exec();
    await aui
      .pressKey('escape')
      .exec()
    await aui
      .typeIn('<Github password>', { isSecret: true, secretMask: '**' })
      .textfield()
      .below()
      .text()
      .withText('Password')
      .exec();

    await aui.pressKey('tab').exec();
    await aui.pressKey('enter').exec();

    // wake up the phone 
    await auiAndroid.pressAndroidKey('wakeup').exec()
    
    // start lastpass app 
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

    // sort the returned elements based on their ymin 
    codeElements.sort((element1, element2) => (element1.bndbox.ymin <= element2.bndbox.ymin ? -1 : 1))
    // Using code[0], so the nearest element is selected
    // strip all non numeric characters from string
    const code = codeElements[0].text.replace(/\D/g, '');
    await aui
      .typeIn(code, { isSecret: true, secretMask: '**' })
      .text().withText('XXXXXX')
      .above()
      .text()
      .withText('Verify')
      .exec();
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

async function setText(text: String, uiControlClient: UiControlClient) {
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
        // TODO We have to press shift here somehow
        await execOnAndroidShell(elementCode-36, uiControlClient);
      }
      else if (elementCode >= 97 && elementCode <= 122) {
          /** a~z **/
          await execOnAndroidShell(elementCode-68, uiControlClient);
      }
      else {
        if (';' === elementChar) {
          await execOnAndroidShell(74, uiControlClient);
        }
        if ('=' === elementChar) {
          await execOnAndroidShell(70, uiControlClient);
        }
        if (',' === elementChar) {
          await execOnAndroidShell(159, uiControlClient);
        }
        // '-'.code -> uiDevice.pressKeyCode(KEYCODE_MINUS)
        // '.'.code -> uiDevice.pressKeyCode(KEYCODE_PERIOD)
        // '/'.code -> uiDevice.pressKeyCode(KEYCODE_SLASH)
        // '`'.code -> uiDevice.pressKeyCode(KEYCODE_GRAVE)
        // '\''.code -> uiDevice.pressKeyCode(KEYCODE_APOSTROPHE)
        // '['.code -> uiDevice.pressKeyCode(KEYCODE_LEFT_BRACKET)
        // ']'.code -> uiDevice.pressKeyCode(KEYCODE_RIGHT_BRACKET)
        // '\\'.code -> uiDevice.pressKeyCode(KEYCODE_BACKSLASH)
        // ' '.code -> uiDevice.pressKeyCode(KEYCODE_SPACE)
        if ('@' === elementChar) {
          await execOnAndroidShell(77, uiControlClient);
        }
        // '#'.code -> uiDevice.pressKeyCode(KEYCODE_POUND)
        // '*'.code -> uiDevice.pressKeyCode(KEYCODE_STAR)
        // '('.code -> uiDevice.pressKeyCode(KEYCODE_NUMPAD_LEFT_PAREN)
        // ')'.code -> uiDevice.pressKeyCode(KEYCODE_NUMPAD_RIGHT_PAREN)
        // '+'.code -> uiDevice.pressKeyCode(KEYCODE_NUMPAD_ADD)
        // '!'.code -> keyPressShiftedToEvents(uiDevice, KEYCODE_1)
        // '$'.code -> keyPressShiftedToEvents(uiDevice, KEYCODE_4)
        // '%'.code -> keyPressShiftedToEvents(uiDevice, KEYCODE_5)
        // '^'.code -> keyPressShiftedToEvents(uiDevice, KEYCODE_6)
        // '&'.code -> keyPressShiftedToEvents(uiDevice, KEYCODE_7)
        // '"'.code -> keyPressShiftedToEvents(uiDevice, KEYCODE_APOSTROPHE)
        // '{'.code -> keyPressShiftedToEvents(uiDevice, KEYCODE_LEFT_BRACKET)
        // '}'.code -> keyPressShiftedToEvents(uiDevice, KEYCODE_RIGHT_BRACKET)
        // ':'.code -> keyPressShiftedToEvents(uiDevice, KEYCODE_SEMICOLON)
        // '|'.code -> keyPressShiftedToEvents(uiDevice, KEYCODE_BACKSLASH)
        // '<'.code -> keyPressShiftedToEvents(uiDevice, KEYCODE_COMMA)
        // '>'.code -> keyPressShiftedToEvents(uiDevice, KEYCODE_PERIOD)
        // '?'.code -> keyPressShiftedToEvents(uiDevice, KEYCODE_SLASH)
        // '~'.code -> keyPressShiftedToEvents(uiDevice, KEYCODE_GRAVE)
        // '_'.code -> keyPressShiftedToEvents(uiDevice, KEYCODE_MINUS)
      }
    }
}
