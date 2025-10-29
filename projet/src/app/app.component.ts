import { GoToAnotherPageService } from './user/services/go-to-another-page.service'; 
import { ViewportScroller } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'projet';

  constructor(private GoToAnotherPageService: GoToAnotherPageService) {

    // this.router.events.subscribe(event => {
    //   if(event instanceof NavigationEnd){
    //     history.scrollRestoration = "manual"
    //     window.scrollTo(0,0)
    //   }
    // })

  }
  ngOnInit(){
      this.GoToAnotherPageService.init()
  }

}
