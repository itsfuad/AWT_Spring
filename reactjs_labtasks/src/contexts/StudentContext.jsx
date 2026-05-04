import { createContext, useState, useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'

export const StudentContext = createContext()

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

export function StudentProvider({ children }) {
  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem('students-data')
    return saved ? JSON.parse(saved) : initialStudents
  })

  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('default')
  const [favorites, setFavorites] = useState(new Set())

  // Persist students to localStorage
  useEffect(() => {
    localStorage.setItem('students-data', JSON.stringify(students))
  }, [students])

  const filterStudents = useCallback(
    (studentList) => {
      if (!searchQuery.trim()) return studentList

      const query = searchQuery.toLowerCase()
      return studentList.filter(
        (student) =>
          student.name.toLowerCase().includes(query) ||
          student.major.toLowerCase().includes(query),
      )
    },
    [searchQuery],
  )

  const sortStudents = useCallback((studentList) => {
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
  }, [sortBy])

  const getFilteredAndSortedStudents = useCallback(() => {
    const filtered = filterStudents(students)
    return sortStudents(filtered)
  }, [students, filterStudents, sortStudents])

  const addStudent = useCallback((newStudent) => {
    // Generate avatar initials
    const initials = newStudent.name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)

    const student = {
      ...newStudent,
      avatar: initials,
      avatarUrl: `https://picsum.photos/200/200?random=${Math.random()}`,
      courses: newStudent.courses
        ? newStudent.courses
            .split(',')
            .map((course) => ({
              courseName: course.trim(),
              color: generateRandomColor(),
            }))
        : [],
    }

    setStudents((prev) => [...prev, student])
  }, [])

  const removeStudent = useCallback((studentId) => {
    setStudents((prev) => prev.filter((s) => s.id !== studentId))
    setFavorites((prev) => {
      const updated = new Set(prev)
      updated.delete(studentId)
      return updated
    })
  }, [])

  const toggleFavorite = useCallback((studentId) => {
    setFavorites((prevFavorites) => {
      const newFavorites = new Set(prevFavorites)
      if (newFavorites.has(studentId)) {
        newFavorites.delete(studentId)
      } else {
        newFavorites.add(studentId)
      }
      return newFavorites
    })
  }, [])

  const value = {
    students,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    favorites,
    toggleFavorite,
    filterStudents,
    sortStudents,
    getFilteredAndSortedStudents,
    addStudent,
    removeStudent,
  }

  return <StudentContext.Provider value={value}>{children}</StudentContext.Provider>
}

StudentProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

function generateRandomColor() {
  const colors = [
    '#2563eb',
    '#7c3aed',
    '#0f766e',
    '#b45309',
    '#1d4ed8',
    '#be185d',
    '#0369a1',
    '#6d28d9',
    '#166534',
    '#4f46e5',
  ]
  return colors[Math.floor(Math.random() * colors.length)]
}
