import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart } from 'angular-highcharts';
import { ChartModule } from 'angular-highcharts';
import { Workout } from '../../models/workout.model';

@Component({
  selector: 'app-workout-chart',
  standalone: true,
  imports: [CommonModule, ChartModule],
  template: `
    <div class="card p-4 mt-4">
      <h3>Workout Progress</h3>
      <div [chart]="chart"></div>
    </div>
  `
})
export class WorkoutChartComponent implements OnChanges {
  @Input() workouts: Workout[] = [];
  chart: Chart;

  constructor() {
    this.chart = new Chart({
      chart: { type: 'line' },
      title: { text: 'Workout Progress' },
      credits: { enabled: false },
      series: [
        {
          name: 'Duration (minutes)',
          type: 'line',
          data: []
        },
        {
          name: 'Calories Burned',
          type: 'line',
          data: []
        }
      ]
    });
  }

  ngOnChanges(): void {
    this.updateChart();
  }

  private updateChart(): void {
    if (!this.workouts.length) return;

    const sortedWorkouts = [...this.workouts].sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    const dates = sortedWorkouts.map(w => new Date(w.date).toLocaleDateString());
    const durations = sortedWorkouts.map(w => w.duration);
    const calories = sortedWorkouts.map(w => w.calories);

    this.chart.ref$.subscribe(chart => {
      if (chart) {
        chart.xAxis[0].setCategories(dates);
        chart.series[0].setData(durations);
        chart.series[1].setData(calories);
      }
    });
  }
}
