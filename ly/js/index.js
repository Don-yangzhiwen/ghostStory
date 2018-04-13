$(function () {
  //加载公共模块
  $('.hd').load('../common/common.html');
  getRequset({
    id: 1,
    type: 'ly',
    page: '1'
  }, function (data) {
    setContent('ly', data.contentlist);
    var option = {
      pageCount: data.allPages,
      callback: function (index) {
        getRequset({
          id: 1,
          type: 'ly',
          page: index
        }, function (data) {
          setContent('ly', data.contentlist);
        });
      }
    };
    new PageNumber(option);
  });
});