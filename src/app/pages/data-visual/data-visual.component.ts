import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js/dist/Chart';
import * as line from '../../../assets/myLogisticRegression1.json';
import * as iris from "../../../assets/iris_processed.json";
import { ScatterDataItem } from '../../types/scatter-data'

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
    let tagMap = new Map();
    tagMap.set("Iris-setosa", 1);
    tagMap.set("Iris-versicolor", 0);
    let tempData = (iris as any).default as string[];
    tempData.forEach((val: string, index: number) => {
      let tokens = val.split(',', 5);
      this.irisData.push({
        x: Number(tokens[0]),
        y: Number(tokens[1]),
        label: tagMap.get(tokens[4])
      });
    });

    // 取分界线上的两个点
    let x1 = {x: 4, y: -(this.lineData[0][0]*4 + line[2][0])/line[1][0]};
    let x2 = {x:7, y: -(this.lineData[0][0]*7 + line[2][0])/line[1][0]};
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
            position: 'bottom'
          }]
        },
        points: {

        }
      }
    });
  }
}
