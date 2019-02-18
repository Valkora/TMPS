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

Protoype pattern will appear soon

TBU....
