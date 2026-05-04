import { useContext } from 'react'
import PropTypes from 'prop-types'
import { StudentContext } from '../contexts/StudentContext'

function SearchBar() {
  const { searchQuery, setSearchQuery } = useContext(StudentContext)

  return (
    <div className="search-bar-container">
      <input
        type="text"
        className="search-bar"
        placeholder="Search by name or major..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        aria-label="Search students"
      />
      {searchQuery && (
        <button
          type="button"
          className="search-clear-btn"
          onClick={() => setSearchQuery('')}
          aria-label="Clear search"
        >
          ✕
        </button>
      )}
    </div>
  )
}

SearchBar.propTypes = {}

export default SearchBar
