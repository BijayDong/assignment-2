const db = require("../models");
const Phones = db.phones;
const Op = db.Sequelize.Op;

// Create phone
exports.create = (req, res) => {
  if (!req.body.phoneNumber) {
    res.status(400).send({
      message: "Phone number cannot be empty",
    });
    return;
  }

  const phone = {
    phoneNumber: req.body.phoneNumber,
    contactId: req.params.contactId,
  };

  Phones.create(phone)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Error occurred while creating the phone number.",
      });
    });
};

// Get all phones
exports.findAll = (req, res) => {
  Phones.findAll({ where: { contactId: req.params.contactId } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred",
      });
    });
};

// Get one phone by id
exports.findOne = (req, res) => {
  const id = req.params.phoneId;

  Phones.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find phone with id=${id} for contactId=${req.params.contactId}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error retrieving phone with id=${id}`,
      });
    });
};

// Update one phone by id
exports.update = (req, res) => {
  const id = req.params.phoneId;

  Phones.update(req.body, {
    where: { id: id, contactId: req.params.contactId },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Phone number was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update phone number with id=${id}. Maybe phone number was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error updating phone number with id=${id}`,
      });
    });
};

// Delete one phone by id
exports.delete = (req, res) => {
  const id = req.params.phoneId;

  Phones.destroy({
    where: { id: id, contactId: req.params.contactId },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Phone number was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete phone number with id=${id}. Maybe phone number was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error deleting phone number with id=${id}`,
      });
    });
};
