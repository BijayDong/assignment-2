import { useState, useEffect } from "react"; // import useEffect
import "./App.css";
import Header from "./components/Header";
import ContactInput from "./components/ContactInput";

function App() {
  return (
    <div>
      <Header />
      <ContactInput />
    </div>
  );
}
export default App;
