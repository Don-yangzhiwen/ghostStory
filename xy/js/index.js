$(function () {
  //加载公共模块
  $('.hd').load('../common/common.html');
  getRequset({
    id: 1,
    type: 'xy',
    page: '1'
  }, function (data) {
    setContent('xy', data.contentlist);
    var option = {
      pageCount: data.allPages,
      callback: function (index) {
        getRequset({
          id: 1,
          type: 'xy',
          page: index
        }, function (data) {
          setContent('xy', data.contentlist);
        });
      }
    };
    new PageNumber(option);
  });
});