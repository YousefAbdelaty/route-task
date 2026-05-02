import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IssuesService } from '../../../../core/issues.service';
import { Router, RouterLink } from "@angular/router";
import { FormsModule } from '@angular/forms';
import { Post } from '../../../../core/issue.models';

@Component({
  selector: 'app-issue-list',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './issue-list.component.html',
  styleUrl: './issue-list.component.css'
})
export class IssueListComponent implements OnInit {

  private destroyRef = inject(DestroyRef); 

  constructor(private issueService: IssuesService, private router: Router) {}

  posts: Post[] = [];
  allPosts: Post[] = [];
  searchTerm = '';
  isLoading = true;
  errorMsg = '';

  ngOnInit() {
    this.issueService.getAllPosts().pipe(
      takeUntilDestroyed(this.destroyRef)   
    ).subscribe({
      next: (data) => {
        this.posts = data.slice(0, 50);
        this.allPosts = data.slice(0, 50);
        this.isLoading = false;
      },
      error: () => {
        this.errorMsg = 'Failed to load issues. Please try again.';
        this.isLoading = false;
      }
    });
  }

  postNavigate(id: number) {
    this.router.navigate(['/issues', id]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  searching() {
    const term = this.searchTerm.trim().toLowerCase();
    if (!term) {
      this.posts = this.allPosts;
      return;
    }
    this.posts = this.allPosts.filter(p =>
      p.title.toLowerCase().includes(term)
    );
  }

  clearSearch() {
    this.searchTerm = '';
    this.posts = this.allPosts;
  }
}