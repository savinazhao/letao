$(function () {
  // 1、页面一进来, 动态渲染一级分类的列表
    $.ajax({
      type:'get',
      url:'/category/queryTopCategory',
      success:function (info) {
        console.log(info);
        // 组装模板和数据
        $('.category_left .mui-scroll').html( template('tpl_left',info));
        //2、一级分类渲染成功之后渲染第一个一级分类对应的二级分类
          renderSecond(info.rows[0].id);
      }
    });
  
  function renderSecond(id) {
    $.ajax({
      type:'get',
      url:'/category/querySecondCategory',
      data:{
        id:id
      },
      success:function (info) {
        console.log(info);
        $('.category_right .mui-scroll ').html(template('tpl_right',info));
      }
    })
  }
  
  // 3、点击li标签获取一级分类的id，根据id去请求服务器获取对应一级分类的二级分类
  $('.category_left .mui-scroll').on('click','li',function () {
    //修改li的样式
    $(this).addClass('now').siblings().removeClass('now');
        //获取一级分类的id
    var id = $(this).data('id');
   //根据id发送请求获取对应的二级分类的数据动态渲染
        renderSecond(id);
       //重置区域滚动的里滚动的盒子的位置
    // 让mui-scroll-wrapper 里的mui-scroll滚动回到（0,0）的位置
    // mui('.mui-scroll-wrapper').scroll() 获取页面上所有的scroll对象 ,得到的是一个数组 [Class, Class]
    // console.log(mui('.mui-scroll-wrapper').scroll());
    mui('.mui-scroll-wrapper').scroll()[1].scrollTo(0,0,100);
  
  })
 
  
})