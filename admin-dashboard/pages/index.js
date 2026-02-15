import { useState, useEffect } from 'react';
import BookingList from '../components/BookingList';
import ServiceManager from '../components/ServiceManager';

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [services, setServices] = useState([]);
  const [role, setRole] = useState('admin'); // 'admin' or 'owner'
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);

  const API_BASE = 'http://localhost:5001/api';

  useEffect(() => {
    fetchData();
  }, [role]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (role === 'admin') {
        const [uRes, bRes] = await Promise.all([
          fetch(`${API_BASE}/admin/users`),
          fetch(`${API_BASE}/admin/bookings`)
        ]);
        setUsers(await uRes.json());
        setBookings(await bRes.json());
      } else {
        const bRes = await fetch(`${API_BASE}/admin/bookings`);
        setBookings(await bRes.json());
        const sRes = await fetch(`${API_BASE}/services`);
        setServices(await sRes.json());
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateBookingStatus = async (id, status) => {
    try {
      await fetch(`${API_BASE}/bookings/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      fetchData();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  if (loading) return <div className="centered-loading">Loading...</div>;

  return (
    <div className="app-layout">
      {/* Sidebar - Hidden on mobile or transforms */}
      <aside className="sidebar">
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '1.5rem', color: 'var(--primary)', margin: 0 }}>SalonEase</h2>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Admin Portal</p>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
          <button
            className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Dashboard
          </button>
          <button
            className={`nav-item ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            Users
          </button>
          <button
            className={`nav-item ${activeTab === 'bookings' ? 'active' : ''}`}
            onClick={() => setActiveTab('bookings')}
          >
            Appointments
          </button>
          {role === 'owner' && (
            <button
              className={`nav-item ${activeTab === 'services' ? 'active' : ''}`}
              onClick={() => setActiveTab('services')}
            >
              My Services
            </button>
          )}
        </nav>

        <div className="sidebar-footer">
          <div style={{ padding: '10px', backgroundColor: '#f9fafb', borderRadius: '8px', fontSize: '12px' }}>
            Logged in as: <strong>{role === 'admin' ? 'System Admin' : 'Salon Owner'}</strong>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="dashboard-header">
          <div>
            <h1 style={{ margin: 0, color: '#111827' }}>
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
            </h1>
          </div>
          <div className="header-actions">
            <button
              onClick={() => setRole('admin')}
              className={`role-btn ${role === 'admin' ? 'active' : ''}`}
            >
              System Admin
            </button>
            <button
              onClick={() => setRole('owner')}
              className={`role-btn ${role === 'owner' ? 'active' : ''}`}
            >
              Salon Owner
            </button>
          </div>
        </header>

        <div className="grid">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-3">
              <div className="card">
                <h3>Total Bookings</h3>
                <p className="stat-val">{bookings.length}</p>
              </div>
              <div className="card">
                <h3>Total Users</h3>
                <p className="stat-val">{users.length || '-'}</p>
              </div>
              <div className="card">
                <h3>Active Role</h3>
                <p className="stat-val" style={{ color: 'var(--primary)', fontSize: '1.2rem' }}>{role.toUpperCase()}</p>
              </div>
            </div>
          )}

          {(activeTab === 'users' || (activeTab === 'overview' && role === 'admin')) && role === 'admin' && (
            <section className="card">
              <h2>User Management</h2>
              <div className="grid grid-cols-3" style={{ gap: '15px' }}>
                {users.map((user) => (
                  <div key={user._id} className="user-card">
                    <div style={{ fontWeight: '600' }}>{user.name}</div>
                    <div style={{ fontSize: '14px', color: '#6b7280' }}>{user.email}</div>
                    <div className="badge">{user.role}</div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {(activeTab === 'bookings' || activeTab === 'overview') && (
            <section className="card">
              <h2>Appointments</h2>
              <div className="table-container">
                <BookingList bookings={bookings} onUpdateStatus={handleUpdateBookingStatus} />
              </div>
            </section>
          )}

          {(activeTab === 'services') && role === 'owner' && (
            <section className="card">
              <h2>My Services</h2>
              <ServiceManager
                services={services}
                onAddService={(s) => console.log('Add service:', s)}
                onDeleteService={(id) => console.log('Delete service:', id)}
              />
            </section>
          )}
        </div>
      </main>

      <style jsx>{`
        .centered-loading {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          font-size: 1.2rem;
          color: var(--text-muted);
        }
        .nav-item {
          padding: 12px 15px;
          border: none;
          background: transparent;
          text-align: left;
          cursor: pointer;
          border-radius: 8px;
          color: var(--text-muted);
          font-weight: 500;
          transition: all 0.2s;
        }
        .nav-item:hover {
          background-color: #f9fafb;
          color: var(--primary);
        }
        .nav-item.active {
          background-color: #6366f110;
          color: var(--primary);
        }
        .role-btn {
          padding: 8px 16px;
          border-radius: 6px;
          border: 1px solid var(--border);
          background: white;
          color: var(--text-muted);
          cursor: pointer;
          font-weight: 500;
          margin-left: 10px;
        }
        .role-btn.active {
          background-color: var(--primary);
          color: white;
          border-color: var(--primary);
        }
        .user-card {
          padding: 15px;
          border: 1px solid #f3f4f6;
          borderRadius: 8px;
        }
        .badge {
          margin-top: 8px;
          font-size: 12px;
          display: inline-block;
          padding: 2px 8px;
          background-color: #e5e7eb;
          border-radius: 10px;
        }
        .stat-val {
          font-size: 2.5rem;
          font-weight: 700;
          margin: 10px 0 0 0;
          color: var(--text-main);
        }
        h3 {
          margin: 0;
          font-size: 0.9rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
      `}</style>
    </div>
  );
}