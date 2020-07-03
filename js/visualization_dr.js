function update_dr_data(myChart, data) {
    var option = {
        title: {
            show: true,
            text: '心理诊断',
            left: 'center',
            top: '20px'
        },
        backgroundColor: '#FBFBFB',
        tooltip: {
            trigger: 'item',
            formatter: '{b}<br />{c}%'
        },
        calculable: true,
        yAxis: [
            {
                type: 'category',
                axisLine: {
                    lineStyle: {
                        color: '#383838'
                    }
                },
                data: new Array()
            }
        ],
        xAxis: {
            // data: data.date,
            axisLabel: {
                // rotate: 30,
                // interval:0
                formatter: '{value}%'
            },
            axisLine: {
                lineStyle: {
                    color: '#CECECE'
                }
            },
            type: 'value',
            boundaryGap: false,
        },

        series: [
            {
                name: '百分比',
                type: 'bar',
                symbol: 'none',
                // smooth: 0.2,
                data: [],
                label: { normal: { show: true, position: 'right', formatter: '{c}%' } },
                formatter: '{b}\n{c}%',
                itemStyle: {
                    normal: {
                        color: function (p) {
                            var clist = ['#66AEDE', '#90EC7D', '#f51d00', '#f5a700'];
                            return clist[p.dataIndex];
                        }
                    }
                }
            },

        ],
        grid: {
            left: '10%'
        }
    }
    var y = new Array();
    var series = new Array();
    for (d of data) {
        y.push(d[0]);
        series.push(d[1]);
    }
    option.yAxis[0].data = y;
    option.series[0].data = series;
    myChart.setOption(option);
}
// function visualize_dr_data(myChart) {
//     // var myChart = echarts.init();
//     $.ajax({
//         url: "wuhan.json",
//         success: function (data) 
//     });
// }
// });