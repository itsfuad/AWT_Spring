import { useState, useEffect } from 'react'
import DashboardHeader from './components/DashboardHeader'
import SearchBar from './components/SearchBar'
import SortControls from './components/SortControls'
import StatBadge from './components/StatBadge'
import StudentCard from './components/StudentCard'
import LoadingSpinner from './components/LoadingSpinner'
import './App.css'

const initialStudents = [
  {
    name: 'Ariana Rahman',
    id: '2024001',
    avatar: 'AR',
    avatarUrl: 'https://picsum.photos/200/200?random=1',
    gpa: 3.86,
    major: 'Computer Science',
    credits: 98,
    courses: [
      { courseName: 'Algorithms', color: '#2563eb' },
      { courseName: 'Database Systems', color: '#7c3aed' },
      { courseName: 'Web Engineering', color: '#0f766e' },
    ],
  },
  {
    name: 'Nabil Hasan',
    id: '2024002',
    avatar: 'NH',
    avatarUrl: 'https://picsum.photos/200/200?random=2',
    gpa: 3.64,
    major: 'Software Engineering',
    credits: 90,
    courses: [
      { courseName: 'OOP Design', color: '#b45309' },
      { courseName: 'Distributed Systems', color: '#1d4ed8' },
      { courseName: 'DevOps', color: '#be185d' },
    ],
  },
  {
    name: 'Farhana Islam',
    id: '2024003',
    avatar: 'FI',
    avatarUrl: 'https://picsum.photos/200/200?random=3',
    gpa: 3.91,
    major: 'Information Systems',
    credits: 102,
    courses: [
      { courseName: 'Data Analytics', color: '#0f766e' },
      { courseName: 'Cloud Fundamentals', color: '#7c2d12' },
      { courseName: 'UX Research', color: '#4f46e5' },
    ],
  },
  {
    name: 'Samiul Karim',
    id: '2024004',
    avatar: 'SK',
    avatarUrl: 'https://picsum.photos/200/200?random=4',
    gpa: 3.47,
    major: 'Computer Engineering',
    credits: 88,
    courses: [
      { courseName: 'Digital Logic', color: '#0369a1' },
      { courseName: 'Embedded Systems', color: '#6d28d9' },
      { courseName: 'Computer Networks', color: '#166534' },
    ],
  },
]

function App() {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('default')
  const [favorites, setFavorites] = useState(new Set())

  // Simulated API fetch
  useEffect(() => {
    const timer = setTimeout(() => {
      setStudents(initialStudents)
      setLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  // Update document title based on filtered students
  useEffect(() => {
    const filteredCount = getFilteredAndSortedStudents().length
    document.title = `Dashboard — ${filteredCount} Students`
  }, [searchQuery, sortBy, students])

  // Filter students by name or major
  const filterStudents = (studentList) => {
    if (!searchQuery.trim()) return studentList

    const query = searchQuery.toLowerCase()
    return studentList.filter(
      (student) =>
        student.name.toLowerCase().includes(query) ||
        student.major.toLowerCase().includes(query),
    )
  }

  // Sort students based on sort preference
  const sortStudents = (studentList) => {
    const sorted = [...studentList]

    switch (sortBy) {
      case 'name-asc':
        return sorted.sort((a, b) => a.name.localeCompare(b.name))
      case 'gpa-desc':
        return sorted.sort((a, b) => b.gpa - a.gpa)
      case 'default':
      default:
        return sorted
    }
  }

  // Combine filter and sort
  const getFilteredAndSortedStudents = () => {
    const filtered = filterStudents(students)
    return sortStudents(filtered)
  }

  // Toggle favorite
  const toggleFavorite = (studentId) => {
    setFavorites((prevFavorites) => {
      const newFavorites = new Set(prevFavorites)
      if (newFavorites.has(studentId)) {
        newFavorites.delete(studentId)
      } else {
        newFavorites.add(studentId)
      }
      return newFavorites
    })
  }

  const displayedStudents = getFilteredAndSortedStudents()

  if (loading) {
    return <LoadingSpinner message="Loading student dashboard..." />
  }

  return (
    <div className="app-shell">
      <DashboardHeader
        title="Student Dashboard"
        tagline="Track students, performance, and academic progress in one place."
        navigationItems={['Overview', 'Students', 'Courses', 'Settings']}
        favoriteCount={favorites.size}
      />

      <main className="content-wrap">
        <section className="summary-grid" aria-label="Dashboard statistics">
          <StatBadge label="Total Students" value={students.length} />
          <StatBadge label="Average GPA" value="3.72" />
          <StatBadge label="Departments" value="4" />
        </section>

        <section className="controls-section" aria-label="Search and sort controls">
          <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
          <SortControls sortBy={sortBy} onSortChange={setSortBy} />
        </section>

        <section className="results-info">
          <p>Showing {displayedStudents.length} of {students.length} students</p>
        </section>

        <section className="cards-grid" aria-label="Student list">
          {displayedStudents.map((student) => (
            <StudentCard
              key={student.id}
              name={student.name}
              id={student.id}
              avatar={student.avatar}
              avatarUrl={student.avatarUrl}
              gpa={student.gpa}
              major={student.major}
              credits={student.credits}
              courses={student.courses}
              isFavorite={favorites.has(student.id)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </section>
      </main>
    </div>
  )
}

export default App
