$(function () {
  // 1. 用户登陆之后可以进入会员中心，这个时候动态渲染此用户的信息
     $.ajax({
       type:'get',
       url:'/user/queryUserMessage',
       success:function (info) {
         console.log(info);
          if(info.error==400) {
          //未登录。跳转到登陆页,这里不需要拼接retUrl 因为登陆成功之后就是跳转到会员中心
            location.href = 'login.html';
          }
          //如果登录了，动态渲染用户的信息
         $('.mui-media').html(template('tpl',info));
       }
     });
     //2. 退出登陆功能
  $('.btn_logout').on('click',function () {
           $.ajax({
             type:'get',
             url:'/user/logout',
             success:function (info) {
               // console.log(info);
                   if(info.success) {
                        //跳转到登陆页面
                     location.href = 'login.html';
                   }
             }
           })
  })
     
})