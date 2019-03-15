interface ProductionStrategy {
  produce(): void;
  stop?(): void;
}

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

(function main() {
  const football = new BallProduction('Football', new Sewing())
  football.producing()
})();
