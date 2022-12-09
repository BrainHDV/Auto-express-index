"use strict";

function userAddDrink() {
  let drinkName = prompt("Введите иформацию о напитке, чтобы добавить его: ");
  let drinkAlco = confirm(`"${drinkName}": алкогольный напиток?`);
  let drinkRecipe = prompt(`Напишите рецепт напитка: "${drinkName}"`);
  let drinkInfo = { drinkAlco, drinkRecipe };

  drinkStorage.addValue(drinkName, drinkInfo);
}

function getDrinkInfo() {
  let drinkName = prompt("Введите напиток: ");
  let drinkInfo = drinkStorage.getValue(drinkName);

  if (drinkInfo === undefined) {
    alert("Такого напитка в баре нет! До свидания!");
  } else {
    let alcohol;

    if (drinkInfo.drinkAlco) {
      alcohol = "да";
    } else {
      alcohol = "нет";
    }
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

function deleteDrinkInfo() {
  let drinkName = prompt("Какой напиток Вы хотели-бы удалить?");

  if (drinkStorage.deleteValue(drinkName)) {
    alert(`Напиток "${drinkName}" успешно удален!`);
  } else {
    alert("Такого напитка нет!");
  }
}

function getDrinks() {
  let availableDrinks = drinkStorage.getKeys();

  if (availableDrinks.length === 0) {
    alert("Товара нет! Ждем привоз.");
  } else {
    alert(availableDrinks);
  }
}
