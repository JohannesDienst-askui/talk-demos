import { Exec } from 'askui/dist/cjs/execution/dsl';
import { aui } from './helper/jest.setup';

describe('jest with askui', () => {
  it('should type text into textfield', async () => {

    // Run this to see what the the tool sees
    // Comment it out for the following tests.
    await aui.annotateInteractively();

    await aui.mouseLeftClick().exec();
    await aui
      .typeIn('+49 1234 567890')
      .textfield()
      .below()
      .text()
      .withText('Mobile Number')
      .exec();

    const mobileNumberTextfield = await aui
      .get()
      .textfield()
      .contains()
      .text()
      .withText('+491234567890')
      .exec();
    
    console.log('--------------------------------------------------------');
    console.log(mobileNumberTextfield);
    console.log('--------------------------------------------------------');

    const mobileNumberLabel = 
      await aui
        .get()
        .text()
        .above()
        .textfield()
        .contains()
        .text()
        .withText('+491234567890')
        .exec();
    
    console.log('--------------------------------------------------------');
    console.log(mobileNumberLabel[0]);
    console.log('--------------------------------------------------------');

    console.log('--------------------------------------------------------');
    console.log(`Is the 'Mobile Number' entered into the right textfield?
                 -> ${'Mobile Number' === mobileNumberLabel[0].text}`);
    console.log('--------------------------------------------------------');

  });

  it('should return everything below', async () => {
    const belowElements = await aui
      .get()
      .text()
      .below()
      .button()
      .contains()
      .text()
      .withText('Submit')
      .exec();

    console.log(belowElements);

  });

  it('should return everything above', async () => {
    const belowElements = await aui
      .get()
      .text()
      .above()
      .button()
      .contains()
      .text()
      .withText('Submit')
      .exec();

    console.log(belowElements);

  });

});
