import { AuthService } from '../../AuthGuard/authService'; 
import { GoToAnotherPageService } from './../services/go-to-another-page.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  imports: [],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent {

  constructor(public GoToAnotherPageService : GoToAnotherPageService, private AuthService: AuthService){}

  onClick(url:string){
    return this.GoToAnotherPageService.goToAnotherPage(url)
  }

}
