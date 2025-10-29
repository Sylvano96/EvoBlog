
import { CreateServiceService } from '../../Author/Services/create-service.service';
import { ActivatedRoute } from '@angular/router';
import { routes } from '../../app.routes';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { GoToAnotherPageService } from '../services/go-to-another-page.service';
import { FooterComponent } from '../footer/footer.component';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { response } from 'express';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-post-detail',
  imports: [FooterComponent, NavBarComponent, FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.css'
})
export class PostDetailComponent implements OnInit {

  postId !: number
  Comment: FormGroup

  constructor(private route: ActivatedRoute, private cdr: ChangeDetectorRef, private GoToAnotherPageService: GoToAnotherPageService, private CreateServiceService: CreateServiceService, private fb: FormBuilder) {
    this.Comment = this.fb.group({
      'pseudo': ["", Validators.required],
      'comment': ["", Validators.required]
    })
  }

  data: any[] = []
  dataComment: any[] = []
  image: string = ""
  title: string = ""
  date: any = ""
  id: number = 0
  category: string = ""
  name: string = ""


  contents: any[] = []

  sameCategoryData: any[] = []
  sameCategoryDataCache: any[] = []
  actualityData: any[] = []

  dataUser: any[] = []

  userId : number = 0

  dataInit: any[] = []

  ngOnInit() {

    const x = this.route.snapshot.paramMap.get('id')
    this.postId = x ? parseInt(x, 10) : 0
    /***************************************************************** */

    this.loadData()

    this.loadComment(this.postId)

    this.loadOtherData(this.postId)

    this.cdr.detectChanges()

  }

  loadUser(id : number){
    this.CreateServiceService.getUser(id).subscribe(data => {
      this.dataUser = [data]
      this.name = this.dataUser[0].name +' '+ this.dataUser[0].lastName
    }, error => {
      console.log('Erreur : ', error)
    })
  }

  loadOtherData(id:number){
    

    /******************************************************************* */

    this.actualityData = []
    this.sameCategoryData = []

    this.CreateServiceService.getPosts().subscribe(data => {

      this.dataInit = data

      this.dataInit = this.dataInit.filter(data => data.status == "publié")
      this.dataInit = this.dataInit.filter(data => data.id != id)

      for (let index = 0; index < this.dataInit.length; index++) {
        if(index < 4){
          this.actualityData.push(this.dataInit[index])
        }
      }
    }, error => {
      console.log('Erreur : ', error)
    })

    this.CreateServiceService.getPosts().subscribe(data => {

      this.sameCategoryDataCache = data
      this.sameCategoryDataCache = this.sameCategoryDataCache.filter(data => data.category == this.category)
      this.sameCategoryDataCache = this.sameCategoryDataCache.filter(data => data.id != id)

      for (let index = 0; index < this.sameCategoryDataCache.length; index++) {
        if(index < 4){
          this.sameCategoryData.push(this.sameCategoryDataCache[index])
        }
      }

    }, error => {
      console.log('Erreur : ', error)
    })
  }


  loadData() {
    
    this.CreateServiceService.update(this.postId).subscribe(data => {
      console.log("Les données récuperées : ",data)
      this.data = [data]
      this.image = 'http://localhost:8080/images/' + this.data[0].image
      this.title = this.data[0].title
      this.date = this.data[0].createdAt
      this.userId = this.data[0].userId
      this.category = this.data[0].category
      this.contents = this.data[0].contents

      this.loadUser(this.userId)
    }, error => {
      console.log('Erreur : ', error)
      this.GoToAnotherPageService.goToAnotherPage('')
    })


  }

  loadComment(id: number) {
    this.CreateServiceService.getComments().subscribe((data) => {
      this.dataComment = data
      this.dataComment = this.dataComment.filter(x => x.postId == id)
    })
  }

  changeData(id: number) {
    this.CreateServiceService.update(id).subscribe(data => {
      this.data = [data]
      this.image = 'http://localhost:8080/images/' + this.data[0].image
      this.title = this.data[0].title
      this.date = this.data[0].createdAt
      this.userId = this.data[0].userId
      this.category = this.data[0].category
      this.contents = this.data[0].contents

      this.loadComment(id)
      this.loadUser(this.userId)
      this.loadOtherData(id)
      
      return this.GoToAnotherPageService.goToAnotherPage("post/" + id + "/detail")
    }, error => {
      console.log('Erreur : ', error)
      this.GoToAnotherPageService.goToAnotherPage('')
    })
  }

  submit() {
    if (this.Comment.valid) {
      const x = {
        pseudo: this.Comment.value.pseudo,
        comment: this.Comment.value.comment,
        postId: this.postId
      }

      this.CreateServiceService.commentPost(x).subscribe((response) => {
        this.dataComment.push(response)
      }, error => {
        console.log("Erreur d'envoie du commentaire : ", error)
      })
      this.Comment.reset()
    } else {
      this.Comment.markAllAsTouched()
    }
  }

}
