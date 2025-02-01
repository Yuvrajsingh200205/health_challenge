import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Workout } from '../../models/workout.model';

@Component({
  selector: 'app-workout-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="card p-4 mb-4">
      <h3>Add New Workout</h3>
      <form [formGroup]="workoutForm" (ngSubmit)="onSubmit()">
        <div class="mb-3">
          <label class="form-label">Date</label>
          <input type="date" class="form-control" formControlName="date">
          <div *ngIf="workoutForm.get('date')?.invalid && workoutForm.get('date')?.touched" class="text-danger">
            Date is required.
          </div>
        </div>
        
        <div class="mb-3">
          <label class="form-label">Type</label>
          <select class="form-select" formControlName="type">
            <option value="">Select workout type</option>
            <option value="Running">Running</option>
            <option value="Cycling">Cycling</option>
            <option value="Swimming">Swimming</option>
            <option value="Weight Training">Weight Training</option>
            <option value="Yoga">Yoga</option>
          </select>
          <div *ngIf="workoutForm.get('type')?.invalid && workoutForm.get('type')?.touched" class="text-danger">
            Workout type is required.
          </div>
        </div>

        <div class="mb-3">
          <label class="form-label">Duration (minutes)</label>
          <input type="number" class="form-control" formControlName="duration">
          <div *ngIf="workoutForm.get('duration')?.invalid && workoutForm.get('duration')?.touched" class="text-danger">
            Duration must be at least 1 minute.
          </div>
        </div>

        <div class="mb-3">
          <label class="form-label">Intensity</label>
          <select class="form-select" formControlName="intensity">
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <div *ngIf="workoutForm.get('intensity')?.invalid && workoutForm.get('intensity')?.touched" class="text-danger">
            Intensity is required.
          </div>
        </div>

        <div class="mb-3">
          <label class="form-label">Calories Burned</label>
          <input type="number" class="form-control" formControlName="calories">
          <div *ngIf="workoutForm.get('calories')?.invalid && workoutForm.get('calories')?.touched" class="text-danger">
            Calories must be a positive number.
          </div>
        </div>

        <div class="mb-3">
          <label class="form-label">Notes</label>
          <textarea class="form-control" formControlName="notes"></textarea>
        </div>

        <button type="submit" class="btn btn-primary" [disabled]="!workoutForm.valid">
          Add Workout
        </button>
      </form>
    </div>
  `
})
export class WorkoutFormComponent {
  @Input() userId: number | null = null; // Add userId input property
  @Output() workoutAdded = new EventEmitter<Workout>();
  workoutForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.workoutForm = this.fb.group({
      date: ['', Validators.required],
      type: ['', Validators.required],
      duration: ['', [Validators.required, Validators.min(1)]],
      intensity: ['Medium', Validators.required],
      calories: ['', [Validators.required, Validators.min(0)]],
      notes: ['']
    });
  }

  onSubmit(): void {
    if (this.workoutForm.valid && this.userId) {
      const workout: Workout = {
        ...this.workoutForm.value,
        userId: this.userId // Include userId in the emitted workout
      };
      this.workoutAdded.emit(workout);
      this.workoutForm.reset({
        intensity: 'Medium'
      });
    }
  }
}