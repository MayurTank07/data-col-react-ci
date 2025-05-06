import React, { useState } from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { supabase } from './supabaseClient.js';

function App() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name.trim() || formData.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters long.";
    }

    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.phone.trim() || !/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be exactly 10 digits.";
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' }); // clear field error on input
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setMessage('');
      return;
    }

    const { data, error } = await supabase
      .from('submission')
      .insert([{ name: formData.name, email: formData.email, phone: formData.phone }]);

    if (error) {
      setMessage('❌ Error submitting form!');
      console.error(error);
    } else {
      setMessage('✅ Form submitted successfully!');
      setFormData({ name: '', email: '', phone: '' });
      setErrors({});
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="shadow-lg rounded-4 p-5 bg-white w-100" style={{ maxWidth: '600px' }}>
        <div className="text-center mb-4">
          <h2 className="fw-bold text-primary">Course + Internship Program</h2>
          <p className="text-muted mb-1"><strong>Offered by StarX Innovations and IT Solutions</strong></p>
          <p className="mb-1"><i className="bi bi-geo-alt-fill text-danger"></i> Mulund, Mumbai, India</p>
          <p className="mb-1">🕒 <strong>6 Months</strong> – 3 Months Course + 3 Months Internship</p>
          <p className="text-muted">Learn Courses from scratch, build amazing projects, and gain real-world experience.</p>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <label htmlFor="name" className="form-label fw-semibold">👤 Full Name</label>
            <input
              type="text"
              className={`form-control form-control-lg ${errors.name ? 'is-invalid' : ''}`}
              id="name"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-semibold">📧 Email Address</label>
            <input
              type="email"
              className={`form-control form-control-lg ${errors.email ? 'is-invalid' : ''}`}
              id="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>

          <div className="mb-4">
            <label htmlFor="phone" className="form-label fw-semibold">📱 Phone Number</label>
            <input
              type="tel"
              className={`form-control form-control-lg ${errors.phone ? 'is-invalid' : ''}`}
              id="phone"
              name="phone"
              placeholder="e.g. 1234567890"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
          </div>

          <button type="submit" className="btn btn-primary w-100 btn-lg">
            🚀 Enroll Now
          </button>
        </form>

        {message && (
          <div className={`alert mt-4 ${message.includes('Error') ? 'alert-danger' : 'alert-success'}`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
