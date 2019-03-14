interface IBall {
  cost(): Number;
}

class GeneralBall implements IBall {
  cost(): Number {
    return 10;
  }
}

class BallExtraDecorator implements IBall {
  private _ball: IBall;

  constructor(ball: GeneralBall) {
    this._ball = ball;
  }

  cost(): Number {
    return this._ball.cost();
  }
}

class StripeDecorator extends BallExtraDecorator {
  private _price: Number = 3;

  cost(): Number {
    return super.cost().valueOf() + this._price.valueOf();
  }
}

class SportDecorator extends BallExtraDecorator {
  private _price: Number = 2.5;
  private _sportEdition: Number = 1.5;

  cost(): Number {
    return super.cost().valueOf() + this._price.valueOf() + this._sportEdition.valueOf();
  }
}

class RawMaterialPrepareSystem {
  prepare() {
    console.log('Prepare raw material for standart ball');
  }
}

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

class PackingDepartment {
  pack() {
    console.log('Pack a ball');
  }
}

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

(function main() {
  const general = new GeneralBall();
  const process = new BallProductionProcess();
  process.processStart('stripe', general);
})();
