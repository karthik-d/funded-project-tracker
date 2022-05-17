// Require express
const express = require("express");
// Initialize express
const app = express();
const PORT = 8080;
// parse JSON
app.use(express.json());
// parse URL encoded data
app.use(express.urlencoded({ extended: true }));

const users = [
    {
        "email" : "jagadish19039@cse.ssn.edu.in",
        "project_id" : "478",
        "project_domain" : "IoT",
        "project_name" : "IoT Driven Smart Bus Stops",
        "team_members" : {
            "email" : "karthikraja19048@cse.ssn.edu.in",
            "name" : "Karthik Raja A"
        }
    }
];


function findLastId(){
    let id = 0;
    for (let i =0; i < users.length; i ++){
        // console.log(`${i+1}==>` + users[i].name);
        // console.log(`${i+1}==>` + users[i].age);
        if (users[i].id >= id){
            id = users[i].id;
        }
    }
    return id;
}

app.get('/', (req,res) =>{
    res.send("Thanks for hitting the server");
})


app.post('/create_application', (req, res) => {
    // checking for empty request body
	if (!Object.keys(req.body).length) {
		return res.status(400).json({
			message: "Request body cannot be empty",
		});

	}
	
    // printing request body
	console.log(req.body);

    // Use object destructuring to get name and age
	const { name, age } = req.body;

    let id = findLastId();

    users.push({
        id : id+1, 
        name : name,
        age : age
    })

    console.log("Storing collection...\n", req.body);

    // res.json(users);
    res.status(201).json(req.body);

    
});

// create a server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

