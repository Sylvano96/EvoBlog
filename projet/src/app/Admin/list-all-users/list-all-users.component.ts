import { response } from 'express';
import { ServiceAdService } from './../Service/service-ad.service';
import { Component, OnInit } from '@angular/core';
import { NavBarAdminComponent } from '../nav-bar-admin/nav-bar-admin.component';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from '../../user/not-found/not-found.component';
import { SpinnerComponent } from '../../user/spinner/spinner.component';
import { GoToAnotherPageService } from '../../user/services/go-to-another-page.service';

@Component({
  selector: 'app-list-all-users',
  imports: [NavBarAdminComponent, CommonModule, NotFoundComponent, SpinnerComponent],
  templateUrl: './list-all-users.component.html',
  styleUrl: './list-all-users.component.css'
})
export class ListAllUsersComponent implements OnInit {
  constructor(private ServiceAdService: ServiceAdService,  private GoToAnotherPageService: GoToAnotherPageService) { }

  data: any[] = []
  isLoading: boolean = false
  ngOnInit() {
    this.isLoading = true
    

    this.ServiceAdService.getUserPosts().subscribe((data) => {
      console.log(data)
      this.data = data
      this.isLoading = false
    }, error => {
      console.log("Erreur de récuperation des auteurs avec les nombres du posts: ", error)
      this.isLoading = false
    })
  }

  valide: boolean = false

  toogleValide(id: number) {
    this.id = id
    this.valide = !this.valide
  }

  onClick(id:number){
    this.GoToAnotherPageService.goToAnotherPage("user/"+id+"/posts")
  }

  id: number = 0
  message !: string
  isDelete: boolean = false

  deleteUser() {
    this.ServiceAdService.deleteUser(this.id).subscribe((data) => {
      console.log(data)
      this.isDelete = true
      this.data = this.data.filter(data => data[0] !== this.id)
      setTimeout(() => {
        this.isDelete = false
      }, 4000)

      this.valide = !this.valide
      this.id = 0

    }, (error) => {
      console.log("Erreur de suppression d'auteur : ", error)
    })

  }
}
