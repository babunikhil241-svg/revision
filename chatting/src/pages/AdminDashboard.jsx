import React from "react";
import "./AdminDashboard.css";

const AdminDashboard = ({ username, logout }) => {
  const stats = [
    { label: "Total Students", value: "850", icon: "👨‍🎓", color: "blue" },
    { label: "Active Courses", value: "12", icon: "📚", color: "green" },
    { label: "Pending Admissions", value: "25", icon: "⏳", color: "orange" },
    { label: "Monthly Revenue", value: "₹45,000", icon: "💰", color: "purple" },
  ];

  return (
    <div className="admin-dashboard">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-header">
          <h1 className="admin-sidebar-brand">
            SHINE <span>Classes</span>
          </h1>
        </div>
        <nav className="admin-nav">
          <div className="admin-nav-item active">🏠 Dashboard</div>
          <div className="admin-nav-item">👥 Student Management</div>
          <div className="admin-nav-item">📝 Mock Test Panel</div>
          <div className="admin-nav-item">📊 Reports</div>
          <div className="admin-nav-item">⚙️ Settings</div>
        </nav>
        <div>
          <button onClick={logout} className="admin-sidebar-logout">
            🚪 Logout
          </button>
        </div>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <h2 className="admin-header-title">Admin Overview</h2>
          <div className="admin-profile">
            <div>
              <p className="admin-profile-name">{username || "Admin"}</p>
              <p className="admin-profile-status">● Online</p>
            </div>
            <div className="admin-profile-avatar">
              {username ? username[0].toUpperCase() : "A"}
            </div>
          </div>
        </header>

        <div className="admin-body">
          <div className="stats-grid">
            {stats.map((item, index) => (
              <div key={index} className={`stats-card bg-white text-slate-500`}>
                <div className="stats-card-header">
                  <span className="stats-icon">{item.icon}</span>
                  <span className={`stats-badge text-${item.color}-500 bg-${item.color}-50`}>
                    Live
                  </span>
                </div>
                <h3 className="stats-label">{item.label}</h3>
                <p className="stats-value">{item.value}</p>
              </div>
            ))}
          </div>

          <div className="activity-container">
            <div className="activity-header">
              <h3 className="activity-title">Recent Student Registrations</h3>
              <button className="activity-view-all">View All</button>
            </div>
            <div className="table-wrapper">
              <table className="activity-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Course</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-4 font-medium">Nikhil Singh</td>
                    <td className="p-4">ADCA / O Level</td>
                    <td className="p-4 text-slate-500">20 March 2026</td>
                    <td className="p-4">
                      <span className="badge-pill bg-green-100 text-green-700">
                        Paid
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium">Abhishek Jaiswal</td>
                    <td className="p-4">BCA Coaching</td>
                    <td className="p-4 text-slate-500">19 March 2026</td>
                    <td className="p-4">
                      <span className="badge-pill bg-yellow-100 text-yellow-700">
                        Pending
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
