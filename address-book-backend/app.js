//app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

//bodyparser used for parsing request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/addressbook');

const Address = require('./models/address');

//Get route for fetching addresses from database
app.get('/api/addresses', async (req, res) => {
try {
	const addresses = await Address.find();
	res.json(addresses);
} catch (err) {
	res.status(500).json({ error: err.message });
}
});

//Post route for storing new address 
app.post('/api/addresses', async (req, res) => {
try {
	const newAddress = new Address(req.body);
	const savedAddress = await newAddress.save();
	res.status(201).json(savedAddress);
} catch (err) {
	res.status(400).json({ error: err.message });
}
});

//Put route for updating address with new data
app.put('/api/addresses/:id', async (req, res) => {
try {
	const updatedAddress = await Address.findByIdAndUpdate(
	req.params.id,
	req.body,
	{ new: true }
	);
	res.json(updatedAddress);
} catch (err) {
	res.status(400).json({ error: err.message });
}
});

//Delete route for deleting address with specified id
app.delete('/api/addresses/:id', async (req, res) => {
try {
	await Address.findByIdAndRemove(req.params.id);
	res.json({ message: 'Address deleted' });
} catch (err) {
	res.status(500).json({ error: err.message });
}
});

const PORT = 5000;
app.listen(PORT, () => {
console.log(`Server is started on port ${PORT}`);
});
