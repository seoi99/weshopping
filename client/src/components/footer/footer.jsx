import React from 'react';
import '../../style/footer.css';
const Footer = () => {
  return (
    <div className="footers">
      <div className="flex-col">
        <h1>About WeShopping</h1>
        <a href="https://github.com/seoi99/foodie">Github</a>
      </div>
      <div className="footer-image"></div>
        <div className="flex-col">
          <h1>About Me</h1>
          <a href="https://www.linkedin.com/in/bumju-seo-960598bb/">Linkedin</a>
          <a href="http://jake-seo.com">Personal Website</a>
          <a href="https://angel.co/jake-seo?public_profile=1">Angelist</a>
        </div>
    </div>
  )
}

export default Footer
