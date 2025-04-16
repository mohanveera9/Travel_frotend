import React, { useState, useEffect } from 'react';
import { 
    Table, 
    Button, 
    Modal, 
    ModalHeader, 
    ModalBody, 
    Form, 
    FormGroup, 
    Label, 
    Input,
    Alert
} from 'reactstrap';
import { BASE_URL } from '../../utils/config';
import './packages.css';
import { useNavigate } from 'react-router-dom';

const Packages = () => {
    const [modal, setModal] = useState(false);
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMsg, setSuccessMsg] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [newPackage, setNewPackage] = useState({
        title: '',
        price: '',
        duration: '',
        features: '',
        image: '',
        color: '#ff7e01'
    });
    const navigate = useNavigate();

    const fetchPackages = async () => {
        try {
            const res = await fetch(`${BASE_URL}/packages`);
            const data = await res.json();
            if (data.success) {
                setPackages(data.data);
            }
        } catch (err) {
            setError('Failed to fetch packages');
            setTimeout(() => setError(null), 3000);
        }
    };

    useEffect(() => {
        fetchPackages();
    }, []);

    const handleEdit = (pkg) => {
        setEditMode(true);
        setSelectedPackage(pkg);
        setNewPackage({
            title: pkg.title,
            price: pkg.price,
            duration: pkg.duration,
            features: pkg.features.join(', '),
            image: pkg.image
        });
        setModal(true);
    };

    const handleDelete = async (packageId) => {
        if (!window.confirm('Are you sure you want to delete this package?')) {
            return;
        }

        try {
            const adminToken = localStorage.getItem('adminToken');
            if (!adminToken) {
                throw new Error('Please login as admin');
            }

            const res = await fetch(`${BASE_URL}/packages/${packageId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${adminToken}`
                }
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || 'Failed to delete package');
            }

            await fetchPackages();
            setSuccessMsg('Package deleted successfully!');
            setTimeout(() => setSuccessMsg(''), 3000);
        } catch (err) {
            console.error('Error:', err);
            setError(err.message);
            if (err.message.includes('login')) {
                navigate('/admin/login');
            }
            setTimeout(() => setError(null), 3000);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const featuresArray = newPackage.features.split(',').map(f => f.trim());
            const packageData = {
                ...newPackage,
                features: featuresArray,
                price: Number(newPackage.price)
            };

            const adminToken = localStorage.getItem('adminToken');
            if (!adminToken) {
                throw new Error('Please login as admin');
            }

            const url = editMode 
                ? `${BASE_URL}/packages/${selectedPackage._id}`
                : `${BASE_URL}/packages`;

            const res = await fetch(url, {
                method: editMode ? 'PUT' : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${adminToken}`
                },
                body: JSON.stringify(packageData)
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || `Failed to ${editMode ? 'update' : 'create'} package`);
            }

            const data = await res.json();
            if (data.success) {
                await fetchPackages();
                setModal(false);
                setSuccessMsg(`Package ${editMode ? 'updated' : 'created'} successfully!`);
                setTimeout(() => setSuccessMsg(''), 3000);
                resetForm();
            }
        } catch (err) {
            console.error('Error:', err);
            setError(err.message);
            if (err.message.includes('login')) {
                navigate('/admin/login');
            }
            setTimeout(() => setError(null), 3000);
        }
        setLoading(false);
    };

    const resetForm = () => {
        setNewPackage({
            title: '',
            price: '',
            duration: '',
            features: '',
            image: '',
            color: '#ff7e01'
        });
        setEditMode(false);
        setSelectedPackage(null);
    };

    const handleModalClose = () => {
        setModal(false);
        resetForm();
    };

    return (
        <div className="packages-management">
            {error && <Alert color="danger" className="mb-3">{error}</Alert>}
            {successMsg && <Alert color="success" className="mb-3">{successMsg}</Alert>}
            
            <div className="packages-header">
                <h2>Manage Packages</h2>
                <Button color="primary" onClick={() => setModal(true)}>
                    Add New Package
                </Button>
            </div>

            <Table responsive>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Duration</th>
                        <th>Features</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {packages.map(pkg => (
                        <tr key={pkg._id}>
                            <td>{pkg.title}</td>
                            <td>${pkg.price}</td>
                            <td>{pkg.duration}</td>
                            <td>{pkg.features.join(', ')}</td>
                            <td>
                                <Button 
                                    color="info" 
                                    size="sm" 
                                    className="mr-2"
                                    onClick={() => handleEdit(pkg)}
                                >
                                    Edit
                                </Button>
                                <Button 
                                    color="danger" 
                                    size="sm"
                                    onClick={() => handleDelete(pkg._id)}
                                >
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal isOpen={modal} toggle={handleModalClose}>
                <ModalHeader toggle={handleModalClose}>
                    {editMode ? 'Edit Package' : 'Add New Package'}
                </ModalHeader>
                <ModalBody>
                    {error && <Alert color="danger" className="mb-3">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label for="title">Package Title</Label>
                            <Input
                                type="text"
                                name="title"
                                id="title"
                                value={newPackage.title}
                                onChange={e => setNewPackage({...newPackage, title: e.target.value})}
                                required
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="price">Price</Label>
                            <Input
                                type="number"
                                name="price"
                                id="price"
                                value={newPackage.price}
                                onChange={e => setNewPackage({...newPackage, price: e.target.value})}
                                required
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="duration">Duration</Label>
                            <Input
                                type="text"
                                name="duration"
                                id="duration"
                                value={newPackage.duration}
                                onChange={e => setNewPackage({...newPackage, duration: e.target.value})}
                                required
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="features">Features (comma-separated)</Label>
                            <Input
                                type="textarea"
                                name="features"
                                id="features"
                                value={newPackage.features}
                                onChange={e => setNewPackage({...newPackage, features: e.target.value})}
                                required
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="image">Image URL</Label>
                            <Input
                                type="text"
                                name="image"
                                id="image"
                                value={newPackage.image}
                                onChange={e => setNewPackage({...newPackage, image: e.target.value})}
                                required
                            />
                        </FormGroup>
                        <Button color="primary" type="submit" disabled={loading}>
                            {loading ? (editMode ? 'Updating...' : 'Adding...') : (editMode ? 'Update Package' : 'Add Package')}
                        </Button>
                    </Form>
                </ModalBody>
            </Modal>
        </div>
    );
};

export default Packages; 