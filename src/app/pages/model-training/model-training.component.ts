import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as iris from "../../../assets/iris_initial_processed.json";
import { Chart } from 'chart.js/dist/Chart';

@Component({
  selector: 'app-model-training',
  templateUrl: './model-training.component.html',
  styleUrls: ['./model-training.component.css']
})
export class ModelTrainingComponent implements OnInit {

  @ViewChild('myChart')
  myChart: ElementRef

  private chartData: {
    x: number;
    y: number;
  }[] = [];

  private tags = [];
  constructor() { }

  ngOnInit(): void {
    // 读iris数据
    let irisDataStringArr = (iris as any).default as string[];
    irisDataStringArr.forEach( (val, index) => {
      let tokens = val.split(',', 5);
      this.chartData.push({
        x: Number(tokens[0]),
        y: Number(tokens[1])
      });
      this.tags.push(tokens[4]);
    });
  }

  ngAfterViewInit() {
    let IrisVirginica = [];
    let Iris_setosa = [];
    let Iris_versicolor = [];
    this.tags.forEach( (val, index) => {
      switch(val){
        case 'Iris-virginica':
          IrisVirginica.push(this.chartData[index]);
          break;
        case 'Iris-setosa':
          Iris_setosa.push(this.chartData[index]);
          break;
        case 'Iris-versicolor':
          Iris_versicolor.push(this.chartData[index]);
          break;
      }
    } );

    // 画出全部样本分布图
    let scatterChart = new Chart(this.myChart.nativeElement, {
      // The type of chart we want to create
      type: 'scatter',
      data: {
        datasets: [{
          label: 'Iris-virginica',
          borderColor: 'blue',
          data: IrisVirginica,
          pointStyle: 'triangle',
          pointBackgroundColor: '#0000ff'
        },
        {
          label: 'Iris-setosa',
          borderColor: 'pink',
          data: Iris_setosa,
          pointStyle: 'circle',
          pointBackgroundColor: 'pink'
        },
        {
          label: 'Iris-versicolor',
          data: Iris_versicolor,
          borderColor: 'red',
          pointStyle: "rect",
        },
        ],
      },
      options: {
        scales: {
          xAxes: [{
            type: 'linear',
            position: 'bottom',
            scaleLabel: {
              labelString: "sepal length in cm",
              display: true
            }
          }],
          yAxes: [{
            type: 'linear',
            position: 'left',
            scaleLabel: {
              labelString: "sepal width in cm",
              display: true
            }
          }]
        },
      }
    });
  }

}
