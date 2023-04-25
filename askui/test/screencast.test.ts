import { aui } from './helper/jest.setup';
import {expect} from '@jest/globals';

import * as fs from 'fs';

// Power of TypeScript
import {checkSuccess} from './utils';

import csv from 'async-csv';
import * as aadb from 'aa-sqlite';

import axios from 'axios';

describe('jest with askui', () => {

  xit('Demonstrate annotationLevel', async () => {
    await aui
      .click()
      .button()
      .containsText('does not exist')
      .exec()
  });

  xit('Demonstrate actionDelayInMs', async () => {

    await aui.moveMouseTo().textfield().contains().text().withText("E-Mail Address").exec();
    await aui.mouseLeftClick().exec();
    await aui.mouseLeftClick().exec();

    await aui
      .type("bootstrap@authenticationtest.com")
      .exec();

    await aui.pressKey("tab").exec();

    await aui.waitFor(1000).exec();

    await aui.type("pa$$w0rd").exec();
  });

  xit('Integrate testdata from API', async () => {
    const url = 'https://fruityvice.com/api/fruit/all';
    const data = await axios.get(url);
    await aui.mouseLeftClick().exec();
    await aui.typeIn(data.data[0].name)
             .textfield()
             .contains()
             .text()
             .withText('E-Mail Address')
             .exec();
  });

  xit('Integrate testdata from db', async () => {

    const csvData = fs.readFileSync("./data.csv");
    const rows = await csv.parse(csvData, { delimiter: ",", from_line: 2 });

    // Open a new database
    const filepath = "./data.db";
    await aadb.open(filepath);

    // Create a table
    await aadb.run(`
      CREATE TABLE migration
      (
          year_month       VARCHAR(10),
          month_of_release VARCHAR(10),
          passenger_type   VARCHAR(50),
          direction        VARCHAR(20),
          sex              VARCHAR(10),
          age              VARCHAR(50),
          estimate         INT
      )
    `)

    // Insert the data
    rows.forEach(async row => {
      await aadb.run(
        `INSERT INTO migration VALUES (?, ?, ? , ?, ?, ?, ?)`,
        [row[0], row[1], row[2], row[3], row[4], row[5], row[6]]);
    });

    // Get all the data
    const dataAsync = await aadb.all('select * from migration;')
    console.log(dataAsync);
  });
  
  
  xit('Power of TypeScript1', async () => {
    // We already showed try/catch, for-loops, if else

    // Now let's use some functions, exports

    // Functions
    const textfields = await aui.get().textfield().exec();
    console.log(textfields);

    for (const field of textfields) {
      await aui.moveMouse(Math.round(field.bndbox.xmin)+10, Math.round(field.bndbox.ymin)+10).exec();
      await aui.mouseLeftClick().exec();
      await aui.type('Random thingy').exec();
    }
  });

  xit('Power of TypeScript', async () => {

    if ((await checkSuccess('Success')) === false) {
      // React to text not being there
    };

    // Also see
    // https://www.typescriptlang.org/cheatsheets

    // Refer to taking screenshots video
    // And node packages to expand

    // https://www.npmjs.com/package/chance
  });



  xit('taking screenshots', async () => {
    const annotation = await aui.annotate();

    let buf = Buffer.from(
      annotation.image.split('base64,')[1], 'base64');

    fs.writeFileSync("./test.png", buf);
  });

  xit('if/else, for, try/catch', async () => {

    // await aui.annotateInteractively();
    await aui.mouseLeftClick().exec();

    // https://authenticationtest.com/complexAuth/

    // const dropDown =
    //   await aui.get()
    //            .text().containsText("Don't Log Me In")
    //            .exec();

    // if (dropDown.length != 0) {
    //   await aui.click()
    //            .text().containsText("Don't Log Me In")
    //            .exec();
    //   await aui.click()
    //            .text().below()
    //            .text().withText("Don't Log Me In")
    //            .exec();
    // }

    // try {
    //   await aui.expect()
    //            .button()
    //            .contains()
    //            .text().withText('Log Me In Please')
    //            .exists()
    //            .exec();
    // } catch(error) {
    //   await aui.expect()
    //            .text()
    //            .withText('Log In')
    //            .exists()
    //            .exec();
    // }

    const textfields =
      await aui.get()
               .textfield()
               .exec();

    for (const field of textfields) {
      await aui.moveMouse(
                 Math.round(field.bndbox.xmin)+10,
                 Math.round(field.bndbox.ymin)+10)
               .exec();
      await aui.mouseLeftClick().exec();
      await aui.type('Random thingy').exec();
    }

  });

  xit('annotate for screencast', async () => {

    // Get focus on browser window
    // Do not forget to move your mouse pointer
    // over to the browser window!
    await aui.mouseLeftClick().exec();

    await aui.typeIn('bootstrap@authenticationtest.com')
             .textfield()
             .contains()
             .text()
             .withText('E-Mail Address')
             .exec();
    await aui.typeIn('pa$$w0rd')
             .textfield()
             .contains()
             .text()
             .withText('Password')
             .exec();

    const texts = await aui.get().text().above().textfield().contains().text().withText('123456').exec();

    // texts contains an array!
    // The phrase with the captcha is the first element
    const captchaInText = texts[0];

    // We have to extract the value with TypeScript
    // It is 6 digits long: Matching it with RegEx
    // Match is also an array and we want the first element
    const captcha = captchaInText.text.match(/\d{6}/)[0];

    await aui.typeIn(captcha).textfield().contains().text().withText('123456').exec();

    // Lose focus on the textfield
    // Cursor may interfere with OCR
    await aui.pressKey('tab').exec();

    // Assert that the captcha was actually entered
    // Extract the actual value first
    const actuallyEntered = await aui.get().text().withTextRegex('^\\d{6}').exec();
    expect(actuallyEntered[0].text).toBe(captcha);

    const actuallyEntered2 = await aui.get().text().below().text().withTextRegex(".*in the box").exec();
    expect(actuallyEntered2[0].text).toBe(captcha);

    await aui.click().button().withText('Log In').exec();

    // Sometimes the site opens the success message
    // in another tab
    try {
      await aui.expect().text().withText('Login Success').exists().exec();
    } catch(error) {
      // Switch to next browser tab
      // Windows Linux: control + tab
      // await aui.pressTwoKeys('control', 'tab').exec();

      // macOS: CMD + option + right arrow
      await aui.pressThreeKeys('command', 'alt', 'right').exec();

      await aui.expect().text().withText('Login Success').exists().exec();
    }

  });

  xit('annotate for screencast', async () => {
    // await aui.annotateInteractively();
    const texts = await aui.get().text().below().text().withTextRegex(".*in the box").exec();
    console.log(texts);
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
