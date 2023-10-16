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
            <button
              className="contact-name-btn"
              onClick={() => setSelectedContact(contact.id)}
            >
              {contact.name}
            </button>
            <button onClick={() => handleDeleteContact(contact.name)}>
              Delete
            </button>
          </div>
          {/* Conditionally render ContactDetails based on selectedContact */}
          {selectedContact === contact.id && (
            <ContactDetails
              contactId={contact.id}
              contactName={contact.name}
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
