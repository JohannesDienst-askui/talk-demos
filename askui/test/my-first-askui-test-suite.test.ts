import { aui } from './helper/jest.setup';

describe('jest with askui', () => {
  it('should type text into textfield', async () => {

    // Run this to see what the the tool sees
    // Comment it out for the following tests.
    await aui.annotateInteractively();
  
  });
});




    // await aui.mouseLeftClick().exec();
    // await aui
    //   .typeIn('askui')
    //   .textfield()
    //   .contains()
    //   .text()
    //   .withText('Enter your Company').exec();

    //  await aui
    //   .typeIn('askui')
    //   .textfield()
    //   .below()
    //   .text()
    //   .withText('Password').exec();