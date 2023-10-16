import React, { useState } from "react";
import ContactDetails from "./ContactDetails";
import "./ContactList.css";

function ContactList({
  contacts,
  handleDeleteContact,
  handleUpdateContactDetails,
}) {
  // State to keep track of the selected contact
  const [selectedContact, setSelectedContact] = useState(null);

  return (
    <div className="contacts-list">
      {contacts.map((contact, index) => (
        <div key={index}>
          <div className="contact-item">
            {/* Update the onClick for the contact-name-btn */}
            <button
              className="contact-name-btn"
              onClick={() => setSelectedContact(contact.name)}
            >
              {contact.name}
            </button>
            <button onClick={() => handleDeleteContact(contact.name)}>
              Delete
            </button>
          </div>
          {/* Conditionally render ContactDetails based on selectedContact */}
          {selectedContact === contact.name && (
            <ContactDetails
              contact={contact.name}
              contactDetails={contact.details}
              handleUpdateContactDetails={handleUpdateContactDetails}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default ContactList;
