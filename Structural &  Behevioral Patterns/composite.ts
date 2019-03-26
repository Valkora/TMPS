interface IBallObject {
  name: String;
  height: Number;
  width?:Number;
  operate(): void;
  getParams(): void;
}

class Group implements IBallObject {
  name: String;
  height: Number;
  width?: Number;
  private _balls: IBallObject[];

  constructor(name: String) {
    this.name = name;
    this._balls = [];
  }

  operate(): void {
    console.log(`Group: ${this.name} is on sale`)
    this._balls.map((ball: IBallObject) => {
      ball.operate();
    });
  }

  getParams(): void {
    console.log(`Group: ${this.name}`)
    this._balls.map((ball: IBallObject) => {
      ball.getParams();
    });
  }

  addBall(newBall: IBallObject) {
    const balls = this._balls.filter((ball: IBallObject, index) => {
      return ball.name === newBall.name;
    })
    if (balls.length < 1) {
      console.log(`Ball: ${newBall.name} added in ${this.name}`);
      this._balls.push(newBall);
    } else {
      console.log('The ball is already in the group');
    }
  }

  ballGone(lostBall: IBallObject) {
    const losses = this._balls.map((ball: IBallObject, index) => {
      if (ball.name === lostBall.name) {
        return index;
      }
    })
    if (losses.length > 0) {
      console.log(`Ball: ${lostBall.name} ball lost somewhere`);
      this._balls.slice(losses[0], 1);
    } else {
      console.log('No one lost');
    }
  }
}

class Ball implements IBallObject {
  name: String;
  height: Number;
  width?: Number;

  constructor(name: String, height: Number, width?: Number) {
    this.name = name;
    this.height = height;
    if (width) {
      this.width = width;
    }
  }

  operate() {
    console.log(`Ball: ${this.name} ball is on sale`);
  }

  getParams() {
    console.log(`Ball: ${this.name} has following params: \n${this.height} ${ this.width ? `width ${this.width}` : ''}`)
  }
}

class Adapter extends Ball {
  constructor(private ball: Ball) {}

  public getParams() {
    console.log(`Ball: ${this.ball.name} has following params: \n${this.ball.height} width ${this.ball.height}`)
  }
}

(function main() {
  const group = new Group('Round Group 16');
  const specialGroup = new Group('Oval Group 23');

  const ballTennis = new Ball('Tennis', 10);
  const ballFootball = new Ball('Football', 15);
  const ballBocce = new Ball('Bocce', 7);
  group.addBall(ballTennis);
  group.addBall(ballFootball);
  group.addBall(ballBocce);

  const specialBallRugby = new Ball('Rugby', 22, 12);

  specialGroup.addBall(specialBallRugby);

  group.operate();
  specialGroup.operate();

  group.ballGone(ballFootball);
  console.log('Client: What are the params of Rugby ball?')
  specialBallRugby.getParams();
  console.log('Client: And what are the params of Tennis ball?')
  ballTennis.getParams();
  console.log('Client: Ohh, I don\'t get it ...')

  const adaptTennis = new Adapter(ballTennis);
  adaptTennis.getParams();

  console.log('Clinet: Thank you! Now I see it.')

})();
