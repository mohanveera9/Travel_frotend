import React, { useState, useEffect } from 'react';
import './packages.css';
import { Container, Row, Col } from 'reactstrap';
import Booking from '../components/Booking/Booking';
import { BASE_URL } from '../utils/config';
import basicImg from '../assets/images/gallery-02.jpg';
import standardImg from '../assets/images/gallery-01.jpg';
import premiumImg from '../assets/images/gallery-03.jpg';
import tourImg01 from '../assets/images/tour-img01.jpg';
import tourImg02 from '../assets/images/tour-img02.jpg';
import tourImg03 from '../assets/images/tour-img03.jpg';
import tourImg04 from '../assets/images/tour-img04.jpg';
import tourImg05 from '../assets/images/tour-img05.jpg';
import tourImg06 from '../assets/images/tour-img06.jpg';
import tourImg07 from '../assets/images/tour-img07.jpg';

const Packages = () => {
    const [showBooking, setShowBooking] = useState(false);
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMsg, setSuccessMsg] = useState(null);

    // Default package data
    const defaultPackages = [
        {
            title: "Basic Package",
            price: 199,
            duration: "3 Days",
            image: basicImg,
            features: ["All Transportation", "Hotel Accommodation", "Guide Service"],
            color: "#ff7e01"
        },
        {
            title: "Standard Package",
            price: 399,
            duration: "5 Days",
            image: standardImg,
            features: ["All Transportation", "4 Star Hotel", "Professional Guide"],
            color: "#ee6e6e"
        },
        {
            title: "Premium Package",
            price: 699,
            duration: "7 Days",
            image: premiumImg,
            features: ["Luxury Transportation", "5 Star Hotel", "Professional Guide"],
            color: "#4573E7"
        },
        {
            title: "Weekend Getaway",
            price: 299,
            duration: "2 Days",
            image: tourImg01,
            features: ["Transportation", "3 Star Hotel", "Local Guide"],
            color: "#ff7e01"
        },
        {
            title: "City Explorer",
            price: 449,
            duration: "4 Days",
            image: tourImg02,
            features: ["City Tours", "4 Star Hotel", "Expert Guide"],
            color: "#ee6e6e"
        },
        {
            title: "Adventure Pack",
            price: 599,
            duration: "6 Days",
            image: tourImg03,
            features: ["Adventure Activities", "Camping", "Expert Guide"],
            color: "#4573E7"
        },
        {
            title: "Cultural Tour",
            price: 349,
            duration: "4 Days",
            image: tourImg04,
            features: ["Cultural Sites", "Local Stay", "Expert Guide"],
            color: "#ff7e01"
        },
        {
            title: "Nature Retreat",
            price: 499,
            duration: "5 Days",
            image: tourImg05,
            features: ["Nature Walks", "Eco Lodge", "Naturalist Guide"],
            color: "#ee6e6e"
        },
        {
            title: "Beach Holiday",
            price: 649,
            duration: "7 Days",
            image: tourImg06,
            features: ["Beach Activities", "Resort Stay", "Water Sports"],
            color: "#4573E7"
        },
        {
            title: "Mountain Trek",
            price: 549,
            duration: "6 Days",
            image: tourImg07,
            features: ["Trekking", "Mountain Lodge", "Trek Guide"],
            color: "#ff7e01"
        },
        {
            title: "Desert Safari",
            price: 399,
            duration: "3 Days",
            image: basicImg,
            features: ["Desert Camp", "4x4 Tours", "Local Guide"],
            color: "#ee6e6e"
        },
        {
            title: "Island Hopping",
            price: 799,
            duration: "8 Days",
            image: standardImg,
            features: ["Island Tours", "Beach Resort", "Boat Trips"],
            color: "#4573E7"
        },
        {
            title: "Historical Tour",
            price: 449,
            duration: "5 Days",
            image: premiumImg,
            features: ["Historical Sites", "4 Star Hotel", "History Expert"],
            color: "#ff7e01"
        },
        {
            title: "Food & Wine",
            price: 599,
            duration: "4 Days",
            image: tourImg01,
            features: ["Wine Tasting", "Gourmet Meals", "Local Expert"],
            color: "#ee6e6e"
        },
        {
            title: "Wellness Retreat",
            price: 899,
            duration: "7 Days",
            image: tourImg02,
            features: ["Spa Services", "Yoga Sessions", "Wellness Guide"],
            color: "#4573E7"
        }
    ];

    useEffect(() => {
        fetchPackages();
    }, []);

    const fetchPackages = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${BASE_URL}/packages`);
            if (!res.ok) {
                throw new Error('Failed to fetch packages');
            }
            const result = await res.json();
            if (result.success) {
                // If API returns packages, use them; otherwise, use default packages
                const apiPackages = result.data || [];
                setPackages(apiPackages.length > 0 ? apiPackages : defaultPackages);
            } else {
                setPackages(defaultPackages);
            }
        } catch (err) {
            console.error('Error fetching packages:', err);
            // On error, fall back to default packages
            setPackages(defaultPackages);
            setError('Using default packages');
            setTimeout(() => setError(null), 3000);
        }
        setLoading(false);
    };

    const handleBookNow = (pkg) => {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');

        if (!token || !userId) {
            setError('Please login to book a package');
            setTimeout(() => setError(null), 3000);
            return;
        }

        setSelectedPackage(pkg);
        setShowBooking(true);
    };

    return (
        <>
            <section className="package__section">
                <Container>
                    <Row>
                        <Col lg="12" className="mb-5 text-center">
                            <h2 className="package__title">Our Travel Packages</h2>
                            <p className="package__subtitle">Choose the perfect package for your journey</p>
                        </Col>
                        {/* Show error/success messages at the top */}
                        {(error || successMsg) && (
                            <Col lg="12" className="mb-4">
                                <div className={`alert ${error ? 'alert-danger' : 'alert-success'} text-center`}>
                                    <h5 className="mb-0">{error || successMsg}</h5>
                                </div>
                            </Col>
                        )}
                        <Col lg="12">
                            {loading && (
                                <div className="text-center">
                                    <h4>Loading packages...</h4>
                                </div>
                            )}
                            <div className="package__container">
                                {packages.map((pkg, index) => (
                                    <div className="package__card" key={pkg._id || index}>
                                        <div className="package__image">
                                            <img src={pkg.image} alt={pkg.title} />
                                        </div>
                                        <div className="package__top" style={{ backgroundColor: pkg.color }}>
                                            <h3>{pkg.title}</h3>
                                            <div className="package__price">
                                                <h2>${pkg.price}</h2>
                                                <span>/{pkg.duration}</span>
                                            </div>
                                        </div>
                                        <div className="package__content">
                                            <ul>
                                                {pkg.features.map((feature, idx) => (
                                                    <li key={idx}>
                                                        <i className="ri-checkbox-circle-line"></i> 
                                                        {feature}
                                                    </li>
                                                ))}
                                            </ul>
                                            <button 
                                                className="package__btn"
                                                onClick={() => handleBookNow(pkg)}
                                            >
                                                Book Now
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Booking Modal */}
            {showBooking && (
                <div className="booking__modal">
                    <div className="booking__modal-content">
                        <span 
                            className="close__modal"
                            onClick={() => setShowBooking(false)}
                        >
                            &times;
                        </span>
                        <h3>Book {selectedPackage?.title}</h3>
                        <Booking 
                            tour={{
                                title: selectedPackage?.title,
                                price: selectedPackage?.price,
                                duration: selectedPackage?.duration,
                                packageId: selectedPackage?._id || selectedPackage?.id
                            }}
                            onClose={() => setShowBooking(false)}
                            isPackage={true}
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default Packages;
