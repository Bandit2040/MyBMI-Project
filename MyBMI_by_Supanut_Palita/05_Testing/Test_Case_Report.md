# Test Case Report – BMI Tracker

เอกสารนี้รวบรวม Test Case ที่ใช้ทดสอบระบบ BMI Tracker จำนวน 10 Test Cases  
ครอบคลุมกรณี Success, Category และการบันทึกข้อมูลจำลอง

---

## 🧪 Test Case Summary

| TC No. | Test Scenario | ชื่อผู้ใช้งาน | Input (Height/Weight) | Expected Output | Actual Output | Result |
|-------|--------------|--------------|----------------------|----------------|--------------|--------|
| TC01 | บันทึก BMI ปกติ | saint sung | 175 / 64 | BMI ≈ 20.9 → ปกติ | BMI = 20.9 → ปกติ | PASS |
| TC02 | บันทึก BMI ปกติ | supanut veerakul | 188 / 77 | BMI ≈ 21.79 → ปกติ | BMI = 21.79 → ปกติ | PASS |
| TC03 | บันทึก BMI ปกติ | arisa jirama | 155 / 55 | BMI ≈ 22.89 → ปกติ | BMI = 22.89 → ปกติ | PASS |
| TC04 | บันทึก BMI ผอม | palita pookaew | 161 / 45 | BMI ≈ 17.36 → ผอม | BMI = 17.36 → ผอม | PASS |
| TC05 | บันทึก BMI ปกติ | narin lookin | 173 / 67 | BMI ≈ 22.39 → ปกติ | BMI = 22.39 → ปกติ | PASS |
| TC06 | บันทึก BMI ปกติ | ploy payadee | 179 / 71 | BMI ≈ 22.16 → ปกติ | BMI = 22.16 → ปกติ | PASS |
| TC07 | บันทึก BMI น้ำหนักเกิน | penpicha kamkaew | 176 / 74 | BMI ≈ 23.89 → น้ำหนักเกิน | BMI = 23.89 → น้ำหนักเกิน | PASS |
| TC08 | บันทึก BMI น้ำหนักเกิน | Elon musk | 195 / 94 | BMI ≈ 24.72 → น้ำหนักเกิน | BMI = 24.72 → น้ำหนักเกิน | PASS |
| TC09 | บันทึก BMI ปกติ | Mark Zukberg | 180 / 70 | BMI ≈ 21.6 → ปกติ | BMI = 21.6 → ปกติ | PASS |
| TC10 | บันทึก BMI น้ำหนักเกิน | Peaky blinders | 175 / 71 | BMI ≈ 23.18 → น้ำหนักเกิน | BMI = 23.18 → น้ำหนักเกิน | PASS |
---

ตัวอย่างไฟล์:
- TC01to10.png