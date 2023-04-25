import { aui } from './helper/jest.setup';

import {expect} from '@jest/globals';

describe('jest with askui', () => {

    it('annotate for screencast', async () => {

        // Get focus on browser window
        // Do not forget to move your mouse pointer
        // over to the browser window!
        await aui.moveMouse(500, 500).exec();
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

        // const texts = await aui.get().text().above().textfield().contains().text().withText('123456').exec();
        const texts = await aui.get().text().above().text().withText('123456').exec();

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

});