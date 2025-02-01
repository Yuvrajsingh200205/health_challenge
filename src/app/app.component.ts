import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkoutFormComponent } from './components/workout-form/workout-form.component';
import { WorkoutListComponent } from './components/workout-list/workout-list.component';
import { WorkoutChartComponent } from './components/workout-chart/workout-chart.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { User } from './models/user.model';
import { Workout } from './models/workout.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    WorkoutFormComponent,
    WorkoutListComponent,
    WorkoutChartComponent,
    UserFormComponent,
    UserListComponent
  ],
  template: `
  <div class="container-fluid py-5">
    <app-user-form (userAdded)="onUserAdded($event)"></app-user-form>
    
    <app-user-list
      [users]="users"
      (userSelected)="onUserSelected($event)">
    </app-user-list>

    <div *ngIf="selectedUser" class="row">
      <div class="col-md-6">
        <app-workout-form
          [userId]="selectedUser.id"
          (workoutAdded)="onWorkoutAdded($event)">
        </app-workout-form>
      </div>
      
      <div class="col-md-6">
        <app-workout-list
          [workouts]="filteredWorkouts">
        </app-workout-list>
      </div>
    </div>

    <app-workout-chart
      *ngIf="selectedUser"
      [workouts]="filteredWorkouts">
    </app-workout-chart>
  </div>
  `
})
export class AppComponent {
  users: User[] = [];
  workouts: Workout[] = [];
  selectedUser: User | null = null;

  get filteredWorkouts(): Workout[] {
    return this.workouts.filter(w => w.userId === this.selectedUser?.id);
  }

  onUserAdded(user: Partial<User>): void {
    const newUser: User = {
      ...user,
      id: this.users.length + 1
    } as User;
    
    this.users = [...this.users, newUser];
  }

  onUserSelected(user: User): void {
    this.selectedUser = user;
  }

  onWorkoutAdded(workout: Workout): void {
    if (!this.selectedUser) return;
    
    const newWorkout: Workout = {
      ...workout,
      id: this.workouts.length + 1,
      userId: this.selectedUser.id // Ensure userId is included
    };

    this.workouts = [...this.workouts, newWorkout];
  }
}
