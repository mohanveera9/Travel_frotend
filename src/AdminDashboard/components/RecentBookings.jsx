import React, { useState, useEffect } from 'react';
import { Table } from 'reactstrap';
import { BASE_URL } from '../../utils/config';
import './statistics.css';

const RecentBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchBookings = async () => {
        try {
            const token = localStorage.getItem('adminToken');
            if (!token) {
                throw new Error('No admin token found');
            }

            const res = await fetch(`${BASE_URL}/booking`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            
            if (!res.ok) {
                if (res.status === 401) {
                    localStorage.removeItem('adminToken');
                    localStorage.removeItem('isAdmin');
                    window.location.href = '/admin/login';
                    throw new Error('Session expired. Please login again.');
                }
                const errorData = await res.json();
                throw new Error(errorData.message || 'Failed to fetch bookings');
            }

            const data = await res.json();
            if (data.success) {
                setBookings(data.data.recentBookings || []);
            } else {
                throw new Error(data.message || 'Failed to fetch bookings');
            }
        } catch (err) {
            console.error('Bookings error:', err);
            setError(err.message);
            if (err.message.includes('login')) {
                setTimeout(() => {
                    window.location.href = '/admin/login';
                }, 2000);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookings();
        const interval = setInterval(fetchBookings, 300000); // Refresh every 5 minutes
        return () => clearInterval(interval);
    }, []);

    if (loading) {
        return (
            <div className="statistics-loading">
                <h4>Loading bookings...</h4>
            </div>
        );
    }

    if (error) {
        return (
            <div className="statistics-error">
                <h4>Error: {error}</h4>
                <button 
                    className="btn btn-primary mt-3" 
                    onClick={fetchBookings}
                >
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="recent-bookings">
            <h2 className="mb-4">Recent Bookings</h2>
            {bookings.length > 0 ? (
                <Table responsive className="recent-bookings-table">
                    <thead>
                        <tr>
                            <th>User</th>
                            <th>Tour</th>
                            <th>Price</th>
                            <th>Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking, index) => (
                            <tr key={booking._id || index}>
                                <td>
                                    <div className="user-info">
                                        <span className="username">
                                            {booking.fullName || booking.userId?.fullName || booking.userId?.username || booking.username || 'N/A'}
                                        </span>
                                        <span className="email">
                                            {booking.email || booking.userId?.email || 'N/A'}
                                        </span>
                                    </div>
                                </td>
                                <td>{booking.tourName || booking.tourId?.title || 'N/A'}</td>
                                <td>${booking.price?.toFixed(2) || '0.00'}</td>
                                <td>
                                    {new Date(booking.createdAt).toLocaleDateString()}
                                </td>
                                <td>
                                    <span className={`status-badge ${booking.status?.toLowerCase() || 'pending'}`}>
                                        {booking.status || 'Pending'}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            ) : (
                <p className="text-center">No recent bookings found</p>
            )}
        </div>
    );
};

export default RecentBookings; 