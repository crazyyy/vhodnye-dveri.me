// Avoid `console` errors in browsers that lack a console.
(function() {
  var method;
  var noop = function() {};
  var methods = ['assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error', 'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log', 'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd', 'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'];
  var length = methods.length;
  var console = (window.console = window.console || {});

  while (length--) {
    method = methods[length];

    // Only stub undefined methods.
    if (!console[method]) {
      console[method] = noop;
    }
  }
}());
if (typeof jQuery === 'undefined') {
  console.warn('jQuery hasn\'t loaded');
} else {
  console.log('jQuery has loaded');
}
// Place any jQuery/helper plugins in here.

$(function() {

  var $body = $('body');
  if ($("input").is("#from")) {
    var minprice = parseInt($("input[name=min-price]").val().replace(" ", ""));
    var maxprice = parseInt($("input[name=max-price]").val().replace(" ", ""));
    var minimum = parseInt($("input[name=minimum]").val().replace(" ", ""));
    var maximum = parseInt($("input[name=maximum]").val().replace(" ", ""));
  }
  $("#slider-range").slider({
    range: true,
    min: minimum,
    max: maximum,
    values: [minprice, maxprice],
    slide: function(event, ui) {
      $("input[name=min-price]").val(ui.values[0]);
      $("input[name=max-price]").val(ui.values[1]);
    }
  });

  $("input[name=min-price]").on("change", function() {
    $("#slider-range").slider("values", [parseInt($("input[name=min-price]").val()), parseInt($("input[name=max-price]").val())]);
  });
  $("input[name=max-price]").on("change", function() {
    $("#slider-range").slider("values", [parseInt($("input[name=min-price]").val()), parseInt($("input[name=max-price]").val())]);
  });

  if ($("span").is("#anchor4filter")) {
    $('html,body').animate({
      scrollTop: $("#products").offset().top
    }, 500);
    var $menu = $('#filter').find('.dropdown-menu');
    $menu.each(function() {
      $toggle = $(this).parent().find('.dropdown-toggle');
      $item = $(this).find('li > input:checked');
      text = [];
      $item.each(function() {
        text.push($(this).parent().find('label').html());
      })
      if (text.length) {
        text = text.length < 2 ? text.join(', ') : text.length + ' выбрано';
        var caret = $toggle.find('.caret');
        $toggle.html(text || '&nbsp;');
        if (caret.length)
          $toggle.append(' ') && caret.appendTo($toggle);
      }
    })
  }

  $('.navbar-toggle').click(function() {
    $(this).toggleClass('active');
  });

  var $scroll_top = $('.scroll-top');
  if ($scroll_top.length) {
    $scroll_top.click(function(e) {
      e.preventDefault();
      $('html, body').animate({
        scrollTop: '0px'
      }, 'slow');
    });
    $(window).scroll(function() {
      if ($(window).scrollTop() > $(window).height()) {
        $scroll_top.removeClass('hidden');
      } else {
        $scroll_top.addClass('hidden');
      }
    }).scroll();

    $('.modal').on('show.bs.modal', function() {
      if (window.innerWidth > document.documentElement.clientWidth) {
        var scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        $scroll_top.css('margin-right', scrollbarWidth + 'px');
      }
    }).on('hidden.bs.modal', function() {
      $scroll_top.css('margin-right', '0px');
    });
  }

  $('input[name="phone"], input[name="phone2"]').inputmask('+7(999)999-99-99');

  $body.on('submit', '.ajax-form', function(e) {
    e.preventDefault();

    var $form = $(this),
      $btn = $('.btn', $form);

    $btn.button('loading');
    $('.help-block', $form).text('');

    $.ajax({
      url: $form.attr('action'),
      type: $form.attr('method'),
      data: $form.serialize(),
      success: function(data) {
        var $newForm = $('#' + $form.attr('id'), data);
        if ($newForm.hasClass('success')) {
          $form.trigger('reset');
          if ($('.modal.in').length) {
            $('.modal.in').modal('hide').one('hidden.bs.modal', function() {
              $('#success').modal('show');
            });
          } else {
            $('#success').modal('show');
          }
        } else {
          $form.replaceWith($newForm);
          $('input[name="phone"]', $newForm).inputmask('+7(999)999-99-99')
        }
      },
      complete: function() {
        $btn.button('reset');
      }
    });
  });

  $('.print-btn').click(function() {
    window.print();
  });

  $('.fancybox').fancybox({
    openEffect: 'elastic',
    closeEffect: 'elastic'
  });

  $('.s-5 .more-btn').click(function() {
    var $btn = $(this);
    $btn.prev().children(':hidden').slideDown();
    $btn.remove();
  });

  $('.s-8 .name').click(function() {
    $(this).closest('li').addClass('active').one('blur', function() {
      $(this).removeClass('active');
    });
  });

  $('.product-slider').each(function() {
    var $slider = $(this),
      num = 4;
    if ($slider.closest('.main').length) {
      num = 3;
    }
    $slider.slick({
      slidesToShow: num,
      slidesToScroll: num,
      responsive: [{
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      }, {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      }, {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }]
    });
  });

  $('.discounts-slider').slick({
    dots: true,
    responsive: [{
      breakpoint: 460,
      settings: {
        arrows: false
      }
    }]
  });

  $('.photo-slider').each(function() {
    var $slider = $(this),
      num = 4;
    if ($slider.closest('.main').length) {
      num = 3;
    }
    $slider.on('init breakpoint', function() {
      $('.slick-cloned .blueimp', $slider).removeAttr('data-gallery');
    });
    $slider.slick({
      slidesToShow: num,
      slidesToScroll: num,
      responsive: [{
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      }, {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      }, {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }]
    });
  });

  $('#blueimp-gallery').on('open', function(e) {
    if (window.innerWidth > document.documentElement.clientWidth) {
      var scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      $('body').addClass('scroll-hidden').css('padding-right', scrollbarWidth + 'px');
      $scroll_top.css('margin-right', scrollbarWidth + 'px');
    }
    $('#blueimp-gallery').toggleClass('blueimp-gallery-controls', true);
  }).on('closed', function(e) {
    $('body').removeClass('scroll-hidden').css('padding-right', '0px');
    $scroll_top.css('margin-right', '0px');
  });

  $body.on('click', '.extra-nav .title', function() {
    $(this).next().stop().slideToggle();
  }).on('click', '.sidebar-nav span', function() {
    $(this).next().stop().slideToggle();
  });

  $('.sidebar-nav').each(function() {
    var $nav = $(this);
    if (!$('.active', $nav).length) {
      $('li:first', $nav).addClass('open');
    }
  });

  var $products = $('#products');
  if ($products.length) {
    var $products_items = $('.item', $products),
      $pagination = $('#pagination'),
      products_page = 1,
      price_min = null,
      price_max = null;

    $products_items.each(function() {
      var price = $(this).data('price');
      if (price_min === null || price < price_min) {
        price_min = price;
      }
      if (price_max === null || price > price_max) {
        price_max = price;
      }
    });

    if (price_min !== null && price_max !== null) {
      var $catalogFilter = $('.catalog-filter'),
        $priceSlider = $('.price-slider', $catalogFilter),
        $price_min = $('[name="price_min"]', $catalogFilter),
        $price_max = $('[name="price_max"]', $catalogFilter);

      $price_min.val(price_min.toLocaleString());
      $price_max.val(price_max.toLocaleString());

      $priceSlider.slider({
        range: true,
        min: price_min,
        max: price_max,
        values: [price_min, price_max],
        slide: function(event, ui) {
          price_min = ui.values[0];
          price_max = ui.values[1];
          $price_min.val(price_min.toLocaleString());
          $price_max.val(price_max.toLocaleString());
        }
      });

      $price_min.change(function() {
        var val = parseInt(this.value.replace(' ', ''), 10),
          max = $priceSlider.slider('values', 1);
        if (isNaN(val) || val < price_min) {
          val = price_min;
        }
        if (val > max) {
          val = max;
        }
        price_min = val;
        $price_min.val(val.toLocaleString());
        $priceSlider.slider('values', 0, val);
      });

      $price_max.change(function() {
        var val = parseInt(this.value.replace(' ', ''), 10),
          min = $priceSlider.slider('values', 0);
        if (isNaN(val) || val > price_max) {
          val = price_max;
        }
        if (val < min) {
          val = min;
        }
        price_max = val;
        $price_max.val(val.toLocaleString());
        $priceSlider.slider('values', 1, val);
      });

      $('.btn', $catalogFilter).click(function() {
        products_page = 1;
        updateItems(true);
      });

      $catalogFilter.show();
    }


    var $catalogControls = $('.catalog-controls'),
      products_num = $('.select-number', $catalogControls).val();

    $catalogControls.on('click', '.sort-btn', function() {
      var $obj = $(this),
        sort = $obj.data('sort'),
        dir = $obj.data('dir');
      $obj.addClass('active').siblings('.sort-btn').removeClass('active');
      $.when(sortItems(sort, dir)).then(function() {
        products_page = 1;
        updateItems();
      });
    }).on('change', '.select-number', function() {
      products_num = this.value;
      products_page = 1;
      updateItems();
      setCookie('number', products_num, {
        path: '/',
        expires: 2592000
      });
    }).on('click', '.display-btn', function() {
      var $obj = $(this),
        type = $obj.data('type');
      $obj.addClass('active').siblings().removeClass('active');
      $products.fadeOut('fast', function() {
        $products.removeClass('grid list').addClass(type).fadeIn('fast');
      });
      setCookie('display', type, {
        path: '/',
        expires: 2592000
      });
    });

    $pagination.on('click', 'span', function() {
      var $obj = $(this);
      $obj.addClass('active').siblings().removeClass('active');
      products_page = $obj.data('page');
      updateItems(true);
    });

    function updateItems(scroll) {

      $items = $products_items.filter(function() {
        var $item = $(this),
          price = $item.data('price');
        if (price < price_min) {
          return false;
        }
        if (price_max && price > price_max) {
          return false;
        }
        return true;
      });

      if (products_num == 'all') {
        products_num = $items.length;
      }
      products_num = parseInt(products_num, 10);

      var start = (products_page - 1) * products_num,
        end = start + products_num;

      var total = $items.length,
        pages_count = Math.ceil(total / products_num);

      var pagination = '';
      if (pages_count > 1) {

        if (products_page > 1) {
          pagination += '<li class="prev"><span data-page="' + (products_page - 1) + '">предыдущая</span></li>';
        }
        for (var i = 1; i <= pages_count; i++) {
          pagination += '<li' + (i == products_page ? ' class="active"' : '') + '><span data-page="' + i + '">' + i + '</span></li>';
        }
        if (products_page < pages_count) {
          pagination += '<li class="next"><span data-page="' + (products_page + 1) + '">следующая</span></li>';
        }
      }
      $pagination.html(pagination);

      if (scroll) {
        $products_items.parent().fadeOut('fast');
        $items.slice(start, end).parent().fadeIn('fast');
        $('html, body').animate({
          scrollTop: $catalogControls.offset().top
        }, 'fast');
      } else {
        $products_items.parent().hide();
        $items.slice(start, end).parent().show();
      }
    }

    function sortItems(sort, dir) {
      $products_items.parent().sort(function(a, b) {
        var an = parseFloat($(a).children().data(sort)),
          bn = parseFloat($(b).children().data(sort));

        if (an > bn) {
          if (dir == 'desc') {
            return -1;
          } else {
            return 1;
          }
        }
        if (an < bn) {
          if (dir == 'desc') {
            return 1;
          } else {
            return -1;
          }
        }
        return 0;
      }).detach().appendTo($products);
      $products_items = $('.item', $products);

      setCookie('sort', sort, {
        path: '/',
        expires: 2592000
      });
      setCookie('dir', dir, {
        path: '/',
        expires: 2592000
      });
    }

    var sort = $('.sort-btn.active', $catalogControls).data('sort'),
      sort_dir = $('.sort-btn.active', $catalogControls).data('dir');
    if (sort != 'price' || sort_dir == 'desc') {
      sortItems(sort, sort_dir);
    } else {
      updateItems();
    }
  }

  $('.rating span').click(function() {
    var $obj = $(this),
      $rating = $obj.parent(),
      rate = $obj.index() + 1,
      id = $rating.closest('.item').data('id');
    if ($rating.hasClass('enabled')) {
      $rating.removeClass('enabled');
      $.ajax({
        url: document.location.href,
        type: 'post',
        data: 'id=' + id + '&rating=' + rate,
        success: function(data) {
          var rating_old = $rating.data('value'),
            votes_old = $rating.data('num');
          var rating = (rating_old * votes_old + rate) / (votes_old + 1);
          rating = Math.ceil(rating / 0.5) * 0.5;
          $rating.attr('data-rating', rating);

          $rating.tooltip({
            trigger: 'manual',
            placement: $rating.parent().width() > 300 ? 'right' : 'bottom',
            title: 'Спасибо. Ваш голос учтен'
          }).tooltip('show').one('shown.bs.tooltip', function() {
            setTimeout(function() {
              $rating.tooltip('destroy');
            }, 2000);
          });
        }
      });
    }
  });

  $('.buy-btn').click(function(e) {
    e.preventDefault();
    var $obj = $(this).closest('.item'),
      $form = $('.buy-form', $obj),
      id = $obj.data('id'),
      title = $obj.data('title'),
      price = $obj.data('price'),
      num = $('[name=num]', $obj).length ? $('[name=num]', $obj).val() : 1,
      side = $('[name=side]:checked', $obj).length ? $('[name=side]:checked', $obj).val() : '',
      size = $('[name=size]', $obj).length ? $('[name=size]', $obj).val() : '';
    addToCart(id, title, price, num, side, size);
    $form.addClass('in-cart');
  });

  $('.buy-form .remove').click(function(e) {
    e.preventDefault();
    var id = $(this).closest('.item').data('id');
    removeFromCart(id);
    $(this).closest('.buy-form').removeClass('in-cart');
  });
  $('.cart .remove').click(function() {
    var $obj = $(this).closest('.item'),
      id = $obj.data('id');
    removeFromCart(id);
    $obj.remove();
    cartUpdate();
  });
  $('.num .minus').click(function() {
    var $num = $(this).next(),
      num = $num.val();
    num--;
    $num.val(num).change();
  });
  $('.num .plus').click(function() {
    var $num = $(this).prev(),
      num = $num.val();
    num++;
    $num.val(num).change();
  });
  $('.num input').change(function() {
    var $num = $(this),
      num = parseInt(this.value, 10);
    if (isNaN(num) || num < 1) {
      num = 1;
      $num.val(num);
    }
    if (num > 99) {
      num = 99;
      $num.val(num);
    }
    cartUpdate();
  }).click(function() {
    $(this).select();
  });

  function getCartData() {
    return JSON.parse(getCookie('cart') || null);
  }

  function setCartData(data) {
    setCookie('cart', JSON.stringify(data), {
      path: '/',
      expires: 2592000
    });
  }

  function clearCartData() {
    setCookie('cart', '', {
      path: '/',
      expires: -1
    });
  }

  function addToCart(id, title, price, num, side, size) {
    var cartData = getCartData() || {};
    if (typeof num === 'undefined') num = 1;
    if (typeof side === 'undefined') side = '';
    if (typeof size === 'undefined') size = '';
    if (cartData.hasOwnProperty(id)) {
      cartData[id][2] = num;
      cartData[id][3] = side;
      cartData[id][4] = size;
    } else {
      cartData[id] = [title, price, num, side, size];
    }
    setCartData(cartData);
    cartUpdate();
  }

  function removeFromCart(id) {
    var cartData = getCartData() || {};
    if (cartData.hasOwnProperty(id)) {
      delete cartData[id];
    }
    setCartData(cartData);
    cartUpdate();
  }

  function cartUpdate() {
    var cartData = getCartData(),
      count = 0,
      sum = 0,
      $headerCart = $('.header-cart');

    if (cartData !== null) {
      for (var i in cartData) {
        var num = parseFloat(cartData[i][2]);
        sum += parseFloat(cartData[i][1]) * num;
        count += num;
      }
    }
    if (count > 0) {
      $headerCart.removeClass('empty');
      $('.sum span', $headerCart).text(sum.toLocaleString() + ' руб.');
      $('.num span', $headerCart).text(count);
    } else {
      $headerCart.addClass('empty');
      $('.sum span', $headerCart).text('0 руб.');
      $('.num span', $headerCart).text('0');
    }
    var $cartPage = $('.main .cart');
    /*
          /* TODO WARNING

    if ($cartPage.length) {
      if (count == 0) {
        $('.item', $cartPage).remove();
      }
      var $cart_total = $('.cart-total');
      var total = 0;
      $('.item', $cartPage).each(function() {
        var $obj = $(this),
          price = $obj.data('price'),
          num = $('.num input', $obj).val(),
          sum = price * num;
        $('.sum b', $obj).text(sum.toLocaleString());
        total += sum;
      })
      $('b', $cart_total).text(total.toLocaleString());

      if (total > 0) {
        $cart_total.show();
      } else {
        $cart_total.hide();
      }

    }
    */
  }
  cartUpdate();
  if ($("button").is(".sort-btn")) {
    $(".sort-btn")[0].click();
  }

  if ($(window).width() <= 460) {
    $.ajax({
      url: '/katalog-metallicheskih-dverey',
      success: function(data) {
        $mobile_catalog_nav = $('.sidebar-nav', data);
        $('ul', $mobile_catalog_nav).hide();
        $('.title', $mobile_catalog_nav).click(function(e) {
          e.preventDefault();
          $mobile_catalog_nav.children('ul').slideToggle();
        });
        $('#primary-nav').after($mobile_catalog_nav);
      }
    });
  }
});


function setCookie(name, value, options) {
  options = options || {};
  var expires = options.expires;
  if (typeof expires == 'number' && expires) {
    var d = new Date();
    d.setTime(d.getTime() + expires * 1000);
    expires = options.expires = d;
  }
  if (expires && expires.toUTCString) {
    options.expires = expires.toUTCString();
  }
  value = encodeURIComponent(value);
  var updatedCookie = name + '=' + value;
  for (var propName in options) {
    updatedCookie += '; ' + propName;
    var propValue = options[propName];
    if (propValue !== true) {
      updatedCookie += '=' + propValue;
    }
  }
  document.cookie = updatedCookie;

}

function getCookie(name) {
  var matches = document.cookie.match(new RegExp(
    '(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
