$(function () {
  //加载公共模块
  $('.hd').load('../common/common.html');
  getRequset({
    id: 1,
    type: 'neihanguigushi',
    page: '1'
  }, function (data) {
    setContent('neihanguigushi', data.contentlist);
    var option = {
      pageCount: data.allPages,
      callback: function (index) {
        getRequset({
          id: 1,
          type: 'neihanguigushi',
          page: index
        }, function (data) {
          setContent('neihanguigushi', data.contentlist);
        });
      }
    };
    new PageNumber(option);
  });
});