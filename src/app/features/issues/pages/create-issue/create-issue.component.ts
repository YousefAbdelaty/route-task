import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { IssuesService } from '../../../../core/issues.service';
import { Router } from '@angular/router';
import { CreatePostPayload } from '../../../../core/issue.models';

@Component({
  selector: 'app-create-issue',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './create-issue.component.html',
  styleUrl: './create-issue.component.css'
})
export class CreateIssueComponent {

  private destroyRef = inject(DestroyRef);  

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
      this.issueService.createPost(this.postForm.value as CreatePostPayload).pipe(
        takeUntilDestroyed(this.destroyRef)  
      ).subscribe({
        next: () => {
          this.isLoading = false;
          this.successMsg = '✅ Issue created successfully! Redirecting...';
          setTimeout(() => {
            this.router.navigate(['/issues']);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }, 1500);
        },
        error: () => {
          this.isLoading = false;
          this.errorMsg = 'Something went wrong. Please try again.';
        }
      });
    }
  }
}