# TMPS

## Work #1

 - Abstract Factory, Factory and Singleton Patterns can be found in 'abstarctFactoy.ts' file
 - 'builder.ts' file containce Builder Pattern

### **Abstract Factory Pattern - IBallFactory**

An abstract factory provides an interface for creating families of related objects(e.g. Balls) without specifying their concrete classes.
###### It defines standards of a factory which provide interfaces for manufacturing components or complex products.
```
export interface IBallFactory {
  use: String;
  createBall(ballType: BallType): IBall;
}
```
###### Also need to be defined the interface of the products the factories(concrete) are going to produce.
```
export interface IBall {
  width: Number;
  height?: Number;
}
  
export enum BallType {
  Round = 0,
  Oval = 1
}  
```

### **Factory Pattern - PlaytBallFactory & SportBallFactory**
Factory can be a creator of objects that have a common interface. 

There's `createBall()` method in both: PlaytBallFactory and SportBallFactory that is extended from `IBallFactory` interface.
To build a "play ball" we just need to instantiate this very factory(PlaytBallFactory) and call it's createBall() method.

```
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
```

From the snippet of a code above we can notice that "play balls" can be with diffrent specifications also.

Realizing this using *IBall* interface:
```
export class PlayRoundBall implements IBall {
  width = 200;
}

export class PlayOvalBall implements IBall {
  width = 200;
  height = 100;
}
```
### **Singleton Pattern**
###### In this example only one instance of SportBallFactory class should ever exist.
```
export class SportBallFactory implements IBallFactory {
 private constructor() {}

 private static instance: SportBallFactory

 static getInstance(): SportBallFactory {
   if (!this.instance) {
     this.instance = new SportBallFactory()
   }

   return this.instance
 }
    ...
    
    
```
### **Builder Pattern - BallBuilder**
The main goal of the Builder design pattern is to separate the construction of a complex object to small pieces. By doing so the same construction process can create different representations.

###### Builder defines the interface of a builder that builds products.
```
export interface IBallBuilder {
  setColour(colour: string): void;
  setWeigth(count: number): void;
  getResult(): Ball;
}
```
###### Concrete builder: BallBuilder Implements methods that build(?) parts of the ball, and keeps track of the current building state.
```
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
```

###### Director - Defines the steps and collaborates with builders to build products.
```
export class BallBuilderDirector {
 static construct(): Ball {
  let ballBuilder = new BallBuilder();
  ballBuilder.setColour("Orange");
  ballBuilder.setWeigth(4000);

  return ballBuilder.getResult();
 }
}
```

### Prototype Pattern
- Prototype pattern will appear soon

TBU....
