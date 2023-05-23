chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log("Received message");
    switch (request.action) {
      case "menu-button-created":
        console.log("Button created in the web page");
        sendResponse({ farewell: "buttonCreated" });
        break;
    }
  });