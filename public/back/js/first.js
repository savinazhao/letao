$(function () {
  // 1、动态渲染一级分类表格数据
  var page =1;//当前页码
  var pageSize = 5;//每页的条数
  render();
  function render() {
      $.ajax({
        type:'get',
        url:'/category/queryTopCategoryPaging',
        data:{
          page:page,
          pageSize:pageSize
        },
        success:function (info) {
          console.log(info);
          //根据数据，组合数据和模板，渲染数据
          $('tbody').html(template('tpl',info));
          //获取数据成功之后，渲染分页
          $('#paginator').bootstrapPaginator({
            //指定bootstrap的版本
            bootstrapMajorVersion:3,
            currentPage: page,
            totalPages:Math.ceil(info.total/info.size),
            onPageClicked:function (e,o,t,pg) {
             //修改当前页码
              page = pg;
              //从新渲染数据
              render();
            }
          })
          
          
        }
      })
  }
  
  //2、添加分类的功能
  $('.btn-add').on('click',function () {
    //点击添加分类显示模态框
    $('#addModal').modal('show');
  });
//3、表单验证
  var $form = $('form');
  $form.bootstrapValidator({
    //指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons:{
      valid:'glyphicon glyphicon-ok',
      invalid:'glyphicon glyphicon-remove',
      validating:'glyphicon glyphicon-refresh'
    },
    //配置校验的规则
    fields:{
      categoryName:{
        validators:{
          notEmpty:{
            message:'一级分类的名称不能为空'
          }
        }
      }
    }
  });
//4、给表单注册校验成功的事件
  $form.on('success.form.bv',function (e) {
    //阻止表单的默认提交事件
    e.preventDefault();
    //ajax请求提交表单，添加分类
    $.ajax({
      type:'post',
      url:'/category/addTopCategory',
      data:$form.serialize(),
      success:function (info) {
        // console.log(info);
        if(info.success) {
          //隐藏模态框
          $('#addModal').modal('hide');
          //重新渲染数据,渲染第一页的数据，是为了能看到刚添加的分类,因为添加的数据显示在第一页
          page = 1;
          render();
          //重置表单
          $form.data('bootstrapValidator').resetForm(true);
        }
      }
    })
  })
  
})
