import PropTypes from 'prop-types'

function CourseTag({ courseName, color }) {
  return (
    <span className="course-tag" style={{ '--course-color': color }}>
      {courseName}
    </span>
  )
}

CourseTag.propTypes = {
  courseName: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
}

export default CourseTag
