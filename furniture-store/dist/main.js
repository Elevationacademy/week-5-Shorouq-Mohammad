let money = 1000;
let price1 = 0;
let price2 = 0;
let i = true;
const repeat = function () {
  $.get("priceCheck/chair", function (data) {
    if (i) {
      price1 = parseInt(data, 10);
      i = false;
    } else {
      i = true;
      price2 = parseInt(data, 10);
    }
  });
  if ((price2 < price1 && i) || (price1 < price2 && !i)) {
      console.log("bought chair for less");
    buy("chair");
  }
};

setInterval(repeat, 3000);

const search = function () {
  const name = $("#input").val();
  $.get(`priceCheck/${name}`, function (data) {
    $("#search").append(`<p>${data}</p>`);
  });
};

const buy = function (chair) {
  let name;
  if (chair) {
    name = chair;
  } else {
    name = $("#buyInput").val();
  }
  $.get(`priceCheck/${name}`, function (data) {
    if (parseInt(data, 10) < money) {
      money -= parseInt(data, 10);
      $("#money").text(`Money: ${money}$`);
      $.get(`buy/${name}`, function (data) {
        $("#buy").append(
          `<p>Congratulations, you've just bought ${data.name} for ${data.price}. There are ${data.inventory} left now in the store</p>`
        );
      });
    } else if (parseInt(data, 10) > money) {
      $("#buy").append("<p>you don't have enough money</p>");
    } else if (data.price == null) {
      $("#buy").append("<p>There is no such item</p>");
    }
  });
};
