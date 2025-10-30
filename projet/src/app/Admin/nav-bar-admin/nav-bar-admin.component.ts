import { GoToAnotherPageService } from '../../user/services/go-to-another-page.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../AuthGuard/authService';

@Component({
  selector: 'app-nav-bar-admin',
  imports: [],
  templateUrl: './nav-bar-admin.component.html',
  styleUrl: './nav-bar-admin.component.css'
})
export class NavBarAdminComponent implements OnInit {
  constructor(private router : Router, private AuthService : AuthService, private GoToAnotherPageService: GoToAnotherPageService){}
     
    userName : string | null  = 'Administrateur';
    ngOnInit(): void {
      this.userName = this.AuthService.getName();
    }

    logOut(){
      this.AuthService.logOut()
      this.router.navigate(["/login"])
    }

    onClick(url : string){
      this.GoToAnotherPageService.goToAnotherPage(url)
    }
}
