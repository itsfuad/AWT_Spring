import DashboardHeader from './components/DashboardHeader'
import StatBadge from './components/StatBadge'
import StudentCard from './components/StudentCard'
import './App.css'

const students = [
  {
    name: 'Ariana Rahman',
    id: '2024001',
    avatar: 'AR',
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
  return (
    <div className="app-shell">
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

        <section className="cards-grid" aria-label="Student list">
          {students.map((student) => (
            <StudentCard
              key={student.id}
              name={student.name}
              id={student.id}
              avatar={student.avatar}
              gpa={student.gpa}
              major={student.major}
              credits={student.credits}
              courses={student.courses}
            />
          ))}
        </section>
      </main>
    </div>
  )
}

export default App
