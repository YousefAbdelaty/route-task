import { Component } from '@angular/core';
import { IssuesService } from '../../../../core/issues.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-issue-details',
  standalone: true,
  imports: [FormsModule , CommonModule],
  templateUrl: './issue-details.component.html',
  styleUrl: './issue-details.component.css'
})
export class IssueDetailsComponent {
  constructor(private issueService:IssuesService , private route:ActivatedRoute , private router:Router){}
  post:any;
  comments:any[]=[];

  ngOnInit(){
    this.route.paramMap.subscribe(params => {
      const id = Number (params.get('id'));
      if(id){
        this.issueService.getPostById(id).subscribe(data=>{
          this.post = data;
        });
        this.issueService.getComments(id).subscribe(data=>{
          this.comments = data;
        });
      }
    });
  }

  postsListNavigate(){
    this.router.navigate(['/issues']);
  }

}
