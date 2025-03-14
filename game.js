let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let isBackgroundSoundPlaying = false;

const buttonSound = document.querySelector("#button-sound");
const celebrationSound = document.querySelector("#celebration-sound");
const newGameSound = document.querySelector("#new-game-sound");
const restartSound = document.querySelector("#restart-sound");
//const playBackgroundSoundBtn = document.querySelector("#play-background-sound");
const toggleBackgroundSoundBtn = document.querySelector("#toggle-background-sound");
const backgroundSound = document.querySelector("#game-background-sound");


let turn0 = true;     // playerX, player0



const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];


const resetGame = () => {
    turn0 = true;
    enableBoxes();
    msgContainer.classList.add("hide");
}; 


boxes.forEach((box) => {
    box.addEventListener("click", () => {
        buttonSound.play();

        if(turn0){
            //player 0
            box.innerText = "✔️";
            turn0 = false; 
        } else {
            //player X
            box.innerText = "❌";
            turn0 = true;
        }
        box.disabled = true;
        checkWinner();
    });
});

const disableBoxes = () => {
    for(let box of boxes) {
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations, winner is ${winner} `;
    msgContainer.classList.remove("hide");
    disableBoxes();
    celebrationSound.play();
    
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });

     // Change background color
     document.body.style.backgroundColor = "#ffeb3b";
    
     // Reset background color after 2 seconds
     setTimeout(() => {
         document.body.style.backgroundColor = "#548688";
     }, 2000);

};


const checkWinner = () => {
    for (const pattern of winPatterns) {
    
                let pos1Val = boxes[pattern[0]].innerText;
                let pos2Val = boxes[pattern[1]].innerText;
                let pos3Val = boxes[pattern[2]].innerText;

                if (pos1Val != "" && pos2Val != "" && pos3Val  != ""){
                    if (pos1Val === pos2Val && pos2Val === pos3Val){
                       showWinner(pos1Val);
                    }
                }
    }
};

newGameBtn.addEventListener("click", () => {
    newGameSound.play();
    resetGame();
});

resetBtn.addEventListener("click", () => {
    restartSound.play();
    resetGame();
});

// playBackgroundSoundBtn.addEventListener("click", () => {
//     backgroundSound.volume = 0.1; // Set volume to a desired level
//     backgroundSound.play();
// });


toggleBackgroundSoundBtn.addEventListener("click", () => {
    backgroundSound.volume = 0.1;
    if(isBackgroundSoundPlaying){
        backgroundSound.pause();
        isBackgroundSoundPlaying = false;
        toggleBackgroundSoundBtn.innerText = "Turn Backgroun Sound On";
    }
    else {
        backgroundSound.play();
        isBackgroundSoundPlaying = true;
        toggleBackgroundSoundBtn.innerText = "Turn Background Sound Off";
    }
});






