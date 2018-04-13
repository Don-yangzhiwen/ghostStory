$(function () {
  //加载公共模块
  $('.hd').load('../common/common.html');
  getRequset({
    id: 1,
    type: 'yy',
    page: '1'
  }, function (data) {
    setContent('yy', data.contentlist);
    var option = {
      pageCount: data.allPages,
      callback: function (index) {
        getRequset({
          id: 1,
          type: 'yy',
          page: index
        }, function (data) {
          setContent('yy', data.contentlist);
        });
      }
    };
    new PageNumber(option);
  });
});