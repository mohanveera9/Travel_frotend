import React from 'react';
import { Nav, NavItem } from 'reactstrap';
import './sidebar.css';

const Sidebar = ({ activeTab, setActiveTab }) => {
    const menuItems = [
        { id: 'statistics', label: 'Dashboard', icon: '📊' },
        { id: 'featured', label: 'Featured Tours', icon: '🌟' },
        { id: 'packages', label: 'Packages/Offers', icon: '📦' },
        { id: 'bookings', label: 'Bookings', icon: '📅' },
    ];

    return (
        <div className="sidebar-container">
            <div className="sidebar-header">
                <h3>Admin Panel</h3>
            </div>
            <Nav vertical className="sidebar-nav">
                {menuItems.map(item => (
                    <NavItem 
                        key={item.id}
                        className={`sidebar-item ${activeTab === item.id ? 'active' : ''}`}
                        onClick={() => setActiveTab(item.id)}
                    >
                        <span className="item-icon">{item.icon}</span>
                        {item.label}
                    </NavItem>
                ))}
            </Nav>
        </div>
    );
};

export default Sidebar; 