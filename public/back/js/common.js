// 
$(function () {
  // 1、进度条的功能
  // 每个页面ajax请求的时候都有进度条的功能
// 关闭进度环
  NProgress.configure({ showSpinner: false });
// ajax 的全局事件给window或者document注册
  $(document).ajaxStart(function () {
    //开始请求的时候进度条显示  NProgress.start
    NProgress.start();
  })
  $(document).ajaxStop(function () {
    //ajax 请求结束的时候 进度条关闭
    //因为本地请求很快所以加了一个延时
   setTimeout(function () {
     NProgress.done();
   },1000)
  })
  
  // 2 在非登录页面ajax请求，判断是否登录了，没有登录，则跳转回到登录页 其他非登录的页面必须登录了才能进去
  if(location.href.indexOf('login.html')==-1) {
    // 判断是否是非登录页，是才ajax请求判断是否登录了
    $.ajax({
      type:'get',
      url:'/employee/checkRootLogin',
      success:function (info) {
        // console.log(info);
        if(info.error==400) {
          // console.log('未登录');
          //跳转到登录页
          location.href = 'login.html';
        }
      }
    
    })
  }
  
  
  // 3、 分类管理菜单的二级菜单显示隐藏的功能
  // 找到分类管理的那个a标签
  $('.second').prev().on('click',function () {
    //点击显示或者隐藏
    $(this).next().slideToggle();
  })
  
  // 4、点击icon_menu按钮，侧面栏显示或者隐藏
  $('.icon_menu').on('click',function () {
    $('.lt_aside').toggleClass('now');
    $('.lt_main').toggleClass('now');
  })
  
  //4、 点击头部的退出登录按钮icon_logout 退出登录
  $('.icon_logout').on('click',function () {
    //模态框显示
    // console.log('哈哈哈');
    $('#logoutModal').modal("show");
    
  })
  //点击模态框上的退出按钮退出登录
  // 这个点击事件要注册外边，不能注册在.icon_logout的事件里面，不能会多次注册事件，因为jquery的事件多次注册不会覆盖
  $('.btn_logout').on('click',function () {
    // console.log('哈哈');
    //ajax请求退出登录
     $.ajax({
       type:'get',
       url:'/employee/employeeLogout',
       success:function (info) {
         // console.log(info);
         if(info.success) {
           //请求退出成功，跳转到登录页
         location.href = 'login.html';
         }
       }
       
     })
  })
  
  
  
  
  
  
})