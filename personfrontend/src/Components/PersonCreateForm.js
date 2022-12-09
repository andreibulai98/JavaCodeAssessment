import React, { useState } from "react";
import Constants from "../utilities/Constants";

export default function PersonCreateForm(props) {
  const initialFormData = Object.freeze({
    firstName: "First Name",
    lastName: "Last Name",
    phoneNumber: "000 000 000",
    email: "email@gmail.com",
  });

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const personToCreate = {
      personId: 0,
      firstName: formData.firstName,
      lastName: formData.lastName,
      phoneNumber: formData.phoneNumber,
      email: formData.email,
    };

    const url = Constants.API_URL_CREATE_PERSON;

    fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(personToCreate),
    })
      .then((response) => response.json())
      .then((responseFromServer) => {
        console.log(responseFromServer);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });

    props.onPersonCreated(personToCreate);
  };

  return (
    <form style={{color: 'white'}} className="w-100 px-5">
      <h1 className="mt-5">Add new person</h1>

      <div className="mt-5">
        <label className="h3 form-label">First Name</label>
        <input
          placeholder="First Name"
          value={FormData.firstName}
          name="firstName"
          type="text"
          className="form-control"
          onChange={handleChange}
        />
      </div>

      <div className="mt-2">
        <label className="h3 form-label">Last Name</label>
        
        <input
          placeholder="Last Name"
          value={FormData.lastName}
          name="lastName"
          type="text"
          className="form-control"
          onChange={handleChange}
        />
      </div>

      <div className="mt-2">
        <label className="h3 form-label">Phone number</label>
        
        <input
          placeholder="0000 000 000"
          value={FormData.phoneNumber}
          name="phoneNumber"
          type="text"
          className="form-control"
          onChange={handleChange}
        />
      </div>

      <div className="mt-2">
        <label className="h3 form-label">Email</label>
        
        <input
          placeholder="email@example.com"
          value={FormData.email}
          name="email"
          type="text"
          className="form-control"
          onChange={handleChange}
        />
      </div>

      <button 
        style={{color: 'white', backgroundColor: 'indigo'}}
        onClick={handleSubmit} className="btn btn-dark btn-lg w-100 mt-5">
        Save person
      </button>
      <button
        style={{color: 'white', backgroundColor: 'purple'}}
        onClick={() => props.onPersonCreated(null)}
        className="btn btn-dark btn-lg w-100 mt-2"
      >
        Cancel
      </button>
    </form>
  );
}
