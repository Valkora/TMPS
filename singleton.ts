namespace SingletonPattern {
  export class Singleton {
    private static instance: Singleton;

    private constructor() {}

    static get Instance() {
      return this.instance ? this.instance : this.instance = new Singleton();
    }
  }
}