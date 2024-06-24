import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BlogService {


  allBlogs:BehaviorSubject<any>=new BehaviorSubject('')
  constructor(private _HttpClient:HttpClient) {
    this.assignBlogs()
  }
  assignBlogs():void{
    this.getAllBlogs().subscribe({
      next:(response)=>{
        this.allBlogs.next(response)
      }
    })
  }
  createBlog(model:any):Observable<any>{
    let myContent=model.content
    delete model.content
    const finalModel={
      frontMatter:model,
      content:myContent
    }
    return this._HttpClient.post(environment.baseApi.replace('auth','admin') + `blog/create`,finalModel)
  }
  getAllBlogs():Observable<any>{
    return this._HttpClient.get(environment.baseApi.replace('auth','user') + `blog/getAll`)
  }
  putImage(model:any):Observable<any>{
    return  this._HttpClient.post(environment.baseApi.replace('auth','admin')+`blog/image`,model)
  }
  deleteBlog(id:string):Observable<any>{
    return this._HttpClient.delete(environment.baseApi.replace('auth','admin') + `blog/delete?id=${id}`)
  }
  upadteBlog(model:any,id:string,img:any):Observable<any>{
    let myContent=model.content
    delete model.content
    const finalModel ={
      frontMatter:{...model,images:img},
      content:myContent,
      id:id
    }
    return this._HttpClient.put(environment.baseApi.replace('auth','admin')+`blog/update`,finalModel)
  }
}
