import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Workout } from '../../models/workout.model';

@Component({
  selector: 'app-workout-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card p-4">
      <h3>Workout History</h3>
      <div class="table-responsive">
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Duration</th>
              <th>Intensity</th>
              <th>Calories</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let workout of workouts">
              <td>{{workout.date | date:'shortDate'}}</td>
              <td>{{workout.type}}</td>
              <td>{{workout.duration}} min</td>
              <td>{{workout.intensity}}</td>
              <td>{{workout.calories}}</td>
              <td>{{workout.notes}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `
})
export class WorkoutListComponent {
  @Input() workouts: Workout[] = [];
}
