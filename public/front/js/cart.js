$(function () {
  //1.1页面一加载获取用户购物车内的数据，动态渲染
  // $.ajax({
  //   type:'get',
  //   url:'/cart/queryCart',
  //   success:function (info) {
  //     console.log(info);
  //     if(info.error==400) {
  //       //未登录，跳转到登录页面,需要携带此页面的地址
  //       location.href = 'login.html?retUrl='+location.href;
  //     }
  //     //这里处理用户已经登录，动态渲染购物车里的商品信息数据
  //     $('#OA_task_2').html(template('tpl',{list:info}));
  //   }
  // });
  
  
  // 1.下拉刷新的功能
  mui.init({
    pullRefresh : {
      // 下拉刷新的容器
      container:".mui-scroll-wrapper",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
      //配置下拉刷新
      down : {
        auto: true,//可选,默认false.首次加载自动下拉刷新一次
        //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据
        //下拉刷新的时候会触发这个函数
        callback :function () {
          console.log('哈哈');
          //1.1页面一加载获取用户购物车内的数据，动态渲染
          $.ajax({
            type:'get',
            url:'/cart/queryCart',
            success:function (info) {
              console.log(info);
              if(info.error==400) {
                //未登录，跳转到登录页面,需要携带此页面的地址
                location.href = 'login.html?retUrl='+location.href;
              }
              setTimeout(function () {
                //这里处理用户已经登录，动态渲染购物车里的商品信息数据
                $('#OA_task_2').html(template('tpl',{list:info}));
                //获取到数据渲染之后，结束下拉刷新
                console.log(mui('.mui-scroll-wrapper').pullRefresh());
                mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();
              },1000);
              
            }
          });
        }
      }
    }
  });
  
  // 2 删除功能
  // 2.1 找到所有删除按钮注册点击事件
  //注意这里不能用click事件， 在mui的下拉刷新中，禁用了click事件，需要使用tap事件
  
  $('#OA_task_2').on('tap','.btn-delete',function () {
      //2.2 获取要删除的购物车里商品的id
    var id = $(this).parent().data('id');
    mui.confirm('您是否要删除这个商品','温馨提示',['是','否'],function (e) {
        if(e.index==0) {
          //2.3发送ajax删除购物车商品
          $.ajax({
            type:'get',
            url:'/cart/deleteCart',
            data:{
              id:[id]
            },
            success:function (info) {
              // console.log(info);
              if(info.success) {
                // 需要手动下拉刷新一次，重新动态加载数据渲染  pulldownLoading
                mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading();
              }
            }
            
          });
          
        }
    });
  
  });
  
  //3.修改编辑功能
  $('#OA_task_2').on('tap','.btn_edit',function () {
    //3.1 获取要编辑的购物车商品的数据信息
    var data = this.dataset;
    console.log(data);
    // 3.2 组装模板和数据
    var htmlStr = template('tpl2',data);
    //把htmlStr中所有的换行(\n)给替换掉，因为mui会把\n给替换成br
 htmlStr =  htmlStr.replace(/\n/g,'');
    mui.confirm(htmlStr,'编辑商品',['确定','取消'],function (e) {
        if(e.index==0) {
         //编辑商品
          var id= data.id;//获取商品的id
          //选择的商品的尺码
          var size = $('.lt_edit_size span.now').text();
          var num = $('.mui-numbox-input').val();
          //发送请求，编辑商品
            $.ajax({
              type:'post',
              url:'/cart/updateCart',
              data:{
                id:id,
                size:size,
                num:num
              },
              success:function (info) {
                console.log(info);
                if(info.success) {
                 //js代码触发手动下拉刷新
                  mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading();
                 }
              }
            });
        }
    });
    // 初始化数字输入框
    mui('.mui-numbox').numbox();
    //尺码选择功能
    $('.lt_edit_size span').on('click',function () {
        $(this).addClass('now').siblings().removeClass('now');
    });
  });
  
  // 4.计算价格
  //给所有的checkbox注册change事件
   $('#OA_task_2').on('change','.ck' ,function () {
         var total = 0;
         //遍历所有被选中的checkbox
     $('.ck:checked').each(function (i,e) {
        var num = $(this).data('num');
        var price = $(this).data('price');
        total += price*num;
     });
     total = total.toFixed(2);//保留两位小数
     console.log(total);
     $('.lt_total span').text(total);
  
   });
});