function visualize_covid_data(boxid, data) {
    console.log(boxid, data);
    var myChart = echarts.init(document.getElementById(boxid));
    myChart.setOption({
        backgroundColor: '#FBFBFB',
        tooltip: {
            trigger: 'axis'
        },
        calculable: true,
        yAxis: [
            {
                type: 'value',
                axisLine: {
                    lineStyle: {
                        color: '#CECECE'
                    }
                }
            }
        ],
        xAxis: {
            data: data.date,
            axisLabel: {
                rotate: 30,
                // interval:0
            },
            axisLine: {
                lineStyle: {
                    color: '#CECECE'
                }
            },
            type: 'category',
            boundaryGap: false,
        },
        legend: {
            "left": "center",
            "data": [{
                "name": "疑感染",
            }, {
                "name": "治愈",
            }, {
                "name": "死亡",
            }, {
                "name": "确诊",
            }
            ]
        },
        series: [
            {
                name: '疑感染',
                type: 'line',
                symbol: 'none',
                // smooth: 0.2,
                color: ['#66AEDE'],
                data: data.suspected
            },
            {
                name: '治愈',
                type: 'line',
                symbol: 'none',
                // smooth: 0.2,
                color: ['#90EC7D'],
                data: data.cured
            },
            {
                name: '死亡',
                type: 'line',
                symbol: 'none',
                // smooth: 0.2,
                color: ['#f51d00'],
                data: data.dead
            },
            {
                name: '确诊',
                type: 'line',
                symbol: 'none',
                // smooth: 0.2,
                color: ['#f5a700'],
                data: data.confirmed
            },
        ],
        dataZoom: {
            realtime: true,
            height: 25,
            start: 0,
            end: 50,
            zoomOnMouseWheel: false
        },
        grid: {
            left: '20%'
        }
    });
}
// });