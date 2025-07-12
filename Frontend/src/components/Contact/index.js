import React from 'react';
import img from '../Contact/images/img.png'
const Contact = () => {
  return (
    <div className='contact' style={{backgroundImage:`URL(${img})`,height:511}}>
        <h3>contact us at </h3>
        <h3>Email: </h3>
        <h5>suppportmillcart@gmail.com</h5>
    </div>
  );
};

export default Contact;

