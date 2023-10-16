import React from "react";

function ContactForm({ name, setName, handleAddContact }) {
  return (
    <div>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handleAddContact}>Create Contact</button>
    </div>
  );
}

export default ContactForm;
