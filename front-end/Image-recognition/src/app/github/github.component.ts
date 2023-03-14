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
    /*
    this function is a interface provided by angular it self , it call it self
     automaticly when the component get initialized
    */
    this.countAndRedirect(); // call the function that will redirect the user
    

 
  }
  countAndRedirect() {
   /*
 * this function counts for 2 secounds before redirect the user into github repo
 */
    let count = 0;
    const interval = setInterval(() => { 
      /* 
      create a function that increase the count and then make it call it self , 
      and put the function inside interval delay for 1s
      */
      count++;
      if (count === 2) {
        clearInterval(interval);
        window.open('https://github.com/mohamadhase/Image-recognition-AML', '_blank');

      }
    }, 1000);
  }
}

