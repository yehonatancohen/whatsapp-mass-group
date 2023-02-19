function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function selectContacts(amount) {
    var buttoncheck = document.getElementsByClassName("lhggkp7q cxec7x23 kanlod6e gfz4du6o r7fjleex nmeg1xfo okm7a8wg le5p0ye3")
    var clickbutton = document.getElementsByClassName("_199zF _3j691 _2N1Gm")
    let prevButtonCheck = buttoncheck;
    let scrollDistance = 5; // initial scroll distance
    for (let k = 0; k < amount/30; k++) {
        buttoncheck[0].scrollIntoView();
        for (let j = 0; j < 30; j++) {
            for (let i = 0; i < clickbutton.length - 1; i++) {
                if (buttoncheck[i].checked === false) {
                    clickbutton[i].click();
                }
                if (i == clickbutton.length - 2) {
                    let lastButtonCheck = buttoncheck;
                    try {
                        while (lastButtonCheck[0] === prevButtonCheck[0]) {
                            buttoncheck = document.getElementsByClassName("lhggkp7q cxec7x23 kanlod6e gfz4du6o r7fjleex nmeg1xfo okm7a8wg le5p0ye3")
                            scrollDistance += 1; // increase scroll distance
                            lastButtonCheck = buttoncheck;
                            lastButtonCheck[buttoncheck.length - scrollDistance].scrollIntoView();
                            await sleep(200);
                        }
                    } catch (error) {
                        if (parseInt(document.getElementsByClassName("lhggkp7q ln8gz9je rx9719la")[0].style.transform.match(/translateY\(([-\d]+)px\)/)[1]) >= 30000) {
                            return false;
                        }
                    }
                    scrollDistance = 1;
                    prevButtonCheck = lastButtonCheck;
                    await sleep(500);
                }
                await sleep(500);
            }
        }
        await sleep(500);
    }
}
