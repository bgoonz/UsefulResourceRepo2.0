(function($) {
  updateCoins();
  setInterval(updateCoins, 5000);
})(jQuery);

function updateCoins() {
  ['btc', 'ltc', 'nmc', 'ppc'].forEach(function(coin) {
    updateCoin(coin);
  });
}

function updateCoin(coin) {
  var baseUrl = 'https://btc-e.com/api/3/ticker/';

  $.ajax({
    type: 'GET',
    url: baseUrl + coin + '_usd',
    async: false,
    contentType: "application/json",
    dataType: 'jsonp',
    success: function(data) {
      $('#' + coin + '-avg').fadeOut(function() {
        $(this).text(coinFromDataAsUSD(coin, data));
        $(this).fadeIn();
      });
      if (coin === 'btc') {
        document.title = coinFromDataAsUSD(coin, data) + ' | Cryptotracker';
      }
    }
  });
}

function coinFromDataAsUSD(coin, data) {
  return '$' + data[coin + '_usd'].last.toFixed(2);
}
