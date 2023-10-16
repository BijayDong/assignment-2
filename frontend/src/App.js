import { useState, useEffect } from "react";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import ContactDetails from "./components/ContactDetails";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    // This function fetches all contacts from the server
    const fetchContacts = async () => {
      try {
        const response = await fetch("/api/contacts");
        const data = await response.json();
        if (response.ok) {
          setContacts(data);
        } else {
          console.error("Failed to fetch contacts:", data.message);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchContacts();
  }, []); // This useEffect runs once when the component mounts

  const handleAddContact = async () => {
    if (name) {
      try {
        const response = await fetch("/api/contacts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: name }),
        });

        const data = await response.json();
        if (response.ok) {
          setContacts([...contacts, data]);
          setName("");
        } else {
          console.error("Failed to add contact:", data.message);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const handleDeleteContact = async (contactId, contactName) => {
    try {
      const response = await fetch(`/api/contacts/${contactId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setContacts(contacts.filter((contact) => contact.name !== contactName));
      } else {
        const data = await response.json();
        console.error("Failed to delete contact:", data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
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
