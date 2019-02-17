// abstract factory pattern + factory pattern

namespace AbstractFactoryPattern {

  export interface IBall{
    width: Number;
    height?: Number;
  }

  export interface IBallFactory{
    use: String;
    createBall(ballType: BallType): IBall;
  }

  export enum BallType {
    Round = 0,
    Oval = 1
  }
}
	
namespace AbstractFactoryPattern {    
  export class SportRoundBall implements IBall {
      width: Number = 400;
    }

    export class PlayRoundBall implements IBall {
      width: Number = 200;
    }

    export class SportOvalBall implements IBall {
      width: Number = 400;
      height: Number = 200;
    }
    
    export class PlayOvalBall implements IBall {
      width: Number = 200;
      height: Number = 100;
    }
}
	
namespace AbstractFactoryPattern {
  export class SportBallFactory implements IBallFactory {
    use: String = "sport";
    createBall(ballType: BallType): IBall {
      let ball: IBall = null;

      switch (ballType) {
        case BallType.Round:
          ball = new SportRoundBall();
          break;
        case BallType.Oval:
          ball = new SportOvalBall();
          break;
      }

      return ball;
    }
  }

  export class PlaytBallFactory implements IBallFactory {
    use: String = "play";
    createBall(ballType: BallType): IBall {
      let ball: IBall = null;

      switch (ballType) {
        case BallType.Round:
          ball = new PlayRoundBall();
          break;
        case BallType.Oval:
          ball = new PlayOvalBall();
          break;
      }

      return ball;
    }
  }
}


namespace AbstractFactoryPattern {

  class BallFactoryProducer {
    static getBallFactory(use: String): IBallFactory {
      let ballFactory: IBallFactory;
        
      switch (use) {
        case "ford":
          ballFactory = new SportBallFactory();
          break;
        case "play":
          ballFactory = new PlaytBallFactory();
          break;
        }
        return ballFactory;
      }
  }

  export namespace DemoAF {
    export function show() {   
      var use = "sport";
      let ballFactory: IBallFactory = BallFactoryProducer.getBallFactory(use);			

      let ball: IBall = ballFactory.createBall(BallType.Round);
      console.log(`Made ball is of ${ballFactory.use} collection and it has following parames: -weight: ${ball.width} ${ball.height ? `-height: ${ball.height}`: ''} .`);
    }
  }
}
