const express = require("express");
const cors = require("cors");
const db = require("./models");
const app = express();

var corsOptions = {
  origin: "http://localhost:3000",
};

db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
  const Contact = db.contacts;
  const Phone = db.phones;
  Contact.create({
    name: "John Doe",
  }).then((contact) => {
    Phone.create({
      phoneNumber: "045676789765",
      contactId: contact.id,
    });
  });
  Contact.create({
    name: "Bijay",
  }).then((contact) => {
    Phone.create({
      phoneNumber: "233344455",
      contactId: contact.id,
    });
  });
});

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

require("./routes/contacts.routes")(app);
require("./routes/phones.routes")(app);
require("./routes/stats.routes")(app);

// set port, listen for requests
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
