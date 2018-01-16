$(function () {
   // 1.页面加载时获取地址栏参数的值
  var proName = getSearch('key');
  // console.log(key);
  //1.1.将获取的地址栏参数的值设置给搜索框
   $('.search_text').val(proName);
   // 1.3.根据这个key 也就是产品的名字，请求服务器获取产品数据，动态渲染
  // render 必传的三个参数  page,pageSize, proName  num 和price 这两个参数待定
  // 如果点击了price 和num 的这两个a标签就要求排序，传price 或者num
  // 至于传num还是price 看点击的是哪个，通过a标签的data-type可以获取到类型，就知道传哪个参数了
  // 参数的是是什么，根据标签下span的箭头方向确定
      render();
    function render() {
      var param = {};
      param.page = 1;
      param.pageSize = 100;
      param.proName = $('.search_text').val();
       if($('.lt_sort a.now').length>0) {
         var type = $('.lt_sort a.now').data('type');
         var value = $('.lt_sort a.now').find('span').hasClass('fa-angle-down')?2:1;
         param[type] = value;
       }
      //每次渲染之前先弹出一个加载框
        $('.lt_product').html('<div class=\'loading\'></div>');
       $.ajax({
         type:'get',
         url:'/product/queryProduct',
          data:  param,
         success:function (info) {
           console.log(info);
             //服务器在本地，所以加个延迟
           setTimeout(function () {
             $('.lt_product').html(template('tpl',info));
           },1000)
         }
       })
    }
    // 2.点击搜索按钮 获取搜索框的值，重新动态渲染产品
    $('.search_btn').on('click',function () {
      //点击搜索 排序a标签的样式恢复没有now 箭头的方向全部向下
      $('.lt_sort a').removeClass('now');
      $('.lt_sort a').find('span').removeClass('fa-angle-up').addClass('fa-angle-down');
      // 点击搜索之后，改变地址栏的search
      // console.log(decodeURI(location.search));
       var value = $('.search_text').val();
      console.log(value);
     /* console.log(getSearchObj());
        getSearchObj().key = value;*/
         location.search = '?key='+value;
      // 从新渲染
       render();
    });
    // 3.排序功能 这里只支持价格和库存排序，这里给价格和库存的两个a标签设置了自定义属性data-type
    $('.lt_sort  a[data-type]').on('click',function () {
        //修改价格和库存的a标签的样式
      // 根据a有没有now这里类进行判断
      //3.1 若没有now 类  添加now这个类。其他的移除这个类  并且a下的span的箭头方向全部向下
      //3.2 如果有now这个类  切换箭头
        if($(this).hasClass('now')) {
          //有now类  切换a下的span的箭头
          $(this).find('span').toggleClass('fa-angle-down').toggleClass('fa-angle-up');
        }else {
          //没有now类
          $(this).addClass('now').siblings().removeClass('now');
          // a下的span 的箭方向全部向下
          $('.lt_sort a').find('span').removeClass('fa-angle-up').addClass('fa-angle-down');
        }
        //重新渲染排序后的数据
      render();
    });
  
  
  
  
})