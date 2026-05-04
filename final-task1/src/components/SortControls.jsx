import PropTypes from 'prop-types'

function SortControls({ sortBy, onSortChange }) {
  const sortOptions = [
    { value: 'default', label: 'Default' },
    { value: 'name-asc', label: 'Name (A–Z)' },
    { value: 'gpa-desc', label: 'GPA (High to Low)' },
  ]

  return (
    <div className="sort-controls">
      <label htmlFor="sort-select" className="sort-label">
        Sort by:
      </label>
      <select
        id="sort-select"
        className="sort-select"
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
        aria-label="Sort students"
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}

SortControls.propTypes = {
  sortBy: PropTypes.string.isRequired,
  onSortChange: PropTypes.func.isRequired,
}

export default SortControls
