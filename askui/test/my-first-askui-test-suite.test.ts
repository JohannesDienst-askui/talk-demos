import { Exec } from 'askui/dist/cjs/execution/dsl';
import { aui } from './helper/jest.setup';

describe('jest with askui', () => {
  it('should type text into textfield', async () => {

    // Run this to see what the the tool sees
    // Comment it out for the following tests.
    await aui.annotateInteractively();

    // Regain focus
    await aui.mouseLeftClick().exec();
    await aui
      .typeIn('askui')
      .textfield()
      .contains()
      .text()
      .withText('Enter your Company').exec();

    await aui
      .typeIn('askui')
      .textfield()
      .below()
      .text()
      .withText('Password').exec();

    // Remember the readonly textfield from the cypress demo?
    // When we use it like a real human -> It works!
    await aui
      .typeIn('user@askui.com')
      .textfield()
      .contains()
      .text()
      .withText('Enter email').exec();

    // Click a button
    await aui.click().button().withText('checkout heRe').exec();

    // Click textbox with placeholder "First enter name" after enabling it
    await aui
      .click()
      .icon()
      .below()
      .text()
      .withText('Can you enter name here through automation').exec();
    await aui
      .typeIn("Yes, we can!")
      .textfield()
      .contains()
      .text()
      .withText('First Enter name').exec();

    // You can also scroll
    await aui.pressKey('pagedown').exec();

  });
});
