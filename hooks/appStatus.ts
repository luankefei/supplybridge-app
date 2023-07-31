/**
 * An app status class to store app API promises
 */
class AppStatus {
  private storedPromises: Record<string, Promise<any>>;

  constructor() {
    this.storedPromises = {
      // Test code: can be removed, but demonstrates how to use
      // appStatus.ready() will only resolve when all promises are resolved
      //
      // TEST: new Promise((resolve) => {
      //   setTimeout(() => {
      //     resolve("TEST");
      //   }, 15000);
      // }),
    };
  }
  /**
   * Add a promise to the store
   * @param name - name of the promise
   * @param promise - the promise to store
   * @param overwrite - whether to overwrite the promise if it already exists
   *
   * @returns none
   */
  addPromise(name: string, promise: Promise<any>, overwrite = false) {
    if (this.storedPromises.hasOwnProperty(name) && !overwrite) {
      return;
    }
    this.storedPromises[name] = promise;
  }
  // NO removing

  getAllStoredKeys() {
    return Object.keys(this.storedPromises);
  }

  /**
   * Check if all stored promises are resolved
   *
   * @returns a promise that resolves when all stored promises are resolved
   */
  async ready(keyName?: string): Promise<boolean> {
    if (keyName) {
      if (!this.storedPromises.hasOwnProperty(keyName)) {
        console.error(`Key ${keyName} does not exist. No waiting is done.`);
        return true;
      } else {
        await this.storedPromises[keyName];
        return true;
      }
    }
    await Promise.all(Object.values(this.storedPromises));
    return true;
  }
}

/**
 * A singleton instance of the AppStatus class
 * -- this should store the promises that are required to be resolved
 * before the app can be used
 */
export const appStatus = new AppStatus();
