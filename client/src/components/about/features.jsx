import React from 'react';
import '../../style/features.css';


const Features = () => {

    return (
        <div className="container">
          <div className="feature-container">
          <h1> Features </h1>
          <div>
            <h2>Product Search</h2>
            <p></p>
          </div>
          <div>
            <h2>Image Search</h2>
            <p>Image search is written using web-scraping contents using cheerio and axios</p>
          </div>
          <div>
            <h2>Personal e-mail</h2>
            <p>Once user consent on subscription, we send personal e-mail based on the fav-list user saved from our website</p>
            <p>WeShopping run batch email runs on daily basis to give updates on any products price from user favorite list</p>
          </div>
          <div>
            <h2>Google Login</h2>
            <p> Service consist of both O-authentiation and jwt-token authentication for users who wants to connect with our websites</p>
          </div>
          </div>
        </div>
    )
}

export default Features
