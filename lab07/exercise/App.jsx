
/*
COMP3123 - Full Stack Development I
Lab Week 09 - React JS Exercise
*/

// Student component using props
function Student({ studentId, name, college }) {
    return (
        <div>
            <h3>{studentId}</h3>
            <h3>{name}</h3>
            <p>{college}</p>
        </div>
    )
}

function App() {
    const student = {
        studentId: "101092172",
        name: "Babak Mokri",
        college: "George Brown College, Toronto"
    }

    return (
        <div className="app">
            <img
                src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
                alt="React Logo"
                className="logo"
            />

            <h1>Welcome to Fullstack Development - I</h1>

            <h2>React JS Programming Week09 Lab exercise</h2>

            <Student
                studentId={student.studentId}
                name={student.name}
                college={student.college}
            />
        </div>
    )
}

export default App
