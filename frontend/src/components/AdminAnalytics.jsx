import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from "chart.js";
import { Bar } from "react-chartjs-2";
import "./AdminAnalytics.scss";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

const AdminAnalytics = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get("/api/admin/analytics/dashboard", {
        headers: {
          "x-admin-password": process.env.REACT_APP_ADMIN_PASSWORD
        }
      })
      .then(res => setData(res.data))
      .catch(console.error);
  }, []);

  const exportCSV = async () => {
    const res = await axios.get("/api/admin/analytics/export", {
      headers: {
        "x-admin-password": process.env.REACT_APP_ADMIN_PASSWORD
      },
      responseType: "blob"
    });

    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");
    link.href = url;
    link.download = "admin_analytics.csv";
    link.click();
  };

  if (!data) return <div className="loading">Loading analytics...</div>;

  const baseOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }
    },
    scales: {
      x: { ticks: { display: false } },
      y: { beginAtZero: true }
    }
  };

  return (
    <div className="analytics">

      {/* HEADER */}
      <div className="header">
        <h2>Admin Analytics Dashboard</h2>
        <div className="actions">
          <button className="export" onClick={exportCSV}>
            Export CSV
          </button>
        </div>
      </div>

      {/* KPIs */}
      <div className="kpi-grid">
        {Object.entries(data.totals).map(([key, value]) => (
          <div className="kpi" key={key}>
            <h3>{value}</h3>
            <p>{key.replace("total", "")}</p>
          </div>
        ))}
      </div>

      {/* VIDEO DOWNLOADS */}
      <div className="chart-box">
        <h4>Video Downloads</h4>
        <div className="chart-canvas">
          <Bar
            data={{
              labels: data.videoDownloads.map((_, i) => i + 1),
              datasets: [
                {
                  data: data.videoDownloads.map(v => v.downloadCount),
                  backgroundColor: "#ff7a00",
                  borderWidth: 0,
borderSkipped: false,

                }
              ]
            }}
            options={{
              ...baseOptions,
              plugins: {
                tooltip: {
                  callbacks: {
                    title: ctx =>
                      data.videoDownloads[ctx[0].dataIndex].title,
                    label: ctx => `Downloads: ${ctx.raw}`
                  }
                }
              }
            }}
          />
        </div>
      </div>

      {/* ARTICLE LIKES */}
      <div className="chart-box">
        <h4>Article Likes</h4>
        <div className="chart-canvas">
          <Bar
            data={{
              labels: data.articleLikes.map((_, i) => i + 1),
              datasets: [
                {
                  data: data.articleLikes.map(a => a.likes),
                  backgroundColor: "#ff7a00",
                  borderWidth: 0,
borderSkipped: false,

                }
              ]
            }}
            options={{
              ...baseOptions,
              plugins: {
                tooltip: {
                  callbacks: {
                    title: ctx =>
                      data.articleLikes[ctx[0].dataIndex].title,
                    label: ctx => `Likes: ${ctx.raw}`
                  }
                }
              }
            }}
          />
        </div>
      </div>

      {/* ARTICLE COMMENTS */}
      <div className="chart-box">
        <h4>Article Comments</h4>
        <div className="chart-canvas">
          <Bar
            data={{
              labels: data.articleComments.map((_, i) => i + 1),
              datasets: [
                {
                  data: data.articleComments.map(a => a.comments),
                  backgroundColor: "#ff7a00",
                  borderWidth: 0,
                 borderSkipped: false,

                }
              ]
            }}
            options={{
              ...baseOptions,
              plugins: {
                tooltip: {
                  callbacks: {
                    title: ctx =>
                      data.articleComments[ctx[0].dataIndex].title,
                    label: ctx => `Comments: ${ctx.raw}`
                  }
                }
              }
            }}
          />
        </div>
      </div>

      {/* MESSAGES PER ROOM */}
      <div className="chart-box">
        <h4>Messages per Room</h4>
        <div className="chart-canvas">
          <Bar
            data={{
              labels: data.roomAnalytics.map((_, i) => i + 1),
              datasets: [
                {
                  data: data.roomAnalytics.map(r => r.messages),
                  backgroundColor: "#ff7a00",
                  borderWidth: 0,
borderSkipped: false,

                }
              ]
            }}
            options={{
              ...baseOptions,
              plugins: {
                tooltip: {
                  callbacks: {
                    title: ctx =>
                      data.roomAnalytics[ctx[0].dataIndex].room,
                    label: ctx => `Messages: ${ctx.raw}`
                  }
                }
              }
            }}
          />
        </div>
      </div>

    </div>
  );
};

export default AdminAnalytics;

