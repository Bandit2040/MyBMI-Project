import { useState, useEffect } from "react";
import "./App.css";
import BmiForm from "./components/BmiForm";
import BmiResult from "./components/BmiResult";
import HistoryTable from "./components/HistoryTable";
import BmiChart from "./components/BmiChart";
import { useBmiHistory } from "./hooks/useBmiHistory";

function App() {
  const { history, addRecord, deleteRecord } = useBmiHistory();
  const [currentResult, setCurrentResult] = useState(null);
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('theme') || 'light';
    } catch { return 'light'; }
  });
  const [lang, setLang] = useState(() => {
    try { return localStorage.getItem('lang') || 'th'; } catch { return 'th'; }
  });

  useEffect(() => {
    try {
      document.title = "Software Final Project";
      document.documentElement.setAttribute('data-theme', theme === 'dark' ? 'dark' : 'light');
      localStorage.setItem('theme', theme);
    } catch (e) {}
  }, [theme]);

  useEffect(() => {
    try {
      document.documentElement.setAttribute('data-lang', lang === 'en' ? 'en' : 'th');
      localStorage.setItem('lang', lang);
    } catch (e) {}
  }, [lang]);

  useEffect(() => {
    try { localStorage.setItem('lang', lang); } catch {}
  }, [lang]);

  function handleCalculate(record) {
    setCurrentResult(record);
    addRecord(record);
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:12}}>
          <div>
            <h1 style={{margin:0}}>BMI Tracker</h1>
            <div className="meta" style={{justifyContent:'flex-start',marginTop:8}}>
                <div className="author">
                  {lang === 'en' ? (
                    <>Supanat Veerakul — No. 26 — Student ID: 1670704475</>
                  ) : (
                    <>ศุภณัฐ วีระกูล — เลขที่ 26 — 1670704475</>
                  )}
                </div>
                <div className="author">
                  {lang === 'en' ? (
                    <>Palita Sophukiao — No. 28 — Student ID: 1670705548</>
                  ) : (
                    <>ปาลิตา โสภูเขียว — เลขที่ 28 — 1670705548</>
                  )}
                </div>
            </div>
          </div>
          <div style={{display:'flex',gap:8,alignItems:'center'}}>
            <div className="small muted" style={{marginRight:6}}>{lang === 'en' ? 'Mode' : 'โหมด'}</div>
            <button className="btn secondary" onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}>{theme === 'dark' ? (lang === 'en' ? 'Day' : 'กลางวัน') : (lang === 'en' ? 'Night' : 'กลางคืน')}</button>
            <button className="btn secondary" onClick={() => setLang(l => l === 'en' ? 'th' : 'en')}>{lang === 'en' ? 'ไทย' : 'EN'}</button>
          </div>
        </div>
      </header>

      <div className="grid">
        <div className="card">
          <BmiForm onCalculate={handleCalculate} lang={lang} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div className="card">
            <BmiResult result={currentResult} lang={lang} />
          </div>

          <div className="card small">
            <div className="small">{lang === 'en' ? 'Purpose: record BMI and track trends over time' : 'วัตถุประสงค์: บันทึกค่าดัชนีมวลกาย (BMI) และติดตามแนวโน้มตามเวลา'}</div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 18 }} className="card">
        <HistoryTable history={history} onDelete={deleteRecord} lang={lang} />
      </div>

      <div style={{ marginTop: 18 }} className="card">
        <BmiChart history={history} lang={lang} />
      </div>
    </div>
  );
}

export default App;
