import React from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import './not-found.css';

const NotFound = () => {
    return (
        <div className="not-found">
            <Container>
                <Row>
                    <Col lg="12">
                        <div className="not-found__content text-center">
                            <h1>404</h1>
                            <h2>Page Not Found</h2>
                            <p>
                                The page you're looking for doesn't exist or has been moved.
                            </p>
                            <Link to="/">
                                <Button color="primary">
                                    Back to Home
                                </Button>
                            </Link>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default NotFound; 