const express = require("express");
const app = express();
const morgan = require("morgan");
app.use(express.json());

//1.7
// app.use(morgan('tiny'))

//1.8
morgan.token("body", (req, res) => {
  if (req.method === "POST") {
    return JSON.stringify(req.body);
  }
});
app.use(
  morgan(
    `:method :url :status :response-time ms - :res[content-length]  :body `,
  ),
);

const person = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abromov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary poppendick",
    number: "39-23-6423122",
  },
];

//1.1
app.get("/api/persons", (req, res) => {
  res.json(person);
});

// 1.2
app.get("/info", (req, res) => {
  const date = new Date();
  res.send(
    `<p>Phonebook has info for  ${
      person.length
    } people</p> <p>${date.toUTCString()}</p>`,
  );
});

// 1.3

app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  const findPerson = person.find((finder) => finder.id === Number(id));
  if (findPerson) {
    res.json(findPerson);
  } else {
    res.status(404).json({ message: `person not fopund ${id}` });
  }
});

// 1.4

app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  const findPerson = person.find((finder) => finder.id === Number(id));
  if (!findPerson) {
    res.status(404).json({ message: `${id} invalido` });
  } else {
    person.reduce(id);
    res.json(person);
  }
});

// 1.5

// app.post('/api/persons',(req,res)=>{
//     const id = Math.floor(Math.random()*999999);
//     const newPerson={
//         id,...req.body
//     }
//     person.push(newPerson)
//     res.json(person)
// });

// 1.6

app.post("/api/persons", (req, res) => {
  const id = Math.floor(Math.random() * 999999);
  if (!req.body.name) {
    res.json({ message: `name must have information` });
  } else if (!req.body.number) {
    res.json({ message: `number must have information` });
  } else if (
    person.find((perso) => perso.name.trim() === req.body.name.trim())
  ) {
    res.json({ message: `name must be unique` });
  } else {
    const newPerson = {
      id,
      ...req.body,
    };
    person.push(newPerson);
    res.json(person);
  }
});

const port = process.env.PORT || 3001;
app.listen(port);
