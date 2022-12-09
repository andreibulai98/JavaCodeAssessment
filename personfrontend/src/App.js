import React, { useState } from "react";
import Constants from "./utilities/Constants";
import PersonCreateForm from "./Components/PersonCreateForm";
import PersonUpdateForm from "./Components/PersonUpdateForm";
import "./App.css";

function App() {
  const [persons, setPersons] = useState([]);
  const [showingCreateNewPersonForm, setShowingCreateNewPersonForm] =
    useState(false);
  const [personCurrentlyBeingUpdated, setPersonCurrentlyBeingUpdated] =
    useState(null);

  function getPersons() {
    const url = Constants.API_URL_GET_ALL_PERSONS;//Constants.API_URL_GET_ALL_PERSONS; // changed from this: "https://localhost:8181/persons";

    fetch(url, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((personsFromServer) => {
        console.log(personsFromServer);
        setPersons(personsFromServer);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }

  function deletePerson(personId) {
    const url = `${Constants.API_URL_DELETE_PERSON_BY_ID}/${personId}`;

    fetch(url, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((responseFromServer) => {
        setPersons(responseFromServer);
        console.log(responseFromServer);
        onPersonDeleted(personId);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }

  return (
    <div className="container background-color: rgb(39, 39, 39);">
      <div className="row min-vh-100">
        <div className="col d-flex flex-column justify-content-center align-items-center">
          {showingCreateNewPersonForm === false &&
            personCurrentlyBeingUpdated === null &&(
              <div>
                <h1 style={{color: 'white'}}>Solera Java Assessment</h1>

                <div className="mt-5">
                  <button
                    style={{color: 'white', backgroundColor: 'indigo'}}
                    onClick={getPersons} // show all the persons in DB
                    className="btn btn-dark btn-lg w-100 mt-2"
                  >
                    Show all the persons (Get persons)
                  </button>
                  
                  <button
                    style={{color: 'white', backgroundColor: 'purple'}}
                    onClick={() => setShowingCreateNewPersonForm(true)}
                    className="btn btn-dark btn-lg w-100 mt-4"
                  >
                    Add new person
                  </button>
                </div>
              </div>
            )}

          {persons.length > 0 &&
            showingCreateNewPersonForm === false &&
            personCurrentlyBeingUpdated === null &&
            renderPersonsTable()}

          {personCurrentlyBeingUpdated !== null && (
            <PersonUpdateForm
              person={personCurrentlyBeingUpdated}
              onPersonUpdated={onPersonUpdated}
            />
          )}

          {showingCreateNewPersonForm && (
            <PersonCreateForm onPersonCreated={onPersonCreated} />
          )}
        </div>
      </div>
    </div>
  );

  function renderPersonsTable() {
    return (
      <div className="table-responsive mt-5">
        <table className="table table-bordered border-dark">
          <thead>
            <tr style={{color: 'white'}}>
              <th scope="col">Full name</th>
              <th scope="col">Details</th>
              <th scope="col">Options</th>
            </tr>
          </thead>
          <tbody>
            {persons.map((person) => (
              <tr style={{color: 'pink'}} key={person.personId}>
                <td scope="row">{person.firstName} {person.lastName}</td>
                <td>
                  First Name: {person.firstName}
                  <br></br>
                  Last Name: {person.lastName}
                  <br></br>
                  Phone number: {person.phoneNumber}
                  <br></br>
                  Email: {person.email}
                  <br></br><br></br>
                </td>
                <td>
                  <button
                    style={{color: 'white', backgroundColor: 'indigo'}}
                    onClick={() => setPersonCurrentlyBeingUpdated(person)}
                    className="btn btn-dark btn-lg mx-3 my-3"
                  >
                    Edit
                  </button>
                  <button
                    style={{color: 'white', backgroundColor: 'purple'}}
                    onClick={() => {
                      if (
                        window.confirm(
                          `Are you sure you want to delete "${person.firstName} ${person.lastName}" from the table?`
                        )
                      )
                        deletePerson(person.personId);
                    }}
                    className="btn btn-dark btn-lg mx-2 my-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button
          style={{color: 'white', backgroundColor: 'indigo'}}
          onClick={() => setPersons([])}
          className="btn btn-dark btn-lg w-100"
        >
          Hide all (Empty React Persons array)
        </button>
      </div>
    );
  }

  // onPersonCreated - based on Person Create form
  function onPersonCreated(createdPerson) {
    setShowingCreateNewPersonForm(false);

    if (createdPerson === null) {
      return;
    }

    alert(
      `Person successfully added. "${createdPerson.firstName} ${createdPerson.lastName}" will show up in the table below.`
    );

    getPersons();
  }

  // onPersonUpdated - based on Person Edit/Update form
  function onPersonUpdated(updatedPerson) {
    setPersonCurrentlyBeingUpdated(null);

    if (updatedPerson === null) {
      return;
    }

    let personsCopy = [...persons];

    const index = personsCopy.findIndex((personsCopyPerson, currentIndex) => {
      if (personsCopyPerson.personId === updatedPerson.personId) {
        return true;
      }
    });

    if (index !== -1) {
      personsCopy[index] = updatedPerson;
    }

    setPersons(personsCopy);

    alert(
      `The person details has been changed successfully. You can see the changes for "${updatedPerson.firstName} ${updatedPerson.lastName}" in the table below.`
    );
  }

  // onPersonDeleted
  function onPersonDeleted(deletedPersonPersonId) {
    let personsCopy = [...persons];

    const index = personsCopy.findIndex((personsCopyPerson, currentIndex) => {
      if (personsCopyPerson.personId === deletedPersonPersonId) {
        return true;
      }
    });

    if (index !== -1) {
      personsCopy.splice(index, 1);
    }

    setPersons(personsCopy);

    alert(`The person has been removed successfully.`);
  }

}

export default App;

