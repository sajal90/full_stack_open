import { useEffect, useState } from "react";
import personService from "./services/persons.js";
import Persons from "./components/Persons.jsx";
import Filter from "./components/Filter.jsx";
import PersonForm from "./components/PersonForm.jsx";
import Notification from "./components/Notification.jsx";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [notifyMessage, setNotifyMessage] = useState(null);

  useEffect(() => {
    personService
      .getAll()
      .then((response) => {
        setPersons(response);
      });
  }, []);

  const personsToShow = filter === "" ? persons : persons.filter(
    (person) => person.name.toLowerCase().includes(filter),
  );

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSumbit = (event) => {
    event.preventDefault();
    if (newName == "" || newNumber == "") {
      return;
    }

    const names = persons.map((person) => person.name);
    const newPerson = {
      name: newName,
      number: newNumber,
    };

    if (names.includes(newName)) {
      const rep = window.confirm(
        `${newName} is already added to phonebook , replace the old number with a new one`,
      );

      const existingPerson = persons.find((person) => person.name === newName);

      if (rep) {
        personService
          .update(existingPerson.id, newPerson)
          .then((res) => {
            console.log(res);
            setPersons(
              persons.map((person) => person.name === newName ? res : person),
            );

            setNewName("");
            setNewNumber("");
          });
      }
    } else {
      personService
        .create(newPerson)
        .then((response) => {
          setNotifyMessage(`Added ${newName}`);
          setTimeout(() => {
            setNotifyMessage(null);
          }, 5000);
          setPersons(persons.concat(response));
        });

      setNewName("");
      setNewNumber("");
    }
  };

  const handleDelete = (id) => {
    const personToDel = persons.find((p) => p.id === id);

    if (window.confirm(`Delete ${personToDel.name}`)) {
      personService
        .remove(id)
        .then((res) => {
          setNotifyMessage(`Deleted ${personToDel.name}`);
          setTimeout(() => {
            setNotifyMessage(null);
          }, 5000);
          setPersons(persons.filter((per) => per.id !== res.id));
        });
    }
  };

  const handleFilter = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notifyMessage} />
      <Filter filter={filter} handle={handleFilter} />
      <h2>add a new</h2>
      <PersonForm
        handleSumbit={handleSumbit}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumChange={handleNumChange}
      />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
