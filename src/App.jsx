import React, { useState } from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { supabase } from './supabaseClient.js';  // Import the supabase client

function App() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Insert data into Supabase 'submission' table
    const { data, error } = await supabase
      .from('submission')  // Table name
      .insert([
        { name: formData.name, email: formData.email, phone: formData.phone }
      ]);

    if (error) {
      setMessage('Error submitting form!');
      console.error(error);
    } else {
      setMessage('Form submitted successfully!');
      console.log(data); // Log the response data (optional)
    }
  };

  return (
    <div className='container my-5' style={{border: '1px solid black', borderRadius: '10px', padding: '20px'}}>
      <div className="app-container">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit} className="form">
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="phone" className="form-label">Phone Number</label>
            <input
              type="tel"
              className="form-control"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn-submit">Submit</button>
        </form>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
}

export default App;
