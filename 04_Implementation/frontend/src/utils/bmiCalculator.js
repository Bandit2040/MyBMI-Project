export function calculateBMI(weightKg, heightCm) {
  const hMeters = heightCm / 100;
  const bmi = weightKg / (hMeters * hMeters);
  return Number(bmi.toFixed(2));
}

export function getBMICategory(bmi) {
  if (bmi < 18.5) return 'ผอม';
  if (bmi < 23) return 'ปกติ';
  if (bmi < 25) return 'น้ำหนักเกิน';
  return 'อ้วน';
}
