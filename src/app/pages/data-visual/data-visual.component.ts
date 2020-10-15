import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js/dist/Chart';
import * as line from '../../../assets/myLogisticRegression1.json';
import * as iris from "../../../assets/iris_processed_PCA.json";
import { ScatterDataItem } from '../../types/scatter-data';

@Component({
  selector: 'app-data-visual',
  templateUrl: './data-visual.component.html',
  styleUrls: ['./data-visual.component.css']
})
export class DataVisualComponent implements OnInit {

  @ViewChild('myChart')
  myChart: ElementRef

  private ctx: CanvasRenderingContext2D;
  private lineData = (line as any).default as number[][];
  private irisData: ScatterDataItem[] = [];
  private dividingLine = [];
  constructor() {

  }

  ngOnInit(): void {
    // 读iris数据集
    let irisPreProcessed = (iris as any).default as {
      data: number[][];
      tags: number[];
    };
    for(let i = 0; i < irisPreProcessed.data[0].length; i++) {
      this.irisData.push({
        x: irisPreProcessed.data[0][i],
        y: irisPreProcessed.data[1][i],
        label: Boolean(irisPreProcessed.tags[i])
      });
    }

    // 取分界线上的两个点
    let x1 = {x: -(this.lineData[1][0]*(1.5) + this.lineData[2][0])/this.lineData[0][0], y: 1.5};
    let x2 = {x: -(this.lineData[1][0]*(-1.5) + this.lineData[2][0])/this.lineData[0][0], y: -1.5};
    this.dividingLine.push(x1);
    this.dividingLine.push(x2); 
  }

  ngAfterViewInit() {
    let positiveData = this.irisData.filter(val => val.label);
    let negativeData = this.irisData.filter(val => !val.label);
    this.ctx = this.myChart.nativeElement.getContext('2d');
    let scatterChart = new Chart(this.ctx, {
      // The type of chart we want to create
      type: 'scatter',
      data: {
        datasets: [{
          label: 'Positive Dataset',
          borderColor: 'blue',
          data: positiveData,
          pointStyle: 'triangle',
          pointBackgroundColor: '#0000ff'
        },
        {
          label: 'negative Dataset',
          borderColor: 'pink',
          data: negativeData,
          pointStyle: 'circle',
          pointBackgroundColor: 'pink'
        },
        {
          label: 'Dividing Line',
          data: this.dividingLine,
          fill: false,
          type: 'line',
          borderColor: 'red'
        },
        ],
      },
      options: {
        scales: {
          xAxes: [{
            type: 'linear',
            position: 'bottom',
            scaleLabel: {
              labelString: "First Principle Component",
              display: true
            }
          }],
          yAxes: [{
            type: 'linear',
            position: 'left',
            scaleLabel: {
              labelString: "Second Principle Component",
              display: true
            }
          }]
        },
      }
    });
  }
}
