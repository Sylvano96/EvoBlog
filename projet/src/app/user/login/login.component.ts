import { GoToAnotherPageService } from './../services/go-to-another-page.service';
import { AuthService } from './../../AuthGuard/authService';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators} from '@angular/forms';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { FooterComponent } from '../footer/footer.component';
import { CreateServiceService } from '../../Author/Services/create-service.service';
import { ServiceUserService } from '../services/service-user.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NavBarComponent,],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  title = "Login"

  formulaire : FormGroup

  constructor(private fb : FormBuilder, private AuthService: AuthService, private GoToAnotherPageService : GoToAnotherPageService, private serviceUserService : ServiceUserService){
    this.formulaire = this.fb.group({
      email : ['', Validators.required],
      password : ['', Validators.required]
    })
  }

  status : string = ""

  submit(){
    if(this.formulaire.valid){
      this.serviceUserService.loginUser(this.formulaire.value).subscribe((response)=>{
        console.log("Output : ",response)

        const x = Object.values(response)[0].split('-')
        
        this.AuthService.setAuthId(x[3])
        this.AuthService.login(Object.values(response)[0])
        this.AuthService.setName(Object.values(response)[2])
        this.status = Object.values(response)[1]
        if(this.status == "admin"){
          this.GoToAnotherPageService.goToAnotherPage("admin")
        }else if(this.status == "redacteur"){
          this.GoToAnotherPageService.goToAnotherPage("author")
        }
      }, (error)=>{
        console.log("Erreur de connexion : ", error)
      })

    }else{
      this.formulaire.markAllAsTouched()
    }
  }

}
