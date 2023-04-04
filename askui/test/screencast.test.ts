import { aui } from './helper/jest.setup';

describe('jest with askui', () => {
  
  it('annotate for screencast', async () => {
    await aui.annotateInteractively();
  });
  
  xit('fill out an interactive authentication form', async () => {
    await aui.annotateInteractively();

    // await aui.mouseLeftclick().exec();
    await aui.click().checkbox().exec();
  
    // Basic Authentication
    // https://authenticationtest.com/
    // https://authenticationtest.com/complexAuth/
    // https://authenticationtest.com/bootstrapAuth/
    // https://authenticationtest.com/iframeChallenge/
    // https://www.google.com/recaptcha/api2/demo
    await aui.click().textfield().contains().text().withTextRegex('^E-Mail*').exec();
    await aui.typeIn('complex@authenticationtest.com').textfield().contains().text().withTextRegex('^E-Mail*').exec();
    await aui.typeIn('pa$$w0rd').textfield().contains().text().withText('Password').exec();
    await aui.click().text().withText("Don't Log Me In").exec();
    await aui.click().text().withText("Please Log Me In").exec();
    await aui.click().checkbox().exec();
    await aui.click().button().contains().text().withText('Log In').exec();
  
  });

  xit('drag and drop', async () => {

    // Drag and drop
    // https://www.globalsqa.com/demo-site/draganddrop/
    await aui.moveMouseTo().image().below().text().withText('High Tatras 2').exec();

    // await aui.mouseLeftClick().exec();
    // await aui.mouseToggleDown().exec();
    await aui.moveMouseRelativelyTo(50, 200).text().withText('Trash').exec();
    // await aui.mouseToggleUp().exec();
  });

  xit('alfred file search on macOS', async () => {

    await aui.pressTwoKeys('alt', 'space').exec();
    await aui.type('find example').exec();
    await aui.waitFor(2000).exec();
    await aui.pressKey('down').exec();
    await aui.pressKey('enter').exec();
  });

});
