import { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import { StudentContext } from '../contexts/StudentContext'

function AddStudentForm({ onSubmitSuccess }) {
  const { addStudent, students } = useContext(StudentContext)

  const [formData, setFormData] = useState({
    name: '',
    id: '',
    major: '',
    gpa: '',
    courses: '',
  })

  const [errors, setErrors] = useState({})

  const majors = [
    'Computer Science',
    'Software Engineering',
    'Information Systems',
    'Computer Engineering',
    'Data Science',
    'Cybersecurity',
  ]

  const validateForm = () => {
    const newErrors = {}

    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required'
    }

    // Validate ID
    if (!formData.id.trim()) {
      newErrors.id = 'Student ID is required'
    } else if (!/^\d+$/.test(formData.id)) {
      newErrors.id = 'Student ID must be numeric'
    } else if (students.some((s) => s.id === formData.id)) {
      newErrors.id = 'Student ID already exists'
    }

    // Validate major
    if (!formData.major) {
      newErrors.major = 'Major is required'
    }

    // Validate GPA
    if (!formData.gpa) {
      newErrors.gpa = 'GPA is required'
    } else {
      const gpaNum = parseFloat(formData.gpa)
      if (isNaN(gpaNum) || gpaNum < 0 || gpaNum > 4.0) {
        newErrors.gpa = 'GPA must be between 0 and 4.0'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    // Clear error for this field on change
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    addStudent({
      name: formData.name.trim(),
      id: formData.id.trim(),
      major: formData.major,
      gpa: parseFloat(formData.gpa),
      credits: 0,
      courses: formData.courses,
    })

    setFormData({
      name: '',
      id: '',
      major: '',
      gpa: '',
      courses: '',
    })

    if (onSubmitSuccess) {
      onSubmitSuccess()
    }
  }

  return (
    <form className="add-student-form" onSubmit={handleSubmit}>
      <h2>Register New Student</h2>

      <div className="form-group">
        <label htmlFor="name">Full Name *</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="e.g., John Doe"
          className={errors.name ? 'form-input error' : 'form-input'}
        />
        {errors.name && <span className="error-message">{errors.name}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="id">Student ID *</label>
        <input
          type="text"
          id="id"
          name="id"
          value={formData.id}
          onChange={handleChange}
          placeholder="e.g., 2024005"
          className={errors.id ? 'form-input error' : 'form-input'}
        />
        {errors.id && <span className="error-message">{errors.id}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="major">Major *</label>
        <select
          id="major"
          name="major"
          value={formData.major}
          onChange={handleChange}
          className={errors.major ? 'form-select error' : 'form-select'}
        >
          <option value="">Select a major</option>
          {majors.map((major) => (
            <option key={major} value={major}>
              {major}
            </option>
          ))}
        </select>
        {errors.major && <span className="error-message">{errors.major}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="gpa">GPA *</label>
        <input
          type="number"
          id="gpa"
          name="gpa"
          value={formData.gpa}
          onChange={handleChange}
          placeholder="e.g., 3.5"
          min="0"
          max="4"
          step="0.01"
          className={errors.gpa ? 'form-input error' : 'form-input'}
        />
        {errors.gpa && <span className="error-message">{errors.gpa}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="courses">Courses (comma-separated, optional)</label>
        <input
          type="text"
          id="courses"
          name="courses"
          value={formData.courses}
          onChange={handleChange}
          placeholder="e.g., Algorithms, Database, Web Engineering"
          className="form-input"
        />
      </div>

      <button type="submit" className="form-submit-btn">
        Register Student
      </button>
    </form>
  )
}

AddStudentForm.propTypes = {
  onSubmitSuccess: PropTypes.func,
}

export default AddStudentForm
