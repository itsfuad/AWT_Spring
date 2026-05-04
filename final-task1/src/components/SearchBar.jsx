import PropTypes from 'prop-types'

function SearchBar({ searchQuery, onSearchChange }) {
  return (
    <div className="search-bar-container">
      <input
        type="text"
        className="search-bar"
        placeholder="Search by name or major..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        aria-label="Search students"
      />
      {searchQuery && (
        <button
          type="button"
          className="search-clear-btn"
          onClick={() => onSearchChange('')}
          aria-label="Clear search"
        >
          ✕
        </button>
      )}
    </div>
  )
}

SearchBar.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
}

export default SearchBar
