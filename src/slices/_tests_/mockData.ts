export const initialState = {
  bun: null,
  ingredients: []
};

export const ingredientMain = {
  "_id": "643d69a5c3f7b9001cfa0948",
  "name": "Кристаллы марсианских альфа-сахаридов",
  "type": "main",
  "proteins": 234,
  "fat": 432,
  "carbohydrates": 111,
  "calories": 189,
  "price": 762,
  "image": "https://code.s3.yandex.net/react/code/core.png",
  "image_mobile": "https://code.s3.yandex.net/react/code/core-mobile.png",
  "image_large": "https://code.s3.yandex.net/react/code/core-large.png",
  "__v": 0,
  "id": "test-ingredient-main-1",
  "guid": "test-ingredient-main-1",
};

export const ingredientSauce = {
  "_id": "643d69a5c3f7b9001cfa0943",
  "name": "Соус фирменный Space Sauce",
  "type": "sauce",
  "proteins": 50,
  "fat": 22,
  "carbohydrates": 11,
  "calories": 14,
  "price": 80,
  "image": "https://code.s3.yandex.net/react/code/sauce-04.png",
  "image_mobile": "https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
  "image_large": "https://code.s3.yandex.net/react/code/sauce-04-large.png",
  "__v": 0,
  "id": "test-ingredient-main-2",
  "guid": "test-ingredient-main-2",
};

export const ingredientBun = {
  "_id": "643d69a5c3f7b9001cfa093c",
  "name": "Краторная булка N-200i",
  "type": "bun",
  "proteins": 80,
  "fat": 24,
  "carbohydrates": 53,
  "calories": 420,
  "price": 1255,
  "image": "https://code.s3.yandex.net/react/code/bun-02.png",
  "image_mobile": "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
  "image_large": "https://code.s3.yandex.net/react/code/bun-02-large.png",
  "__v": 0,
  "id": "test-ingredient-bun-1",
  "guid": "test-ingredient-bun-1"
};


export const user = {
  email: 'test@gmail.com',
  name: 'test'
};

export const order = {
  "_id": "68496b9dc2f30c001cb2b972",
  "ingredients": [
    ingredientBun._id,
    ingredientMain._id,
    ingredientSauce._id,
    ingredientBun._id
  ],
  "status": "done",
  "name": "Space флюоресцентный фалленианский антарианский бургер",
  "createdAt": "2025-06-11T11:42:21.851Z",
  "updatedAt": "2025-06-11T11:42:22.676Z",
  "number": 80947
}

export const feed = {
  orders: [order],
  total: 1,
  totalToday: 1,
  success: true
}