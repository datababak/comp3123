
/*
 * Student Name: Babak Mokri
 * Course: COMP3123 - Full Stack Development I
 * Lab: Week 10 - React Data Entry Form
 * Description: React form using useState to collect
 * and display submitted user information.
 */


import { useState } from 'react'
import './App.css'

function App() {

  // Store all form data in React state
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    address: '',
    address2: '',
    city: '',
    province: '',
    postalCode: '',
    agree: false
  })
  const [submittedData, setSubmittedData] = useState(null)

  // Handle changes to all form fields
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target

    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    })
  }

  // Handle form submission
  const handleSubmit = (event) => {
  event.preventDefault()
  setSubmittedData({ ...formData })
}

  return (
    <div>
      <h1>Data Entry Form</h1>

      <form onSubmit={handleSubmit}>

        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="Enter email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label>Full Name</label>
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          required
        />

        <label>Address</label>
        <input
          type="text"
          name="address"
          placeholder="1234 Main St"
          value={formData.address}
          onChange={handleChange}
          required
        />

        <label>Address 2</label>
        <input
          type="text"
          name="address2"
          placeholder="Apartment, studio, or floor"
          value={formData.address2}
          onChange={handleChange}
        />

        <label>City</label>
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          required
        />
      
        <label>Province</label>
        <select
          name="province"
          value={formData.province}
          onChange={handleChange}
          required
        >
          <option value="">Choose...</option>
          <option value="Alberta">Alberta</option>
          <option value="British Columbia">British Columbia</option>
          <option value="Manitoba">Manitoba</option>
          <option value="New Brunswick">New Brunswick</option>
          <option value="Newfoundland and Labrador">Newfoundland and Labrador</option>
          <option value="Nova Scotia">Nova Scotia</option>
          <option value="Ontario">Ontario</option>
          <option value="Prince Edward Island">Prince Edward Island</option>
          <option value="Quebec">Quebec</option>
          <option value="Saskatchewan">Saskatchewan</option>
        </select>

        <label>Postal Code</label>
        <input
          type="text"
          name="postalCode"
          value={formData.postalCode}
          onChange={handleChange}
          required
        />

        <div>
          <label>
            <input
              type="checkbox"
              name="agree"
              checked={formData.agree}
              onChange={handleChange}
              required
            />
            Agree Terms & Condition?
          </label>
        </div>

        <button type="submit">
          Submit
        </button>

      </form>

      {/* Display current form data for testing */}
      {/*<h2>Form Data Preview</h2>*/}
      {/*<pre>{JSON.stringify(formData, null, 2)}</pre>*/}
      {submittedData && (
        <div className="submitted-data">
          <p><strong>Email:</strong> {submittedData.email}</p>
          <p><strong>Full Name:</strong> {submittedData.fullName}</p>
          <p><strong>Address:</strong> {submittedData.address}</p>
          {submittedData.address2 && (
            <p><strong>Address 2:</strong> {submittedData.address2}</p>
          )}
          <p><strong>City:</strong> {submittedData.city}</p>
          <p><strong>Province:</strong> {submittedData.province}</p>
          <p><strong>Postal Code:</strong> {submittedData.postalCode}</p>
          <p><strong>Terms Accepted:</strong> {submittedData.agree ? 'Yes' : 'No'}</p>
        </div>
      )}

    </div>
  )
}

export default App
