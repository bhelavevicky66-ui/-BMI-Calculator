
export enum UnitType {
  METRIC = 'METRIC',
  US = 'US'
}

export enum Gender {
  MALE = 'Male',
  FEMALE = 'Female'
}

export enum BMICategory {
  UNDERWEIGHT = 'Underweight',
  NORMAL = 'Normal',
  OVERWEIGHT = 'Overweight',
  OBESE = 'Obese'
}

export interface BMIResult {
  value: number;
  category: BMICategory;
  color: string;
  description: string;
  idealWeightRange: { min: number; max: number };
}

export interface HistoryEntry {
  id: string;
  date: string;
  bmi: number;
  category: BMICategory;
  weight: number;
  unit: string;
}
