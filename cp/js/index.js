$(function () {
  //加载公共模块
  $('.hd').load('../common/common.html');
  getRequset({
    id: 1,
    type: 'cp',
    page: '1'
  }, function (data) {
    setContent('cp', data.contentlist);
    var option = {
      pageCount: data.allPages,
      callback: function (index) {
        getRequset({
          id: 1,
          type: 'cp',
          page: index
        }, function (data) {
          setContent('cp', data.contentlist);
        });
      }
    };
    new PageNumber(option);
  });
});