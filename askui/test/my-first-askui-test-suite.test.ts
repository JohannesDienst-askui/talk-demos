import { aui } from './helper/jest.setup';

describe('jest with askui', () => {
  it('should click on text', async () => {

    await aui.annotateInteractively();

    await aui.mouseLeftClick().exec();
    await aui
      .typeIn("askui")
      .textfield()
      .contains()
      .text()
      .withText("Enter your Company").exec();

    await aui
      .typeIn("askui")
      .textfield()
      .below()
      .text()
      .withText("Password").exec();
  });
});