function wearPPE() {
    return new Promise((resolve) => {
        setTimeout(() => resolve('Wearing PPE'), 2000);
    })
}

function fightCorona() {
    return new Promise((resolve) => {
        setTimeout(() => resolve('Fighting Corona'), 1000);
    })
}

/* previous execute() */
/*function execute() {
    wearPPE().then(result => console.log(result));
    fightCorona().then(result => console.log(result));
}*/

/* latest execute */
function execute() {
    wearPPE().then(result => console.log(result));
    setTimeout(function(){
    fightCorona().then(result => console.log(result));
    }, 1001);
}

execute();

