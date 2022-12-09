import React, { useState } from "react";
import Constants from "../utilities/Constants";

export default function PersonUpdateForm(props) {
  const initialFormData = Object.freeze({
    firstName: props.person.firstName,
    lastName: props.person.lastName,
    phoneNumber: props.person.phoneNumber,
    email: props.person.email,
  });

  const phfirstName = props.person.firstName;
  const phlastName = props.person.lastName;
  const phphoneNumber = props.person.phoneNumber;
  const phemail = props.person.email;

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const personToUpdate = {
      personId: props.person.personId,
      firstName: formData.firstName,
      lastName: formData.lastName,
      phoneNumber: formData.phoneNumber,
      email: formData.email,
    };

    const url = Constants.API_URL_UPDATE_PERSON;

    fetch(url, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(personToUpdate),
    })
      .then((response) => response.json())
      .then((responseFromServer) => {
        console.log(responseFromServer);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });

    props.onPersonUpdated(personToUpdate);
  };

  return (
    <form style={{color: 'white'}} className="w-100 px-5">
      <h1 className="mt-5">Edit {props.person.firstName} {props.person.lastName} info</h1>

      <div className="mt-5">
        <label className="h3 form-label">First Name</label>
        <input
          placeholder={phfirstName}
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
          placeholder={phlastName}
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
          placeholder={phphoneNumber}
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
          placeholder={phemail}
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
        Save changes
      </button>
      <button
        style={{color: 'white', backgroundColor: 'purple'}}
        onClick={() => props.onPersonUpdated(null)}
        className="btn btn-dark btn-lg w-100 mt-2"
      >
        Cancel
      </button>
    </form>
  );
}
