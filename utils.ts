
import { UnitType, BMICategory, BMIResult } from './types';

export const calculateBMI = (
  weight: number,
  height: number,
  unitType: UnitType,
  heightInch: number = 0
): BMIResult | null => {
  if (weight <= 0 || height <= 0) return null;

  let bmiValue: number;
  let idealMin: number;
  let idealMax: number;

  if (unitType === UnitType.METRIC) {
    const heightInMeters = height / 100;
    bmiValue = weight / (heightInMeters * heightInMeters);
    // Ideal range is BMI 18.5 to 24.9
    idealMin = 18.5 * (heightInMeters * heightInMeters);
    idealMax = 24.9 * (heightInMeters * heightInMeters);
  } else {
    const totalInches = (height * 12) + heightInch;
    if (totalInches <= 0) return null;
    bmiValue = 703 * (weight / (totalInches * totalInches));
    idealMin = (18.5 * (totalInches * totalInches)) / 703;
    idealMax = (24.9 * (totalInches * totalInches)) / 703;
  }

  const roundedBmi = parseFloat(bmiValue.toFixed(1));
  let category: BMICategory;
  let color: string;
  let description: string;

  if (roundedBmi < 18.5) {
    category = BMICategory.UNDERWEIGHT;
    color = 'text-sky-500';
    description = 'Focus on nutrient-dense foods and strength training to build healthy mass.';
  } else if (roundedBmi >= 18.5 && roundedBmi < 25) {
    category = BMICategory.NORMAL;
    color = 'text-emerald-500';
    description = 'Excellent! Your weight is perfectly balanced for your height.';
  } else if (roundedBmi >= 25 && roundedBmi < 30) {
    category = BMICategory.OVERWEIGHT;
    color = 'text-orange-500';
    description = 'Consider increasing daily activity and monitoring portion sizes.';
  } else {
    category = BMICategory.OBESE;
    color = 'text-rose-500';
    description = 'Prioritize heart health and consult a specialist for a sustainable plan.';
  }

  return {
    value: roundedBmi,
    category,
    color,
    description,
    idealWeightRange: {
      min: parseFloat(idealMin.toFixed(1)),
      max: parseFloat(idealMax.toFixed(1))
    }
  };
};

export const getGaugePosition = (bmi: number): number => {
  const min = 15;
  const max = 40;
  const percentage = ((bmi - min) / (max - min)) * 100;
  return Math.min(Math.max(percentage, 0), 100);
};

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};
