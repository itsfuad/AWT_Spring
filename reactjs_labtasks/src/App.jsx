import { useState, useEffect, useContext } from 'react'
import DashboardHeader from './components/DashboardHeader'
import SearchBar from './components/SearchBar'
import SortControls from './components/SortControls'
import StatBadge from './components/StatBadge'
import StudentCard from './components/StudentCard'
import AddStudentForm from './components/AddStudentForm'
import Notification from './components/Notification'
import LoadingSpinner from './components/LoadingSpinner'
import { StudentContext } from './contexts/StudentContext'
import { ThemeContext } from './contexts/ThemeContext'
import { StudentProvider } from './contexts/StudentContext'
import { ThemeProvider } from './contexts/ThemeContext'
import './App.css'

function AppContent() {
  const [loading, setLoading] = useState(true)
  const [notification, setNotification] = useState(null)
  const [showForm, setShowForm] = useState(false)

  const { students, getFilteredAndSortedStudents } = useContext(StudentContext)
  const { isDark } = useContext(ThemeContext)

  // Apply theme to html element for full page coverage
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark-theme')
    } else {
      document.documentElement.classList.remove('dark-theme')
    }
  }, [isDark])

  // Simulated API fetch
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  // Update document title based on filtered students
  useEffect(() => {
    const filteredCount = getFilteredAndSortedStudents().length
    document.title = `Dashboard — ${filteredCount} Students`
  }, [getFilteredAndSortedStudents])

  const displayedStudents = getFilteredAndSortedStudents()

  const handleFormSubmit = () => {
    setNotification({
      message: 'Student registered successfully!',
      type: 'success',
    })
    setShowForm(false)
  }

  const dismissNotification = () => {
    setNotification(null)
  }

  if (loading) {
    return <LoadingSpinner message="Loading student dashboard..." />
  }

  return (
    <div className={`app-shell ${isDark ? 'dark-theme' : 'light-theme'}`}>
      <DashboardHeader
        title="Student Dashboard"
        tagline="Track students, performance, and academic progress in one place."
        navigationItems={['Overview', 'Students', 'Courses', 'Settings']}
      />

      <main className="content-wrap">
        <section className="summary-grid" aria-label="Dashboard statistics">
          <StatBadge label="Total Students" value={students.length} />
          <StatBadge label="Average GPA" value="3.72" />
          <StatBadge label="Departments" value="4" />
        </section>

        <section className="controls-section" aria-label="Search and sort controls">
          <SearchBar />
          <SortControls />
          <button
            type="button"
            className="add-student-btn"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? '✕ Close' : '+ Add Student'}
          </button>
        </section>

        {showForm && (
          <section className="form-section" aria-label="Add new student">
            <AddStudentForm onSubmitSuccess={handleFormSubmit} />
          </section>
        )}

        <section className="results-info">
          <p>Showing {displayedStudents.length} of {students.length} students</p>
        </section>

        <section className="cards-grid" aria-label="Student list">
          {displayedStudents.length > 0 ? (
            displayedStudents.map((student) => (
              <StudentCard key={student.id} student={student} />
            ))
          ) : (
            <div className="empty-state">
              <p>No students found. Try adjusting your search or add a new student.</p>
            </div>
          )}
        </section>

        {notification && (
          <Notification
            message={notification.message}
            type={notification.type}
            onDismiss={dismissNotification}
          />
        )}
      </main>
    </div>
  )
}

function App() {

  return (
    <ThemeProvider>
      <StudentProvider>
        <AppContent />
      </StudentProvider>
    </ThemeProvider>
  )
}

export default App
