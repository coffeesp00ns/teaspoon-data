//base variables

const doorImage1 = document.getElementById('door1');

const doorImage2 = document.getElementById('door2');

const doorImage3 = document.getElementById('door3');

const startButton = document.getElementById('start');

const botDoorPath = 'https://content.codecademy.com/projects/chore-door/images/robot.svg';

const beachDoorPath = 'https://content.codecademy.com/projects/chore-door/images/beach.svg';

const spaceDoorPath = 'https://content.codecademy.com/projects/chore-door/images/space.svg';

const closedDoorPath = 'https://content.codecademy.com/projects/chore-door/images/closed_door.svg'

let numClosedDoors = 3;

let openDoor1 ;
let openDoor2 ;
let openDoor3 ;

let currentlyPlaying = true;

// checks to see if the door image is a bot!
const isBot =(door)=> {
  if(door.src === botDoorPath){
    return true;
  };
  return false;
}

// checks to see if a door is clicked
const isClicked =(door)=> {
  if(door.src === closedDoorPath){
    return false;
  }
  return true;
}


// door decreaser

const playDoor =(door)=>{
  numClosedDoors-= 1;
  if (numClosedDoors === 0){
    gameOver('win');
  }else if(isBot(door)){
    gameOver();
  }
}

//Chore door randomizer

const randomChoreDoorGenerator = () =>{
  const choreDoor = Math.floor(Math.random()*numClosedDoors);
  if(choreDoor === 0){
    openDoor1 = botDoorPath;
    openDoor2 = spaceDoorPath;
    openDoor3 = beachDoorPath;
  }else if(choreDoor === 1){
    openDoor1 = spaceDoorPath;
    openDoor2 = botDoorPath;
    openDoor3 = beachDoorPath;
  }else if(choreDoor === 2){
    openDoor1= beachDoorPath;
    openDoor2= spaceDoorPath;
    openDoor3= botDoorPath;
  }

}

//door openers

doorImage1.onclick = ()=>{
  if(currentlyPlaying && !isClicked(doorImage1)){
    doorImage1.src = openDoor1;
    playDoor(doorImage1);
  };
}

doorImage2.onclick = ()=>{
  if(currentlyPlaying && !isClicked(doorImage2)){
    doorImage2.src = openDoor2;
    playDoor(doorImage2);
  };
}

doorImage3.onclick = ()=>{
  if(currentlyPlaying && !isClicked(doorImage3)){
    doorImage3.src = openDoor3;
    playDoor(doorImage3);
  };
}

startButton.onclick =()=>{
  startRound();
}

// game over function

const gameOver = (status)=>{
  if(status==='win'){
    startButton.innerHTML = 'You win! Play again?';
  }else{
    startButton.innerHTML = 'Game Over! Play again?';
  }
  currentlyPlaying = false;
}

// reset function

const startRound =()=> {
  if(!currentlyPlaying){
    doorImage1.src = closedDoorPath;
    doorImage2.src = closedDoorPath;
    doorImage3.src = closedDoorPath;
    numClosedDoors = 3;
    startButton.innerHTML = 'Good Luck!'
    currentlyPlaying = true;
    randomChoreDoorGenerator()
  };
  randomChoreDoorGenerator()
}

startRound()
