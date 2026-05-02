import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment, CreatePostPayload, Post } from './issue.models';

@Injectable({
  providedIn: 'root'
})
export class IssuesService {

  constructor(private http: HttpClient) {}

  url = 'https://jsonplaceholder.typicode.com';

  getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.url}/posts`);
  }

  getPostById(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.url}/posts/${id}`);
  }

  getComments(id: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.url}/posts/${id}/comments`);
  }

  createPost(data: CreatePostPayload): Observable<Post> {
    return this.http.post<Post>(`${this.url}/posts`, data);
  }
}