$(function () {
//1、 ajax请求二级分类管理的数据动态渲染二级分类的表格
 
  var page = 1;//当前页码
  var pageSize=10;// 每页的条数
  render();
  function  render() {
    $.ajax({
      type:'get',
      url:'/category/querySecondCategoryPaging',
      data:{
        page:page,
        pageSize:pageSize
      },
      success:function (info) {
        console.log(info);
        //组装模板和数据,动态渲染二级分类的表格
        $('tbody').html(template('tpl',info));
        //渲染分页
        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion:3,
          //当前页
          currentPage:page,
          totalPages:Math.ceil(info.total/info.size),
          //给分页的按钮绑定点击事件，获取点击的当前页数
          onPageClicked:function (e,o,t,pg) {
            // console.log(pg);
            //修改当前页的页码
            page = pg;
            //重新渲染
            render();
            
          }
        })
      }
      
    })
  }
  
  // 添加分类
  //2、点击添加分类显示模态框
  $('.btn-add').on('click',function () {
     $('#addModal').modal('show');
    //模态框显示之后ajax请求一级分类的数据动态渲染一级分类的下拉选择框
    $.ajax({
      type:'get',
      url:'/category/queryTopCategoryPaging',
      data:{
      page:1,
      pageSize:100
      },
      success:function (info) {
        console.log(info);
        //根据数据组装模板和数据动态渲染一级分类的下拉选择框
        $('.dropdown-menu').html(template('cateGory_tmp',info));
      }
      
    })
  });
  
  // 3、 下拉列表的选中功能
  // 给下拉列表的a注册点击事件 要事件委托
  $('.dropdown-menu').on('click','a',function () {
     //获取a标签的内容设置给类名为dropdown-text的span标签，也就是设置给显示的button内容
    // $(this).text( ) 获取a标签的内容
      $('.dropdown-text').text($(this).text());
      // 获取a标签上分类的id设置给form表单里的categoryId隐藏域
    var id = $(this).data('id')
    $('#categoryId').val(id);
    // 手动的改变categoryId这个隐藏域的校验的状态
    $form.data('bootstrapValidator').updateStatus('categoryId','VALID');
    
  });
  
  // 4、初始化文件上传的功能，jquery上传文件使用了jquery-fileupload 插件
  $('#fileupload').fileupload({
    dataType:"json",
   //文件上传成功后会执行的回调函数
    // e 事件对象
    //通过data.result获取到一个对象,这个对象的picAddr属性可以获取到图片在服务器中的地址
    done:function (e,data) {
      // console.log(data);
      var imgUrl = data.result.picAddr;
      console.log(imgUrl);
      // 获取到图片的地址设置给展示的img
      $('.img-box img').attr('src',imgUrl);
      // 将图片的地址设置给隐藏域brandLogo
      $('#brandLogo').val(imgUrl);
      // 手动改变隐藏域brandLogo 的校验状态
      $form.data('bootstrapValidator').updateStatus('brandLogo','VALID');
    }
  });
  // 5、 表单校验
  var $form = $('form');
  $form.bootstrapValidator({
    //配置不做校验的内容，给空数组，目的是让隐藏的和禁用的都做校验
    excluded:[],
    //指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons:{
      valid:'glyphicon glyphicon-ok',
      invalid:'glyphicon glyphicon-remove',
      validating:'glyphicon glyphicon-refresh'
    },
    //指定校验的规则
    fields:{
      categoryId:{
        validators:{
          notEmpty:{
             message:'请选择一级分类'
           }
        }
      },
      brandName:{
        validators:{
          notEmpty:{
            message:'请输入品牌名称'
          }
        }
      },
      brandLogo:{
        validators:{
          notEmpty:{
            message:'请选择上传品牌的图片'
          }
        }
      }
    }
  });
  
  // 6、给表单注册校验成功的事件
  $form.on('success.form.bv',function (e) {
    //阻止表单提交的默认事件
    e.preventDefault();
    //ajax请求添加二级分类
    $.ajax({
      type:'post',
      url:'/category/addSecondCategory',
      data:$form.serialize(),
      success:function (info) {
        // console.log(info);
        if(info.success) {
          //隐藏模态框
          $('#addModal').modal('hide');
          //重新渲染数据
          page = 1;
          render();
          // 重置表单
          //传入参数true既能重置表单的数据也能重置图标
          $form.data('bootstrapValidator').resetForm(true);
          // 重置类名为dropdown-text的span
          $('.dropdown-text').text('请选择一级分类');
       //重置img
       $('.img-box img').attr('src','images/none.png');
          
        }
      }
      
    })
    
    
  });
  
  
  
  
  
  
  
  
  

})