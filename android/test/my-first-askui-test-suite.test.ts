import { aui, auiAndroid } from './helper/jest.setup';

describe('jest with askui', () => {
    xit('annotate', async () => {
        await aui.annotateInteractively();
    });

    xit('passes ReCaptcha test', async () => {
      // Navigate to https://www.google.com/recaptcha/api2/demo
      await aui.mouseLeftClick().exec();
      await aui.click().checkboxUnchecked().exec();
    });

    xit('Fills out a complex navigation form', async () => {
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

        await aui.click().button().withText('reset').exec();
        
        // click on the textfield and type characters
        // repeat this as many times as the textfields
        await auiAndroid.click().text().withText('Enter your username').exec();
        await auiAndroid.type('askui').exec();
        await auiAndroid.click().text().withText('Enter your email').exec();
        await auiAndroid.type('askui@askui.com').exec();
        
        // Click and type the address
        await auiAndroid.click().text().withText('Enter your address').exec();
        await auiAndroid.type('Emmy-Noether-Straße 17').exec();
        
        // Pressing enter is the equivelant to pressing the return button on the on-screen-keyboard
        // This gets rid of the focus from the textfield
        await auiAndroid.pressAndroidKey('enter').exec();
        
        // Press the 'Submit' button
        await auiAndroid.click().text().withText('Submit').exec();
        
        // We will have a popup window that has two buttons. Press the 'Refuse' button
        await auiAndroid.click().text().withText('Refuse').exec();

        // Here we press multiple of toggle buttons one by one
        await auiAndroid.click().text().withText('Banana').exec();
        await auiAndroid.click().text().withText('Mango').exec();
        await auiAndroid.click().text().withText('Sunny').exec();
        await auiAndroid.click().text().withText('Rainy').exec();
        await auiAndroid.click().text().withText('Windy').exec();
        
        // Fuzzy
        await aui.click().button().withText('SubmIT').exec();
        await aui.click().text().withText('Refuse').exec();
        
        await aui.moveMouseRelativelyTo(0, 100).text().withText("Windy").exec();
        await aui.mouseToggleDown().exec();
        await aui.moveMouseRelatively(-1500, 0).exec();
        await aui.mouseToggleUp().exec();
    });

    xit('Login in Github with 2 FA and Lastpass App on Android device', async () => {

      await aui.mouseLeftClick().exec();
      await aui.click().text().withText('Sign in').exec();
      await aui
        .typeIn('<Insert Github username>', { isSecret: true, secretMask: '**' })
        .textfield()
        .below()
        .text()
        .withText('Username or email address')
        .exec();
      await aui
        .pressKey('escape')
        .exec()
      await aui
        .typeIn('<Insert Password here>', { isSecret: true, secretMask: '**' })
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
        .text().withText("XXXXXX")
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