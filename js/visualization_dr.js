function visualize_dr_data(myChart) {
    // var myChart = echarts.init();
    $.ajax({
        url: "wuhan.json",
        success: function (data) {
            myChart.setOption({
                backgroundColor: '#FBFBFB',
                tooltip : {
                    trigger: 'item',
                    formatter: '{b}<br />{c}%'
                },
                calculable : true,
                yAxis : [
                    {
                        type : 'category',
                        axisLine:{
                            lineStyle :{
                                // color: '#CECECE'
                                color: '#383838'
                            }
                        },
                        data: ['疑感染', '治愈', '死亡', '确诊']
                    }
                ],
                xAxis: {
                    data: data.date,
                    axisLabel:{
                        // rotate: 30,
                        // interval:0
                        formatter: '{value}%'
                    },
                    axisLine:{
                        lineStyle :{
                            color: '#CECECE'
                        }
                    },
                    type : 'value',
                    boundaryGap : false,
                },
                // legend: {
                //     "left": "center",
                //     "data": [{
                //         "name": "疑感染",
                //     }, {
                //         "name": "治愈",
                //     }, {
                //         "name": "死亡",
                //     }, {
                //         "name": "确诊",
                //     }
                //     ]
                // },
                series: [
                    {
                        name: '百分比',
                        type: 'bar',
                        symbol: 'none',
                        // smooth: 0.2,
                        data: [Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), 
                            Math.floor(Math.random() * 100), Math.floor(Math.random() * 100)],
                        label: {normal: {show: true, position: 'right', formatter: '{c}%'}},
                        formatter: '{b}\n{c}%',
                        itemStyle: {
                            normal: {
                                color: function (p) {
                                    var clist =  ['#66AEDE', '#90EC7D', '#f51d00', '#f5a700'];
                                    return clist[p.dataIndex];
                                }
                            }
                        } 
                    },
                    // {
                    //     name: '治愈',
                    //     type: 'bar',
                    //     symbol: 'none',
                    //     // smooth: 0.2,
                    //     color: ['#90EC7D'],
                    //     data: [Math.floor(Math.random() * 100)],
                    //     label: {normal: {show: true, position: 'right'}},
                    //     formatter: '{b}\n{c}%'  
                    // },
                    // {
                    //     name: '死亡',
                    //     type: 'bar',
                    //     symbol: 'none',
                    //     // smooth: 0.2,
                    //     color: ['#f51d00'],
                    //     data: [Math.floor(Math.random() * 100)],
                    //     label: {normal: {show: true, position: 'right'}},
                    //     formatter: '{b}\n{c}%'  
                    // },
                    // {
                    //     name: '确诊',
                    //     type: 'bar',
                    //     symbol: 'none',
                    //     // smooth: 0.2,
                    //     color: ['#f5a700'],
                    //     data: [Math.floor(Math.random() * 100)],
                    //     label: {normal: {show: true, position: 'right'}},
                    //     formatter: '{b}\n{c}%'  
                    // },
                ],
                grid: {
                    left: '10%'
                }
            });
        }
    });
}
// });