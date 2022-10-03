const { openBrowser, goto, write, click, button, focus, closeBrowser, textBox, waitFor } = require('taiko');

(async () => {
    await openBrowser();
    await goto("file:///Users/joe/github/talk-demos/cypress/XpathPracticePage.html");

    await textBox(below('Submit')).exists();
    await write("taiko test automation", into(textBox(below('Submit'))));

    await waitFor(3000);
    await closeBrowser();
})();