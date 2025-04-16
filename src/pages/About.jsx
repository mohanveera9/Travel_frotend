import React from 'react'
import './about.css'
import { Container, Row, Col } from 'reactstrap'
import Subtitle from '../shared/subtitle'
import worldImg from '../assets/images/world.png'


const About = () => {
    const teamMembers = [
        {
            name: "John Smith",
            role: "Founder & CEO",
            image: "https://example.com/path-to-image1.jpg",
            description: "10+ years of experience in travel industry"
        },
        {
            name: "Sarah Johnson",
            role: "Travel Expert",
            image: "https://example.com/path-to-image2.jpg",
            description: "Specialized in adventure tours"
        },
        {
            name: "Michael Chen",
            role: "Customer Relations",
            image: "https://example.com/path-to-image3.jpg",
            description: "Creating memorable experiences"
        },
        {
            name: "Emma Davis",
            role: "Tour Guide",
            image: "https://example.com/path-to-image4.jpg",
            description: "Expert in cultural tours"
        },
        {
            name: "David Wilson",
            role: "Operations Manager",
            image: "https://example.com/path-to-image5.jpg",
            description: "Logistics specialist"
        }
    ]

    return (
        <>
            <section>
                <Container>
                    <Row>
                        <Col lg='12'>
                            <div className="about__content">
                                <div className="hero__subtitle d-flex align-items-center">
                                    <Subtitle subtitle={'Know Before You Go'} />
                                    <img src={worldImg} alt="" />
                                </div>
                                <h2 className="about__title">We're dedicated to providing
                                    unforgettable travel experiences</h2>
                                <p className="about__desc">
                                    Our team of experienced travel enthusiasts is committed to making your
                                    journey memorable. With years of expertise in the tourism industry,
                                    we carefully craft each tour to ensure the perfect balance of adventure,
                                    comfort, and cultural immersion.
                                </p>
                            </div>
                        </Col>
                    </Row>

                    <div className="team__container">
                        {teamMembers.map((member, index) => (
                            <div className="team__member" key={index}>
                                <div className="team__member-img">
                                    <img src={member.image} alt={member.name} />
                                </div>
                                <div className="team__member-details">
                                    <h4>{member.name}</h4>
                                    <p className="team__member-role">{member.role}</p>
                                    <p className="team__member-desc">{member.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Container>
            </section>

        </>
    )
}

export default About