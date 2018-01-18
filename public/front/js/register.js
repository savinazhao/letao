$(function () {
  //1.获取验证码的功能
  $('.btn_getCode').on('click',function (e) {
    //这里的获取验证码的按钮是button会表单提交，需要阻止表单提交的默认事件
   //button 按钮、 [input type='submit']、  [button type='submit']这些点击都会提交表单
   // [input type='button'] [button type='button']这些点击不会提交表单
    e.preventDefault();
    //点击按钮之后就禁用按钮
    var $this = $(this);
    //禁用按钮
    $this.prop('disabled',true);
    // 添加一个禁用的样式
    $this.addClass('disabled');
    $this.text('发送中...');
    //发送请求获取验证码
    $.ajax({
      type:'get',
      url:'/user/vCode',
      success:function (info) {
        console.log(info);
        var time = 5;
        var timeId;
         //获取成功之后，开启一个倒计时
    timeId = setInterval(function () {
           time--;
       if(time<=0) {
         clearInterval(timeId);
          $this.prop('disabled',false).removeClass('disabled').text('再次获取');
          return;
        }
          $this.text(time+'秒后再次获取');
        },1000)
      }
    });
    
  });
  //2.点击注册按钮，注册功能
  $('.btn_register').on('click',function (e) {
    e.preventDefault();//阻止表单提交
    //获取表单的数据，进行简单的验证
    var username = $("[name='username']").val();
    var password = $("[name='password']").val();
    var rePass =  $('.repass').val();
    var mobile = $("[name='mobile']").val();
    var vCode = $("[name='vCode']").val();
    if(!username) {
      mui.toast('请输入用户名');
      return;
    }
    if(!password) {
      mui.toast('请输入密码');
      return;
    }
    if(!rePass) {
      mui.toast('请确认密码');
      return;
    }else if(rePass != password){
       mui.toast('两次输入的密码不一致');
       return;
    }
    if(!mobile) {
      mui.toast('请输入手机号');
      return;
    }
    
    //手机号的正则匹配
    if(!/^1[3-9]\d{9}$/.test(mobile)) {
         mui.toast('请输入正确的手机号');
         return;
    }
    if(!vCode) {
      mui.toast('请输入验证码');
      return;
    }
    //发送ajax请求，进行注册
    $.ajax({
      type:'post',
      url:'/user/register',
      data:$('.myform').serialize(),
      success:function (info) {
        console.log(info);
        if(info.error) {
          mui.toast(info.message);
        }
        if(info.success) {
           mui.toast('恭喜您注册成功,1秒后跳转到登陆页');
            setTimeout(function () {
              location.href ='login.html';
            },1000)
        }
      }
    })
  });
})