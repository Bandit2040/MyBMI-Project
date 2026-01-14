import { useEffect, useState } from 'react';

const STORAGE_KEY = 'bmi_history';

export function useBmiHistory() {
  const [history, setHistory] = useState([]);

  // โหลดข้อมูลจาก localStorage ครั้งแรก
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setHistory(JSON.parse(saved));
    }
  }, []);

  // บันทึกลง localStorage ทุกครั้งที่ history เปลี่ยน
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  }, [history]);

  function addRecord(record) {
    setHistory(prev => [...prev, record]);
  }

  function deleteRecord(id) {
    setHistory(prev => prev.filter(item => item.id !== id));
  }

  return { history, addRecord, deleteRecord };
}
