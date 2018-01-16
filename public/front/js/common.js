//区域滚动
//初始化区域滚动插件
mui('.mui-scroll-wrapper').scroll({
    //配置是否显示滚动条
  indicators: false, //不显示滚动条
});
//初始化轮播图，配置参数轮播图能够自动轮播
mui('.mui-slider').slider({
  interval:1000
});
//获取地址栏的所有参数,返回一个对象
function getSearchObj() {
     var search = location.search;//获取地址栏的所有参数
  //对地址栏的参数进行转码
    search = decodeURI(location.search);
    // console.log(search);
  //将参数前面的?截取掉
  search = search.slice(1);//key=达芙妮测试二&name=zs&age=23
  // console.log(search);
  var arr = search.split('&');
  //将数据变成对象
  var obj = {};
  //遍历数组
  for(var i = 0;i<arr.length;i++) {
     var temp = arr[i].split('=');
      obj[temp[0]] = temp[1];
  }
  return obj;
}
//获取地址栏某个参数的值
function getSearch(key) {
   return getSearchObj()[key];
}





