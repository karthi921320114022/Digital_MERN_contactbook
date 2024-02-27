//AddressList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navigation from './Navigation';
import { PencilSquare, Trash } from 'react-bootstrap-icons';

const AddressList = () => {
const [addresses, setAddresses] = useState([]);
const [selectedAddress, setSelectedAddress] = useState(null);

//handle for fetching addresses on page load
useEffect(() => {
	axios.get('http://localhost:5000/api/addresses').then((response) => {
	setAddresses(response.data);
	});
}, []);

//handle for deleting address
const handleDelete = (addressId) => {
	axios
	.delete(`http://localhost:5000/api/addresses/${addressId}`)
	.then(() => {
		axios.get('http://localhost:5000/api/addresses').then((response) => {
		setAddresses(response.data);
		});
	})
	.catch((error) => {
		console.error('Error deleting address: ', error);
	});
};

//handle for setting address to be deleted 
const handleEdit = (address) => {
	setSelectedAddress(address);
};

//handle for updating address
const handleUpdate = (updatedAddress) => {
	axios
	.put(`http://localhost:5000/api/addresses/${updatedAddress._id}`, updatedAddress)
	.then(() => {
		axios.get('http://localhost:5000/api/addresses').then((response) => {
		setAddresses(response.data);
		setSelectedAddress(null);
		});
	})
	.catch((error) => {
		console.error('Error updating address: ', error);
	});
};

return (
	<div className='container container-fluid min-vh-100 justify-content-center'>
	<h2 className='display-2 text-center'>Address Book</h2>
	< Navigation />
	{selectedAddress && (
		<div>
		<h2>Edit contact</h2>
        
		<form onSubmit={() => handleUpdate(selectedAddress)}>
			<div className="form-group">
			<label>Name:</label>
			<input
				type="text"
				className="form-control"
				name="name"
				value={selectedAddress.name}
				onChange={(e) =>
				setSelectedAddress({
					...selectedAddress,
					name: e.target.value,
				})
				}
				required
			/>
			</div>
			<div className="form-group">
			<label>Email:</label>
			<input
				type="email"
				className="form-control"
				name="email"
				value={selectedAddress.email}
				onChange={(e) =>
				setSelectedAddress({
					...selectedAddress,
					email: e.target.value,
				})
				}
				required
			/>
			</div>
			<div className="form-group">
			<label>Phone:</label>
			<input
				type="text"
				className="form-control"
				name="phone"
				value={selectedAddress.contact}
				onChange={(e) =>
				setSelectedAddress({
					...selectedAddress,
					contact: e.target.value,
				})
				}
				required
			/>
			</div>
			<div className="form-group">
			<label>Address:</label>
			<input
				type="text"
				className="form-control"
				name="name"
				value={selectedAddress.address}
				onChange={(e) =>
				setSelectedAddress({
					...selectedAddress,
					address: e.target.value,
				})
				}
				required
			/>
			</div>
			<div>
			<button type="submit" className="btn btn-primary m-2">
				Update Address
			</button>
			</div>
		</form>
		</div>
	)}
	<ul>
		{addresses.map((address) => (
		<div className='container border border-dark rounded m-2 p-2 text-right' key={address._id}>
			<h5>Name : {address.name}</h5>
			<h5>Email : {address.email}</h5>
			<h5>Contact : {address.contact}</h5>
			<h5>Address : {address.address}</h5>
			<button
			className="btn btn-sm"
			onClick={() => handleDelete(address._id)}
			>
			<h5>< Trash /></h5>
			</button>
			<button
			type="button" className="btn"
			onClick={() => handleEdit(address)}
			>
			<h5>< PencilSquare /></h5>
			</button>
		</div>
		))}
	</ul>
	</div>
);
};

export default AddressList;
