function changeButtonColor(button) {
    var articul = $(button).attr('data-art')
    if (basket[articul] == undefined){
        button.style.background =  'linear-gradient(to right, #800080, #ffc0cb)';
        button.innerHTML = '<img src="img/basket.png"></img>';
    }
    else{
        button.style.background = 'grey';
        button.innerHTML = '<img src="img/checkmark.png"></img>';
    }
  }

function changeButtonColor1(button) {
    var articul = $(button).attr('data-art')
    if (basket[articul] == undefined){
        button.style.background =  'linear-gradient(to right, #800080, #ffc0cb)';
        button.innerHTML = 'Корзина';
    }
    else{
        button.style.background = 'grey';
        button.innerHTML = 'Добавлено';
    }
  }

$('document').ready(function(){
    checkGoods();
    loadGoods();
});

//Список товаров
var cart = {
    "11111": {
        "name": "Детский паровозик",
        "cost": 1499,
        "image": "img/train.jpg",
        "link": "product_page.html"
    },
    "22222": {
        "name": "Cортер забавные фигурки",
        "cost": 2999,
        "image": "img/sorter.jpg",
        "link": "product_page.html"
    },
    "33333": {
        "name": "Кран из дерева",
        "cost": 799,
        "image": "img/crane.jpg",
        "link": "product_page.html"
    },
    "44444": {
        "name": "Квадроцикл Wincars",
        "cost": 999,
        "image": "img/wincars.jpg",
        "link": "product_page.html"
    },
    "55555": {
        "name": "Мстители Война бесконечности ...",
        "cost": 1999,
        "image": "img/lego.jpg",
        "link": "product_page.html"
    },
    "66666": {
        "name": "Настольная игра Шакал: Остров сокровищ",
        "cost": 2799,
        "image": "img/shakal.jpg",
        "link": "product_page.html"
    }
}

var special = {
    "66666": {
        "name": "Настольная игра Шакал: Остров сокровищ",
        "cost": 2799,
        "image": "img/shakal.jpg",
        "link": "product_page.html"
    }
}

var basket = {};//Корзина

//Загрузка товаров на страницу
function loadGoods(){
    var out = '';

    var key = '66666';

    for (let i = 0; i < 6; i++){
        out += '<li>';
        out += '<a href="'+special[key].link+'">';
        out += '<img src="'+special[key].image+'" alt="Игрушки" width="200" height="200">';
        out += '</a>';
        out += '<div id="Price">';
        out += '<p>'+special[key]['name']+'</p>';
        out += '<p><b>'+toCurrency(special[key]['cost'])+'</b></p>'
        out += '<button data-art="'+key+'" class="buy" onclick="changeButtonColor1(this)">Корзина</button>';
        out += '</div>';
        out += '</li>';
    }

    $('.species').html(out);
    out = '';

    for (var key in cart){
        out += '<li class="pic-container">';
        out += '<a href="'+cart[key].link+'">';
        out += '<img src="'+cart[key].image+'" alt="Игрушки" width="200" height="200">';
        out += '</a>';
        out += '<div class="Inform">';
        out += '<p>'+cart[key]['name']+'</p>';
        out += '<div class="toy">';
        out += '<p><b>'+toCurrency(cart[key]['cost'])+'</b></p>'
        out += '<button data-art="'+key+'" class="buy" onclick="changeButtonColor(this)"><img src="img/basket.png"></button>';
        out += '</div>';
        out += '</div>';
        out += '</li>';
    }
    $('#product_list').html(out);
    $('button.buy').click();
    $('button.buy').on('click', addToCart);
}

function toCurrency(num) {
    const format = new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency: "RUB",
      minimumFractionDigits: 0,
    }).format(num);
    return format;
  }

//Добавление в корзину с помощью localStorage
function addToCart(){
    var articul = $(this).attr('data-art')

    if (articul == undefined)
        return;

    if (basket[articul] == undefined){
        basket[articul] = 1;
    }
    else{
        delete basket[articul];
    }

    localStorage.setItem('basket', JSON.stringify(basket));
    loadGoods();
}

function checkGoods(){
    if (localStorage.getItem('basket') != null)
        basket = JSON.parse(localStorage.getItem('basket'))
  }