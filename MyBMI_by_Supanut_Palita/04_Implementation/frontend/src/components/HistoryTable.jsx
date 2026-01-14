function HistoryTable({ history, onDelete, lang = 'th' }) {
  if (!history.length) return <p>{lang === 'en' ? 'No history yet' : 'ยังไม่มีประวัติ'}</p>;

  return (
    <div>
      <h2>{lang === 'en' ? 'BMI History' : 'ประวัติ BMI'}</h2>
      <div className="history-table">
      <table>
        <thead>
          <tr>
            <th>{lang === 'en' ? 'Date' : 'วันที่'}</th>
            <th>{lang === 'en' ? 'Name' : 'ชื่อนามสกุล'}</th>
            <th>{lang === 'en' ? 'National ID' : 'เลขบัตรประชาชน'}</th>
            <th>{lang === 'en' ? 'Weight (kg)' : 'น้ำหนัก (กก.)'}</th>
            <th>{lang === 'en' ? 'Height (cm)' : 'ส่วนสูง (ซม.)'}</th>
            <th>BMI</th>
            <th>{lang === 'en' ? 'Category' : 'หมวดหมู่'}</th>
            <th>{lang === 'en' ? 'Actions' : 'จัดการ'}</th>
          </tr>
        </thead>
        <tbody>
          {history.map(item => (
            <tr key={item.id}>
              <td>{item.date}</td>
              <td>{item.name}</td>
              <td className="id-mono">{maskId(item.nationalId)}</td>
              <td>{item.weight}</td>
              <td>{item.height}</td>
              <td>{item.bmi}</td>
              <td>{item.category}</td>
              <td>
                <button className="btn danger" onClick={() => onDelete(item.id)}>{lang === 'en' ? 'Delete' : 'ลบ'}</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}

export default HistoryTable;

function maskId(nid){
  if(!nid) return '';
  const digits = String(nid).replace(/[^0-9]/g,'');
  if(digits.length !== 13) return nid;
  return digits.slice(0,1) + '*******' + digits.slice(-4);
}
