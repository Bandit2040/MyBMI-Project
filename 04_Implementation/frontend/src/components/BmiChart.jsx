// src/components/BmiChart.jsx
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function BmiChart({ history, lang = 'th' }) {
  const [chartConfig, setChartConfig] = useState(null);

  function getCssVar(name, fallback) {
    try {
      const v = getComputedStyle(document.documentElement).getPropertyValue(name);
      return v ? v.trim() : fallback;
    } catch {
      return fallback;
    }
  }

  function buildConfig() {
    const accent = getCssVar('--accent', '#3b82f6');
    const lineColor = getCssVar('--chart-line', accent);
    const fill = getCssVar('--chart-fill', 'rgba(59,130,246,0.12)');
    const grid = getCssVar('--chart-grid', 'rgba(15,23,42,0.06)');
    const tick = getCssVar('--chart-tick', '#64707a');
    const text = getCssVar('--text', '#0f172a');

    const labels = history.map((item) => item.date);
    const dataValues = history.map((item) => item.bmi);

    const data = {
      labels,
      datasets: [
        {
          label: lang === 'en' ? 'BMI over time' : 'ค่า BMI ตามเวลา',
          data: dataValues,
          borderWidth: 2,
          pointRadius: 3,
          borderColor: lineColor,
          backgroundColor: fill,
          pointBackgroundColor: lineColor,
          tension: 0.15,
          fill: true,
        },
      ],
    };

    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
          labels: { color: tick },
        },
        title: {
          display: true,
          text: lang === 'en' ? 'BMI Trend over time' : 'แนวโน้มค่า BMI',
          color: text,
        },
        tooltip: {
          titleColor: text,
          bodyColor: text,
        },
      },
      scales: {
        x: {
          ticks: { color: tick },
          grid: { color: grid },
        },
        y: {
          ticks: { color: tick },
          grid: { color: grid },
          beginAtZero: false,
        },
      },
    };

    return { data, options };
  }

  useEffect(() => {
    if (!history || history.length < 2) {
      setChartConfig(null);
      return;
    }

    setChartConfig(buildConfig());

    const obs = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.type === 'attributes' && m.attributeName === 'data-theme') {
          setChartConfig(buildConfig());
        }
      }
    });
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    return () => obs.disconnect();
  }, [history]);

  if (!history || history.length < 2) {
    return <p>{lang === 'en' ? 'At least 2 records are needed to display the chart' : 'ต้องมีประวัติอย่างน้อย 2 รายการจึงจะแสดงกราฟได้'}</p>;
  }

  return (
    <div style={{ maxWidth: "800px", marginTop: "20px" }}>
      {chartConfig && <Line data={chartConfig.data} options={chartConfig.options} />}
    </div>
  );
}

export default BmiChart;
