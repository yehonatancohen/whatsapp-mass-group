// background.js

// Define the element-to-function mappings
const elementFunctions = [
  {
    selector: "#app > div > div > div._2Ts6i._1xFRo > span > div > span > div > div > div > section > div.gsqs0kct.oauresqk.efgp0a3n.h3bz2vby.g0rxnol2.tvf2evcx.oq44ahr5.lb5m6g5c.brac1wpa.lkjmyc96.i4pc7asj.bcymb0na.przvwfww.e8k79tju > div.tt8xd2xn.dl6j7rsh.mpdn4nr2.avk8rzj1 > div:nth-child(1)",
    functionCall: "function1",
  },
  // Add more elements and function mappings as needed
  {
    selector: "#other-element-selector",
    functionCall: "function2",
  },
];

// Function to send a message to the content script
function sendMessageToContentScript(message) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, message);
  });
}

// Wait for an element to be visible and exist
function waitForElement(element) {
  const observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      const targetElement = document.querySelector(element.selector);
      if (targetElement && targetElement.offsetParent !== null) {
        // Call the corresponding function in the content script
        sendMessageToContentScript({ action: element.functionCall });

        // Disconnect the observer once the element is found
        observer.disconnect();
      }
    });
  });

  const config = { attributes: true, childList: true, subtree: true };
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.executeScript(
      tabs[0].id,
      {
        code: 'document.querySelector("' + element.selector + '") !== null;',
      },
      function (result) {
        if (result && result[0]) {
          if (!result[0]) {
            // Start observing mutations if the element does not exist initially
            observer.observe(document, config);
          }
        }
      }
    );
  });
}

// Start waiting for all elements
elementFunctions.forEach(waitForElement);
