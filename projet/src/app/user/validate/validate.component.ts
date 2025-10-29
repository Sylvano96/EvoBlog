import { GoToAnotherPageService } from './../services/go-to-another-page.service';
import { CreateServiceService } from './../../Author/Services/create-service.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-validate',
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './validate.component.html',
  styleUrl: './validate.component.css'
})
export class ValidateComponent{

  validate : FormGroup

  constructor(private route: ActivatedRoute, private fb : FormBuilder, private CreateServiceService : CreateServiceService, private GoToAnotherPageService : GoToAnotherPageService){
    this.validate = this.fb.group({
      value : ["", Validators.required]
    })
  }

  message : string = ""

  submit(){
    if(this.validate.valid){
      this.CreateServiceService.validation(this.validate.value.value).subscribe(response => {
        console.log(response)
        this.message = response
      }, error => {
        console.log('Erreur : ', error)
      })
    }else{
      this.validate.markAllAsTouched()
    }
  }

}
