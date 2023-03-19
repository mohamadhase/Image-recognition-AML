// @ts-nocheck

import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import * as Highcharts from 'highcharts';
const Wordcloud = require('highcharts/modules/wordcloud');
Wordcloud(Highcharts);
import { ActivatedRoute } from '@angular/router';
import { HardwareService } from '../hardware.service';
import { SharedPhotoService } from '../shared-photo.service';

interface TextResponse {
  description: string;
  bounding_poly: { x: number, y: number }[];
  confidence: number;
}
@Component({
  selector: 'app-result-component',
  templateUrl: './result-component.component.html',
  styleUrls: ['./result-component.component.css']
})


export class ResultComponentComponent implements  AfterViewInit{
  constructor(private route: ActivatedRoute,private hardwareservice:HardwareService,private sharedphoto :SharedPhotoService) { }

  showTags = true;
  showText = true;
  isWordCloudExpanded = false;
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  private labels: string[] = [ ]; //  label names array

  private scores: number[]= []; // scores array
  private text_response :TextResponse[]= []
@ViewChild('myCanvas', { static: true }) canvasRef: ElementRef<HTMLCanvasElement>;

ngAfterViewInit() {
  let data = JSON.parse(this.route.snapshot.queryParamMap.get('obj'));

  this.labels = data.labels_response.labels
  this.scores = data.labels_response.scores
  this.text_response = data.text_response
  this.draw_word_cloud()
  const canvas = document.getElementById('myCanvas');
  const ctx = canvas.getContext('2d');
  const image = new Image();
  image.src = this.sharedphoto.getImageContent()
  console.log(image.src)
  image.style.objectFit = "fill"
  let textt_response = this.text_response

  image.onload = () => {
    canvas.width = image.width;
    canvas.height =  image.height;

    ctx.drawImage(image, 0, 0);

    for (const text of textt_response) {
      const rect = new Path2D();
      rect.moveTo(text.bounding_poly[0].x, text.bounding_poly[0].y);
      rect.lineTo(text.bounding_poly[1].x, text.bounding_poly[1].y);
      rect.lineTo(text.bounding_poly[2].x, text.bounding_poly[2].y);
      rect.lineTo(text.bounding_poly[3].x, text.bounding_poly[3].y);
      rect.closePath();
      ctx.strokeStyle = 'red';
      ctx.lineWidth =2;
         // add click event listener to canvas element
         canvas.addEventListener('click', (event: MouseEvent) => {
          if (ctx.isPointInPath(rect, event.offsetX, event.offsetY)) {
            document.getElementById("selectedText").innerHTML = text.description;
          }
        });
        
        // draw rectangle
      ctx.stroke(rect);
    }
  }


 }



  draw_word_cloud() { 
      let cloud_data =  this.labels.map((value,index)=>[value,this.scores[index]]);
      Highcharts.chart('word-cloud', {
        series: [
          {
            type: 'wordcloud',
            data: cloud_data,
            name: 'Confidance',
          },
        ],
        title: {
          text: '',
        },
      });
  }
  closeTags() {
    if (this.showTags==true){
      const element = document.querySelector('.tags') as HTMLElement;
      element.classList.add("low-opacity")
      element.classList.remove("high-opacity")
      this.showTags=false
    }
    else{
      const element = document.querySelector('.tags') as HTMLElement;
      element.classList.add("high-opacity")
      element.classList.remove("low-opacity")
      this.showTags=true
    }
  }
  closeText() {
    if (this.showText==true){
      const element = document.querySelector('.selected-text') as HTMLElement;
      element.classList.add("low-opacity")
      element.classList.remove("high-opacity")
      this.showText=false
    }
    else{
      const element = document.querySelector('.selected-text') as HTMLElement;
      element.classList.add("high-opacity")
      element.classList.remove("low-opacity")
      this.showText=true
    }
  }
  expandWordCloud() {
    this.isWordCloudExpanded = true;
    setTimeout(() => {
      // Call your function here
      this.draw2()
    }, 100);
  }
  draw2(){
    let cloud_data =  this.labels.map((value,index)=>[value,this.scores[index]]);

    Highcharts.chart('word-cloud2', {
      series: [
        {
          type: 'wordcloud',
          data: cloud_data,
          name: 'Confidance',
        },
      ],
      title: {
        text: '',
      },
    });
  }
  closeWordCloud() {
    this.isWordCloudExpanded = false;

  }
  onImageLoad() {
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');


  }
  openGate(){
    this.hardwareservice.openGate().subscribe()
  }
  closeGate(){
    this.hardwareservice.closeGate().subscribe()
  }
}


