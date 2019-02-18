namespace BuilderPattern {

  export class Ball {
    weigth: Number;
    colour: String;
  }

  export interface IBallBuilder {
    setColour(colour: string): void;
    setWeigth(count: number): void;
    getResult(): Ball;
  }

  export class BallBuilder implements IBallBuilder {        
    private _ball: Ball;
    
    constructor() {
      this._ball = new Ball();
    }

    setColour(colour: string): void {
      this._ball.colour = colour;
    }
    
    setWeigth(count: number): void {
      this._ball.weigth = count;
    }

    getResult(): Ball {
      return this._ball;
    }
  }
}

namespace BuilderPattern {
  export namespace DemoBP {
		export function show() : void {
			let ball = BallBuilderDirector.construct();
			console.log(`This ball has following params: \n-Color:  ${ball.colour} \n-Weight: ${ball.weigth}`)
		}
 
		export class BallBuilderDirector{
			static construct(): Ball{
				let ballBuilder = new BallBuilder();
				ballBuilder.setColour("Orange");
				ballBuilder.setWeigth(4000);
 
				return ballBuilder.getResult();
			}
		}
	}
}
