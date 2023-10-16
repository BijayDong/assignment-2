import React, { useState } from "react";
import "./ContactDetails.css"; // assuming you've created a CSS file

function ContactDetails({
  contact,
  contactDetails,
  handleUpdateContactDetails,
}) {
  const [contactType, setContactType] = useState("Mobile");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleAddDetail = () => {
    if (phoneNumber) {
      const newDetails = [
        ...contactDetails,
        { type: contactType, number: phoneNumber },
      ];
      handleUpdateContactDetails(contact, newDetails);
      setPhoneNumber("");
    }
  };

  return (
    <div>
      <div className="contact-row">
        <select
          className="contact-field"
          value={contactType}
          onChange={(e) => setContactType(e.target.value)}
        >
          <option value="Mobile">Mobile</option>
          <option value="Office">Office</option>
        </select>

        <input
          type="text"
          className="contact-field"
          placeholder="Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />

        <button onClick={handleAddDetail}>Add</button>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Type</th>
            <th>Number</th>
          </tr>
        </thead>
        <tbody>
          {contactDetails.map((detail, index) => (
            <tr key={index}>
              <td>{detail.type}</td>
              <td>{detail.number}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ContactDetails;
