import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, CardBody } from 'reactstrap';
import './admin-dashboard.css';
import Sidebar from './components/Sidebar';
import FeaturedTours from './components/FeaturedTours';
import Packages from './components/Packages';
import Statistics from './components/Statistics';
import Bookings from './components/RecentBookings';
import { BASE_URL } from "../utils/config";

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('statistics');

    const renderContent = () => {
        switch(activeTab) {
            case 'statistics':
                return <Statistics />;
            case 'featured':
                return <FeaturedTours />;
            case 'packages':
                return <Packages />;
            case 'bookings':
                return <Bookings/>
            default:
                return <Statistics />;
        }
    };

    return (
        <div className="admin-dashboard">
            <Container fluid>
                <Row>
                    <Col md="2" className="sidebar">
                        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
                    </Col>
                    <Col md="10" className="main-content">
                        {renderContent()}
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default AdminDashboard; 