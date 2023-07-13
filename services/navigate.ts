/**
 * TODO: Deprecate this class
 * -- feels like it's completely unnecessary
 *  Try this when you have time
 * ```
 * import Router from 'next/router';
 *
 * const someFunction = () => {
 *  Router.push('/somepage');
 * };
 * ```
 * */
class Navigate {
  private _navigate: any;

  initNavigate = (instance: any) => {
    this._navigate = instance;
  };

  get navigate() {
    return this._navigate;
  }
}

export default new Navigate();
