function BmiResult({ result, lang = 'th' }) {
  if (!result) return null;

  return (
    <div className="result-grid">
      <h2 style={{marginTop:0}}>{lang === 'en' ? 'Latest result' : 'ผลลัพธ์ล่าสุด'}</h2>
      <div className="card">
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <div>
            <div style={{fontSize:16,fontWeight:700}}>{result.name}</div>
            <div className="small id-mono">{maskNationalId(result.nationalId)}</div>
          </div>
          <div style={{textAlign:'right'}}>
            <div style={{fontSize:20,fontWeight:800}}>{result.bmi}</div>
            <div className="small muted">{result.category}</div>
          </div>
        </div>
        <div style={{marginTop:10}} className="small muted">{lang === 'en' ? 'Recorded at:' : 'บันทึกเมื่อ:'} {result.date}</div>
      </div>
    </div>
  );
}

function maskNationalId(nid){
  if(!nid) return '';
  const digits = String(nid).replace(/[^0-9]/g,'');
  if(digits.length !== 13) return nid;
  // แสดงตัวหน้า 1 ตัว และ 4 ตัวท้าย ที่เหลือเป็นดาว
  const first = digits.slice(0,1);
  const last = digits.slice(-4);
  return `${first}*******${last}`;
}

export default BmiResult;
