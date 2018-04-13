  //渲染内容
  function setContent(list, data) {
    var str = '';
    for (var i = 0; i < data.length; i++) {
      var ele = data[i];
      str += '<li>';
      str += '<img src="' + ele.img + '" alt="' + ele.title + '" title="' + ele.title + '">';
      str += '<h3>';
      str += '<strong>';
      str += '<a href="/' + list + '/details.html?title=' + ele.title + '&id=' + ele.id + '">' + ele.title + '</a>';
      str += '</strong>';
      str += '</h3>';
      str += '<p>' + ele.desc + '[<a href="/' + list + '/details.html?title=' + ele.title + '&id=' + ele.id + '">详情</a>]</p>';
      str += '</li>';
    }
    $('.content .list ul').html(str);
  };
  //请求到数据
  function getRequset(option, callback) {
    var id = option.id;
    var type = option.type;
    var page = option.page;
    var url = 'http://route.showapi.com/955-' + id;
    var parmas = {
      showapi_appid: '36610',
      showapi_sign: 'f05f78810a8443fb8e007a267523e30c',
      type: type,
      page: page
    };
    $.post(url, parmas, function (res) {
      if (res.showapi_res_code == 0 && res.showapi_res_body != '') {
        var data = res.showapi_res_body.pagebean;
        callback(data);
      }
    });
  }
  //某一个样式的变化
  function setStyle(ele) {
    $(ele).addClass('on').parent('li').siblings('li').find('a').removeClass('on');
  }
  //分页插件
  function PageNumber(option) {
    var index = 1;
    var num = option.pageCount;
    var loadHtml = initialStyle(num, index);
    $('.pageul').html(loadHtml);
    callback = option.callback;
    //第几页
    $('.pageul').on('click', 'li a', function () {
      index = $(this).data('page');
      initialStyle(num, index);
      setStyle(this);
      callback(index);
    });
    //上一页
    $('.page .prv').click(function () {
      index--;
      if (index <= 0) {
        index = 1;
      }
      initialStyle(num, index);
      $('.pageul li a').each(function (key, item) {
        if ($(item).data('page') === index) {
          setStyle(item);
        }
      });
      callback(index);
    });
    //下一页
    $('.page .next').click(function () {
      index++;
      if (index > num) {
        index = num;
      }
      initialStyle(num, index);
      $('.pageul li a').each(function (key, item) {
        if ($(item).data('page') === index) {
          setStyle(item);
        }
      });
      callback(index);
    });
    //首页
    $('.page .first').click(function () {
      $('.pageul li').first().addClass('on').siblings('li').removeClass('on');
      index = 1;
      initialStyle(num, index);
      callback(index);
    });
    //末页
    $('.page .last').click(function () {
      $('.pageul li').last().addClass('on').siblings('li').removeClass('on');
      index = num;
      initialStyle(num, index);
      callback(index);
    });
    //限制-输入数字
    $('.page-number').on('input keyup', 'input', function () {
      var val = $(this).val().trim();
      var a = val.match(/[0-9]+/g);
      $(this).val(a == null ? '' : a[0]);
    });
    //跳转到某一页
    $(".page-number input").keydown(function (event) {
      if (event.keyCode == 13) {
        index = $('.page-number input').val();
        if (index > +num) {
          index = +num;
        }
        index = parseInt(index);
        initialStyle(num, index);
        callback(index);
      }
    })
    $('.page-number button').click(function () {
      index = $('.page-number input').val();
      if (index > +num) {
        index = +num;
      }
      index = parseInt(index);
      initialStyle(num, index);
      callback(index);
    });
  };
  //初始样式
  function initialStyle(num, index) {
    $('.page-number .enter span').text(' /' + num);
    if (index > num) {
      index = num;
    };
    if (index < 1) {
      index = 1;
    };
    var str = '';
    //总页数小于页码总数，至少为7个
    if (num <= 7) {
      for (var i = 1; i <= num; i++) {
        if (i == index) {
          str += '<li><a href="javascript:;" data-page="' + i + '" class="on">' + i + '</a></li>';
        } else {
          str += '<li><a href="javascript:;" data-page="' + i + '">' + i + '</a></li>';
        }
      }
      //总页数大于页码总数，至少为7个
    } else if (num > 7) {
      //在开头
      if (index <= 4) {
        for (var i = 1; i <= 5; i++) {
          if (i == index) {
            str += '<li><a href="javascript:;" data-page="' + i + '" class="on">' + i + '</a></li>';
          } else {
            str += '<li><a href="javascript:;" data-page="' + i + '">' + i + '</a></li>';
          }
        }
        str += '<li><span>...</span></li>';
        str += '<li><a href="javascript:;" data-page="' + num + '">' + num + '</a></li>';
        //在结尾
      } else if (index >= num - 3) {
        str += '<li><a href="javascript:;" data-page="1">1</a></li>';
        str += '<li><span>...</span></li>';
        for (var i = 0; i < 6; i++) {
          if ((num - 5 + i) == index) {
            str += '<li><a href="javascript:;" data-page="' + (num - 5 + i) + '" class="on">' + (num - 5 + i) + '</a></li>';
          } else {
            str += '<li><a href="javascript:;" data-page="' + (num - 5 + i) + '">' + (num - 5 + i) + '</a></li>';
          }
        }
      } else {
        //在中间
        str += '<li><a href="javascript:;" data-page="1">1</a></li>';
        str += '<li><span>...</span></li>';
        for (var i = 0; i < 5; i++) {
          if (i == 2) {
            str += '<li><a href="javascript:;" data-page="' + index + '" class="on">' + index + '</a></li>';
          } else {
            str += '<li><a href="javascript:;" data-page="' + (index - 2 + i) + '">' + (index - 2 + i) + '</a></li>';
          }
        }
        str += '<li><span>...</span></li>';
        str += '<li><a href="javascript:;" data-page="' + num + '">' + num + '</a></li>';
      }
    }
    $('.pageul').html(str);
  }