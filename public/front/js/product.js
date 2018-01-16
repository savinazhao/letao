$(function () {
  //获取地址栏的商品的id
   var id = getSearch('productId');
  // console.log(id);
    //根据产品的id请求服务器获取数据
  $.ajax({
    type:'get',
    url:'/product/queryProductDetail',
    data:{
      id:id
    },
    success:function (info) {
      console.log(info);
     /* var tempArr = info.size.split('-');
      var sizeArr = [];
        for(var i = +tempArr[0];i<=tempArr[1];i++) {
             sizeArr.push(i);
        }
      info.sizeArr = sizeArr;*/
      // console.log(sizeArr);
      $('.mui-scroll').html(template('tpl',info));
      //手动初始化轮播图的插件
      mui('.mui-slider').slider({
        interval:1000
      });
      //初始化数字输入框
      mui('.mui-numbox').numbox();
    }
  })
})