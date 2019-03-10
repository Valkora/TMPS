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

(function main() {
  const general = new GeneralBall();
  const withStripes = new StripeDecorator(general);
  const sportEdition = new SportDecorator(withStripes);
  console.log(`Total: ${sportEdition.cost()}`);
})();