import { aui } from './helper/jest.setup';

export async function checkSuccess(text: string) {
  try {
    await aui.expect().text().withText(text).exists().exec();
    return true;
  } catch(error) {
    console.log(`${text} not found!`);
  }
  return false;
}

export async function waitUntil(askuiCommand: Promise<void>, maxTry = 5) {
  try {
    await askuiCommand
  } catch (error) {
    if (maxTry == 0) {
      throw error
    }
    console.log(`Retry predicting command, ${maxTry} tries left`)
    await aui.waitFor(2000).exec()
    await waitUntil(askuiCommand, maxTry - 1)
  }
}
