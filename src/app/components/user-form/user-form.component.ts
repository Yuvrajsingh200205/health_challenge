import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="card p-4 mb-4">
      <h3 class="mb-4">Add New User</h3>
      <form [formGroup]="userForm" (ngSubmit)="onSubmit()">
        <div class="mb-3">
          <label class="form-label">Name</label>
          <input type="text" class="form-control" formControlName="name">
        </div>
        
        <div class="mb-3">
          <label class="form-label">Email</label>
          <input type="email" class="form-control" formControlName="email">
        </div>

        <button type="submit" class="btn btn-primary w-100" [disabled]="!userForm.valid">
          Add User
        </button>
      </form>
    </div>
  `
})
export class UserFormComponent {
  @Output() userAdded = new EventEmitter<User>();
  userForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const colors = ['#4e54c8', '#2ecc71', '#e74c3c', '#f39c12', '#9b59b6'];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      
      const user: Partial<User> = {
        ...this.userForm.value,
        avatarColor: randomColor
      };
      
      this.userAdded.emit(user as User);
      this.userForm.reset();
    }
  }
}