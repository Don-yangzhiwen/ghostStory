$(function () {
  //加载公共模块
  $('.hd').load('../common/common.html');
  getRequset({
    id: 1,
    type: 'yc',
    page: '1'
  }, function (data) {
    setContent('yc', data.contentlist);
    var option = {
      pageCount: data.allPages,
      callback: function (index) {
        getRequset({
          id: 1,
          type: 'yc',
          page: index
        }, function (data) {
          setContent('yc', data.contentlist);
        });
      }
    };
    new PageNumber(option);
  });
});