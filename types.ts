export enum Gender {
  Male = 'Male',
  Female = 'Female',
  Other = 'Other'
}

export enum Goal {
  LoseWeight = '减脂',
  BuildMuscle = '增肌',
  Maintain = '保持健康',
  ImproveCardio = '提升耐力'
}

export interface UserProfile {
  name: string;
  age: number;
  height: number; // cm
  weight: number; // kg
  gender: Gender;
  goal: Goal;
  dietaryRestrictions: string;
  activityLevel: 'Sedentary' | 'Lightly Active' | 'Active' | 'Very Active';
}

export interface Meal {
  name: string;
  calories: number;
  macros: {
    protein: string;
    carbs: string;
    fats: string;
  };
  description: string;
}

export interface Workout {
  name: string;
  duration: string;
  intensity: 'Low' | 'Medium' | 'High';
  exercises: string[];
}

export interface DailyPlan {
  day: string; // e.g., "Monday"
  focus: string; // e.g., "Leg Day" or "Low Carb"
  workouts: Workout[];
  meals: {
    breakfast: Meal;
    lunch: Meal;
    dinner: Meal;
    snack?: Meal;
  };
  status: 'pending' | 'completed';
}

export interface WeeklyPlan {
  summary: string;
  days: DailyPlan[];
  createdAt: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}
