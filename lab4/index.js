/*
Purpose:
Express framework with Node.js
- Try GET, POST, PUT, DELETE methods
- use routes instead of pure paths - like an API in your own
software's backend
- Compare and contrast GET query vs params
*/

const express = require("express");
const app = express()

const SERVER_PORT = process.env.PORT || 3000;

// -------------- Middleware setup for each of our needs on the web server --------------
// Serving static files
// Public folder is not usually accessible by default
// Notice there is no real folder in our filesystem called static
// But this will be a path we can access in the URL
app.use("/static", express.static("public"))

// Serving JSON
app.use(express.json())

// Serving traditional HTML body
// if we add the object parameter with property extended: true
// we can use the library qs instead of library querystring

app.use(express.urlencoded({extended: true}))

// --------------------------------------------------


// http://localhost:3000/
app.get("/", (request, response) => {
    response.send("<h1>Welcome to the root path of the server</h1>")
})

// http://localhost:3000/hello
app.get("/hello", (request, response) => {
    response.status(200).send("<h1>Welcome to the path of /hello</h1>")
})

app.get("/user", (request, response) => {
    const firstname = request.query.firstname || "Pritesh";
    const lastname = request.query.lastname || "Patel";

    response.json({
        firstname: firstname,
        lastname: lastname
    });
});




app.get("/college", (request, response) => {
    const college = {
        method: "GET",                  // This was not anything built in, we created this property
        name: "Geoge Brown College",
        location: "Toronto",
        established: 1967
    }

    response.json(college)              // We treat our backend as an API
})

app.get("/students/:name/:age/:city", (request, response) => {
    console.log(request.params)
    if(!request.params.name || !request.params.age || !request.params.city){
        return response.status(400).json({error: "Missing path parameters"})
    }

    const name = request.params.name || "Ghazanfar";
    const age = request.params.age || 0;
    const city = request.params.city || "AliAbad Katool";

    response.json({
        student_name: name,
        student_age: age,
        student_city: city
    })

})

app.post("/user/:firstname/:lastname", (request, response) => {
    const firstname = request.params.firstname;
    const lastname = request.params.lastname;

    response.json({
        firstname: firstname,
        lastname: lastname
    });
});

app.post("/users", (request, response) => {
    const users = request.body;

    response.json(users);
});

app.post("/college", (request, response) => {
    const college = {
        method: "POST",
        name: "George Brown College",
        location: "Toronto",
        established: 1967
    }

    response.json(college)
})

app.put("/college", (request, response) => {
    const college = {
        method: "PUT",                  // This was not anything built in, we created this property
        name: "Geoge Brown College",
        location: "Toronto",
        established: 1967
    }

    response.json(college)
})

app.delete("/college", (request, response) => {
    const college = {
        method: "DELETE",               // This was not anything built in, we created this property
        name: "Geoge Brown College",
        location: "Toronto",
        established: 1967
    }

    response.json(college)
})

app.listen(SERVER_PORT, () => {
    console.log("Server is running on http://localhost:" + SERVER_PORT)
})