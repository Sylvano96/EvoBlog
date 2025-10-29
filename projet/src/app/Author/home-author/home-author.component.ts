import { Component, OnDestroy, OnInit, NgZone, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
import {Chart} from 'chart.js/auto'

@Component({
  selector: 'app-home-author',
  imports: [NavComponent],
  templateUrl: './home-author.component.html',
  styleUrl: './home-author.component.css'
})
export class HomeAuthorComponent implements OnInit, OnDestroy, AfterViewInit{

  @ViewChild('chartCanvas') chartCanvas !: ElementRef
  
  chart !: Chart

  ngAfterViewInit(){
    this.chart = new Chart(this.chartCanvas.nativeElement, {
      type: 'line',
      data:{
        labels : ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        datasets : [{
          label : "Votre catégorie pour l'instant",
          data : [10, 20, 30, 40, 50],
          borderColor:'blue',
          backgroundColor:'rgba(25, 224, 191, 0.3)',
          fill:true
        }]
      },
      options: {
        responsive : true,
        plugins: {
          legend : {position:'top'},
          tooltip:{enabled : true}
        },
      }
    })
}


  img : any = "/assets/blogeurs/img1.jpg"

  count : number = 0

  images : Array <String> = ["img1.jpg","img2.jpg","img3.jpg","img4.jpg", "img5.jpg"]

  private intervalCount !: any

  constructor(private ngZone : NgZone){}

  ngOnInit(): void {
    this.ngZone.runOutsideAngular(()=>{
      this.intervalCount = setInterval(()=>{
        this.ngZone.run(()=>{
          if(this.count == 5){
            this.count = 0
          }
          this.img ="/assets/blogeurs/"+this.images[this.count]
          this.count++
        })
    },4000)
    })
  }

  ngOnDestroy(){
    clearInterval(this.intervalCount)
  }
}
