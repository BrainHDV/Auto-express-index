export class LocStorageClass {
  constructor(localStorageKey) {
    this.localStorageKey = localStorageKey;
  }

  storage = [];

  addValue(key, value) {
    const item = {
      key,
      value,
    };
    this.storage.push(item);
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.storage));
    console.log(this.storage);
  }

  getValue(key) {
    this.storage = JSON.parse(localStorage.getItem(this.localStorageKey)) || [];

    let result;
    this.storage.forEach((item) => {
      if (key === item.key) {
        result = item.value;
      }
    });
    return result;
  }

  deleteValue(key) {
    this.storage = JSON.parse(localStorage.getItem(this.localStorageKey)) || [];

    let deleted;
    this.storage.forEach((item, index) => {
      if (key === item.key) {
        this.storage.splice(index, 1);
        localStorage.setItem(
          this.localStorageKey,
          JSON.stringify(this.storage)
        );
        deleted = true;
      } else {
        deleted = false;
      }
    });
    return deleted;
  }

  getKeys() {
    this.storage = JSON.parse(localStorage.getItem(this.localStorageKey)) || [];

    let keys = [];
    this.storage.forEach((item) => keys.push(item.key));

    return keys;
  }
}

export const drinkStorage = new LocStorageClass("drinks");
export const dishesStorage = new LocStorageClass("dishes");
