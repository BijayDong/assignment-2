import { useState, useEffect } from "react";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import ContactDetails from "./components/ContactDetails";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [contacts, setContacts] = useState([]);

  const handleAddContact = () => {
    if (name) {
      setContacts([...contacts, { name: name, details: [] }]);
      setName("");
    }
  };

  const handleDeleteContact = (contactName) => {
    setContacts(contacts.filter((contact) => contact.name !== contactName));
  };

  const handleUpdateContactDetails = (contactName, newDetails) => {
    const updatedContacts = contacts.map((contact) =>
      contact.name === contactName
        ? { ...contact, details: newDetails }
        : contact
    );
    setContacts(updatedContacts);
  };

  return (
    <div className="app-container">
      <h1>Contractor</h1>
      <ContactForm
        name={name}
        setName={setName}
        handleAddContact={handleAddContact}
      />
      <ContactList
        contacts={contacts}
        handleDeleteContact={handleDeleteContact}
        handleUpdateContactDetails={handleUpdateContactDetails}
      />
    </div>
  );
}

export default App;
