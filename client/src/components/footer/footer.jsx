import React from 'react';
import '../../style/footer.css';
const Footer = () => {
    return (
        <div className="footers container">
            <div className="flex-row">
                <div className="flex-col">
                  <p>About WeShopping</p>
                  <a href="how-it-works">How it works?</a>
                  <a href="features">Features</a>
                  <a href="about">Shopping Data</a>
                </div>
                <div className="flex-col">
                  <p>Popular Searches</p>
                  <a href="about">Phone</a>
                  <a href="about">Electronics</a>
                  <a href="about">Laptop</a>
                </div>
                <div className="flex-col">
                  <p>Shopping</p>
                  <a href="about">Google Shopping</a>
                  <a href="about">Walmart</a>
                  <a href="about">Amazon</a>
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
