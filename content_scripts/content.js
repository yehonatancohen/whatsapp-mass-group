function displayCustomMessageBox(message) {
    // Create elements
    var boxWrapper = document.createElement("div");
    var box = document.createElement("div");
    var logo = document.createElement("img");
    var content = document.createElement("p");
    var button = document.createElement("button");
  
    // Set styles
    boxWrapper.style.position = "fixed";
    boxWrapper.style.top = "0";
    boxWrapper.style.left = "0";
    boxWrapper.style.width = "100%";
    boxWrapper.style.height = "100%";
    boxWrapper.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    boxWrapper.style.display = "flex";
    boxWrapper.style.justifyContent = "center";
    boxWrapper.style.alignItems = "center";
    boxWrapper.style.zIndex = "9999"; // Set a high z-index value
    box.style.backgroundColor = "white";
    box.style.padding = "20px";
    logo.style.width = "10px";
    content.style.margin = "0";
    content.style.marginBottom = "20px";
    button.style.padding = "10px 20px";
    button.style.backgroundColor = "#4CAF50";
    button.style.border = "none";
    button.style.color = "white";
    button.style.cursor = "pointer";
  
    // Set content
    logo.src = chrome.runtime.getURL("logo/logo.png");
    content.innerText = message;
    button.innerText = "OK";
  
    // Add elements to the DOM
    box.appendChild(logo);
    box.appendChild(content);
    box.appendChild(button);
    boxWrapper.appendChild(box);
    document.body.appendChild(boxWrapper);
  
    // Handle button click
    button.onclick = function () {
      document.body.removeChild(boxWrapper);
    };
  
    // Handle background click
    boxWrapper.onclick = function (event) {
      if (event.target === boxWrapper) {
        document.body.removeChild(boxWrapper);
      }
    };
}

// Function to check if the specified element exists in the DOM
function checkElementExistence() {
    const addParticipantsButton = document.querySelector('#app > div > div > div._2Ts6i._1xFRo > span > div > span > div > div > div > section > div.gsqs0kct.oauresqk.efgp0a3n.h3bz2vby.g0rxnol2.tvf2evcx.oq44ahr5.lb5m6g5c.brac1wpa.lkjmyc96.i4pc7asj.bcymb0na.przvwfww.e8k79tju > div.tt8xd2xn.dl6j7rsh.mpdn4nr2.avk8rzj1 > div:nth-child(1)');
    const customButton = document.getElementById('massGroup-menu-button');

    if (addParticipantsButton && customButton == null) {
        console.log("RUNN")
        duplicateElement(addParticipantsButton)
    }
}

const observer = new MutationObserver(checkElementExistence);

observer.observe(document.documentElement, { childList: true, subtree: true });

checkElementExistence();

function openStartMenu(){
    duplicateElement(document.querySelector("#app > div > div > div._2QgSC"));
    displayCustomMessageBox("test");
}

function duplicateElement(element) {
    const parentElement = element.parentElement;
  
    if (parentElement && element) {
        const duplicatedElement = element.cloneNode(true);
        
        const titleElement = duplicatedElement.querySelector('[data-testid="cell-frame-title"]');
        
        if (titleElement) {
            titleElement.textContent = "Add mass participants";
            titleElement.id = "massGroup-menu-button";
        }

        parentElement.insertBefore(duplicatedElement, parentElement.firstChild);

        duplicatedElement.addEventListener('click', openStartMenu);
    }
}

function extractGroupUsers() {
    const groupSubtitle = document.querySelector("[data-testid='chat-subtitle']")
    if (!groupSubtitle) {
        throw new Error('No chat subtitle found. Please open a group chat.')
    }
    // Check if users are separated with '，' (Chinese) or ',' (English)
    const separator = groupSubtitle.textContent.includes('，') ? '，' : ','
    let groupUsers = groupSubtitle.textContent.split(separator)
    groupUsers = groupUsers.map((user) => user.trim())
    if (groupUsers.length === 1) {
        throw new Error(
            'No users found in the group chat. Please wait a second and try again.' +
            'If the error persists, it might be that your Locale is not supported. Please open an issue on GitHub.'
        )
    }
    // Remove unnecessary text
    groupUsers = groupUsers.filter(
        (user) =>
            [
                'You', // English
                '您', // Chinese
                'あなた', // Japanese
                'आप', // Hindi
                'Tu', // Spanish
                'Vous', // French
                'Du', // German
                'Jij', // Dutch
                'Você', // Portuguese
                'Вы' // Russian
            ].includes(user) === false
    )
    // Normalize user's names without accents or special characters
    return groupUsers.map((user) => user.normalize('NFD').replace(/[\u0300-\u036f]/g, ''))
}

async function tagEveryone(message) {
    const groupUsers = extractGroupUsers()
    const chatInput = document.querySelector("[data-testid='conversation-compose-box-input'] > p")
    if (!chatInput) {
        throw new Error('No chat input found. Please type a letter in the chat input.')
    }
    document.execCommand('insertText', false, message)
    for (const user of groupUsers) {
        document.execCommand('insertText', false, `@${user}`)
        // await waitForElement("[data-testid='contact-mention-list-item']")
        await sleep(300)
        // Send "tab" key to autocomplete the user
        const keyboardEvent = new KeyboardEvent('keydown', {
            key: 'Tab',
            code: 'Tab',
            keyCode: 9,
            which: 9,
            bubbles: true,
            cancelable: true,
            view: window
        })
        chatInput.dispatchEvent(keyboardEvent)
        document.execCommand('insertText', false, ' ')
    }
}

async function send_message() {
    var message = ``
    document.execCommand('insertText', false, message)
    message = message.replace(/\n/g, '\\n');
    document.getElementsByClassName("selectable-text copyable-text iq0m558w")[1].click()
    await sleep(500)
    document.getElementsByClassName("_24-Ff")[0].click()
    await sleep(500)
    await tagEveryone(message);
    await sleep(500)
    document.getElementsByClassName("tvf2evcx oq44ahr5 lb5m6g5c svlsagor p2rjqpw5 epia9gcq")[0].click()
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function newName(str) {
    // Extract the string and number parts
    let match = str.match(/^(\D*)(\d*)$/);
    let prefix = match[1];
    let numStr = match[2];
  
    // Convert the number to a number (ignoring leading zeros)
    let num = parseInt(numStr, 10);
  
    // Increment the number and convert it back to a string
    if (num < 999) {
      num++;
    } else {
      num = 1000;
    }
    let newNumStr = num.toString();
  
    // Pad the new number with leading zeros if necessary
    while (newNumStr.length < numStr.length) {
      newNumStr = "0" + newNumStr;
    }
  
    // Combine the prefix and new number and return the result
    return prefix + newNumStr;
}


  
async function selectContacts(amount) {
    var buttoncheck = document.getElementsByClassName("lhggkp7q cxec7x23 kanlod6e gfz4du6o r7fjleex nmeg1xfo okm7a8wg le5p0ye3")
    var clickbutton = document.getElementsByClassName("_199zF _3j691 _2N1Gm")
    var arrlength = buttoncheck.length;
    var lastLowestButton;
    var chosen = 0;
    for (let i = 0; i < 50 % arrlength; i++) {
        for (let j = 0; j < arrlength - 1; j++) {
            var arrlength = buttoncheck.length;
            if (buttoncheck[j].checked === false) {
                try { clickbutton[j].click(); chosen++} catch { console.log("error"); continue; }
            }
            if (chosen >= amount){
                return;
            }
        }
        await sleep(1000)
        lastLowestButton = lowestButtonCheck;
        var lowestButtonCheck = Array.from(buttoncheck).sort((a, b) => b.getBoundingClientRect().bottom - a.getBoundingClientRect().bottom)[0];
        lowestButtonCheck.scrollIntoView()
        var arrlength = buttoncheck.length;
        await sleep(500);
    }
}

async function chooseAndAdd(name, amount) {
    try {
        //Press "Add participant"
        document.querySelector("#app > div > div > div._2Ts6i._1xFRo > span > div > span > div > div > div > section > div.gsqs0kct.oauresqk.efgp0a3n.h3bz2vby.g0rxnol2.tvf2evcx.oq44ahr5.lb5m6g5c.brac1wpa.lkjmyc96.i4pc7asj.bcymb0na.przvwfww.e8k79tju > div.tt8xd2xn.dl6j7rsh.mpdn4nr2.avk8rzj1 > div:nth-child(2)").click()
    } catch {
        //Press group name
        document.getElementsByClassName("_24-Ff")[0].click()
        await sleep(500)
        //Press "Add participant"
        document.querySelector("#app > div > div > div._2Ts6i._1xFRo > span > div > span > div > div > div > section > div.gsqs0kct.oauresqk.efgp0a3n.h3bz2vby.g0rxnol2.tvf2evcx.oq44ahr5.lb5m6g5c.brac1wpa.lkjmyc96.i4pc7asj.bcymb0na.przvwfww.e8k79tju > div.tt8xd2xn.dl6j7rsh.mpdn4nr2.avk8rzj1 > div:nth-child(2)").click()
    }
    await sleep(1000)
    //Enter name
    document.execCommand('insertText', false, `${name}`)
    await sleep(500)
    //Select Contacts
    await selectContacts(amount);
    await sleep(1000)
    //Press V Button
    document.querySelector("#app > div > span:nth-child(2) > div > span > div > div > div > div > div > div > span.nbczt5ty.tvf2evcx.oq44ahr5.lb5m6g5c > div > div > div").click()
    await sleep(2000)
    //Press "Add participant"
    document.querySelector("#app > div > span:nth-child(2) > div > span > div > div > div > div > div > div.p357zi0d.ns59xd2u.kcgo1i74.gq7nj7y3.lnjlmjd6.przvwfww.mc6o24uu.e65innqk.le5p0ye3 > div > button.emrlamx0.aiput80m.h1a80dm5.sta02ykp.g0rxnol2.l7jjieqr.hnx8ox4h.f8jlpxt4.l1l4so3b.bbv8nyr4.m2gb0jvt.rfxpxord.gwd8mfxi.mnh9o63b.qmy7ya1v.dcuuyf4k.swfxs4et.bgr8sfoe.a6r886iw.fx1ldmn8.orxa12fk.bkifpc9x.hjo1mxmu.oixtjehm.rpz5dbxo.bn27j4ou.snayiamo.szmswy5k").click()
    await sleep(2000)
    //Press Cancel
    try {
        document.querySelector("#app > div > span:nth-child(2) > div > span > div > div > div > div > div > div.p357zi0d.ns59xd2u.kcgo1i74.gq7nj7y3.lnjlmjd6.przvwfww.mc6o24uu.e65innqk.le5p0ye3 > div > button.emrlamx0.aiput80m.h1a80dm5.sta02ykp.g0rxnol2.l7jjieqr.hnx8ox4h.f8jlpxt4.l1l4so3b.bbv8nyr4.m2gb0jvt.rfxpxord.gwd8mfxi.mnh9o63b.qmy7ya1v.dcuuyf4k.swfxs4et.bgr8sfoe.a6r886iw.fx1ldmn8.orxa12fk.bkifpc9x.hjo1mxmu.dul83ws3.o2v2jkg7.lpmlzjg7.b3vjre3n.s48w15s6.v9zxeiga.losjomng.snayiamo.hco6ovyk.jzidrpjq.c1yuexcr.kk3bglv9.germ6ouh").click()
    } catch {}
}

async function run(name, amount) {
    amount = parseInt(amount)
    setInterval(function() {
        chooseAndAdd(name, amount);
        name = newName(name);
    }, 2 * 60 * 60 * 1000);
}