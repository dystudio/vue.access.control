import { clone } from 'lodash';

export default class PipeLine {
  /**
   * is break
   * @type {boolean}
   */
  protected break = false;

  /**
   *
   */
  private buildMethod: Function;

  public constructor(public funs: Function[]) {
    this.buildMethod = this.pipeFn();
  }

  private pipeFn() {
    let funcs: Function[] = clone(this.funs);
    return function(scope: any) {
      return function() {
        (function next() {
          if (funcs.length > 0) {
            (funcs.shift() as Function).apply(scope || {}, [next].concat(Array.prototype.slice.call(arguments, 0)));
          }
        })();
      };
    };
  }

  public pipe(to: any, from: any): void {
    this.buildMethod(to, from);
  }
}
