let boxes = document.querySelectorAll(".box");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; 
let count = 0; 

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const newGame = () => {
  turnO = true;
  count = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
};

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
      if (box.innerText === "") {
          box.innerText = "O";
          turnO = false;
        box.disabled = true;
        count++;
  
        let isWinner = checkWinner(index);
        if (count === 9 && !isWinner) {
          gameDraw();
        }
  
        if (!isWinner && count < 9 && !turnO) {
          computerMove();
        }
      } else {
        console.log("This box is already filled. Choose another.");
      }
    });
});

const gameDraw = () => {
  msg.innerText = `Game was a Draw.`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const showWinner = (winner, pattern) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val, pattern);
        return true;
      }
    }
  }
};

const getRandomEmptyBox = () => {
    const emptyBoxes = [];
    for (let i = 0; i < boxes.length; i++) {
      if (boxes[i].innerText === "") {
        emptyBoxes.push(i);
      }
    }
    const randomIndex = Math.floor(Math.random() * emptyBoxes.length);
    return emptyBoxes[randomIndex];
  };
  
  const computerMove = () => {
    const index = getRandomEmptyBox();
    boxes[index].innerText = "X"; // Assuming the computer plays with "X"
    boxes[index].disabled = true;
    count++;
    let isWinner = checkWinner(index);
    if (count === 9 && !isWinner) {
      gameDraw();
    }
  };

newGameBtn.addEventListener("click", newGame);