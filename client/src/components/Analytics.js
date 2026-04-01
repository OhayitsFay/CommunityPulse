import { Bar, Pie } from "react-chartjs-2"
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js"
import "./Analytics.css"

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend
)

function Analytics({ data }) {

  const total = data.length
  const anonymous = data.filter(f => f.isAnonymous).length

  const categories = ["General", "Leadership", "Events", "Communication"]

  const categoryCounts = categories.map(cat =>
    data.filter(f => f.category === cat).length
  )

  // Bar chart (category counts)
  const barData = {
    labels: categories,
    datasets: [
      {
        label: "Feedback Count",
        data: categoryCounts,
        backgroundColor: ["#1f69c4", "#068556", "#d7ad04", "#ac211c"]
      }
    ]
  }
  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 0 },
    plugins: {
      legend: { labels: { font: { size: 16 }, color: "black" } },
      tooltip: {
        titleFont: { size: 17 },
        bodyFont: { size: 17 }
      }
    },
    scales: {
      y: {
        ticks: { font: { size: 15 } },
        grid: { color: "rgba(0,0,0,0.08)" }
      },
      x: {
        ticks: { font: { size: 15 } },
        grid: { display: false }
      }
    }
  }

  // Pie chart (anonymous vs non-anonymous)
  const pieData = {
    labels: ["Anonymous", "Not Anonymous"],
    datasets: [
      {
        data: [anonymous, total - anonymous],
        backgroundColor: ["#5831cd", "#751949"]
      }
    ]
  }
  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 0 },
    plugins: {
      legend: { labels: { font: { size: 16 }, color: "black" } },
      tooltip: {
        titleFont: { size: 17 },
        bodyFont: { size: 17 }
      }
    },
    scales: {
      y: {
        ticks: { font: { size: 15 } },
        grid: { display: false }
      },
      x: {
        ticks: { font: { size: 15 } },
        grid: { display: false }
      }
    }
  }

  return (
    <div className="analytics-section">

      {/* SUMMARY */}
      <div className="stats-grid">
        <div className="stat-card">
          <h3>{total}</h3>
          <p>Total Feedback</p>
        </div>

        <div className="stat-card">
          <h3>{anonymous}</h3>
          <p>Anonymous Feedback</p>
        </div>

        <div className="stat-card">
          <h3>{total - anonymous}</h3>
          <p>Unanonymous Feedback</p>
        </div>

        <div className="stat-card">
          <h3>{categories.length}</h3>
          <p>Categories Tracked</p>
        </div>
      </div>

      {/* CHARTS */}
      <div className="charts-grid">

        <div className="chart-box">
          <h4>Feedback by Category</h4>
          <Bar
  data={barData}
  options={barOptions}
  devicePixelRatio={2}
/>

        </div>

        <div className="chart-box">
          <h4>Anonymous vs Not Anonymous</h4>
          <Pie 
  data={pieData} 
  options={pieOptions}
  devicePixelRatio={2}
/>
        </div>

      </div>

    </div>
  )
}

export default Analytics