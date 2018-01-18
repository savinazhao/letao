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
      //尺码选择功能
      $('.lt_size span').on('click',function () {
        $(this).addClass('now').siblings().removeClass('now');
      })
      
    }
  });
  //加入购物车功能
  $('.btn_add-cart').on('click',function () {
        //获取尺码
      var size = $('.lt_size span.now').text();
        if(!size) {
          mui.toast('请选择尺码');
          return;
        }
      //获取数量
      var num = $('.mui-numbox-input').val();
         $.ajax({
           type:'post',
           url:'/cart/addCart',
           data:{
             productId:id,
             size:size,
             num:num
           },
           success:function (info) {
             console.log(info);
             //判断用户是否登录
             if(info.error==400) {
               // 1. 没有登录跳转到登录页面
               mui.toast('未登录,请登陆');
               setTimeout(function () {
                 location.href = 'login.html?retUrl='+location.href;
               },1000)
             }
             //成功的处理
             if(info.success) {
               //参数1：提示内容
               //参数2：提示标题
               //参数3：数组，两个值，按钮
               //参数4：回调函数，可以知道点击了哪个按钮
               mui.confirm('添加成功','温馨提示',['去购物车','继续浏览'],function (e) {
                 // console.log(e);
                 if(e.index==0) {
                   //去购物车
                   location.href = 'cart.html';
                 }
                 
               })
             }
           }
         })
  })
})