const users = [{
    id: 1,
    name: "Jane Doe",
    age: "22",
},
{
    id: 2,
    name: "John Doe",
    age: "31",
}
];

// console.log(users.length);

let id = 0;

for (let i =0; i < users.length; i ++){
    // console.log(`${i+1}==>` + users[i].name);
    // console.log(`${i+1}==>` + users[i].age);
    if (users[i].id >= id){
        id = users[i].id;
    }
}

console.log(id+1)