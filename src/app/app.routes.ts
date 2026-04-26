import { Routes } from '@angular/router';
import { IssueListComponent } from './features/issues/pages/issue-list/issue-list.component';
import { CreateIssueComponent } from './features/issues/pages/create-issue/create-issue.component';
import { IssueDetailsComponent } from './features/issues/pages/issue-details/issue-details.component';

export const routes: Routes = [
    {path:'' , redirectTo: 'issues' , pathMatch: 'full'},
    {path: 'issues' , component: IssueListComponent},
    {path: 'issues/new' , component: CreateIssueComponent},
    {path: 'issues/:id' , component: IssueDetailsComponent},
];
