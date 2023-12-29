let boxes = document.querySelectorAll('.Box');
let reset = document.querySelector('#Reset-btn');
let O_move = document.querySelector('#O-move');
let X_move = document.querySelector('#X-move');
let Win = document.querySelector('#Win');
let Draw = document.querySelector('#Draw');
let turn_O = true;
let draw = true;
let count = 0;

const win_patterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [0, 4, 8]
];

const reset_game = () => {
  turn_O = true;
  count = 0;
  enable_boxes();
  let msg = document.querySelector('#msg');
  msg.innerText = `Let's Play`;
}

const disable_boxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
}

const enable_boxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
}

const check_winner = () => {
  for (let pattern of win_patterns) {
    let pos_1_val = boxes[pattern[0]].innerText;
    let pos_2_val = boxes[pattern[1]].innerText;
    let pos_3_val = boxes[pattern[2]].innerText;

    if (pos_1_val != "" && pos_2_val != "" && pos_3_val != "") {
      if (pos_1_val === pos_2_val && pos_2_val === pos_3_val) {
        disable_boxes();
        Win.play();
        let msg = document.querySelector('#msg');
        msg.innerText = `!!! Winner is ${pos_1_val} !!!`;
        draw = false;
      }
      else
        draw = true;

    }
  }
  if (count === 9 && draw) {
    Draw.play();
    let msg = document.querySelector('#msg');
    msg.innerText = `!!! DRAW !!!`;
    console.log(pattern);
  }
}

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turn_O) {
      box.classList.add("O");
      box.innerText = 'O';
      O_move.play();
      turn_O = false;
    } else {
      box.classList.add("X");
      box.innerText = 'X';
      X_move.play();
      turn_O = true;
    }
    count++;
    box.disabled = true;
    check_winner();
  })
})

reset.addEventListener('click', reset_game);