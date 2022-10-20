const { openBrowser, goto, write, closeBrowser, textBox, waitFor } = require('taiko');

(async () => {
    await openBrowser();
    await goto("https://selectorshub.com/xpath-practice-page/");


    // Keep the browser open to see what taiko has done
    await waitFor(2000);
    await closeBrowser();
})();



    // await textBox(below('Submit')).exists();
    // await write("taiko test automation", into(textBox(below('Submit'))));


