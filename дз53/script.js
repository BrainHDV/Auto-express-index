import { drinkStorage, dishesStorage } from "./LocStorage.js";

// Drinks
const addInfoBtn = document.querySelector(".drink__button--add-info");
const getInfoBtn = document.querySelector(".drink__button--get-info");
const deleteInfoBtn = document.querySelector(".drink__button--del-info");
const allInfoBtn = document.querySelector(".drink__button--all-info");

addInfoBtn.addEventListener("click", userAddDrink);
getInfoBtn.addEventListener("click", getDrinkInfo);
deleteInfoBtn.addEventListener("click", deleteDrinkInfo);
allInfoBtn.addEventListener("click", getDrinks);

// Dishes
const addDishInfoBtn = document.querySelector(".dishes__button--add-info");
const getDishInfoBtn = document.querySelector(".dishes__button--get-info");
const deleteDishInfoBtn = document.querySelector(".dishes__button--del-info");
const allDishInfoBtn = document.querySelector(".dishes__button--all-info");

addDishInfoBtn.addEventListener("click", userAddDish);
getDishInfoBtn.addEventListener("click", getDishInfo);
deleteDishInfoBtn.addEventListener("click", deleteDishInfo);
allDishInfoBtn.addEventListener("click", getDishes);

// Functions

export function userAddDish() {
  const dishName = prompt("Введите иформацию о блюде, чтобы добавить его: ");
  const dishCuisine = confirm(`"${dishName}" относится к беларусской кухне?`);
  const dishRecipe = prompt(`Напишите рецепт блюда: "${dishName}"`);
  const dishInfo = { dishCuisine, dishRecipe };

  dishesStorage.addValue(dishName, dishInfo);
}

export function getDishInfo() {
  const dishName = prompt("Введите блюдо: ");
  const dishInfo = dishesStorage.getValue(dishName);

  if (!dishInfo) {
    alert("Такого блюда на кухне нет! До свидания!");
  } else {
    let belarusianCuisine;
    dishInfo.dishCuisine
      ? (belarusianCuisine = "да")
      : (belarusianCuisine = "нет");

    alert(
      `Напиток: "${dishName}"` +
        "\n" +
        "Белорусская кухня: " +
        belarusianCuisine +
        "\n" +
        "Рецепт приготовления: " +
        "\n" +
        dishInfo.dishRecipe
    );
  }
}

export function deleteDishInfo() {
  const dishName = prompt("Какое блюдо Вы хотели-бы удалить?");

  dishesStorage.deleteValue(dishName)
    ? alert(`Блюдо "${dishName}" успешно удалено!`)
    : alert("Такого блюда нет!");
}

export function getDishes() {
  const availableDishes = dishesStorage.getKeys();

  availableDishes.length === 0
    ? alert("Блюда отсутствуют!")
    : alert(availableDishes);
}

export function userAddDrink() {
  const drinkName = prompt("Введите иформацию о напитке, чтобы добавить его: ");
  const drinkAlco = confirm(`"${drinkName}": алкогольный напиток?`);
  const drinkRecipe = prompt(`Напишите рецепт напитка: "${drinkName}"`);
  const drinkInfo = { drinkAlco, drinkRecipe };

  drinkStorage.addValue(drinkName, drinkInfo);
}

export function getDrinkInfo() {
  const drinkName = prompt("Введите напиток: ");
  const drinkInfo = drinkStorage.getValue(drinkName);

  if (!drinkInfo) {
    alert("Такого напитка в баре нет! До свидания!");
  } else {
    let alcohol;
    drinkInfo.drinkAlco ? (alcohol = "да") : (alcohol = "нет");

    alert(
      `Напиток: "${drinkName}"` +
        "\n" +
        "Алкогольный: " +
        alcohol +
        "\n" +
        "Рецепт приготовления: " +
        "\n" +
        drinkInfo.drinkRecipe
    );
  }
}

export function deleteDrinkInfo() {
  const drinkName = prompt("Какой напиток Вы хотели-бы удалить?");

  drinkStorage.deleteValue(drinkName)
    ? alert(`Напиток "${drinkName}" успешно удален!`)
    : alert("Такого напитка нет!");
}

export function getDrinks() {
  const availableDrinks = drinkStorage.getKeys();

  availableDrinks.length === 0
    ? alert("Товара нет! Ждем привоз.")
    : alert(availableDrinks);
}
