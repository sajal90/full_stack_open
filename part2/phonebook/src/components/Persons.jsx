const Persons = ({ persons, handleDelete }) => {
  return (
    <div>
      {persons.map((person) => (
        <p key={person.id}>
          {person.name} {person.number}
          <button type="button" onClick={() => handleDelete(person.id)}>
            delete
          </button>
        </p>
      ))}
    </div>
  );
};

export default Persons;
