import { CreateServiceService } from './../../Author/Services/create-service.service';
import { ServiceAdService } from './../Service/service-ad.service';
import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import {Chart} from 'chart.js/auto'
import { NavBarAdminComponent } from '../nav-bar-admin/nav-bar-admin.component';
import { error } from 'console';

@Component({
  selector: 'app-home-admin',
  imports: [NavBarAdminComponent],
  templateUrl: './home-admin.component.html',
  styleUrl: './home-admin.component.css'
})
export class HomeAdminComponent implements OnInit {

  @ViewChild('chartCanvas') chartCanvas !: ElementRef

  chart !: any
  chart1 !:any
  nbPublie : number = 0
  nbNonPublie : number = 0
  nbRedac : number = 0
  data : any[] = []

  dataUser : any[] = []

  constructor(private ServiceAdService : ServiceAdService, private CreateServiceService : CreateServiceService){}
    
  ngOnInit(){
    this.ServiceAdService.getPublishedPosts().subscribe(data => {
      this.createdChart(data)
      console.log(data)
    })

    this.CreateServiceService.getPosts().subscribe(data => {
      this.data = data
      this.nbPublie = this.data.filter(data => data.status === 'publié').length
      this.nbNonPublie = this.data.filter(data => data.status != 'publié').length
    })

    this.ServiceAdService.getAllUsers().subscribe(data => {
      this.dataUser = data
      this.dataUser = this.dataUser.filter(data => data.status != "admin")
      this.nbRedac = this.dataUser.length
    })

    this.ServiceAdService.getPublishedAllPosts().subscribe(data => {
      this.createdChart1(data)
      console.log(data)
    })
  }

  createdChart(data : any[]) : void{

    const categories = data.map((item)=> item[0])

    const counts = data.map((item)=>  item[1])


      this.chart = new Chart(this.chartCanvas.nativeElement, {
        type: 'line',
        data:{
          labels : categories,
          datasets : [{
            label : 'Nombres de posts publiés du dernier mois',
            data : counts,
            borderColor:'rgba(75, 192, 192, 1)',
            backgroundColor:'rgba(75, 192, 192, 0.2)',
          }]
        },
        options: {
          responsive : true,
          plugins: {
            legend : {position:'top'},
            tooltip:{enabled : true}
          },
          scales:{
            y:{
              beginAtZero:true
            }
          }
        }
      })
  }

  createdChart1(data : any[]) : void{

    const categories = data.map((item)=> item[0])

    const counts = data.map((item)=>  item[1])


      this.chart1 = new Chart('canvas', {
        type: 'line',
        data:{
          labels : categories,
          datasets : [{
            label : 'Nombres de posts publiés',
            data : counts,
            borderColor:'rgba(75, 192, 192, 1)',
            backgroundColor:'rgba(75, 192, 192, 0.2)',
          }]
        },
        options: {
          responsive : true,
          plugins: {
            legend : {position:'top'},
            tooltip:{enabled : true}
          },
          scales:{
            y:{
              beginAtZero:true
            }
          }
        }
      })
  }
}
