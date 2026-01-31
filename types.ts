
export enum UnitType {
  METRIC = 'METRIC',
  IMPERIAL = 'IMPERIAL'
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
}
