function selectMetric(e) {
  e.preventDefault();
  var metric = $(e.currentTarget).attr('data-metric');
  var metricSelector = '[data-metric="' + metric + '"]';

  // set selected link
  $('.side .selected').removeClass('selected');
  $('.side .links a' + metricSelector).addClass('selected');

  // show proper stats
  $('.side .stats ul').hide();
  $('.side .stats ul' + metricSelector).show();

  // activate proper graph
  var $wrapper = $('.main article' + metricSelector).parent();
  var isActive = $wrapper.hasClass('active');
  if (!isActive) {
    $wrapper
      .addClass('active')
      .siblings().removeClass('active');
  }
}

function checkKey(e) {
  if (e.keyCode === 13) {
    // hit enter
    selectMetric(e);
  }
}

$('.side .links a').on('click', selectMetric);
$('.main article').on({
  'click': selectMetric,
  'keyup': checkKey
});
