import React, { useState } from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import './admin-login.css';

const AdminLogin = () => {
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = e => {
        setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // Admin credentials validation
            if (credentials.email === "krishnaabhisripg@gmail.com" && credentials.password === "12345") {
                // Generate admin token
                const token = btoa(`admin:${credentials.email}`);
                localStorage.setItem('adminToken', token);
                localStorage.setItem('isAdmin', 'true');
                navigate('/admin/dashboard');
            } else {
                setError('Invalid email or password');
            }
        } catch (err) {
            setError('Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="admin-login">
            <Container>
                <Row className="justify-content-center">
                    <Col md="6" lg="4">
                        <div className="admin-login__form">
                            <h2>Admin Login</h2>
                            {error && <Alert color="danger">{error}</Alert>}
                            <Form onSubmit={handleSubmit}>
                                <FormGroup>
                                    <Label for="email">Email</Label>
                                    <Input
                                        type="email"
                                        id="email"
                                        value={credentials.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="password">Password</Label>
                                    <Input
                                        type="password"
                                        id="password"
                                        value={credentials.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </FormGroup>
                                <Button 
                                    color="primary" 
                                    type="submit" 
                                    block 
                                    disabled={loading}
                                >
                                    {loading ? 'Logging in...' : 'Login'}
                                </Button>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default AdminLogin; 