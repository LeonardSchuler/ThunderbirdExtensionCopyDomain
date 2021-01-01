console.log('Hello, World! - from Filter++ background.js');
//var a = messenger.tabs.getCurrent();
//
function log(message, result) {
    console.log(message, result)
}

function main() {
    var windowP = messenger.windows.getCurrent();
    windowP.then(w => log("Current window: ", w));
    var activeTabP = browser.tabs.query({active: true, currentWindow: true}).then(tabs => tabs[0]);
    activeTabP.then(tab => log("Active tab: ", tab));
    var messageHeaderP = activeTabP.then(tab => browser.messageDisplay.getDisplayedMessage(tab.id));
    messageHeaderP.then(header => log("message", header));
    var authorP = messageHeaderP.then(header => header.author);
    authorP.then(a => log("Email author: ", a));
    authorP.then(a => console.log(typeof a));
    var authorEmailP = authorP.then(author => author.slice(author.lastIndexOf('@') + 1, -1));
    authorEmailP.then(a => log("Email string copied in clipboard: ", a));
    authorEmailP.then(a => navigator.clipboard.writeText(a));
}


messenger.messageDisplayAction.onClicked.addListener(main)
