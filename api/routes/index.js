var express = require('express');
var router = express.Router();
const ObjectID = require('mongodb').ObjectID;

router.get('/appointments', (req, res, next) => {
  
  req.appointments.find({})
    .toArray()
    .then(results => res.json(results))
    .catch(error => res.send(error));
});

router.post('/appointments', (req, res, next) => {
  const { appointmentDate, name, email, Phonenumber, Age, Address } = req.body;
  if (!appointmentDate || !name || !email || !Phonenumber || !Age || !Address ) {
    return res.status(400).json({
      message: 'Appointment Date, Name ,email and personal info are required',
    });
  }

  const payload = { appointmentDate, name, email, Phonenumber, Age, Address };
  req.appointments.insertOne(payload)
    .then(result => res.json(result))
    .catch(error => res.send(error));
});

router.delete('/appointments/:id', (req, res, next) => {
  const { id } = req.params;
  const _id = ObjectID(id);
  req.appointments.deleteOne({ _id })
    .then(result => res.json(result))
    .catch(error => res.send(error));
});

router.post('/login', (req, res, next) => {

  const { username , password } = req.body;
  if (!username || !password ) {
    return res.status(400).json({
      message: 'Username and password are required',
    });
  }

  const payload = { username, password };
  req.login.insertOne(payload)
    .then(result => res.json(result))
    .catch(error => res.send(error));
});

router.post('/register', (req, res, next) => {

  const { username , email, password } = req.body;
  if (!username || !email || !password ) {
    return res.status(400).json({
      message: 'Username,email,password are required',
    });
  }

  const payload = { username, email, password };
  req.register.insertOne(payload)
    .then(result => res.json(result))
    .catch(error => res.send(error));
});






module.exports = router;
