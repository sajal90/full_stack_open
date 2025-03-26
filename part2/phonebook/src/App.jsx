import { useState } from "react";

const Filter = ({ filter, handle }) => {
  return (
    <p>
      filter shown with <input value={filter} onChange={handle} />
    </p>
  );
};

const PersonForm = (props) => {
  return (
    <form onSubmit={props.handleSumbit}>
      <div>
        name: <input value={props.newName} onChange={props.handleNameChange} />
      </div>
      <div>
        number:{" "}
        <input value={props.newNumber} onChange={props.handleNumChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Persons = ({ persons }) => {
  return (
    <div>
      {persons.map((person) => (
        <p key={person.id}>{person.name} {person.number}</p>
      ))}
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

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

    if (names.includes(newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };

    setPersons(persons.concat(newPerson));
    setNewName("");
    setNewNumber("");
  };

  const handleFilter = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
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
      <Persons persons={personsToShow} />
    </div>
  );
};

export default App;
