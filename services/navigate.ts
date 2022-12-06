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