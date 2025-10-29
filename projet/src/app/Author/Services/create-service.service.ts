import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class CreateServiceService {

  
  constructor(private http : HttpClient) { }

  addContent(data : {title:string,  category: string, status:string, userId:number, image:string,contents: any[]}, file :File): Observable<any>{
    const formData = new FormData()
    formData.append('file', file)

    this.http.post('http://localhost:8080/api/upload', formData ).subscribe((response)=>{
      console.log("Résulat attendu de l' upload : ", response)
    }, (error)=>{
      console.log("Erreur : ", error)
    })
    
    return this.http.post('http://localhost:8080/api/create/post', data )  
  }

  getPosts(): Observable<any>{
    return this.http.get('http://localhost:8080/api/allPosts')
  }

  update(id:number){
    return this.http.get('http://localhost:8080/api/'+id+'/post')
  }

  updatePost(id:number, data : {title:string,  category: string, status:string, userId:number, image:string,contents: any[]}, file :File, oldFileName : string, lastFileName:string){
    if(oldFileName != lastFileName){
      const formData = new FormData()
      formData.append('file', file)
      this.http.post('http://localhost:8080/api/upload', formData).subscribe((response)=>{
        console.log("Résulat attendu de l' upload : ", response)
      }, (error)=>{
        console.log("Erreur : ", error)
      })
      return this.http.put('http://localhost:8080/api/'+id+'/update', data )
    }else{
      return this.http.put('http://localhost:8080/api/'+id+'/update', data )
    }
    
  }

  deletePost(id:number){
    return this.http.delete("http://localhost:8080/api/"+id+"/deletePost", {responseType:'text'} )
  }

  commentPost(data :{pseudo : string, postId: number, comment : string}){
    return this.http.post('http://localhost:8080/api/comment', data)
  }

  getComments(): Observable<any>{
    return this.http.get('http://localhost:8080/api/getComments')
  }

  deleteComment(id:number){
    return this.http.delete("http://localhost:8080/api/"+id+"/deleteComment", {responseType:'text'})
  }

  getUser(id:number){
    return this.http.get('http://localhost:8080/api/'+id+'/user')
  }

  validation(data : string){
    return this.http.post('http://localhost:8080/api/activation', data, {responseType:'text'})
  }

  login(data : {email : string, password : string}){
    return this.http.post('http://localhost:8080/api/login', data)
  }

  getUserPosts(id : string | null): Observable<any>{
    return this.http.get("http://localhost:8080/api/"+id+"/UserPosts")
  }
}
