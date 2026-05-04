import { useContext } from 'react'
import PropTypes from 'prop-types'
import CourseTag from './CourseTag'
import StatBadge from './StatBadge'
import { StudentContext } from '../contexts/StudentContext'

function StudentCard({ student }) {
  const { favorites, toggleFavorite, removeStudent } = useContext(StudentContext)
  const isFavorite = favorites.has(student.id)

  return (
    <article className="student-card">
      <div className="student-top">
        <img 
          src={student.avatarUrl} 
          alt={`${student.name} avatar`}
          className="student-avatar"
          onError={(e) => {
            e.target.style.display = 'none'
            e.target.nextElementSibling.style.display = 'flex'
          }}
        />
        <div className="student-avatar fallback-avatar" style={{ display: 'none' }}>
          {student.avatar}
        </div>
        <div>
          <h2>{student.name}</h2>
          <p className="student-id">ID: {student.id}</p>
          <p className="student-major">{student.major}</p>
        </div>
        <div className="student-actions">
          <button
            type="button"
            className={`favorite-btn ${isFavorite ? 'is-favorite' : ''}`}
            onClick={() => toggleFavorite(student.id)}
            aria-label={isFavorite ? `Remove ${student.name} from favorites` : `Add ${student.name} to favorites`}
            title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            {isFavorite ? '★' : '☆'}
          </button>
          <button
            type="button"
            className="remove-btn"
            onClick={() => removeStudent(student.id)}
            aria-label={`Remove ${student.name}`}
            title="Remove student"
          >
            🗑
          </button>
        </div>
      </div>

      <div className="stats-row">
        <StatBadge label="GPA" value={student.gpa.toFixed(2)} />
        <StatBadge label="Credits" value={student.credits} />
      </div>

      <div className="courses-wrap" aria-label={`${student.name} enrolled courses`}>
        {student.courses.map((course) => (
          <CourseTag
            key={`${student.id}-${course.courseName}`}
            courseName={course.courseName}
            color={course.color}
          />
        ))}
      </div>
    </article>
  )
}

StudentCard.propTypes = {
  student: PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    avatarUrl: PropTypes.string.isRequired,
    gpa: PropTypes.number.isRequired,
    major: PropTypes.string.isRequired,
    credits: PropTypes.number.isRequired,
    courses: PropTypes.arrayOf(
      PropTypes.shape({
        courseName: PropTypes.string.isRequired,
        color: PropTypes.string.isRequired,
      }),
    ).isRequired,
  }).isRequired,
}

export default StudentCard
