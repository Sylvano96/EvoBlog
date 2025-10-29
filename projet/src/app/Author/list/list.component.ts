import { title } from 'process';
import { CreateServiceService } from './../Services/create-service.service';
import { Component, Input } from '@angular/core';
import { NavComponent } from '../nav/nav.component'; 
import { CommonModule } from '@angular/common';
import { GoToAnotherPageService } from '../../user/services/go-to-another-page.service'; 
import { SpinnerComponent } from '../../user/spinner/spinner.component';
import { NotFoundComponent } from '../../user/not-found/not-found.component';
import { EmptyElementComponent } from '../../empty-element/empty-element.component';
import { AuthService } from '../../AuthGuard/authService';

@Component({
  selector: 'app-list',
  imports: [NavComponent, CommonModule, SpinnerComponent, NotFoundComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {

  idU : string = ""

  constructor(private AuthService : AuthService,private CreateServiceService: CreateServiceService, private GoToAnotherPageService: GoToAnotherPageService) {
    this.isLoading = true
    // this.idU = this.AuthService.getAuthId()
    this.CreateServiceService.getUserPosts(this.AuthService.getAuthId()).subscribe(data => {
      this.data = data
      this.timestamp = Date.now()
      this.numTotal = this.data.length
      this.isLoading = false
      console.log(data)
    }, error => {
      console.log("Erreur de récuperation des posts : ", error)
      this.isLoading = false
    })

    this.CreateServiceService.getComments().subscribe(data => {
      this.dataComments = data
    }, error => {
      console.log("Erreur de récuperation des posts : ", error)
    })
  }
  



  timestamp !: number

  dataCommentsPost : any[] = []
  dataComments : any[] = []

  data: any[] = []
  searchText: string = ""
  numTotal: number = 0

  isLoading: boolean = false


  search(event: Event) {

    // const value = (event.target as HTMLInputElement).value
    // const dataInit = this.data

    // if(!value.trim()){
    //   this.data = dataInit
    // }else{
    //   const dt = this.data.filter(x => {x.title.toLowerCase().includes(value.toLowerCase())})
    //   this.numTotal = dt.length
    //   this.data = dt
    // }
  }

  onClick(id: number) {
    return this.GoToAnotherPageService.goToAnotherPage("update/" + id + "/post")
  }

  valide: boolean = false

  toogleValide(id: number) {
    this.id = id
    this.valide = !this.valide
  }

  id: number = 0
  message !: string
  isDelete: boolean = false

  deletePost() {
    this.data = this.data.filter(x => x.id !== this.id)
    this.CreateServiceService.deletePost(this.id).subscribe(data => {
      console.log("Suppression du post : ", data)

      this.message = data
      this.isDelete = true
      setTimeout(() => {
        this.isDelete = false
      }, 4000)
    }, error => {
      console.log('Erreur de suppression de post : ', error)
    })
    this.toogleValide(0)
    this.numTotal = this.data.length
  }

  getCommentsPost(id:number){
    this.dataCommentsPost = this.dataComments.filter(data => data.postId === id)
  }

  messageSuccess : string = ""
  comDelete : boolean = false

  deleteComment(id:number){
    this.CreateServiceService.deleteComment(id).subscribe(data => {
      this.messageSuccess = data
      this.comDelete = true
      this.dataCommentsPost = this.dataCommentsPost.filter(data => data.id != id )
      setTimeout(()=>{
        this.comDelete = false
      }, 4000)

    }, error => {
      console.log("Erreur de récuperation des posts : ", error)
    })
  }

}

