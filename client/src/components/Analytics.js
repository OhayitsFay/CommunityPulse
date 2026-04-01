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
        backgroundColor: ["#60a5fa", "#34d399", "#facc15", "#fb7185"]
      }
    ]
  }

  // Pie chart (anonymous vs non-anonymous)
  const pieData = {
    labels: ["Anonymous", "Not Anonymous"],
    datasets: [
      {
        data: [anonymous, total - anonymous],
        backgroundColor: ["#a78bfa", "#f472b6"]
      }
    ]
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
          <h3>{categories.length}</h3>
          <p>Categories Tracked</p>
        </div>
      </div>

      {/* CHARTS */}
      <div className="charts-grid">

        <div className="chart-box">
          <h4>Feedback by Category</h4>
          <Bar data={barData} />
        </div>

        <div className="chart-box">
          <h4>Anonymous vs Not Anonymous</h4>
          <Pie data={pieData} />
        </div>

      </div>

    </div>
  )
}

export default Analytics