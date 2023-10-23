let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "purple", "blue"];

let started = false;

let level = 0;



let resetBtn = document.getElementById("resetBtn");
let container = document.querySelector(".container");
let correct = document.getElementById("correctGameseq");
const body = document.querySelector("body");
let allBtns = document.querySelectorAll(".box");
let navbar = document.querySelector(".navbar"); // Select the navbar element

// Function to update heading text
function updateHeadingText() {
    const heading = document.querySelector('h2');
    if (window.innerWidth <= 680) {
        heading.innerText = 'Click anywhere to start';
    } else {
        heading.innerText = 'Press any key to start';
    }
}

// Call the function initially and add a listener for window resize
updateHeadingText();
window.addEventListener('resize', updateHeadingText);



resetBtn.addEventListener("click", () => {
    
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
    updateHeadingText();
    correct.innerHTML = ``;

});

document.addEventListener("click", (event) => {
    if (
        event.target !== resetBtn &&
        !Array.from(allBtns).includes(event.target) &&
        !navbar.contains(event.target) && // Check if the target is not within the navbar
        !started &&
        userSeq.length === 0 &&
        gameSeq.length === 0
    ) {
        started = true;
        level++;
        document.querySelector("h2").innerText = `level ${level}`;
        levelUp();
        resetBtn.style.display = "none";
    }
});

document.addEventListener("keypress", () => {
    if (started == false) {
        started = true;
        level++;
        document.querySelector("h2").innerText = `level ${level}`;
        levelUp();
        resetBtn.style.display = "none";
    }
});

function levelUp() {
    userSeq = [];
    // level++;
    // document.querySelector("h2").innerText = `level ${level}`;

    let randIdx = Math.floor(Math.random() * 3);
    let randColor = btns[randIdx];
    let randbtn = document.querySelector(`.${randColor}`);
    gameFlash(randbtn);
    gameSeq.push(randColor);
    console.log(gameSeq);
}



for (btn of allBtns) {
    btn.addEventListener("click", btnPressed);
}

function check() {
    let idx = userSeq.length - 1;
    if (userSeq[idx] == gameSeq[idx]) {

        if (userSeq.length == gameSeq.length) {
            level++;
            document.querySelector("h2").innerText = `level ${level}`;
            setTimeout(() => {
                levelUp();
            }, 1000);
        }
    }
    else {
        started = false;
        body.style.backgroundColor = "red";
        setTimeout(() => {
            body.style.backgroundColor = "white";
        }, 140);
        document.querySelector("h2").innerHTML = `Game over, Your score is ${level - 1}`;
        correct.innerHTML = `<strong>correct sequence : </strong>${gameSeq}`;
        resetBtn.style.display = "inline";
    }
}

// function reset(){
//     gameSeq = [];
//     userSeq = [];
//     level = 0;
// }
function btnPressed() {
    // console.log(this);
    if (started == true) {
        userFlash(this);
        userColor = this.getAttribute("id");
        userSeq.push(userColor);
        check();
    }

}

function gameFlash(btn) {
    btn.classList.add("gameflash");
    setTimeout(() => {
        btn.classList.remove("gameflash");
    }, (100));
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(() => {
        btn.classList.remove("userflash");
    }, (100));
}