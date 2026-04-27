import { Component } from '@angular/core';
import { IssuesService } from '../../../../core/issues.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';  // NEW: load both requests together

@Component({
  selector: 'app-issue-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './issue-details.component.html',
  styleUrl: './issue-details.component.css'
})
export class IssueDetailsComponent {

  constructor(
    private issueService: IssuesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  post: any = null;
  comments: any[] = [];
  errorMsg = '';
  isLoading = true; 

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      if (id) {
        this.isLoading = true;  
        forkJoin({
          post: this.issueService.getPostById(id),
          comments: this.issueService.getComments(id)
        }).subscribe({
          next: ({ post, comments }) => {
            this.post = post;
            this.comments = comments;
            this.isLoading = false;  
          },
          error: () => {
            this.errorMsg = 'Failed to load issue. Please try again.';
            this.isLoading = false;  
          }
        });
      }
    });
  }

  postsListNavigate() {
    this.router.navigate(['/issues']);
  }
}