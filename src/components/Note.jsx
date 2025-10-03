const Note = ({ note, toggleImportance }) => {
  const label = note.important ? "Set Unimportant" : "Set Important";
  const handleClick = (e) => {
    e.preventDefault();
    toggleImportance();
  };
  return (
    <li className="grid border-1 border-amber-500/50 my-2 p-5 text-xl font-semibold gap-x-2">
      {note.name}- {note.phone}
      {note.important ? (
        <button
          className="cursor-pointer rounded-xl py-1 hover:bg-amber-500/80 bg-amber-500 text-white font-semibold"
          type="button"
          onClick={handleClick}>
          {label}
        </button>
      ) : (
        <button
          className="cursor-pointer rounded-xl py-1 bg-amber-500/70 hover:bg-amber-500/50 text-white font-semibold"
          type="button"
          onClick={handleClick}>
          {label}
        </button>
      )}
    </li>
  );
};

export default Note;
