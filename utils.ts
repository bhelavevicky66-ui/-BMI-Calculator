
import { UnitType, BMICategory, BMIResult } from './types';

export const calculateBMI = (
  weight: number,
  height: number,
  unitType: UnitType,
  heightInch: number = 0
): BMIResult | null => {
  if (weight <= 0 || height <= 0) return null;

  let bmiValue: number;

  if (unitType === UnitType.METRIC) {
    // weight in kg, height in cm
    const heightInMeters = height / 100;
    bmiValue = weight / (heightInMeters * heightInMeters);
  } else {
    // weight in lbs, height in feet + inches
    const totalInches = (height * 12) + heightInch;
    if (totalInches <= 0) return null;
    bmiValue = 703 * (weight / (totalInches * totalInches));
  }

  const roundedBmi = parseFloat(bmiValue.toFixed(1));
  let category: BMICategory;
  let color: string;
  let description: string;

  if (roundedBmi < 18.5) {
    category = BMICategory.UNDERWEIGHT;
    color = 'text-blue-500';
    description = 'Your BMI indicates you are in the underweight range. It is important to consult with a healthcare professional to discuss your overall health and nutrition.';
  } else if (roundedBmi >= 18.5 && roundedBmi < 25) {
    category = BMICategory.NORMAL;
    color = 'text-emerald-500';
    description = 'Congratulations! Your BMI is within the healthy range. Maintaining a balanced diet and regular physical activity are key to staying here.';
  } else if (roundedBmi >= 25 && roundedBmi < 30) {
    category = BMICategory.OVERWEIGHT;
    color = 'text-amber-500';
    description = 'Your BMI indicates you are in the overweight range. Small changes to your diet and activity level can have a positive impact on your health.';
  } else {
    category = BMICategory.OBESE;
    color = 'text-rose-500';
    description = 'Your BMI indicates you are in the obese range. Focusing on sustainable lifestyle changes and seeking guidance from health professionals can help manage health risks.';
  }

  return {
    value: roundedBmi,
    category,
    color,
    description
  };
};

export const getGaugePosition = (bmi: number): number => {
  // Map BMI 15-40 to 0-100%
  const min = 15;
  const max = 40;
  const percentage = ((bmi - min) / (max - min)) * 100;
  return Math.min(Math.max(percentage, 0), 100);
};
