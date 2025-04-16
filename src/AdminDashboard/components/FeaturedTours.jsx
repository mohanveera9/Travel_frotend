import React, { useState, useEffect } from 'react';
import { Table, Button, Badge, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import { BASE_URL } from '../../utils/config';
import { useNavigate } from 'react-router-dom';
import './featured-tours.css';

const FeaturedTours = () => {
    const [tours, setTours] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modal, setModal] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();
    const [newTour, setNewTour] = useState({
        title: '',
        city: '',
        address: '',
        distance: '',
        price: '',
        maxGroupSize: '',
        desc: '',
        photo: '',
        featured: false
    });

    useEffect(() => {
        fetchTours();
    }, []);

    const checkAdminAuth = () => {
        const adminToken = localStorage.getItem('adminToken');
        const isAdmin = localStorage.getItem('isAdmin');
        
        if (!adminToken || !isAdmin) {
            setError('Please login as admin');
            setTimeout(() => {
                navigate('/admin/login');
            }, 2000);
            return false;
        }
        return true;
    };

    const fetchTours = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${BASE_URL}/tours`);
            if (!res.ok) {
                throw new Error('Failed to fetch tours');
            }
            const data = await res.json();
            setTours(data.data);
        } catch (error) {
            console.error('Error fetching tours:', error);
            setError('Failed to fetch tours');
        }
        setLoading(false);
    };

    const toggleFeatured = async (tourId, currentStatus) => {
        if (!checkAdminAuth()) return;

        try {
            const token = localStorage.getItem('adminToken');
            const res = await fetch(`${BASE_URL}/tours/${tourId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ featured: !currentStatus }),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.message || 'Failed to update tour status');
            }

            fetchTours();
            setSuccess('Tour status updated successfully');
            setTimeout(() => setSuccess(null), 3000);
        } catch (error) {
            console.error('Error updating tour:', error);
            setError(error.message);
            if (error.message.includes('token')) {
                setTimeout(() => navigate('/admin/login'), 2000);
            }
            setTimeout(() => setError(null), 3000);
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setNewTour(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!checkAdminAuth()) return;

        try {
            const token = localStorage.getItem('adminToken');
            const res = await fetch(`${BASE_URL}/tours`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(newTour)
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Failed to create tour');
            }

            setSuccess('Tour created successfully!');
            setModal(false);
            fetchTours();
            setNewTour({
                title: '',
                city: '',
                address: '',
                distance: '',
                price: '',
                maxGroupSize: '',
                desc: '',
                photo: '',
                featured: false
            });
            setTimeout(() => setSuccess(null), 3000);
        } catch (err) {
            setError(err.message);
            if (err.message.includes('token')) {
                setTimeout(() => navigate('/admin/login'), 2000);
            }
            setTimeout(() => setError(null), 3000);
        }
    };

    const handleDelete = async (tourId) => {
        if (!checkAdminAuth()) return;

        if (!window.confirm('Are you sure you want to delete this tour?')) {
            return;
        }

        try {
            const token = localStorage.getItem('adminToken');
            const res = await fetch(`${BASE_URL}/tours/${tourId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.message || 'Failed to delete tour');
            }

            fetchTours();
            setSuccess('Tour deleted successfully');
            setTimeout(() => setSuccess(null), 3000);
        } catch (error) {
            console.error('Error deleting tour:', error);
            setError(error.message);
            if (error.message.includes('token')) {
                setTimeout(() => navigate('/admin/login'), 2000);
            }
            setTimeout(() => setError(null), 3000);
        }
    };

    return (
        <div className="featured-tours">
            <div className="featured-tours-header">
                <h2>Manage Tours</h2>
                <Button color="primary" onClick={() => {
                    if (checkAdminAuth()) {
                        setModal(true);
                    }
                }}>
                    Add New Tour
                </Button>
            </div>

            {(error || success) && (
                <Alert color={error ? "danger" : "success"} className="mt-3">
                    {error || success}
                </Alert>
            )}

            {loading ? (
                <p>Loading...</p>
            ) : (
                <Table responsive>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>City</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tours.map(tour => (
                            <tr key={tour._id}>
                                <td>{tour.title}</td>
                                <td>{tour.city}</td>
                                <td>${tour.price}</td>
                                <td>
                                    <Badge color={tour.featured ? 'success' : 'secondary'}>
                                        {tour.featured ? 'Featured' : 'Not Featured'}
                                    </Badge>
                                </td>
                                <td>
                                    <div className="action-buttons">
                                        <Button
                                            color={tour.featured ? 'danger' : 'success'}
                                            size="sm"
                                            className="mr-2"
                                            onClick={() => toggleFeatured(tour._id, tour.featured)}
                                        >
                                            {tour.featured ? 'Remove' : 'Add'} Featured
                                        </Button>
                                        <Button
                                            color="danger"
                                            size="sm"
                                            onClick={() => handleDelete(tour._id)}
                                        >
                                            <i className="ri-delete-bin-line"></i> Delete
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}

            <Modal isOpen={modal} toggle={() => setModal(false)}>
                <ModalHeader toggle={() => setModal(false)}>Add New Tour</ModalHeader>
                <ModalBody>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label for="title">Title</Label>
                            <Input
                                type="text"
                                name="title"
                                id="title"
                                value={newTour.title}
                                onChange={handleInputChange}
                                required
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="city">City</Label>
                            <Input
                                type="text"
                                name="city"
                                id="city"
                                value={newTour.city}
                                onChange={handleInputChange}
                                required
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="address">Address</Label>
                            <Input
                                type="text"
                                name="address"
                                id="address"
                                value={newTour.address}
                                onChange={handleInputChange}
                                required
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="distance">Distance (km)</Label>
                            <Input
                                type="number"
                                name="distance"
                                id="distance"
                                value={newTour.distance}
                                onChange={handleInputChange}
                                required
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="price">Price ($)</Label>
                            <Input
                                type="number"
                                name="price"
                                id="price"
                                value={newTour.price}
                                onChange={handleInputChange}
                                required
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="maxGroupSize">Max Group Size</Label>
                            <Input
                                type="number"
                                name="maxGroupSize"
                                id="maxGroupSize"
                                value={newTour.maxGroupSize}
                                onChange={handleInputChange}
                                required
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="desc">Description</Label>
                            <Input
                                type="textarea"
                                name="desc"
                                id="desc"
                                value={newTour.desc}
                                onChange={handleInputChange}
                                required
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="photo">Photo URL</Label>
                            <Input
                                type="text"
                                name="photo"
                                id="photo"
                                value={newTour.photo}
                                onChange={handleInputChange}
                                required
                            />
                        </FormGroup>
                        <FormGroup check>
                            <Label check>
                                <Input
                                    type="checkbox"
                                    name="featured"
                                    checked={newTour.featured}
                                    onChange={handleInputChange}
                                />{' '}
                                Featured Tour
                            </Label>
                        </FormGroup>
                        <Button color="primary" type="submit" className="mt-3">
                            Create Tour
                        </Button>
                    </Form>
                </ModalBody>
            </Modal>
        </div>
    );
};

export default FeaturedTours; 