const canvas = document.getElementById("canvas1");
// const ctx = canvas.
const ctx = canvas.getContext("2d");
canvas.width = 500;
canvas.height = 500;

const getSides = (hypotenuse, angle) => {
  let cosOfAngle = Math.cos((Math.PI / 180) * angle).toFixed(2);
  let sinOfAngle = Math.sin((Math.PI / 180) * angle).toFixed(2);
  let x = hypotenuse * cosOfAngle;
  let y = hypotenuse * sinOfAngle;
  return [x, y];
};

class Game {
  constructor(ctx, width, height) {
    this.width = width;
    this.height = height;
    this.ship = new ship(this);
    this.angle = 0;
    this.ctx = ctx;
    this.userInput = new UserInput();
  }
  update(deltaTime) {
    let direction = this.userInput.getDirection();
    this.userInput.pressedKeys;
    this.ship.update(deltaTime, direction);
  }
  draw(ctx) {
    this.ship.draw(ctx);
  }
}

class ship {
  constructor(game) {
    this.game = game;
    this.speed = 0.03;
    this.x = game.width / 2;
    this.y = game.height / 2;
    this.angle = -35;
  }
  update(deltaTime, direction) {
    if (direction) {
      if (direction == "left") {
        this.angle -= 0.1 * deltaTime;
      } else {
        this.angle += 0.1 * deltaTime;
      }
    }
    let [xd, yd] = getSides(this.speed * deltaTime, this.angle);
    this.x += xd;
    this.y += yd;
    if (this.x > this.game.width + 40) this.x = 0 - 40;
    if (this.x < -40) this.x = this.game.width + 40;
    if (this.y > this.game.height + 40) this.y = 0 - 40;
    if (this.y < -40) this.y = this.game.height + 40;

    // this.ship.update(deltaTime);
    // this.
  }
  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, 40, 0, 2 * Math.PI);
    ctx.stroke();
    // this.ship.draw(this.ctx);
  }
}

class UserInput {
  constructor() {
    this.pressedKeys = [];
    this.setListeners();
  }
  setListeners() {
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") this.addKey("left");
      if (e.key === "ArrowRight") this.addKey("right");
    });
    document.addEventListener("keyup", (e) => {
      if (e.key === "ArrowLeft") this.removeKey("left");
      if (e.key === "ArrowRight") this.removeKey("right");
    });
  }
  addKey(key) {
    if (!this.pressedKeys.includes(key)) this.pressedKeys.push(key);
  }
  removeKey(key) {
    this.pressedKeys = this.pressedKeys.filter((k) => k != key);
  }
  getDirection() {
    if (this.pressedKeys.length > 0)
      return this.pressedKeys[this.pressedKeys.length - 1];
    else return null;
  }
}

const game = new Game(ctx, canvas.width, canvas.height);
let lastTime = 1;
function animate(timestamp) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const deltaTime = timestamp - lastTime;
  lastTime = timestamp;
  game.update(deltaTime);
  game.draw(ctx);
  requestAnimationFrame(animate);
}
animate(0);
