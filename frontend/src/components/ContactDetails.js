import React, { useState } from "react";
import "./ContactDetails.css";

function ContactDetails({
  contactId,
  contactName,
  contactDetails = [],
  handleUpdateContactDetails,
}) {
  const [contactType, setContactType] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleAddDetail = async () => {
    if (phoneNumber && contactType) {
      try {
        const response = await fetch(`/api/contacts/${contactId}/phones`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phoneNumber: phoneNumber,
          }),
        });

        if (response.ok) {
          const newDetails = [
            ...contactDetails,
            { type: contactType, number: phoneNumber },
          ];
          handleUpdateContactDetails(contactName, newDetails);
        } else {
          const data = await response.json();
          console.error("Failed to add phone number:", data.message);
        }
      } catch (error) {
        console.error("Error:", error);
      }

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
          type="text"
          className="contact-field"
          placeholder="Number"
          value={phoneNumber}
          onChange={(e) => {
            // This regex ensures only numbers are input
            if (/^[0-9]*$/.test(e.target.value)) {
              setPhoneNumber(e.target.value);
            }
          }}
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
