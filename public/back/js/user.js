$(function () {
  // ajax请求动态渲染数据
     var page = 1;//当前页码
     var pageSize = 5;//每页的条数
    render();
  function  render() {
    $.ajax({
      type:'get',
      url:'/user/queryUser',
      data:{
        page:page,
        pageSize:pageSize
      },
      dataType:'json',
      success:function (info) {
        console.log(info);
        //准备数据，渲染数据，将数据和模板组合
        $('tbody').html(template('tpl',info));
        // 根据数据渲染分页
        //初始化分页
        $('#paginator').bootstrapPaginator({
          // 设置bootstrap的版本
          bootstrapMajorVersion:3,
          //设置当前页
          currentPage:page,
          //设置总页数
          totalPages:Math.ceil(info.total/info.size),
          //给分页按钮绑定点击事件获取到当前页码
          onPageClicked:function (e,o,t,pg) {
            //最后一个参数pg表示当前点击的页码
            // console.log(pg);
            //修改当前页码
            page = pg;
            //重新渲染数据
            render();
          }
        })
      }
    })
  }
  
  //禁用启用的功能
  //给启用禁用的按钮注册点击事件，这里要事件委托
  $('tbody').on('click','.btn',function () {
      //弹出模态框
    $('#userModal').modal('show');
    // 获取数据的id
    var id = $(this).parent().data('id');
    //获取是启用还是禁用的标志
    var isDelete = $(this).hasClass('btn-success')?1:0;
    // console.log(isDelete);
    //给模态框的确定按钮注册点击事件
    //此时注册需要注意，是在一个点击事件的事件处理函数内注册的，所以注册事件前，把他身上的事件解绑
    $('.btn_confirm').off().on('click',function () {
      //发送ajax请求
      $.ajax({
        type:'post',
        url:'/user/updateUser',
        data:{
          id:id,
          isDelete:isDelete
        },
        success:function (info) {
          // console.log(info);
          if(info.success) {
            //隐藏模态框
            $('#userModal').modal('hide');
              //重新渲染数据
            render();
          }
        }
      })
    })
  })
  

  
})