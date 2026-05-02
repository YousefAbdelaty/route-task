import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IssuesService } from '../../../../core/issues.service';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Post, Comment } from '../../../../core/issue.models';

@Component({
  selector: 'app-issue-details',
  standalone: true,
  imports: [],
  templateUrl: './issue-details.component.html',
  styleUrl: './issue-details.component.css'
})
export class IssueDetailsComponent implements OnInit {

  private destroyRef = inject(DestroyRef);

  constructor(
    private issueService: IssuesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  post: Post | null = null;
  comments: Comment[] = [];
  errorMsg = '';
  isLoading = true;

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap(params => {           
        const id = Number(params.get('id'));
        this.isLoading = true;
        return forkJoin({
          post: this.issueService.getPostById(id),
          comments: this.issueService.getComments(id)
        });
      }),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
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

  postsListNavigate() {
    this.router.navigate(['/issues']);
  }
}