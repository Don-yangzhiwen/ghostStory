$(function () {
  //加载公共模块
  $('.hd').load('../common/common.html');
  getRequset({
    id: 1,
    type: 'mj',
    page: '1'
  }, function (data) {
    setContent('mj', data.contentlist);
    var option = {
      pageCount: data.allPages,
      callback: function (index) {
        getRequset({
          id: 1,
          type: 'mj',
          page: index
        }, function (data) {
          setContent('mj', data.contentlist);
        });
      }
    };
    new PageNumber(option);
  });
});