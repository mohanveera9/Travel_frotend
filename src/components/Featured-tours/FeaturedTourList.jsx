import React from 'react'
import { Col } from 'reactstrap'
import './featured-tours.css'

const FeaturedTourList = () => {
   const services = [
      {
         title: "Free Wi-Fi",
         desc: "Stay connected with high-speed internet access throughout your journey.",
         icon: "ri-wifi-line"
      },
      {
         title: "Food & Beverages",
         desc: "Enjoy delicious meals and refreshing drinks during your travels.",
         icon: "ri-restaurant-2-line"
      },
      {
         title: "Adventures",
         desc: "Experience thrilling activities and unforgettable adventures.",
         icon: "ri-compass-3-line"
      },
      {
         title: "Affordable Hotels",
         desc: "Comfortable stays at budget-friendly accommodations.",
         icon: "ri-hotel-line"
      },
      {
         title: "Fastest Travel",
         desc: "Efficient transportation and optimized travel routes.",
         icon: "ri-flight-takeoff-line"
      }
   ];

   return (
      <div className="services__container">
         {services.map((service, index) => (
            <div className='service__card' key={index}>
               <div className='service__icon'>
                  <i className={service.icon}></i>
               </div>
               <h5 className='service__title'>{service.title}</h5>
               <p className='service__desc'>{service.desc}</p>
            </div>
         ))}
      </div>
   )
}

export default FeaturedTourList