let humanScore = 0;
let computerScore = 0;
let currentRoundNumber = 1;

// Write your code below:

const generateTarget = () => {
  return Math.floor(Math.random(10)*10);
}

function compareGuesses(humanGuess,compGuess,target){
  const humanToTarget = Math.abs(target-humanGuess);
  const compToTarget = Math.abs(target-compGuess);
  if (humanToTarget < compToTarget){
    return true;
  } else if (compToTarget < humanToTarget){
    return false;
  }else {
    return true;
  }
}

const updateScore = (str) => {
  if (str === 'human') {
    humanScore += 1;
  } else if (str === 'computer'){
    computerScore += 1;
  }
}

const advanceRound = ()=> {
  currentRoundNumber += 1
}
