$(function () {
  //加载公共模块
  $('.hd').load('../common/common.html');
  getRequset({
    id: 1,
    type: 'dp',
    page: '1'
  }, function (data) {
    setContent('dp', data.contentlist);
    var option = {
      pageCount: data.allPages,
      callback: function (index) {
        getRequset({
          id: 1,
          type: 'dp',
          page: index
        }, function (data) {
          setContent('dp', data.contentlist);
        });
      }
    };
    new PageNumber(option);
  });
});