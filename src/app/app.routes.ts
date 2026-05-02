import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'issues', pathMatch: 'full' },
  {
    path: 'issues',
    loadComponent: () =>
      import('./features/issues/pages/issue-list/issue-list.component')
        .then(m => m.IssueListComponent)
  },
  {
    path: 'issues/new',
    loadComponent: () =>
      import('./features/issues/pages/create-issue/create-issue.component')
        .then(m => m.CreateIssueComponent)
  },
  {
    path: 'issues/:id',
    loadComponent: () =>
      import('./features/issues/pages/issue-details/issue-details.component')
        .then(m => m.IssueDetailsComponent)
  }
];