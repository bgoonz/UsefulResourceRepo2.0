import React, { Component } from 'react';
import cloneDeep from 'lodash.clonedeep';
import ReactEcharts from 'echarts-for-react';

export default class Dynamic extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
    this.chartRef = React.createRef('echarts_react');
  }
  
  timeTicket = null;
  count = 51;
  getInitialState = () => ({option: this.chartOptions()});

  fetchNewDate = () => {
    let axisData = (new Date()).toLocaleTimeString().replace(/^\D*/,'');
    const option = cloneDeep(this.state.option);

    option.xAxis[0].data.shift();
    option.xAxis[0].data.push(axisData);
    option.xAxis[1].data.shift();
    option.xAxis[1].data.push(this.count++);

    this.setState({ option });
  };

  componentDidMount() {
    if (this.timeTicket) {
      clearInterval(this.timeTicket);
    }
    this.timeTicket = setInterval(this.fetchNewDate, 10000);
  };

  componentWillUnmount() {
    if (this.timeTicket) {
      clearInterval(this.timeTicket);
    }
  };

  chartOptions = () => ({
    title: { 
      text:'Real-Time Electricity/Gas Data' 
    },
    tooltip: { 
      trigger: 'axis' 
    },
    legend: { 
      data: ['Day kWh', 'Night kWh', 'Gas', 'Actual'] 
    },
    toolbox: {
      show: true,
      feature: {
        dataView: {readOnly: false},
        restore: {},
        saveAsImage: {}
      }
    },
    grid: {
      top: 60,
      left: 30,
      right: 60,
      bottom:30
    },
    dataZoom: {
      show: false,
      start: 0,
      end: 100
    },
    visualMap: {
      show: false,
      min: 0,
      max: 1000,
      color: ['#BE002F', '#F20C00', '#F00056', '#FF2D51', '#FF2121', '#FF4C00', '#FF7500',
        '#FF8936', '#FFA400', '#F0C239', '#FFF143', '#FAFF72', '#C9DD22', '#AFDD22',
        '#9ED900', '#00E500', '#0EB83A', '#0AA344', '#0C8918', '#057748', '#177CB0']
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: true,
        data: (() => {
          let now = new Date();
          let res = [];
          let len = 20;
          while (len--) {
            res.unshift(now.toLocaleTimeString().replace(/^\D*/,''));
            now = new Date(now - 2000);
          }
          return res;
        })()
      },
      {
        type: 'category',
        boundaryGap: true,
        data: (() => {
          let res = [];
          let len = 20;
          while (len--) {
            res.push(20 - len + 1);
          }
          return res;
        })()
      }
    ],
    yAxis: [
      {
        type: 'value',
        scale: true,
        name: 'kWh',
        max: 500,
        min: 0,
        boundaryGap: [0.2, 0.2]
      },
      {
        type: 'value',
        scale: true,
        name: 'kW',
        max: 0.3,
        min: 0.1,
        boundaryGap: [0.2, 0.2]
      }
    ],
    series: [
      {
        name:'Gas',
        type:'bar',
        xAxisIndex: 1,
        yAxisIndex: 1,
        itemStyle: {
          normal: {
            barBorderRadius: 4,
          }
        },
        animationEasing: 'elasticOut',
        animationDelay: idx => idx * 10,
        animationDelayUpdate: idx => idx * 10,
        data: []
      },
      {
        name:'Energy',
        type:'line',
        data: []
      },
      {
        name:'Day kWh',
        type:'line',
        data: []
      },
      {
        name:'Night kWh',
        type:'line',
        data: []
      }
    ]
  });

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.data !== this.props.data || 
      nextState.option.series !== this.state.option.series) {
      return true;
    } else {
      return false
    }
  }
    
  componentDidUpdate() {
    const { usage, day_kwh, night_kwh, gas } = this.props.data;
    const series = {...this.state.option.series};
    series[0]['data'] = usage;
    series[1]['data'] = day_kwh;
    series[2]['data'] = night_kwh;
    series[3]['data'] = gas;
    this.setState({ series });
  }

  render() {
    return (
      <div className='examples'>
        <div className='parent'>
          <ReactEcharts 
            ref={ this.chartRef }
            option={this.state.option}
            style={{height: 400}} />
        </div>
      </div>
    );
  }
}