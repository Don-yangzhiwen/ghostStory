# ghostStory
接口数据来自showapi--鬼故事
# 自动添加版本号
找到node_modules --> gulp-assets-rev -->index.js 修改为如下代码：
var verStr = (options.verConnecter || "") + md5;
    src=src+"?v="+verStr;