import _ from 'lodash';
import './style.css';
import Sprite from './sprite.js';

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

let lastRenderTime = 0

canvas.width = 1024;
canvas.height = 576;

context.fillRect(0, 0, canvas.width, canvas.height);

const player = new Sprite({
  position: {
    x: 0,
    y: 0
  },
  velocity: {
    x: 0,
    y: 0
  }
})

const enemy = new Sprite({
  position: {
    x: 400,
    y: 150
  },
  offSet: {
    x: -50,
    y: 0
  },
  velocity: {
    x: 0,
    y: 0
  },
  color: 'blue'
});

const keys = {
  a: { pressed: false },
  d: { pressed: false },
  w: { pressed: false },
  ArrowLeft: { pressed: false },
  ArrowRight: { pressed: false }
}

function rectangularCollision({ rectangle1, rectangle2 }) {
  return (rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x
    && rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width
    && rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y
    && rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height)
}


function animate(currentTime) {
  const secondsSinceLastRender = (currentTime - lastRenderTime) / 100;

  //player movement
  player.velocity.x = 0;
  if (keys.a.pressed && player.lastkey == 'a') {
    player.velocity.x = -36;
  } else if (keys.d.pressed && player.lastkey == 'd') {
    player.velocity.x = 36;
  }

  //enemy movement
  enemy.velocity.x = 0;
  if (keys.ArrowRight.pressed && enemy.lastkey == 'ArrowRight') {
    enemy.velocity.x = 36;
  } else if (keys.ArrowLeft.pressed && enemy.lastkey == 'ArrowLeft') {
    enemy.velocity.x = -36;
  }

  context.fillStyle = 'black';
  context.fillRect(0, 0, canvas.width, canvas.height);
  player.update(context, canvas, secondsSinceLastRender);
  enemy.update(context, canvas, secondsSinceLastRender);

  //detect for collision
  if (rectangularCollision({ rectangle1: player, rectangle2: enemy }) && player.isAttacking) {
    player.isAttacking = false;
    console.log("Collision")
  }

  if (rectangularCollision({ rectangle1: enemy, rectangle2: player }) && enemy.isAttacking) {
    enemy.isAttacking = false;
    console.log("Collision enemy")
  }


  lastRenderTime = currentTime;

  window.requestAnimationFrame(animate);
}

window.addEventListener('keydown', (e) => {
  switch (e.key) {
    //player keys
    case 'd':
      keys.d.pressed = true;
      player.lastkey = 'd'
      break
    case 'a':
      keys.a.pressed = true;
      player.lastkey = 'a'
      break
    case 'w':
      if (player.velocity.y == 0)
        player.velocity.y = -250;
      break
    case ' ':
      player.attack();
  }

  switch (e.key) {
    //enemy keys 
    case 'ArrowRight':
      keys.ArrowRight.pressed = true;
      enemy.lastkey = 'ArrowRight'
      break
    case 'ArrowLeft':
      keys.ArrowLeft.pressed = true;
      enemy.lastkey = 'ArrowLeft'
      break
    case 'ArrowUp':
      if (player.velocity.y == 0)
        enemy.velocity.y = -250;
      break
    case 'ArrowDown':
      enemy.attack();
  }
})

window.addEventListener('keyup', (e) => {
  switch (e.key) {
    case 'd':
      keys.d.pressed = false;
      break
    case 'a':
      keys.a.pressed = false;
      break

    //enemy keys
    case 'ArrowRight':
      keys.ArrowRight.pressed = false;
      break
    case 'ArrowLeft':
      keys.ArrowLeft.pressed = false;
      break
  }
})

window.requestAnimationFrame(animate);