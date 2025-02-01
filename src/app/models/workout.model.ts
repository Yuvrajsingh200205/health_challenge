export interface Workout {
    id?: number;
    date: Date;
    type: string;
    duration: number;
    intensity: 'Low' | 'Medium' | 'High';
    calories: number;
    notes?: string;
    userId: number;
  }