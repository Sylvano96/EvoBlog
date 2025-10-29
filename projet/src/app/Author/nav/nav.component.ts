import { GoToAnotherPageService } from '../../user/services/go-to-another-page.service';  
import { AuthService } from './../../AuthGuard/authService';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  imports: [],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {

  constructor(private router : Router, private AuthService : AuthService, private GoToAnotherPageService: GoToAnotherPageService){}
  logOut(){
    this.AuthService.logOut('token')
    this.AuthService.logOut('user_id')
    this.router.navigate(["/login"])
  }

  onClick(url : string){
    this.GoToAnotherPageService.goToAnotherPage(url)
  }

}
