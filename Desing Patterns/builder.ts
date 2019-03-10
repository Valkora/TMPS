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
  export class BallPrototype {
    constructor(private proto: any){};
    clone() {
      let ball = new Ball();
  
      ball.weigth = this.proto.weight;
      ball.colour = this.proto.colour;
  
      return ball;
    };
  }
}

namespace BuilderPattern {
  export namespace DemoBP {
		export function show() : void {
      let proto = new Ball();
      proto.weigth = 4000;
      proto.colour = 'red';
      let prototype = new BallPrototype(proto);
      let protoBall = prototype.clone();

      console.log(`Cloned ball has following params: \n-Color:  ${protoBall.colour} \n-Weight: ${protoBall.weigth}`)

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
