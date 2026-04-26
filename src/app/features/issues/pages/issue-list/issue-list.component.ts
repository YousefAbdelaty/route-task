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
  search = '';

  ngOnInit(){
    this.issueService.getAllPosts().subscribe(data =>{
      this.posts = data;
    });
  }

  postNavigate(id:number){
    this.router.navigate(['/issues' , id]);
    window.scrollTo({top:0,behavior:'smooth'});

  }


}
