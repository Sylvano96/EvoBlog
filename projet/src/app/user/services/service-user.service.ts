import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceUserService {

  constructor(private HttpClient : HttpClient) { }


  createUser(data : {name:string, lastName : string, email : string, status : string, password : string, actif:boolean}){
    return this.HttpClient.post('http://localhost:8080/api/create/user', data)
  }
}
