for(let j = 0; j < 5; j++){    
    setTimeout(function() {
        for (let i = 0; i < 21; i++) {
            i = i%21;
            if(document.getElementsByClassName("lhggkp7q cxec7x23 kanlod6e gfz4du6o r7fjleex nmeg1xfo okm7a8wg le5p0ye3")[i].checked == false){
                document.getElementsByClassName("_2nY6U vq6sj _2OR6D")[i].click()
            }
            if(i==20){
                console.log("test")
                document.getElementsByClassName("_3Bc7H g0rxnol2 thghmljt p357zi0d rjo8vgbg ggj6brxn f8m0rgwh gfz4du6o ag5g9lrv bs7a17vp ov67bkzj")[0].scrollTop+= 500;
                setTimeout(function() {
                    document.getElementsByClassName("_2nY6U vq6sj _2OR6D")[0].scrollIntoView()
                }, 500);
            }
        }
    }, 3000);
}


async function addPeople(j) {
    const timer = ms => new Promise(res => setTimeout(res, ms))
    for (let k = 0; k < j; k++){
        for (let i = 0; i < 21; i++) {
            i = i%21;
            if(document.getElementsByClassName("lhggkp7q cxec7x23 kanlod6e gfz4du6o r7fjleex nmeg1xfo okm7a8wg le5p0ye3")[i].checked == false){
                document.getElementsByClassName("_2nY6U vq6sj _2OR6D")[i].click()
            }
            if(i==20){
                document.getElementsByClassName("_3Bc7H g0rxnol2 thghmljt p357zi0d rjo8vgbg ggj6brxn f8m0rgwh gfz4du6o ag5g9lrv bs7a17vp ov67bkzj")[0].scrollTop+= 500;
                setTimeout(function() {
                    document.getElementsByClassName("_2nY6U vq6sj _2OR6D")[0].scrollIntoView()
                }, 500);
            }  
        } 
        if(k == 0) 
            await timer(1000);
    }     
}  

myLoop(); 
for (let i = 0; i < 20; i++) {
    document.getElementsByClassName("_2nY6U vq6sj _2OR6D")[i].scrollIntoView()
    document.getElementsByClassName("_2nY6U vq6sj _2OR6D")[0].scrollIntoView()
}

//TODO; not selecting everything - need a fix
//Sometimes (usually the first time) just select 1 group and skips all the other without selecting (when you go back and start again it works)
//calculate about the amount of groups needed for 1 whatsapp group to assemble
//Make it work smoothley overall
//Make it easy to use (using a button or something)
//See how you can make adding the contacts easier