import _ from 'lodash';
import './style.css';
import Sprite from './sprite.js';

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

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
  velocity: {
    x: 0,
    y: 0
  }
});

const keys = {
  a: { pressed: false },
  d: { pressed: false },
  w: { pressed: false },
  ArrowLeft: { pressed: false },
  ArrowRight: { pressed: false }
}

function animate() {
  window.requestAnimationFrame(animate);
  context.fillStyle = 'black';
  context.fillRect(0, 0, canvas.width, canvas.height);
  player.update(context, canvas);
  enemy.update(context, canvas);



  //player movement
  player.velocity.x = 0;
  if (keys.a.pressed && player.lastkey == 'a') {
    player.velocity.x = -3;
  } else if (keys.d.pressed && player.lastkey == 'd') {
    player.velocity.x = 3;
  }

  //enemy movement
  enemy.velocity.x = 0;
  if (keys.ArrowRight.pressed && enemy.lastkey == 'ArrowRight') {
    enemy.velocity.x = 3;
  } else if (keys.ArrowLeft.pressed && enemy.lastkey == 'ArrowLeft') {
    enemy.velocity.x = -3;
  }
}

animate();

window.addEventListener('keydown', (e) => {
  e.preventDefault();
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
      player.velocity.y = -20;
      break
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
      enemy.velocity.y = -20;
      break
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