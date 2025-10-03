import noteService from "./services/notes";
import Note from "./components/Note";
import { useState, useEffect } from "react";
import { Search } from "lucide-react";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    noteService
      .getAll()
      .then((response) => {
        setNotes(response.data);
      })
      .catch((error) => {
        console.error("Axios error:", error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    noteService
      .create({
        name: newName,
        phone: newPhone,
        important: false,
      })
      .then((response) => {
        setNotes((prev) => [...prev, response.data]);
        setNewName("");
        setNewPhone("");
      })
      .catch((error) => {
        console.error("Axios error:", error);
      });
  };

  const toggleImportanceOf = (id) => {
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };

    noteService.update(id, changedNote).then((response) => {
      setNotes(notes.map((n) => (n.id === id ? response.data : n)));
    });
  };

  const filteredSearch = notes.filter(
    (note) =>
      note.name.toLowerCase().includes(search.toLowerCase()) ||
      note.phone.toString().includes(search)
  );

  return (
    <>
      <div className="top-0 flex flex-col xl:fixed items-center h-full border-r border-amber-600/20 ">
        {" "}
        <h1 className="text-8xl font-black m-10 bg-amber-500/30 px-10 py-2 rounded-full">
          Phone<span className="text-amber-500 ">book</span>
        </h1>
        {/* Search */}
        <h2 className="text-5xl inline-flex gap-x-2  bg-atext-5xl text-center font-black tracking-wide text-amber-500 my-5 ">
          <Search size={50} />
          Search for a number
        </h2>
        <input
          className="border mb-4 rounded-full p-2 border-amber-200 bg-amber-800/10 focus-within:outline-0"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or phone"
        />
        {/* Add new contact */}
        <div className="bg-amber-500/20 items-center justify-center flex flex-col p-10 rounded-xl  xl:fixed left-35 top-100 ">
          <h2 className="text-5xl text-center font-black tracking-wide text-amber-500">
            Add a Number
          </h2>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-y-2 w-60 mt-5 ">
            <label className="font-bold  text-black">Add Name </label>
            <input
              className="border mb-4 rounded-full p-2 border-amber-200 bg-amber-800/10 focus-within:outline-0"
              placeholder="Add name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
            <label className="font-bold  text-black">Add Phone Number: </label>
            <input
              className="border mb-4 rounded-full p-2 border-amber-200 bg-amber-800/10 focus-within:outline-0"
              placeholder="Add Phone Number"
              value={newPhone}
              onChange={(e) => setNewPhone(e.target.value)}
              type="number"
            />
            <button className="bg-amber-500 text-white p-2 px-2 rounded-xl mb-2 cursor-pointer">
              Submit
            </button>
          </form>
        </div>
      </div>

      {/* Numbers */}
      {!notes.length > 0 ? (
        <>
          {" "}
          <div className=" flex items-center justify-center md:justify-end md:mr-50 lg:justify-end lg:mr-50 2xl:mr-150">
            <div className="flex flex-col text-center">
              {" "}
              <h1 className="inline-flex  justify-center mb-5 gap-x-2 text-5xl  font-black tracking-wide text-amber-500 my-10">
                Numbers
              </h1>
              <p className="text-amber-500/40">No Numbers Yet!</p>
            </div>
          </div>
        </>
      ) : (
        <div className="grid -grid-cols-4 items-end xl:justify-end gap-y-2 2xl:mr-30 xl:mr-10 mt-10 ">
          <p className="inline-flex  justify-center mb-5 gap-x-2 text-5xl  font-black tracking-wide text-amber-500 my-10">
            Numbers
          </p>
          <ul className="text-center grid grid-cols-1 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2  items-end gap-x-2">
            {filteredSearch.map((note) => (
              <Note
                key={note.id}
                note={note}
                toggleImportance={() => toggleImportanceOf(note.id)}
              />
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default App;
