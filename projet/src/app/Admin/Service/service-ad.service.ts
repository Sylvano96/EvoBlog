import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceAdService {

  constructor(private http: HttpClient) { }

  url: string = 'http://localhost:8080/api/'

  getAllUsers(): Observable<any> {
    return this.http.get(this.url + 'allUsers')
  }
  // allPostsForUsers

  deleteUser(id: number) {
    return this.http.delete(this.url + id + '/deleteUser', { responseType: 'text' })
  }

  deletePost(id: number) {
    return this.http.delete(this.url + id + '/deletePost', { responseType: 'text' })
  }

  getPublishedPosts(): Observable<any[]> {
    return this.http.get<any[]>(this.url + 'data/published-by-category')
  }

  getAllPostsForUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.url + 'allPostsForUsers')
  }

  getPublishedAllPosts(): Observable<any[]> {
    return this.http.get<any[]>(this.url + 'data/published-by-allCategory')
  }

  getUserPosts(): Observable<any[]> {
    return this.http.get<any[]>(this.url + 'data/userPosts')
  }

  getUserAllPosts(id: number): Observable<any> {
    return this.http.get(this.url + id + '/UserPosts')
  }

  getSearchPosts(value: string): Observable<any> {
    return this.http.get(this.url + value + '/searchPosts')
  }

  //
}
