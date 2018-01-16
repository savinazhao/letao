$(function () {
  //1.页面加载渲染搜索历史记录
  //获取localStorage里的数据  返回来一个数组
  function  getHistory() {
    //localStorage不能存储复杂数据类型，所以将复杂数据类型转成json字符串存储
    // 获取的时候获取的是json字符串，再把json字符串转成复杂数据类型来操作
    //在localStorage 中存的是json字符串
      var history = localStorage.getItem('lt_search_history')||'[]';
      var arr = JSON.parse(history);
      return arr;
  }
  render();
  //1.渲染搜索的历史记录
  function render() {
     // 1.1 获取localStorage中lt_search_history中的值
    var arr = getHistory();
    //1.2 组装模板和数据，渲染搜索历史记录
    // console.log(arr);
    $('.lt_history').html(template('tpl',{list:arr}));
  }
  
  // 2 清空历史记录
  //给清空历史记录的按钮注册事件委托
 $('.lt_history').on('click','.btn_empty',function () {
      //清空localStorage
   localStorage.removeItem('lt_search_history');
   //重新渲染历史记录
   render();
 });
  // 3. 删除某一条搜索的历史记录
  //给删除按钮注册事件委托
  $('.lt_history').on('click','.btn-delete',function () {
      //获取这条记录的索引
     var index = $(this).data('index');
      //获取localStorage中的数据
    var arr = getHistory();
    //删除数组中指定索引的值
    arr.splice(index,1);
    //删除之后再转成json字符串存到localStorage
    localStorage.setItem('lt_search_history',JSON.stringify(arr));
    //重现渲染历史记录
    render();
    
  });
  // 4.点击搜索按钮，添加历史记录
  //添加的需求：
  //4.1 历史记录最大不超过10
  //4.2. 如果搜索的历史记录，已经存在，需要把这个历史记录移动到最前面。
  $('.search_btn').on('click',function () {
   //获取搜索框的关键词
    var key = $('.search_text').val().trim();
    //清空搜索框
    $('.search_text').val('');
     // 获取localStorage 的值
    var arr = getHistory();
    //判断数组中是否有这个关键词
    if(arr.indexOf(key)!=-1) {
      //有这个关键词就删除
      arr.splice(arr.indexOf(key),1);
    }
    //判断数组的长度是否等于10,不能超过10
    if(arr.length>=10) {
       arr.pop();
    }
    arr.unshift(key);
     //重新设置到localStorage
    localStorage.setItem('lt_search_history',JSON.stringify(arr));
    //重新渲染
      render();
      //页面跳转到商品列表页
    location.href = 'searchList.html?key='+key;
    
  });
  
})