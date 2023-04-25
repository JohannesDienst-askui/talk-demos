import { aui } from './helper/jest.setup';

import { expect, jest, test } from '@jest/globals';

describe('jest with askui', () => {

  async function getFocusOnScreen() {
    await aui.moveMouse(200, 200).exec();
    await aui.mouseLeftClick().exec();
  }

  async function clickText(text: string) {
    await aui.click().text().withText(text).exec();
  }

  async function isGrandmaBuyable() {

    const currentCookies = 
      await aui.get()
                .text()
                .below()
                .text()
                .withText("Hungry Sprocket's Bakery")
                .exec();

    console.log(currentCookies[0]);

    const factor =
      await aui.get()
               .text()
               .above()
               .text()
               .withText('per second')
               .exec();

    console.log(factor[0]);

    let realCookies = parseFloat(currentCookies[0].text);
    // Start with million
    let realFactor = 1000000;
    if (factor[0].text.startsWith("billion")) {
      realFactor = 1000000000000;
    }
    else if (factor[0].text.startsWith("trillion")) {
      realFactor = 1000000000000;
    }
    else if (factor[0].text.startsWith("quadrillion")) {
      realFactor = 1000000000000000;
    }
    realCookies = realCookies * realFactor;

    // Get GrandMa prize tag
    let grandmaPrizetagRaw = await aui.get().text().below().text().withText('Grandma').exec();
    let grandmaPrizetagRawText = grandmaPrizetagRaw[0].text;

    let grandmaPrizeTagValue = parseFloat(grandmaPrizetagRawText.split(" ")[0].trim());
    let grandmaPrizeTagFactor = grandmaPrizetagRawText.split(" ")[1].trim();

    // Start with million
    realFactor = 1000000;
    if (grandmaPrizeTagFactor.startsWith("billion")) {
      realFactor = 1000000000000;
    }
    else if (grandmaPrizeTagFactor.startsWith("trillion")) {
      realFactor = 1000000000000;
    }
    else if (grandmaPrizeTagFactor.startsWith("quadrillion")) {
      realFactor = 1000000000000000;
    }

    let grandmaRealPrizeTag = grandmaPrizeTagValue * realFactor;

    if (realCookies >= grandmaRealPrizeTag) {
      return true;
    }

    return false;
  }

  async function canWeAscend() {
    const level = 
      await aui.get()
               .text()
               .leftOf()
               .text()
               .withText('Legacy')
               .exec();
    console.log(level);

    // askui assertions
    await aui.expect()
             .text()
             .withText('+3')
             .leftOf()
             .text()
             .withText('Legacy')
             .notExists()
             .exec();

    // jest assertions
    expect(level[0].text).not.toBe('+3');

    return false;
  }

  beforeAll(async () => {
    await getFocusOnScreen();
  });

  it('Should click on Grandma', async () => {
    console.log('Starting automation');

    await aui.annotateInteractively();

    let grandmaBuyable = true;

    while(grandmaBuyable) {
      console.log("Grandma is buyable");
      await clickText('Grandma');

      grandmaBuyable = await isGrandmaBuyable();

      await canWeAscend();
    }
  });
});