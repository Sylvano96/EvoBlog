import { ServiceAdService } from './../Service/service-ad.service';
import { GoToAnotherPageService } from '../../user/services/go-to-another-page.service'; 
import { Component } from '@angular/core';
import { CreateServiceService } from '../../Author/Services/create-service.service'; 
import { CommonModule } from '@angular/common';
import { NavBarAdminComponent } from '../nav-bar-admin/nav-bar-admin.component';
import { NotFoundComponent } from '../../user/not-found/not-found.component';
import { SpinnerComponent } from '../../user/spinner/spinner.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-list-all-post',
  imports: [CommonModule, NavBarAdminComponent, NotFoundComponent, SpinnerComponent],
  templateUrl: './list-all-post.component.html',
  styleUrl: './list-all-post.component.css'
})
export class ListAllPostComponent {

  constructor(private ServiceAdService : ServiceAdService, private CreateServiceService: CreateServiceService, private GoToAnotherPageService: GoToAnotherPageService, private router: Router) {
    this.isLoading = true
    this.CreateServiceService.getPosts().subscribe(data => {
      this.data = data
      this.dataSave = data 
      this.numTotal = data.length
      console.log(this.data)
      this.isLoading = false
    }, error => {
      console.log("Erreur de récuperation des posts : ", error)
      this.isLoading = false
    })

    this.CreateServiceService.getComments().subscribe(data => {
      this.dataComments = data
    }, error => {
      console.log("Erreur de récuperation des posts : ", error)
    })

    this.ServiceAdService.getAllUsers().subscribe((data) => {
      this.dataUser = data
    }, error => {
      console.log("Erreur de récuperation des auteurs avec les nombres du posts: ", error)
    })

    

    // this.ServiceAdService.getAllPostsForUsers().subscribe((data) => {
      
    //   for (let index = 0; index < data.length; index++) {
    //     const dataSet = new Set()
    //     for (let i = 0; i < data[index].length; i++) {
    //       if(i != 4){
    //         dataSet.add(data[index][i])
    //       }else{
    //         dataSet.add(JSON.parse(data[index][i]))
    //       }
    //     }

    //     this.dataUsersPosts.push(dataSet)
    //   }

    //   console.log(this.dataUsersPosts[0].keys)
    // }, error => {
    //   console.log("Erreur de récuperation des auteurs avec les nombres du posts: ", error)
    // })
  }

  dataUsersPosts : any[] = []

  

  dataUser : any[] = []
  dataCommentsPost : any[] = []
  dataComments : any[] = []

  isLoading: boolean = false
  data: any[] = []
  dataSave : any[] = []
  searchText: string = ""
  numTotal: number = 0

  handleSearch(){
    if(this.searchText == ""){
      this.data = this.dataSave
    }else{
      this.isLoading = true
      this.ServiceAdService.getSearchPosts(this.searchText).subscribe(data => {
        this.data = data
        this.numTotal = data.length
        console.log(this.data)
        this.isLoading = false
      }, error => {
        console.log("Erreur de récuperation des posts : ", error)
        this.isLoading = false
      })
    }

  }
  id !: number
  valide : boolean = false

  toogleValide(id: number) {
    this.id = id
    this.valide = !this.valide
  }

  message !: string
  isDelete : boolean = false
  
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


  search(event: Event) {
    const value = (event.target as HTMLInputElement).value
    this.searchText = value
  }

  onAnother(id: number) {
    this.GoToAnotherPageService.goToAnotherPage('postDetail/' + id + '/admin')
  }

  getCommentsPost(id:number){
    this.dataCommentsPost = this.dataComments.filter(data => data.postId === id)
  }

  messageSuccess !: string
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

  getUserName(id: number) {
    return this.dataUser.find(u => u.id === id)?.name + ' ' + this.dataUser.find(u => u.id === id)?.lastName;
  }


}

// const dataInit = this.data

    // if(!value.trim()){
    //   this.data = dataInit
    // }else{
    //   const dt = this.data.filter(x => {x.title.toLowerCase().includes(value.toLowerCase())})
    //   this.numTotal = dt.length
    //   this.data = dt
    // }