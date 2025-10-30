import { Injectable } from '@angular/core';
import { CanActivate,Router  } from "@angular/router";

@Injectable({
    providedIn:'root'
})


export class AuthService {

    constructor(){}

    isLoggedIn():boolean{
        return !! localStorage.getItem('token')
    }

    login(token : string){
        localStorage.setItem('token', token)
    }

    setAuthId(id:string){
        localStorage.setItem("user_id", id)
    }

    getAuthId(){
        return localStorage.getItem('user_id')
    }

    getName(){
        return localStorage.getItem('name')
    }

    setName(name:string){
        localStorage.setItem('name', name)
    }

    logOut(){
        localStorage.removeItem("name")
        localStorage.removeItem("user_id")
        localStorage.removeItem("token")
    }
}