import { CreateServiceService } from '../../Author/Services/create-service.service';
import { SpinnerComponent } from '../spinner/spinner.component';
import { GoToAnotherPageService } from './../services/go-to-another-page.service';
import { Component, OnDestroy, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PostsComponent } from '../posts/posts.component';
import { FooterComponent } from '../footer/footer.component';
import { NavBarComponent } from '../nav-bar/nav-bar.component'; 
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { response } from 'express';
@Component({
  selector: 'app-home',
  imports: [PostsComponent, FooterComponent, NavBarComponent, ReactiveFormsModule, FormsModule, CommonModule, HttpClientModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  standalone: true

})
export class HomeComponent implements OnDestroy, OnInit {

  /************************************************************************** */

  img: any = "/assets/img3.jpg"

  count: number = 0

  images: Array<String> = ["img3.jpg", "img4.jpg", "img1.webp", "img2.jpg",]

  visible: boolean = false

  private intervalCount !: any
  /************************************************************************ */

  formulaire: FormGroup

  validation: FormGroup

  constructor(private ngZone: NgZone, private fb: FormBuilder, private fbu: FormBuilder, private router: Router, private GoToAnotherPageService: GoToAnotherPageService, private http: HttpClient, private CreateServiceService: CreateServiceService) {

    this.formulaire = this.fb.group({
      name: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", [
        Validators.required, Validators.email
      ]],
      password: ["", [
        Validators.required,
        Validators.minLength(9)
      ]]
    })

    this.validation = this.fbu.group({
      code: ["", Validators.required],
    })

  }
  ngOnInit(): void {
    this.ngZone.runOutsideAngular(() => {
      this.intervalCount = setInterval(() => {
        this.ngZone.run(() => {
          if (this.count == 4) {
            this.count = 0
          }
          this.img = "/assets/" + this.images[this.count]
          this.count++
        })
      }, 7000)
    })
  }

  ngOnDestroy() {
    clearInterval(this.intervalCount)
  }

}
