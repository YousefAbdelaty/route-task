import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { IssuesService } from '../../../../core/issues.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-issue',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './create-issue.component.html',
  styleUrl: './create-issue.component.css'
})
export class CreateIssueComponent {

  postForm!: FormGroup;
  successMsg = '';
  errorMsg = '';
  isLoading = false; 

  constructor(
    public form: FormBuilder,
    private issueService: IssuesService,
    private router: Router
  ) {
    this.postForm = this.form.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      body: ['', [Validators.required]]
    });
  }

  formSubmit() {
    if (this.postForm.valid) {
      this.errorMsg = '';
      this.successMsg = '';
      this.isLoading = true;  
      this.issueService.createPost(this.postForm.value).subscribe({
        next: (res) => {
          this.isLoading = false;  
          this.successMsg = '✅ Issue created successfully! Redirecting...';
          setTimeout(() => {
            this.router.navigate(['/issues']);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }, 1500);
        },
        error: (err) => {
          this.isLoading = false;  
          this.errorMsg = 'Something went wrong. Please try again.';
        }
      });
    }
  }
}