import React from 'react';
import '../../style/footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div className="footers container">
            <div className="flex-row">
                <div className="flex-col">
                    <p>About WeShopping</p>
                    <Link to="how-it-works">How it works?</Link>
                    <Link to="features">Features</Link>
                    <Link to="about">Shopping Data</Link>
                </div>
                <div className="flex-col">
                    <p>Popular Searches</p>
                    <Link to="about">Phone</Link>
                    <Link to="about">Electronics</Link>
                    <Link to="about">Laptop</Link>
                </div>
                <div className="flex-col">
                    <p>Shopping</p>
                    <Link to="about">Google Shopping</Link>
                    <Link to="about">Walmart</Link>
                    <Link to="about">Amazon</Link>
                </div>

                <div className="flex-col">
                    <p>About Me</p>
                    <a href="http://jake-seo.com">Website</a>

                </div>
            </div>
            <div className="footer-line">
                <a href="https://github.com/seoi99/weshopping"><i className="fa fa-github"></i>Github</a>
                <a href="https://www.linkedin.com/in/bumju-seo-960598bb/"><i className="fa fa-linkedin"></i>Linkedin</a>
                <a href="https://angel.co/jake-seo?public_profile=1"><i className="fa fa-angellist"></i>Angelist</a>
            </div>
        </div>
    )
}

export default Footer
