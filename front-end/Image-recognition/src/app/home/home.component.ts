// @ts-nocheck
import { Component } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],

})

export class HomeComponent implements AfterViewInit {

  ngAfterViewInit() {
    // all of the code inside this function can be skipped its just a jquery code helped in the design 
    $('.slide-nav').on('click', function(e) {
      e.preventDefault();
      // get current slide
      var current = $('.flex--active').data('slide'),
        // get button data-slide
        next = $(this).data('slide');
    
      $('.slide-nav').removeClass('active');
      $(this).addClass('active');
    
      if (current === next) {
        return false;
      } else {
        $('.slider__warpper').find('.flex__container[data-slide=' + next + ']').addClass('flex--preStart');
        $('.flex--active').addClass('animate--end');
        setTimeout(function() {
          $('.flex--preStart').removeClass('animate--start flex--preStart').addClass('flex--active');
          $('.animate--end').addClass('animate--start').removeClass('animate--end flex--active');
        }, 800);
      }
    });
  
  }
}

