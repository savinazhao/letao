$(function () {
  //echart柱形图
  // 基于准备好的dom，初始化echarts实例
  var myChart = echarts.init(document.querySelector('.echart_left'));
  // 指定图表的配置项和数据
  //模拟拿到的是真实的数据
  var data =[
    {name:'1月',num:333},
    {name:'2月',num:500},
    {name:'3月',num:600},
    {name:'4月',num:700},
    {name:'5月',num:900},
    {name:'6月',num:800}
  ];
  var arr1 = data.map(function (e,i,arr) {
      return e.name;
  })
  var arr2 = data.map(function (e,i,arr) {
    return e.num;
  })
  
  var option = {
    title: {
      text: '2017年注册人数'
    },
    tooltip: {},
    legend: {
      data:['人数']
    },
    xAxis: {
      data: arr1
    },
    yAxis: {},
    series: [{
      name: '人数',
      type: 'bar',
      data: arr2
    }]
  };
  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option);
  
  // 饼图
  var myChart1 = echarts.init(document.querySelector('.echart_right'));
var  option1 = {
    title : {
      text: '热门品牌销售',
      subtext: '2017年6月',
      x:'center'
    },
    tooltip : {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      data: ['耐克','阿迪','新百伦','李宁','迪卡侬']
    },
    series : [
      {
        name: '访问来源',
        type: 'pie',
        radius : '55%',
        center: ['50%', '60%'],
        data:[
          {value:335, name:'耐克'},
          {value:310, name:'阿迪'},
          {value:234, name:'新百伦'},
          {value:135, name:'李宁'},
          {value:1548, name:'迪卡侬'}
        ],
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, .5)'
          }
        }
      }
    ]
  };
myChart1.setOption(option1);


  
})