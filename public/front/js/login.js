$(function () {
    //点击登录
  $('.btn_login').on('click',function (e) {
     e.preventDefault();
     //获取用户名和密码
    var username = $("[name='username']").val();
     var password = $("[name='password']").val();
     //做个简单的校验
    if(!username) {
      mui.toast('用户名不能为空');
      return;
    }
    if(!password) {
      mui.toast('密码不能为空');
      return;
    }
    $.ajax({
      type:'post',
      url:'/user/login',
      data:{
        username:username,
        password:password
      },
      success:function (info) {
        // console.log(info);
        //登录没成功的时候给提示信息
        if(info.error) {
          mui.toast(info.message);
        }
        
         if(info.success) {
          //登录成功跳转到哪
           // 1. 直接请求登录页登录,登录成功跳转到会员中心
           // 2. 要是其他页面要求登录，没登录跳转过来的，要跳转回去,跳转过来的页面携带了一个retUrl ,所以，判断地址栏是否有retUrl参数,如果有这个参数，登录成功后，再跳回到这个地址
           // location.href = 'user.html';
           if(location.search.indexOf('retUrl')!=-1) {
           //说明地址栏参数里面有retUrl参数
                var search = location.search;
                search = location.search.replace('?retUrl=','');
                //再跳转回到这个地址的网页
             location.href = search;
           }else {
              //没有retUrl参数，登录成功跳转到会员中心
             location.href = 'user.html';
           }
           
         }
      }
    })
    
  })
})