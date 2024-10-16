import React from 'react';
import './Testimonials.css'

const Testimonials = () => {
    return (
        <div className="testimonial-sections">
            <div className="testimonial-section-container">
                <h1>Our <span className="speColor">Testimonials</span></h1>
                <p className="testimonial-text">
                    "StoreCode has revolutionized my shopping experience. The unique code system not only simplifies the
                    process but also ensures I get the best deals. As a loyal user, the discounts and curated looks provided
                    by the guides have made my online shopping more enjoyable and budget-friendly." - Emily, StoreCode
                    Enthusiast
                </p>
                <div className="testimonial-stars">
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                </div>

                <div className="testimonial-review">
                    <img className="t-img"
                        src="https://tse1.mm.bing.net/th?id=OIP.1o-TJSApGqPBqk0H3KoPkAHaE8&pid=Api&rs=1&c=1&qlt=95&w=154&h=103"
                        alt="testImg" />
                    <img className="t-img"
                        src="https://tse1.mm.bing.net/th?id=OIP.UGlKxiZQylR3CnJIXSbFIAHaLL&pid=Api&rs=1&c=1&qlt=95&w=80&h=121"
                        alt="testImg" />
                    <img className="t-img"
                        src="https://tse1.mm.bing.net/th?id=OIP.s3loj4y1yo0wNTtgCNoWAAHaEO&pid=Api&rs=1&c=1&qlt=95&w=211&h=120"
                        alt="testImg" />
                    <img className="t-img"
                        src="https://tse1.mm.bing.net/th?id=OIP.lQsa4sgRqle2a-tY3PmDogHaGM&pid=Api&rs=1&c=1&qlt=95&w=137&h=115"
                        alt="testImg" />
                </div>
                <button className="primary-btn">See more <i className="fa-solid fa-right-long"></i></button>
            </div>
        </div>

    )
}

export default Testimonials