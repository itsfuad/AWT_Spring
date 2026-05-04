import PropTypes from 'prop-types'
import CourseTag from './CourseTag'
import StatBadge from './StatBadge'

function StudentCard({ name, id, avatar, avatarUrl, gpa, major, credits, courses, isFavorite, onToggleFavorite }) {
  return (
    <article className="student-card">
      <div className="student-top">
        <img 
          src={avatarUrl} 
          alt={`${name} avatar`}
          className="student-avatar"
          onError={(e) => {
            e.target.style.display = 'none'
            e.target.nextElementSibling.style.display = 'flex'
          }}
        />
        <div className="student-avatar fallback-avatar" style={{ display: 'none' }}>
          {avatar}
        </div>
        <div>
          <h2>{name}</h2>
          <p className="student-id">ID: {id}</p>
          <p className="student-major">{major}</p>
        </div>
        <button
          type="button"
          className={`favorite-btn ${isFavorite ? 'is-favorite' : ''}`}
          onClick={() => onToggleFavorite(id)}
          aria-label={isFavorite ? `Remove ${name} from favorites` : `Add ${name} to favorites`}
          title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          {isFavorite ? '★' : '☆'}
        </button>
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
  isFavorite: PropTypes.bool,
  onToggleFavorite: PropTypes.func,
}

export default StudentCard
