//初始化表单校验
$(function () {
  //要求用户名不能为空
  //要求密码不能为空，并且长度是6-12
  var $form = $('form');
  $form.bootstrapValidator({
    //指定校验字段
    fields :{
    //校验用户名，对应name属性为username
      username: {
        validators:{
          //不能为空的校验规则
          notEmpty:{
            message:'用户名不能为空哦!'
          },
          callback:{
            message:'用户名不存在'
          }
        }
      },
      password:{
        validators:{
          notEmpty :{
            message:'密码不能为空!'
          },
          // 长度限制的校验规则
          stringLength :{
            min:6,
            max:12,
            message:'密码长度必须6-12位'
          },
          callback:{
            message:'密码错误'
          }
        }
      }
    },
    //指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons:{
      valid:'glyphicon glyphicon-ok',
      invalid:'glyphicon glyphicon-remove',
      validating:'glyphicon glyphicon-refresh'
    }
  
    
  });
  //表单校验插件，在表单提交的时候做判断，如果校验失败了，会阻止表单数据的提交。如果校验成功了，她就可以让表单去提交，但是表单提交不应该用form表单提交的方式，应该ajax请求
  //给表单注册一个校验成功的事件，当表单校验成功时，会触发success.form.bv事件，此时阻止表单的默认提交
  $form.on('success.form.bv',function (e) {
    //阻止表单提交的默认事件
    e.preventDefault();
    //ajax请求
   $.ajax({
      type:'post',
      url:'/employee/employeeLogin',
      data:$form.serialize(),
      dataType:'json',
      success:function (info) {
        console.log(info);
        if(info.success) {
         location.href = 'index.html';
        }
        //{"error":1000,"message":"用户名不存在! "}
        // {"error":1001,"message":"密码错误！"}
        if(info.error==1000) {
          $form.data('bootstrapValidator').updateStatus('username','INVALID','callback');
        }
        if(info.error==1001) {
        $form.data('bootstrapValidator').updateStatus('password','INVALID','callback');
        }
        
      }
    })
    
  })
  // 给reset重置按钮注册点击事件
  $('button[type="reset"]').on('click',function () {
    // 重置表单数据和表单验时的图标
    $form.data('bootstrapValidator').resetForm(true);
  })
})
