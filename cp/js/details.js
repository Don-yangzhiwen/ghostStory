$(function () {
  //加载公共模块
  $('.hd').load('../common/common.html');
  var arr = window.location.href.split('?')[1].split('&');
  var obj = {};
  for (var i = 0; i < arr.length; i++) {
    var b = arr[i].split('=');
    obj[b[0]] = b[1];
  }
  $('title').text(decodeURIComponent(obj.title) + '_鬼大爷鬼故事');
  $('.title').text(decodeURIComponent(obj.title));
  //加载公共模块
  getRequset({
    id: obj.id,
    page: '1'
  }, function (data) {
    var string = data.text.replace(/\r\n/g, "<br>")
    $('.text p').html(string);
    var option = {
      pageCount: 5,
      callback: function (index) {
        getRequset({
          id: obj.id,
          page: index
        }, function (data) {
          if (data.ret_code != -1) {
            var string = data.text.replace(/\r\n/g, "<br>")
            $('.text p').html(string);
          }
        });
      }
    };
    new PageNumber(option);
  });
  //请求到数据
  function getRequset(option, callback) {
    var url = 'https://route.showapi.com/955-2';
    var parmas = {
      showapi_appid: '36610',
      showapi_sign: 'f05f78810a8443fb8e007a267523e30c',
      id: option.id,
      page: option.page
    };
    $.post(url, parmas, function (res) {
      if (res.showapi_res_code == 0 && res.showapi_res_body != '') {
        var data = res.showapi_res_body;
        callback(data);
      }
    });
  }
});