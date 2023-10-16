import React, { useState } from "react";
import "./ContactDetails.css"; // assuming you've created a CSS file

function ContactDetails({
  contact,
  contactDetails = [], // Default value set here
  handleUpdateContactDetails,
}) {
  const [contactType, setContactType] = useState(""); // initial value is an empty string
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleAddDetail = () => {
    if (phoneNumber && contactType) {
      const newDetails = [
        ...contactDetails,
        { type: contactType, number: phoneNumber },
      ];
      handleUpdateContactDetails(contact, newDetails);
      setContactType("");
      setPhoneNumber("");
    }
  };

  return (
    <div>
      <div className="contact-row">
        <input
          type="text"
          className="contact-field"
          placeholder="Name"
          value={contactType}
          onChange={(e) => setContactType(e.target.value)}
        />

        <input
          type="Number"
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
