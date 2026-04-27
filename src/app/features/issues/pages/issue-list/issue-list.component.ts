import { Component } from '@angular/core';
import { IssuesService } from '../../../../core/issues.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from "@angular/router";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-issue-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './issue-list.component.html',
  styleUrl: './issue-list.component.css'
})
export class IssueListComponent {

  constructor(private issueService: IssuesService, private router: Router) {}

  posts: any[] = [];
  allPosts: any[] = [];
  searchTerm = '';
  isLoading = true;       
  errorMsg = '';          

  ngOnInit() {
    this.isLoading = true;
    this.issueService.getAllPosts().subscribe({
      next: (data) => {
        this.posts = data.slice(0, 50);
        this.allPosts = data.slice(0, 50);
        this.isLoading = false;
      },
      error: (err) => {
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