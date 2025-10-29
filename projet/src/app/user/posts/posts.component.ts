import { CommonModule } from '@angular/common';
import { CreateServiceService } from '../../Author/Services/create-service.service';
import { GoToAnotherPageService } from './../services/go-to-another-page.service';
import { Component, OnInit , Input} from '@angular/core';

import {NgxPaginationModule} from 'ngx-pagination'

@Component({
  selector: 'app-posts',
  imports: [CommonModule, NgxPaginationModule],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css'
})
export class PostsComponent implements OnInit {

  constructor(private GoToAnotherPageService: GoToAnotherPageService, private CreateServiceService: CreateServiceService) { }

  onClick(id: number) {
    return this.GoToAnotherPageService.goToAnotherPage("post/" + id + "/detail")
  }

  @Input() value : string = ""

  itemsPerPage : number = 4
  currentPage  : number = 1

  dataRecent: any[] = []
  data: any[] = []
  data1: any[] = []
  dataTech: any[] = []

  ngOnInit() {
    this.CreateServiceService.getPosts().subscribe(data => {

      this.data1 = data
      this.data1 = this.data1.filter(data => data.status == "publié")

      for (let index = 0; index < this.data1.length; index++) {
        
        if( 4 > index){
          this.dataRecent.push(this.data1[index])
        }else{
          this.data.push(this.data1[index])
        }
      }
      this.dataTech = this.data1.filter(data => data.category == "Technologie et Société")
    })
  }

}
