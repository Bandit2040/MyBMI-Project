import { useState } from 'react';
import { calculateBMI, getBMICategory } from '../utils/bmiCalculator';

function BmiForm({ onCalculate, lang = 'th' }) {
  const [name, setName] = useState('');
  const [nationalId, setNationalId] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    if (!name) {
      setError(lang === 'en' ? 'Please enter full name' : 'กรุณากรอกชื่อและนามสกุล');
      return;
    }

    if (!nationalId) {
      setError(lang === 'en' ? 'Please enter national ID' : 'กรุณากรอกเลขบัตรประชาชน');
      return;
    }

    // ตรวจสอบรูปแบบเลขบัตรประชาชน (ตัวอย่าง: 13 หลัก)
    const nidClean = String(nationalId).replace(/[^0-9]/g, '');
    if (nidClean.length !== 13) {
      setError(lang === 'en' ? 'National ID must be 13 digits' : 'เลขบัตรประชาชนต้องมี 13 หลัก');
      return;
    }

    if (!weight || !height) {
      setError(lang === 'en' ? 'Please enter weight and height' : 'กรุณากรอกน้ำหนักและส่วนสูงให้ครบ');
      return;
    }

    const w = Number(weight);
    const h = Number(height);

    if (w <= 0 || h <= 0) {
      setError(lang === 'en' ? 'Weight/height must be greater than 0' : 'ค่าน้ำหนัก/ส่วนสูงต้องมากกว่า 0');
      return;
    }

    setError('');

    const bmi = calculateBMI(w, h);
    const category = getBMICategory(bmi);

    const record = {
      id: Date.now(),
      date: new Date().toLocaleString(),
      name: name.trim(),
      nationalId: nidClean,
      weight: w,
      height: h,
      bmi,
      category,
    };

    onCalculate(record);
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="form-group">
        <label>{lang === 'en' ? 'Full name' : 'ชื่อนามสกุล'}</label>
        <input
          type="text"
          placeholder={lang === 'en' ? 'e.g. Somchai Jaidee' : 'เช่น สมชาย ใจดี'}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>{lang === 'en' ? 'National ID' : 'เลขบัตรประชาชน'}</label>
        <input
          type="text"
          placeholder={lang === 'en' ? '13 digits, no dashes (auto-formatted)' : '13 หลัก ไม่มีขีด (จะจัดรูปแบบอัตโนมัติ)'}
          value={nationalId}
          onChange={(e) => {
            // ให้พิมพ์ได้เฉพาะตัวเลข และจัดรูปแบบให้สวยขึ้นตามกลุ่ม
            const digits = (e.target.value || '').replace(/[^0-9]/g, '');
            // กลุ่มตามรูปแบบไทย: 1-2345-67890-12-3
            const parts = [];
            if (digits.length > 0) parts.push(digits.slice(0, 1));
            if (digits.length > 1) parts.push(digits.slice(1, 5));
            if (digits.length > 5) parts.push(digits.slice(5, 10));
            if (digits.length > 10) parts.push(digits.slice(10, 12));
            if (digits.length > 12) parts.push(digits.slice(12, 13));
            const formatted = parts.filter(Boolean).join('-');
            setNationalId(formatted);
          }}
        />
        <div className="small muted">{lang === 'en' ? 'Will be stored as 13 digits in history' : 'จะถูกบันทึกเป็นตัวเลข 13 หลักในประวัติ'}</div>
      </div>

      <div className="form-row">
        <div style={{flex:1}} className="form-group">
          <label>{lang === 'en' ? 'Weight (kg)' : 'น้ำหนัก (กก.)'}</label>
          <input
            type="number"
            placeholder={lang === 'en' ? 'e.g. 65' : 'เช่น 65'}
            value={weight}
            onChange={e => setWeight(e.target.value)}
          />
        </div>

        <div style={{width:140}} className="form-group">
          <label>{lang === 'en' ? 'Height (cm)' : 'ส่วนสูง (ซม.)'}</label>
          <input
            type="number"
            placeholder={lang === 'en' ? 'e.g. 170' : 'เช่น 170'}
            value={height}
            onChange={e => setHeight(e.target.value)}
          />
        </div>
      </div>

      {error && <p style={{ color: 'var(--danger)', marginTop:6 }}>{error}</p>}

      <div className="form-actions">
        <button className="btn" type="submit">{lang === 'en' ? 'Calculate BMI' : 'คำนวณ BMI'}</button>
        <button type="button" className="btn secondary" onClick={() => { setName(''); setNationalId(''); setWeight(''); setHeight(''); setError(''); }}>{lang === 'en' ? 'Reset' : 'รีเซ็ต'}</button>
      </div>
    </form>
  );
}

export default BmiForm;
