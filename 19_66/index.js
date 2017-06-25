window.onload = function() {
  eventHandler();
  carousel(2000);
}

var countryObj = [
  {
    'country': 'China',
    'region': ['南京', '北京', '苏州', '无锡', '常州']
  },
  {
    'country': 'American',
    'region': ['a', 'b', 'c', 'd']
  }
];

/**
 *
 */
function eventHandler () {
  $('#tabs').on('click', '.tab-itm', function () {
    $('#tabs').find('.tab-itm').removeClass('active');
    var $this = $(this);
    $this.addClass('active');
    $('.tab-itm__content').hide();
    $('#tab-itm-' + $this.attr('data-index')).show();
  });
  $('#tabs').find('.tab-itm:eq(0)').trigger('click');

  // 下拉选项
  var countries = [];
  for (var i = 0; i < countryObj.length; i++) {
    var str = '<li>' + countryObj[i].country + '</li>';
    countries.push(str);
  }
  $('#country').append(countries.join(''));

  $('.form-itm').off('click', 'input[readonly]').on('click', 'input[readonly]', function () {
    var $this = $(this);
    $this.closest('.form-itm').find('.dropdown-wrapper').show();
  });

  $(document).off('click').on('click', function (e) {
    var target = $(e.target);
    if (target.closest('.form-itm').length === 0) {
      $('.dropdown-wrapper').hide();
    }
  });
}

/**
 *
 */
function carousel (timeout, type) {
  var className = type || 'fade';
  var time = timeout || 1000;
  var aBannerPic = document.getElementsByClassName('banner-2-pic')[0].getElementsByTagName('img');
  var $aBannerPic = $(aBannerPic);
  $aBannerPic.addClass(className);

  setInterval(func, time);

  function func() {
    for (var i = 0; i < aBannerPic.length; i++) {
      var $this = $(aBannerPic[i]);
      if ($this.hasClass('active')) {
        if (i === aBannerPic.length - 1) {
          $(aBannerPic[0]).addClass('active');
        } else {
          $(aBannerPic[i + 1]).addClass('active');
        }
        $this.removeClass('active');
          break;
      }
    }
  }
}

