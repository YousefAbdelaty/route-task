import { Component } from '@angular/core';
import { IssuesService } from '../../../../core/issues.service';
import { CommonModule } from '@angular/common';
import { map } from 'rxjs';
import { Router, RouterLink } from "@angular/router";
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-issue-list',
  standalone: true,
  imports: [CommonModule, RouterLink , FormsModule],
  templateUrl: './issue-list.component.html',
  styleUrl: './issue-list.component.css'
})
export class IssueListComponent {
  
  constructor(private issueService : IssuesService , private router:Router){}
  posts:any[]=[];
  searchTerm = '';
  allPosts:any[]=[];

  ngOnInit(){
    this.issueService.getAllPosts().subscribe(data =>{
      this.posts = data;
      this.allPosts = data;
    });
  }


  postNavigate(id:number){
    this.router.navigate(['/issues' , id]);
    window.scrollTo({top:0,behavior:'smooth'});
  }

  searching() {
    const term = this.searchTerm.trim().toLowerCase();
    if (!term) {
      this.posts = this.allPosts;
      return;
    }
      this.posts = this.posts.filter(p =>
      p.title.toLowerCase().includes(term)
    );
  }

  clearSearch() {
    this.searchTerm = '';
    this.posts = this.allPosts;
  }


}
