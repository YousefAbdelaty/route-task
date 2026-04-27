import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class IssuesService {

  constructor(private http:HttpClient) {}

  url = 'https://jsonplaceholder.typicode.com';

  getAllPosts():Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/posts`);
  }

  getPostById(id:number):Observable<any>{
    return this.http.get(`${this.url}/posts/${id}`);
  }

  getComments(id:number):Observable<any[]>{
    return this.http.get<any[]>(`${this.url}/posts/${id}/comments`);  
  }

  createPost(data:any){
    return this.http.post(`${this.url}/posts`,data);
  }

}
