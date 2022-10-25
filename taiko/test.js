const { openBrowser, goto, write, closeBrowser, textBox, waitFor } = require('taiko');

(async () => {
    await openBrowser();
    await goto("file:///Users/joe/github/talk-demos/cypress/XpathPracticePage.html");

    await click(textBox(near('Submit')));

    // Keep the browser open to see what taiko has done
    await waitFor(3000);
    await closeBrowser();
})();



    // await textBox(below('Submit')).exists();
    // await write("taiko test automation", into(textBox(below('Submit'))));

    // await click(textBox(near('Submit')));


