$(function () {
  //加载公共模块
  $('.hd').load('../common/common.html');
  getRequset({
    id: 1,
    type: 'book',
    page: '1'
  }, function (data) {
    setContent('book', data.contentlist);
    var option = {
      pageCount: data.currentPage,
      callback: function (index) {
        getRequset({
          id: 1,
          type: 'book',
          page: index
        }, function (data) {
          setContent('book', data.contentlist);
        });
      }
    };
    new PageNumber(option);
  });
});