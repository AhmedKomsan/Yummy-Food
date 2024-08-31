$(".fa-arrow-left").click(() => {
  for (let i = 0; i < 5; i++) {
    $(".links li")
      .eq(i)
      .animate({ top: 0 }, (i + 5) * 100);
  }
});

$(".fa-arrow-right").click(() => {
  for (let i = 0; i < 5; i++) {
    $(".links li")
      .eq(i)
      .animate({ top: 300 }, (5 - i) * 100);
  }
});

$(document).ready(() => {
  searchByName("").then(() => {
    $(".loading-screen").fadeOut(500);
  });
});

let rowData = document.getElementById("rowData");
let searchPage = document.getElementById("searchPage");
let contact = document.getElementById("contact");

function displayMeals(arr) {
  let cartona = "";
  for (let i = 0; i < arr.length; i++) {
    cartona += `
      <div class="col-md-3">
          <div onclick="getMealDetails('${arr[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2">
            <img
              src="${arr[i].strMealThumb}"
              alt=""
            />
            <div
              class="meal-layer p-2 position-absolute d-flex align-items-center text-black"
            >
              <h3>${arr[i].strMeal}</h3>
            </div>
          </div>
        </div>
    `;
  }
  rowData.innerHTML = cartona;
}

searchByName("");

async function getCategories() {
  rowData.innerHTML = "";
  $(".loading-screen").fadeIn(300);
  searchPage.innerHTML = "";

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );
  response = await response.json();
  displayCategories(response.categories);
  $(".loading-screen").fadeOut(300);
}

function displayCategories(arr) {
  cartona = "";
  for (let i = 0; i < arr.length; i++) {
    cartona += `
      <div class="col-md-3">
          <div onclick="getCategoryMeals('${
            arr[i].strCategory
          }')" class="meal position-relative overflow-hidden cursor-pointer rounded-2">
            <img
              src="${arr[i].strCategoryThumb}"
              alt=""
            />
            <div
              class="meal-layer p-4 position-absolute text-center text-black"
            >
              <h3>${arr[i].strCategory}</h3>
              <p>${arr[i].strCategoryDescription
                .split(" ")
                .slice(0, 20)
                .join(" ")}</p>
            </div>
          </div>
        </div>
    `;
  }
  rowData.innerHTML = cartona;
}

async function getArea() {
  rowData.innerHTML = "";
  $(".loading-screen").fadeIn(300);
  searchPage.innerHTML = "";

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  );
  response = await response.json();
  displayArea(response.meals);
  $(".loading-screen").fadeOut(300);
}

function displayArea(arr) {
  cartona = "";
  for (let i = 0; i < arr.length; i++) {
    cartona += `
      <div id="area"  class="col-md-3 ">
          <div onclick="getAreaMeals('${arr[i].strArea}')" class=" text-white text-center cursor-pointer rounded-2">
            <i class="fa-solid fa-house-laptop fa-4x"></i>
              <h3>${arr[i].strArea}</h3>
          </div>
        </div>
    `;
  }
  rowData.innerHTML = cartona;
}

async function getIngredients() {
  rowData.innerHTML = "";
  $(".loading-screen").fadeIn(300);
  searchPage.innerHTML = "";

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
  );
  response = await response.json();
  displayIngredients(response.meals.slice(0, 20));
  $(".loading-screen").fadeOut(300);
}

function displayIngredients(arr) {
  cartona = "";
  for (let i = 0; i < arr.length; i++) {
    cartona += `
      <div id="ingredients" class="col-md-3">
          <div onclick="getIngredientsMeal('${
            arr[i].strIngredient
          }')" class=" text-white text-center cursor-pointer rounded-2">
            <i class="fa-solid fa-drumstick-bite fa-4x"></i>
              <h3>${arr[i].strIngredient}</h3>
              <p>${arr[i].strDescription.split(" ").slice(0, 15).join(" ")}</p>
          </div>
        </div>
    `;
  }
  rowData.innerHTML = cartona;
}

async function getCategoryMeals(category) {
  rowData.innerHTML = "";
  $(".loading-screen").fadeIn(300);
  searchPage.innerHTML = "";

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
  );
  response = await response.json();
  displayMeals(response.meals.slice(0, 20));
  $(".loading-screen").fadeOut(300);
}

async function getAreaMeals(area) {
  rowData.innerHTML = "";
  $(".loading-screen").fadeIn(300);
  searchPage.innerHTML = "";

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
  );
  response = await response.json();
  displayMeals(response.meals);
  $(".loading-screen").fadeOut(300);
}
async function getIngredientsMeal(ingredients) {
  rowData.innerHTML = "";
  $(".loading-screen").fadeIn(300);
  searchPage.innerHTML = "";
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`
  );
  response = await response.json();
  displayMeals(response.meals);
  $(".loading-screen").fadeOut(300);
}

async function getMealDetails(mealId) {
  rowData.innerHTML = "";
  $(".loading-screen").fadeIn(300);
  searchPage.innerHTML = "";

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
  );
  response = await response.json();

  displayMealDetails(response.meals[0]);
  $(".loading-screen").fadeOut(300);
}

function displayMealDetails(meal) {
  let ingredients = "";
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients += `<li class="alert alert-info m-2 p-1">${
        meal[`strMeasure${i}`]
      } ${meal[`strIngredient${i}`]}</li>`;
    }
  }

  let tags = meal.strTags?.split(",");
  if (!tags) tags = [];
  let tagsStr = "";
  for (let i = 0; i < tags.length; i++) {
    tagsStr += `<li class="alert alert-danger m-2 p-1">${tags[i]}</li>`;
  }

  let cartona = `<div id="img" class="col-md-4">
          <img
            class="w-100 rounded-2"
            src="${meal.strMealThumb}"
            alt=""
          />
          <h3>${meal.strMeal}</h3>
        </div>
        <div id="instructions" class="col-md-8">
          <h2>Instructions</h2>
          <p>
            ${meal.strInstructions}
          </p>
          <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
          <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
          <h3>Recipes :</h3>
          <ul class="list-unstyled d-flex flex-wrap">
            <li class="alert alert-info m-2 p-1">5 tablespoons Soy Sauce</li>
            <li class="alert alert-info m-2 p-1">1 Lemon</li>
            
          </ul>

          <h3>Tags :</h3>
            <ul class="list-unstyled d-flex flex-wrap">
            ${tagsStr}
          </ul>
          <a target= "_blank" href="${meal.strSource}" class="btn btn-success py-2">Source</a>
          <a target= "_blank" href="${meal.strYoutube}" class="btn btn-danger py-2">Youtube</a>
        </div>`;

  rowData.innerHTML = cartona;
}

function showSearch() {
  $(".loading-screen").fadeIn(300);

  searchPage.innerHTML = `<div class="col-md-6">
          <input
          onkeyup="searchByName(this.value)"
            class="form-control bg-transparent text-white"
            placeholder="Search By Name"
            type="text"
          />
        </div>
        <div class="col-md-6">
          <input
          onkeyup="searchByFirstLetter(this.value)"
          maxlength="1"
            class="form-control bg-transparent text-white"
            placeholder="Search By First Letter"
            type="text"
          />
        </div>`;
  rowData.innerHTML = "";
  $(".loading-screen").fadeOut(300);
}

async function searchByName(term) {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`
  );
  response = await response.json();
  response.meals ? displayMeals(response.meals) : displayMeals([]);
}
async function searchByFirstLetter(term) {
  term == "" ? (term = "a") : "";
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`
  );
  response = await response.json();
  response.meals ? displayMeals(response.meals) : displayMeals([]);
}

function showContact() {
  $(".loading-screen").fadeIn(300);

  rowData.innerHTML = `<div
      class="contact d-flex align-items-center justify-content-center"
    >
      <div class=" w-75 text-center">
        <h2 class="text-white">Contact Us...</h2>
        <div class="row my-5 g-3">
          <div class="col-md-6">
            <input
            id="nameInput"
            onkeyup="inputsValidation()"
              class="form-control "
              type="text"
              placeholder="Enter Your Name"
            />
            <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Special characters and numbers not allowed
            </div>
          </div>
          <div class="col-md-6">
            <input
            id="emailInput"
            onkeyup="inputsValidation()"
              class="form-control "
              type="email"
              placeholder="Enter Email"
            />
            <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid *exemple@yyy.zzz
            </div>
          </div>
          <div class="col-md-6">
            <input
            id="phoneInput"
            onkeyup="inputsValidation()"
              class="form-control "
              type="number"
              placeholder="Enter Phone"
            />
            <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number
                </div>
          </div>
          <div class="col-md-6">
            <input
            id="ageInput"
            onkeyup="inputsValidation()"
              class="form-control  text-muted"
              type="date"
              placeholder="Enter Age"
            />
          </div>
          <div class="col-md-6">
            <input
            id="passwordInput"
            onkeyup="inputsValidation()"
              class="form-control "
              type="password"
              placeholder="Enter Password"
            />
            <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
          </div>
          <div class="col-md-6">
            <input
            id="repasswordInput"
            onkeyup="inputsValidation()"
              class="form-control "
              type="password"
              placeholder="Enter Repassword"
            />
            <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid repassword 
                </div>
          </div>
        </div>
        <button id="submitBtn" disabled class="btn btn-outline-danger">Submit</button>
      </div>
    </div>`;
  $(".loading-screen").fadeOut(300);

  document.getElementById("nameInput").addEventListener("focus", () => {
    nameInputTouched = true;
  });

  document.getElementById("emailInput").addEventListener("focus", () => {
    emailInputTouched = true;
  });

  document.getElementById("phoneInput").addEventListener("focus", () => {
    phoneInputTouched = true;
  });

  document.getElementById("passwordInput").addEventListener("focus", () => {
    passwordInputTouched = true;
  });

  document.getElementById("repasswordInput").addEventListener("focus", () => {
    repasswordInputTouched = true;
  });
}

let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;

function inputsValidation() {
  if (nameInputTouched) {
    if (nameValidation()) {
      document
        .getElementById("nameAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("nameAlert")
        .classList.replace("d-none", "d-block");
    }
  }
  if (emailInputTouched) {
    if (emailValidation()) {
      document
        .getElementById("emailAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("emailAlert")
        .classList.replace("d-none", "d-block");
    }
  }

  if (phoneInputTouched) {
    if (phoneValidation()) {
      document
        .getElementById("phoneAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("phoneAlert")
        .classList.replace("d-none", "d-block");
    }
  }

  if (passwordInputTouched) {
    if (passwordValidation()) {
      document
        .getElementById("passwordAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("passwordAlert")
        .classList.replace("d-none", "d-block");
    }
  }
  if (repasswordInputTouched) {
    if (repasswordValidation()) {
      document
        .getElementById("repasswordAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("repasswordAlert")
        .classList.replace("d-none", "d-block");
    }
  }
  if (
    nameValidation() &&
    emailValidation() &&
    phoneValidation() &&
    passwordValidation() &&
    repasswordValidation()
  ) {
    document.getElementById("submitBtn").disabled = false;
  } else {
    document.getElementById("submitBtn").disabled = true;
  }
}

function nameValidation() {
  return /^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value);
}
function emailValidation() {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    document.getElementById("emailInput").value
  );
}
function phoneValidation() {
  return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(
    document.getElementById("phoneInput").value
  );
}
function passwordValidation() {
  return /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$%&? "])[a-zA-Z0-9!#$%&?]{8,20}$/.test(
    document.getElementById("passwordInput").value
  );
}
function repasswordValidation() {
  return (
    document.getElementById("repasswordInput").value ==
    document.getElementById("passwordInput").value
  );
}
