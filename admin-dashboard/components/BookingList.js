import React from 'react';

export default function BookingList({ bookings, onUpdateStatus }) {
    if (!bookings || bookings.length === 0) {
        return <div style={{ padding: '20px', textAlign: 'center', color: '#6b7280' }}>No appointments found.</div>;
    }

    return (
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Customer</th>
                        <th>Service</th>
                        <th>Date & Time</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.map((booking) => (
                        <tr key={booking._id}>
                            <td>
                                <div style={{ fontWeight: '500' }}>{booking.customer?.name || 'Customer'}</div>
                                <div style={{ fontSize: '12px', color: '#6b7280' }}>{booking.customer?.email}</div>
                            </td>
                            <td>{booking.service?.name || 'Service'}</td>
                            <td>
                                <div>{new Date(booking.date).toLocaleDateString()}</div>
                                <div style={{ fontSize: '12px', color: '#6b7280' }}>{booking.time}</div>
                            </td>
                            <td>
                                <span className={`status-badge ${booking.status}`}>
                                    {booking.status}
                                </span>
                            </td>
                            <td>
                                {booking.status === 'pending' && (
                                    <button
                                        onClick={() => onUpdateStatus(booking._id, 'confirmed')}
                                        className="btn-confirm"
                                    >
                                        Confirm
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <style jsx>{`
                .status-badge {
                    padding: 4px 10px;
                    border-radius: 20px;
                    font-size: 12px;
                    font-weight: 600;
                    text-transform: capitalize;
                }
                .status-badge.confirmed {
                    background-color: #def7ec;
                    color: #03543f;
                }
                .status-badge.pending {
                    background-color: #fef3c7;
                    color: #92400e;
                }
                .status-badge.cancelled {
                    background-color: #fde2e2;
                    color: #9b1c1c;
                }
                .status-badge.completed {
                    background-color: #e1effe;
                    color: #1e429f;
                }
                .btn-confirm {
                    padding: 6px 12px;
                    background-color: var(--primary);
                    color: white;
                    border: none;
                    border-radius: 6px;
                    cursor: pointer;
                    font-size: 13px;
                    font-weight: 500;
                    transition: opacity 0.2s;
                }
                .btn-confirm:hover {
                    opacity: 0.9;
                }
            `}</style>
        </div>
    );
}
