import { Component } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { GoToAnotherPageService } from '../services/go-to-another-page.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-sign-up-user',
  imports: [NavBarComponent, CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './sign-up-user.component.html',
  styleUrl: './sign-up-user.component.css'
})
export class SignUpUserComponent {
   formulaire : FormGroup
    
      error:boolean = false
  
  constructor(private fb: FormBuilder, private GoToAnotherPageService: GoToAnotherPageService,  private http : HttpClient){
      
      this.formulaire = this.fb.group({
        name : ["", Validators.required],
        lastName : ["",],
        email : ["", [
          Validators.required, Validators.email
        ]],
        password:["", [
          Validators.required,
          Validators.minLength(9)
        ]]
      })
      
    }

  errorCreate: boolean = false
  errorMess: string = ""


  submit(): void {
    if (this.formulaire.valid) {
      console.log(this.formulaire.value)

      const user = {
        name: this.formulaire.value.name,
        lastName: this.formulaire.value.lastName,
        email: this.formulaire.value.email,
        status: "redacteur",
        password: this.formulaire.value.password,
        actif: false
      }

      this.http.post('http://localhost:8080/api/create/user', user).subscribe(response => {
        console.log("Utilisateur : ", response)
        this.GoToAnotherPageService.goToAnotherPage('user/validate')
      }, error => {
        this.errorMess = error.message
        this.errorCreate = true
        setTimeout(() => {
          this.errorCreate = false
        }, 4000)
        console.log('Erreur : ', error)
      })

      this.formulaire.reset()

    } else {
      this.formulaire.markAllAsTouched()
    }
  }
}
