import { GoToAnotherPageService } from '../../user/services/go-to-another-page.service';  
import { AuthService } from './../../AuthGuard/authService';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  imports: [],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit {

  constructor(private router : Router, private AuthService : AuthService, private GoToAnotherPageService: GoToAnotherPageService){}
  
  userName : string | null  = 'Utilisateur';

  ngOnInit(): void {
    this.userName = this.AuthService.getName();
  }
  
  logOut(){
    this.AuthService.logOut()
    this.router.navigate(["/login"])
  }

  isMenuOpen : boolean = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  

  onClick(url : string){
    this.GoToAnotherPageService.goToAnotherPage(url)
  }

}
