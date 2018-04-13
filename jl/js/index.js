$(function () {
  //加载公共模块
  $('.hd').load('../common/common.html');
  getRequset({
    id: 1,
    type: 'jl',
    page: '1'
  }, function (data) {
    setContent('jl', data.contentlist);
    var option = {
      pageCount: data.allPages,
      callback: function (index) {
        getRequset({
          id: 1,
          type: 'jl',
          page: index
        }, function (data) {
          setContent('jl', data.contentlist);
        });
      }
    };
    new PageNumber(option);
  });
});