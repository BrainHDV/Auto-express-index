export class LocStorageClass {
  constructor(localStorageKey) {
    this.localStorageKey = localStorageKey;
    this.storage = JSON.parse(localStorage.getItem(this.localStorageKey)) || {};
  }

  storage = {};

  addValue(key, value) {
    this.storage[key] = value;
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.storage));
    console.log(this.storage);
  }

  getValue(key) {
    if (key in this.storage) {
      return this.storage[key];
    }
  }

  deleteValue(key) {
    if (key in this.storage) {
      delete this.storage[key];
      localStorage.setItem(this.localStorageKey, JSON.stringify(this.storage));
      return true;
    } else {
      return false;
    }
  }

  getKeys() {
    return Object.keys(this.storage);
  }
}

export const drinkStorage = new LocStorageClass("drinks");
export const dishesStorage = new LocStorageClass("dishes");
