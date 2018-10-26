// Дефолтные настройки для поиска.
var page = 1;
var perpage = 20;
var keyword = 1;

// Элементы управления
var nextPage = document.getElementById("next");
var prevPage = document.getElementById("prev");

var searchResults = document.querySelector("#search-res");
var savedPicContainer = document.querySelector("#saved-pic");

// Массив сохраненных картинок
var savedImg = [];

_fetch(keyword, perpage, page);

function _fetch(keyword, perpage, page) {
  parseInt(perpage);
  fetch(
    `https://pixabay.com/api/?key=10255083-c21f16ae0fdc1c18b6d777236&image_type=photo&q=${keyword}&per_page=${perpage}&page=${page}`
  )
    .then(res => res.json())
    .then(function(data) {
      console.log(data.hits);
      let html = "";
      if (page > 1) {
        prev.removeAttribute("disabled");
      } else if (page == 1) {
        prev.setAttribute("disabled", "");
      }
      if (data.hits.length !== perpage) {
        next.setAttribute("disabled", "");
      } else {
        next.removeAttribute("disabled");
      }
      data.hits.forEach(e => {
        html += `
        <div class="card">
        <img src="${e.webformatURL}">
        <span class="save-img"></span>
      </div>
      `;
      });
      document.querySelector("#search-res").innerHTML = html;
    });
  if (localStorage.getItem("savedImg")) {
    showFromLocal();
  }
}

document.forms[0].addEventListener("submit", function(e) {
  e.preventDefault();
  var keyword = document.forms[0].keyword.value;
  page = 1;
  prevPage.setAttribute("disable", "disable");
  counter.innerHTML = page;
  _fetch(keyword, perpage, page);
});

document.forms[1].addEventListener("click", function(e) {
  var perpage = document.forms[1].perPage.value;
  var keyword = document.forms[0].keyword.value;
  if (perpage == 20) {
    _fetch(keyword, perpage, page);
  } else if (perpage == 40) {
    _fetch(keyword, perpage, page);
  } else if (perpage == 60) {
    _fetch(keyword, perpage, page);
  }
});

nextPage.addEventListener("click", function(e) {
  var perPageValue = document.forms[1].perPage.value;
  var keyword = document.forms[0].keyword.value;
  page++;
  if (page > 1) {
    prevPage.removeAttribute("disable");
  }
  counter.innerHTML = page;
  _fetch(keyword, perPageValue, page);
});

prevPage.addEventListener("click", function(e) {
  var perPageValue = document.forms[1].perPage.value;
  var keyword = document.forms[0].keyword.value;
  var counter = document.getElementById("counter");
  page--;
  if (page == 1) {
    prevPage.setAttribute("disable", "disable");
  } else if (page < 1) {
    page = 1;
  }
  counter.innerHTML = page;
  _fetch(keyword, perPageValue, page);
});

// local

searchResults.addEventListener("click", function(e) {
  try {
    var buffer = e.target.previousElementSibling.currentSrc;
    // Чтобы не добавить элемент, которого нет, делаем проверку
    if (buffer == null) {
    } else {
      // Есть ли уже ссылка в массиве?
      // Есть есть, добавлять не нужно.
      if (savedImg.indexOf(buffer) >= 0) {
      } else {
        // Добавление в массив
        savedImg.push(buffer);

        // if (localStorage.getItem("savedImg")) {
        //   savedImg.push(buffer);
        // } else {
        //   var savedImg = [];
        //   savedImg.push(buffer);
        // }
      }
    }
  } catch (error) {}

  // Сохранение в локал
  localStorage.setItem("savedImg", JSON.stringify(savedImg));
  showFromLocal();
});

// Удаление из сохраненных

savedPicContainer.addEventListener("click", function(e) {
  try {
    var buffer = e.target.previousElementSibling.currentSrc;
    var buffer = e.target.previousElementSibling.currentSrc;
    console.log(buffer);
    var savedImgFromLocal = JSON.parse(localStorage.getItem("savedImg"));
    console.log(savedImgFromLocal);

    savedImgFromLocal.splice(savedImgFromLocal.indexOf(buffer), 1);
    console.log(savedImgFromLocal);

    localStorage.setItem("savedImg", JSON.stringify(savedImgFromLocal));
    showFromLocal();
  } catch (error) {}
});

// Вывод из локала в хтмл
function showFromLocal() {
  if (localStorage.getItem("savedImg")) {
    var savedImgFromLocal = JSON.parse(localStorage.getItem("savedImg"));
    var html = "";
    savedImgFromLocal.forEach(e => {
      html += `
    <div class="card">
    <a href="${e}" target="_blank"> <img src="${e}"></a><span class="del-from-saved"></span></a>
  </div>
  `;
    });
    document.querySelector("#saved-pic").innerHTML = html;
  }
}

// Переход по ссылке

function HREF() {}

// Замена пробелов в ссылке на слэш

// function removeSpace(element) {
//   return element.replace(/ /g, "/");
// }

// var str = "my string with space";

// var strSp = removeSpace(str);

// console.log(strSp);
