import React, { useState } from 'react';
import './index.css'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
const Payment = () => {
  const [billingAddress, setBillingAddress] = useState({
    name: '',
    address: '',
    city: '',
    zipCode: '',
  });
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBillingAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setOrderConfirmed(true);
  };
  return (
    <div>
        <div className='main-container'>
      {orderConfirmed ? (
        <div className='success-container'>
            
          <p className='confirmation'>Order Confirmed! Thank you for your purchase.</p>
          <button type="button" className='payment-button'>
            <Link to="/" className="link-texts">
            Go to Home
            </Link>
          </button>
        </div>
      ) : (
        <form onSubmit={handleFormSubmit}>
            
            <h2>Payment Form</h2>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={billingAddress.name}
              onChange={handleInputChange}
              required
            />
          </label>
          <br />
          <label>
            Address:
            <input
              type="text"
              name="address"
              value={billingAddress.address}
              onChange={handleInputChange}
              required
            />
          </label>
          <br />
          <label>
            City:
            <input
              type="text"
              name="city"
              value={billingAddress.city}
              onChange={handleInputChange}
              required
            />
          </label>
          <br />
          <label>
            Zip Code:
            <input
              type="text"
              name="zipCode"
              value={billingAddress.zipCode}
              onChange={handleInputChange}
              required
            />
          </label>
          <br />
          <h2>Enter Card Details</h2>
          <label>
            Enter mode of Payment: 
            <select>
                <option value=''>Select the mode</option>
                <option value='cards'>Credit/Debit Cards</option>
                <option value='cod' className='cod-option'>*COD (currently -not accepting)</option>
            </select>
          </label>
          <label>
            Enter Card Number:
            <input type='text' placeholder='- - - - - - - - - - - -' required />
          </label>
          <label>
            Select expiry date:
            <input type="date"/>
          </label>
          <label>
            Enter CVV:
            <input type="password" placeholder='- - -' required />
          </label>
          <button type="submit" className='payment-button'>Confirm Order</button>
        </form>
      )}
    </div>
    </div>
  );
};

export default Payment