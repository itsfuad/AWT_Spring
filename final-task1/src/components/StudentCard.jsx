import PropTypes from 'prop-types'
import CourseTag from './CourseTag'
import StatBadge from './StatBadge'

function StudentCard({ name, id, avatar, gpa, major, credits, courses }) {
  return (
    <article className="student-card">
      <div className="student-top">
        <div className="student-avatar" aria-label={`${name} avatar`}>
          {avatar}
        </div>
        <div>
          <h2>{name}</h2>
          <p className="student-id">ID: {id}</p>
          <p className="student-major">{major}</p>
        </div>
      </div>

      <div className="stats-row">
        <StatBadge label="GPA" value={gpa.toFixed(2)} />
        <StatBadge label="Credits" value={credits} />
      </div>

      <div className="courses-wrap" aria-label={`${name} enrolled courses`}>
        {courses.map((course) => (
          <CourseTag
            key={`${id}-${course.courseName}`}
            courseName={course.courseName}
            color={course.color}
          />
        ))}
      </div>
    </article>
  )
}

StudentCard.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  gpa: PropTypes.number.isRequired,
  major: PropTypes.string.isRequired,
  credits: PropTypes.number.isRequired,
  courses: PropTypes.arrayOf(
    PropTypes.shape({
      courseName: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
    }),
  ).isRequired,
}

export default StudentCard
