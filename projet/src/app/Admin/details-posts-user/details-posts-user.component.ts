import { ServiceAdService } from './../Service/service-ad.service';
import { GoToAnotherPageService } from './../../user/services/go-to-another-page.service';
import { Component, OnInit } from '@angular/core';
import { NavBarAdminComponent } from '../nav-bar-admin/nav-bar-admin.component';
import { NotFoundComponent } from '../../user/not-found/not-found.component';
import { SpinnerComponent } from '../../user/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details-posts-user',
  imports: [NavBarAdminComponent, NotFoundComponent, SpinnerComponent, CommonModule],
  templateUrl: './details-posts-user.component.html',
  styleUrl: './details-posts-user.component.css'
})
export class DetailsPostsUserComponent implements OnInit {

  constructor(private GoToAnotherPageService : GoToAnotherPageService, private route : ActivatedRoute, private ServiceAdService : ServiceAdService){}

  data : any[] = []
  isLoading : boolean = false
  user_id : number = 0

  ngOnInit(){
    const x = this.route.snapshot.paramMap.get('id')
    this.user_id = x? parseInt(x, 10) : 0
    
    this.ServiceAdService.getUserAllPosts(this.user_id).subscribe(data => {
      this.data = data
      console.log(this.data)
      this.isLoading = false
    }, error => {
      console.log("Erreur de récuperation des posts : ", error)
      this.isLoading = false
    })

  }

  onAnother(id: number) {
    this.GoToAnotherPageService.goToAnotherPage('postDetail/' + id + '/admin')
  }

}
