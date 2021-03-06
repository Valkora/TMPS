# TMPS| <a href="https://github.com/Valkora/TMPS/blob/master/README.md#work-1"> Work#1 </a> & <a href="https://github.com/Valkora/TMPS/blob/master/README.md#work-2"> Work#2 </a>

### Work1
   <a href="https://github.com/Valkora/TMPS/blob/master/README.md#abstract-factory-pattern---iballfactory"> Abstract Factory Pattern </a> | 
   <a href="https://github.com/Valkora/TMPS/blob/master/README.md#factory-pattern---playtballfactory--sportballfactory"> Factory Pattern </a> | 
   <a href="https://github.com/Valkora/TMPS/blob/master/README.md#singleton-pattern"> Singleton Pattern </a> |
   <a href="https://github.com/Valkora/TMPS/blob/master/README.md#builder-pattern---ballbuilder"> Builder Pattern </a> |
   <a href="https://github.com/Valkora/TMPS/blob/master/README.md#prototype-pattern"> Prototype Pattern </a> 

### Work2
   <a href="https://github.com/Valkora/TMPS/blob/master/README.md#composite-pattern"> Composite Pattern </a> | 
   <a href="https://github.com/Valkora/TMPS/blob/master/README.md#adapter-pattern"> Adapter Pattern </a> | 
   <a href="https://github.com/Valkora/TMPS/blob/master/README.md#decorator-pattern"> Decorator Pattern </a> | 
   <a href="https://github.com/Valkora/TMPS/blob/master/README.md#facade-pattern"> Facade Pattern </a> |
   <a href="https://github.com/Valkora/TMPS/blob/master/README.md#strategy-pattern"> Strategy Pattern </a>

## Work #1

 - Abstract Factory, Factory and Singleton Patterns can be found in 'abstarctFactoy.ts' file
 - 'builder.ts' file containce Builder and Prototype Patterns

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
```
export class BallPrototype {
  constructor(private proto: any){};
  clone() {
    let ball = new Ball();

    ball.weigth = this.proto.weight;
    ball.colour = this.proto.colour;

    return ball;
  };
}
```

## Work #2
 <a href="https://github.com/Valkora/TMPS/blob/master/README.md#composite-pattern"> Composite Pattern </a> | 
   <a href="https://github.com/Valkora/TMPS/blob/master/README.md#adapter-pattern"> Adapter Pattern </a> | 
   <a href="https://github.com/Valkora/TMPS/blob/master/README.md#decorator-pattern"> Decorator Pattern </a> | 
   <a href="https://github.com/Valkora/TMPS/blob/master/README.md#facade-pattern"> Facade Pattern </a> |
   <a href="https://github.com/Valkora/TMPS/blob/master/README.md#strategy-pattern"> Strategy Pattern </a>

- Composite and Adapter Patterns are in composite.ts file in "Structural & Behavioral Patterns" folder
TBU
- Decorator and Facade Patterns are in decorator.ts file
- Strategy Pattern is in strategy.ts

### **Composite Pattern**

###### IBallObject - The component interface declares common operations for simple and complex objects of a composition.
```
interface IBallObject {
  name: String;
  height: Number;
  width?:Number;
  operate(): void;
  getParams(): void;
}
```

###### Class Group - The composite class represents complex components that have children. Composite objects delegate the actual work to their children and then "sum up" the result.

```
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

  getParams(): void {...} 

  addBall(newBall: IBallObject) {...}

  ballGone(lostBall: IBallObject) {...}
}
```

A composite object can add or remove other components (both simple or complex) to or from its child list.
```
addBall(newBall: IBallObject) {...} // Add a child to the array of children.
ballGone(lostBall: IBallObject) {...} // Remove a child from the array of children.
```

###### Class Ball represents end objects of a composition. It's a leaf objects that do the actual work.

```
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
```

###### The client code works with all the components via base interface.

```
  const group = new Group('Round Group 16');
  const specialGroup = new Group('Oval Group 23');

  const ballTennis = new Ball('Tennis', 10);
  const ballFootball = new Ball('Football', 15);
  const ballBocce = new Ball('Bocce', 7);
  group.addBall(ballTennis);
  group.addBall(ballFootball);
  group.addBall(ballBocce);
```

### **Adapter Pattern**
###### There's a class Ball with IBallObject interface. Using this class round(height property) and oval(height and width) balls can be created. This class has 'getParams' method and it tells ball's params(name, heigth and width if ball has it).
```
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

  operate() {...}

  getParams() {
    console.log(`Ball: ${this.name} has following params: \n${this.height} ${ this.width ? `width ${this.width}` : ''}`)
  }
}
```
###### However, "client" always wants to get all params(name, height and width). Adapter class resovles this "issue" and improve getParams() for round balls.
```
class Adapter extends Ball {
  private ball: Ball;

  public getParams() {
    console.log(`Ball: ${this.ball.name} has following params: \n${this.ball.height} width ${this.ball.height}`)
  }
}
```
###### In client code it looks following way:
```
(function main() {
  const group = new Group('Round Group 16');
  const specialGroup = new Group('Oval Group 23');

  const ballTennis = new Ball('Tennis', 10);


  const specialBallRugby = new Ball('Rugby', 22, 12);

  group.ballGone(ballFootball);
  console.log('Client: What are the params of Rugby ball?')
  specialBallRugby.getParams();
  console.log('Client: And what are the params of Tennis ball?')
  ballTennis.getParams();
  console.log('Client: Ohh, I don\'t get it ...')

  const adaptTennis = new Adapter(ballTennis.name, ballTennis.height);
  adaptTennis.getParams();

  console.log('Clinet: Thank you! Now I see it.')

})();
```

### **Decorator Pattern**
###### The base Component interface defines operations that can be altered by decorators.
```
interface IBall {
  cost(): Number;
}
```

###### GeneralBall provide default implementations of the operations.
```
class GeneralBall implements IBall {
  cost(): Number {
    return 10;
  }
}
```

###### The BallExtraDecorator(base Decorator) class follows the same interface as the other components. The primary purpose of this class is to define the wrapping interface for all concrete decorators. 
```
class BallExtraDecorator implements IBall {
  private _ball: IBall;

  constructor(ball: GeneralBall) {
    this._ball = ball;
  }
  // The Decorator delegates all work to the wrapped component. 
  cost(): Number {
    return this._ball.cost();
  }
}
```

###### StripeDecorators calls the wrapped object and alter its result.
```
class StripeDecorator extends BallExtraDecorator {
  private _price: Number = 3;

  cost(): Number {
    return super.cost().valueOf() + this._price.valueOf();
  }
}
```
###### SportDecorator
```
class SportDecorator extends BallExtraDecorator {
  private _price: Number = 2.5;
  private _sportEdition: Number = 1.5;

  cost(): Number {
    return super.cost().valueOf() + this._price.valueOf() + this._sportEdition.valueOf();
  }
}
```

###### Client code can work with all objects using the Component interface. 
```
(function main() {
  const general = new GeneralBall();
  const withStripes = new StripeDecorator(general);
  const sportEdition = new SportDecorator(withStripes);
  console.log(`Total: ${sportEdition.cost()}`);
})();
```
### **Facade Pattern**
###### The BallProductionProcess class provides a simple interface to the complex logic of one or several subsystems.
It keeps client away from complexity of the subsystem.
 ```
 class BallProductionProcess {

  private _matPrep: RawMaterialPrepareSystem;
  private _decorSect: DecorationSection;
  private _PackingDepart: PackingDepartment;

  constructor() {
    this._matPrep = new RawMaterialPrepareSystem();
    this._decorSect = new DecorationSection();
    this._PackingDepart = new PackingDepartment();
  }

  processStart(type: string, ball: GeneralBall) {
    this._matPrep.prepare();
    this._decorSect.decorate(type, ball);
    this._PackingDepart.pack();

  }
}
 ```
 
 ###### The Subsystems: `RawMaterialPrepareSystem`, `DecorationSection` and `PackingDepartment` can accept requests either from the facade(BallProductionProcess) or client directly.The Facade is just another client of Subsystems, and it's not a part of the Subsystems.
 ```
 class RawMaterialPrepareSystem {
  prepare() {
    console.log('Prepare raw material for standart ball');
  }
}
 ```
 ###### The DecorationSection subsystem combines Facade and Decorator Patterns. During decorate event ball can be decorated by diffrent decorators.
 ```
 class DecorationSection {
  decorate(type, ball) {
    switch (type) {
      case 'sport':
        const withStripes = new StripeDecorator(ball);
        console.log(`Total: ${withStripes.cost()}`);
        break;
      case 'stripe':
        const sportEdition = new SportDecorator(ball);
        console.log(`Total: ${sportEdition.cost()}`);
        break;
    }
    console.log('Add stripes to a ball');
  }
}
 ```
 ```
 class PackingDepartment {
  pack() {
    console.log('Pack a ball');
  }
}
 ```
 
###### In client code  works with complex subsystems through a simple interface provided by the Facade.
```
(function main() {
  const general = new GeneralBall();
  const process = new BallProductionProcess();
  process.processStart('stripe', general);
})();
```

### **Strategy Pattern**

###### The BallProduction defines the interface of interest to `clients`.
```
class BallProduction {
  public strategy: ProductionStrategy;
  public name: String;
  constructor(name: string, strategy: ProductionStrategy) {
    this.name = name;
    this.strategy = strategy
  }

  producing(): void {
    console.log(`${ this.name } starts:`)
    this.strategy.produce();
  };
}
```

###### The ProductionStrategy interface declares operations common to all supported versions of some ball productions strategies.
```
interface ProductionStrategy {
  produce(): void;
  stop?(): void;
}
```

###### Concrete strategies (Sewing/Melting/Pressing) implement the actions while following the base ProductionStrategy interface.
```
class Sewing implements ProductionStrategy {
  public produce(): void {
    console.log('Sewing')
  }
}

class Melting implements ProductionStrategy {
  public produce(): void {
    console.log('Melting')
  }
}

class Pressing implements ProductionStrategy {
  public produce(): void {
    console.log('Pressing')
  }
}
```
###### The client code picks a concrete strategy and passes it to the BallProduction.
```
(function main() {
  const football = new BallProduction('Football', new Sewing())
  football.producing()
})();
```
