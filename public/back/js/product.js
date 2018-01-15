$(function () {
  //1、ajax请求获取商品的数据动态渲染商品的表格
  var page = 1;
  var pageSize = 5;
  var picArr = [];//用来存储图片上传成功后返回的图片名称的地址
  render();
  function render() {
    $.ajax({
      type:'get',
      url:'/product/queryProductDetailList',
      data:{
       page:page,
        pageSize:pageSize
      },
      success:function (info) {
        console.log(info);
        //组装模板和数据
        $('tbody').html(template('tpl',info));
        //根据数据渲染分页
        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion:3,
          currentPage:page,
          totalPages:Math.ceil(info.total/info.size),
         // type: 标签页的类型，page 表示具体的页码, first 首页 last 尾页
          // prev 上一页 next 下一页
          // 这个函数的返回值就是标签页的内容
          itemTexts:function (type,page,current) {
            console.log(type,page,current);
            // return 1;
            switch (type) {
              case 'first':
                return '首页';
              case  'prev':
                return '上一页';
              case  'next':
                return '下一页';
              case 'last':
                return '尾页';
              case  'page':
                return page;
            }
          },
          tooltipTitles:function (type,page,current) {
            //根据type不同返回不同的字符串
            // console.log(type,page,current);
            // return 1;
            switch (type) {
              case 'first':
                return '首页';
              case  'prev':
                return '上一页';
              case  'next':
                return '下一页';
              case 'last':
                return '尾页';
              case  'page':
                return  '去第'+page+'页';
            }
          },
          onPageClicked:function (e,o,t,pg) {
            // console.log(pg);
            page = pg;
            //从新渲染数据
            render();
          }
        })
      }
    })
  }
  
  //2、 点击添加商品的按钮显示模态框
  $('.btn-add').on('click',function () {
    $('#addModal').modal('show');
    // 模态框显示之后，ajax请求二级品牌的分类，渲染二级分类的下拉列表
    $.ajax({
      type:'get',
      url:'/category/querySecondCategoryPaging',
      data:{
        page:1,
        pageSize:100
      },
      success:function (info) {
        console.log(info);
        //渲染下拉列表
        $('.dropdown-menu').html( template('menuTpl',info) );
      }
    })
  })
  
//3、下拉列表的功能 给a标签注册点击事件
  $('.dropdown-menu').on('click','a',function () {
    // 3.1 获取a标签的内容设置给类名为dropdown-text的span标签
    $('.dropdown-text').text($(this).text());
    // 3.2 获取id设置给隐藏域
    $('#brandId').val($(this).data('id'));
    //3.3 手动修改校验的状态
      $form.data('bootstrapValidator').updateStatus('brandId','VALID');
  });
// 4、 上传图片的功能
// 4.1 初始化jquery-fileupload插件
  $('#fileupload').fileupload({
    dataType:'json',
    done:function (e,data) {
      console.log(data.result);
      //判断数组中图片的数量,大于等于3 的时候展示图片也不再向数组中添加图片
      if(picArr.length>=3) {
         return false;
      }
      // 图片上传成功获取到图片的名字和地址
      // {picName: "36dae6f0-f8ee-11e7-bc74-f35c7c042586.jpg", picAddr: "/upload/product/36dae6f0-f8ee-11e7-bc74-f35c7c042586.jpg"}
      // 展示图片
      $('.img-box').append('  <img src="'+data.result.picAddr+'" alt="" width=\'100\' height=\'100\'>');
      // 可以通过数据的长度判断上传了几张图片
      // 存储图片的名称和地址 ,存到数组中后，可以在表单的数据后面拼接图片的名称和地址，发送给服务器
      picArr.push(data.result);
      // console.log(picArr);
      // 手动更改brandLogo也就是校验上否上传了三张图片的隐藏域的状态
       if(picArr.length === 3) {
         $form.data('bootstrapValidator').updateStatus('brandLogo','VALID');
       }else {
         $form.data('bootstrapValidator').updateStatus('brandLogo','INVALID');
       }
    }
  });
  
  // 5 、 校验表单
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
    fields:{
      brandId:{
        validators:{
            notEmpty:{
              message:'二级分类不能为空'
            }
        }
      },
      proName:{
        validators:{
          notEmpty:{
            message:'商品的名称不能为空'
          }
        }
      },
      proDesc:{
        validators:{
          notEmpty:{
            message:'商品的描述不能为空'
          }
        }
      },
      num:{
        validators:{
          notEmpty:{
            message:'商品的库存不能为空'
          },
          //正则：只能由数字组成，并且第一位不能是0
          regexp:{
            regexp:/^[1-9]\d$/,
            message:'请输入合法的库存'
          }
        }
      },
      size:{
        validators:{
          notEmpty:{
            message:'商品的尺码不能为空'
          },
          //正则：只能有数字组成，并且第一位不能是0
          regexp:{
            regexp:/^\d{2}-\d{2}$/,
            message:'请输入合法的尺码,比如(32-44)'
          }
        }
      },
      oldPrice:{
        validators:{
          notEmpty:{
            message:'商品的原价不能为空'
          }
        }
      },
      price:{
        validators:{
          notEmpty:{
            message:'商品的价格不能为空'
          }
        }
      },
      brandLogo:{
        validators:{
          notEmpty:{
            message:'请上传3张图片'
          }
        }
      }
    }
  });
  
  // 6、给表单注册校验成功的事件
  $form.on('success.form.bv',function (e) {
    // console.log('哈哈');
    //阻止表单提交的默认事件
    e.preventDefault();
    var str = $form.serialize();
    //遍历数组拼接图片的名称和地址
    str += "&picName1="+picArr[0].picName + "&picAddr1=" + picArr[0].picAddr;
    str += "&picName2="+picArr[1].picName + "&picAddr2=" + picArr[1].picAddr;
    str += "&picName3=" + picArr[2].picName + "&picAddr3=" + picArr[2].picAddr;
    // console.log(str);
  
    //ajax请求添加商品
    $.ajax({
      type:'post',
      url:'/product/addProduct',
      data:str,
      success:function (info) {
        // console.log(info);
        if(info.success) {
          // 隐藏模态框
          $('#addModal').modal('hide');
          //从新渲染第一页的数据
           page = 1;
           render();
           // 重置表单
          $form.data('bootstrapValidator').resetForm(true);
          //重置下拉列表
          $('.dropdown-text').text('请选择二级分类');
          // 显示的图片的盒子要重置
          // img 自杀的方式
          $('.img-box img').remove();
          // 数组要清空
          picArr = [];
        }
      }
    })
  });
  
  
  
});



