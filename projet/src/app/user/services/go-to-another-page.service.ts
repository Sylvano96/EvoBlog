import { ViewportScroller } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class GoToAnotherPageService {

  constructor(private router:Router, private viewportScroller : ViewportScroller) {}

    private http = inject(HttpClient)

    url : string = "http://localhost:8080/api/"

    goToAnotherPage(url : string){
     return this.router.navigate(['/'+url])

    }

    init(){
      this.router.events.subscribe((event)=>{
        if(event instanceof NavigationEnd){
          this.viewportScroller.scrollToPosition([0,0])
        }
      })
    }
  }

