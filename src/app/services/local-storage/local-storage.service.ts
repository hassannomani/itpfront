import { Injectable } from '@angular/core';

export interface storedUser {
  id: string,
  username: string,
  token: string,
  roles: String,
  email: String,
  expires: Number
}

export interface UnregisteredUser {
  un_tin: string,
  un_nid: string,
  un_mobile: string,
  un_tinData: {}
}

export interface storedAgntReptv{
  agent: {},
  representative: {}
}
@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  saveStorageItems(obj :any){

    localStorage.setItem('token', JSON.stringify(obj.token));
    localStorage.setItem('id', JSON.stringify(obj.id));
    localStorage.setItem('username', JSON.stringify(obj.username));
    localStorage.setItem('email', JSON.stringify(obj.email));
    localStorage.setItem('role', JSON.stringify(obj.roles[0]));

    let current_time = new Date()
    let mil_sec = current_time.getTime()
    let expires_in = mil_sec+76300000

    localStorage.setItem('expires', JSON.stringify(expires_in));


  }

  getStorageItems(){

    let obj={
      "id": localStorage.getItem('id'),
      "username": localStorage.getItem('username'),
      "token": localStorage.getItem('token'),
      "email" : localStorage.getItem('email'),
      "role": localStorage.getItem('role'),
      "expires": localStorage.getItem('expires')
    }
    return obj;
  }
  deletetorageItems(){
    console.log("called from unknown")
    localStorage.clear();
    return {
      "id": "",
      "username": "",
      "token": "",
      "role": "",
      "email": ""
    };
  }

  saveAgent(obj: any){
    localStorage.setItem("agent",JSON.stringify(obj))
  }
  getAgent(){
    let obj= localStorage.getItem("agent")
    return obj?JSON.parse(obj):""
  }
  deleteAgent(){
    localStorage.removeItem("agent")
  }
  saveRepresentative(obj: any){
    localStorage.setItem("representative",JSON.stringify(obj))
  }
  getRepresentative(){
    let obj= localStorage.getItem("representative")
    return obj?JSON.parse(obj):""
  }
  deleteRepresentative(){
    localStorage.removeItem("representative")
  }

  saveUnregisteredUser(obj: any){

    localStorage.setItem('un_nid', JSON.stringify(obj.un_nid));
    localStorage.setItem('un_tin', JSON.stringify(obj.un_tin));
    localStorage.setItem('un_mobile', JSON.stringify(obj.un_mobile));
    localStorage.setItem('un_tinData', JSON.stringify(obj.un_tinData));
    console.log(this.getUnregisteredUser())
  }
  getUnregisteredUser(){
    console.log("Getting call")
    let obj={
      "un_nid": localStorage.getItem('un_nid'),
      "un_tin": localStorage.getItem('un_tin'),
      "un_mobile": localStorage.getItem('un_mobile'),
      "un_tinData" : localStorage.getItem('un_tinData')
    }
    console.log("returning ")
    console.log(obj)

    return obj;
  }
  deleteUnregisteredUser(){
    console.log("delete is called")
    localStorage.removeItem("un_nid")
    localStorage.removeItem("un_tin")
    localStorage.removeItem("un_mobile")
    localStorage.removeItem("un_tinData")
  }
  isAdmin(){
    let obj = this.getStorageItems()
    console.log(obj["role"])
    return obj["role"]?JSON.parse(obj["role"])=="ROLE_ADMIN":false
  }

}

