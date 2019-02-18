# TMPS

## Work #1

 - Abstract Factory, Factory and Singleton Patterns can be found in 'abstarctFactoy.ts' file
 - 'builder.ts' file containce Builder Pattern

### **Abstract factory - IBallFactory**

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
### **Singletone Pattern**
In this example only one instance of SportBallFactory class should ever exist.
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

- Prototype pattern will appear soon

TBU....
