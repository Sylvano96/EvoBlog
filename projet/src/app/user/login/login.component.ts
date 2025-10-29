import { GoToAnotherPageService } from './../services/go-to-another-page.service';
import { AuthService } from './../../AuthGuard/authService';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators} from '@angular/forms';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { FooterComponent } from '../footer/footer.component';
import { CreateServiceService } from '../../Author/Services/create-service.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NavBarComponent,],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  title = "Login"

  formulaire : FormGroup

  constructor(private service : CreateServiceService,private fb : FormBuilder, private AuthService: AuthService, private GoToAnotherPageService : GoToAnotherPageService){
    this.formulaire = this.fb.group({
      email : ['', Validators.required],
      password : ['', Validators.required]
    })
  }

  status : string = ""

  submit(){
    if(this.formulaire.valid){
      this.service.login(this.formulaire.value).subscribe((response)=>{
        console.log(Object.values(response)[1])

        const x = Object.values(response)[0].split('-')
        
        this.AuthService.setAuthId(x[3])
        this.AuthService.login(Object.values(response)[0])

        this.status = Object.values(response)[1]
      })
      
      this.GoToAnotherPageService.goToAnotherPage(this.status == "admin" ? this.status : "author")
    }else{
      this.formulaire.markAllAsTouched()
    }
  }

}
