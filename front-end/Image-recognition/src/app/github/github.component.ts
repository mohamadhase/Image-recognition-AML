// @ts-nocheck

import { AfterViewInit, Component } from '@angular/core';
import * as $ from 'jquery';
import { Router } from '@angular/router';

@Component({
  selector: 'app-github',
  templateUrl: './github.component.html',
  styleUrls: ['./github.component.css']
})
export class GithubComponent implements AfterViewInit {
  constructor(private router:Router){}

  ngAfterViewInit(){
    this.countAndRedirect();
    
    $(document).ready(function () {
  
      var messageOfTheDay = function () {
    
        var today = new Date(),
            $message = $('.message'),
            dailyMessage = "",
            dayOfWeek;
    
        dayOfWeek = today.getDay();
    
        switch (dayOfWeek) {
          case 0: 
            dailyMessage = "You will be redirected to the github repo";
            break;
          case 1: 
            dailyMessage = "You will be redirected to the github repo";
            break;
          case 2: 
            dailyMessage = "You will be redirected to the github repo";
            break;
          case 3: 
            dailyMessage = "You will be redirected to the github repo";
            break;
          case 4: 
            dailyMessage = "You will be redirected to the github repo";
            break;
          case 5: 
            dailyMessage = "You will be redirected to the github repo";
            break;
          case 6: 
            dailyMessage = "You will be redirected to the github repo";
            break;
        }
    
        // Fill the message element 
        // with the dailyMessage
        $message.text(dailyMessage);
     
      }
      
      messageOfTheDay();
      
    });
  }
  countAndRedirect() {
    let count = 0;
    const interval = setInterval(() => {
      count++;
      if (count === 2) {
        clearInterval(interval);
        window.open('https://github.com/mohamadhase/Image-recognition-AML', '_blank');

      }
    }, 1000);
  }
}

