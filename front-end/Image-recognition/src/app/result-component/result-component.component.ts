import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
const Wordcloud = require('highcharts/modules/wordcloud');
Wordcloud(Highcharts);
@Component({
  selector: 'app-result-component',
  templateUrl: './result-component.component.html',
  styleUrls: ['./result-component.component.css']
})

export class ResultComponentComponent implements OnInit{
  ngOnInit() {
   this.draw_word_cloud()
  }

  private labels: string[] = [ 
    'Tire',
    'Wheel',
    'Vehicle registration plate',
    'Car',
    'Automotive tail & brake light',
    'Vehicle',
    'Automotive lighting',
    'Automotive tire',
    'Motor vehicle',
    'Window'
  ]; //  label names array

  private scores: number[]= [
    0.9778825044631958,
    0.9765235781669617,
    0.9604652523994446,
    0.9601910710334778,
    0.956924557685852,
    0.9465551376342773,
    0.9221521615982056,
    0.9187687635421753,
    0.9169000387191772,
    0.8852450847625732
  ]; // scores array

  draw_word_cloud() { 
    let cloud_data =  this.labels.map((value,index)=>[value,this.scores[index]]);
    Highcharts.chart('word-cloud', {
      series: [
        {
          type: 'wordcloud',
          data:
            cloud_data
          ,
          name: 'Occurrences',
        },
      ],
      title: {
        text: 'Wordcloud',
      },
    });
    
  }
}


