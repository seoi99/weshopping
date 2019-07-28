import React from 'react';
import '../../style/howitworks.css';

const HowItWorks = () => {

    return (
        <div className="container">
          <div className="how-it-works">
          <h1> How It Works? </h1>
          <p>
            WeShopping is a single page application that uses MERN stack as a technology background.
          </p>
          <p> Purpose of this website is to provide best price for your item</p>
          <p> All the search data is from <b>PriceAPI</b></p>
          <h2> Search Work Flow </h2>
          <ol className="master-list">
            <li>User Search "phone", </li>
            <li>if category/product name "phone" is exists in my database </li>
            <ul>
            <li>return search result from my database without calling priceAPI </li>
            </ul>
            <li>if "phone" does not exists in my database</li>
            <ul>
            <li>request search to PriceAPI</li>
            <li>get response from PriceAPI, and parse the data</li>
            <li>Save data to database, and return search result to user </li>
            </ul>
            <li>repeat the process</li>
          </ol>
          </div>
        </div>
    )
}

export default HowItWorks
