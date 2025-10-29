import { GoToAnotherPageService } from '../../user/services/go-to-another-page.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../AuthGuard/authService';

@Component({
  selector: 'app-nav-bar-admin',
  imports: [],
  templateUrl: './nav-bar-admin.component.html',
  styleUrl: './nav-bar-admin.component.css'
})
export class NavBarAdminComponent {
  constructor(private router : Router, private AuthService : AuthService, private GoToAnotherPageService: GoToAnotherPageService){}
    logOut(){
      this.AuthService.logOut('token')
      this.AuthService.logOut('user_id')
      this.router.navigate(["/"])
    }

    onClick(url : string){
      this.GoToAnotherPageService.goToAnotherPage(url)
    }
}
