export const SearchBar = ({ onSubmit }) => {

  return (
      <form className="searchForm">
        <input
          className="searchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search movie"
        />

        <button
          type="submit"
          className="searchForm-button"
          onClick={evt => {
            onSubmit(evt.target.previousElementSibling.value);
            evt.preventDefault();
          }}
        >
          Search
        </button>
      </form>
  );
};
