const express = require('express');
const { createTodo, updateTodo } = require('./types');
const { todo } = require('./db');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173"
}))

app.get('/',(req,res) => {
    res.send("Hello World");
});

app.post('/todo', async (req,res) => {
    const requestPayload = req.body;
    const parsedPayload = createTodo.safeParse(requestPayload);
    if(!parsedPayload.success){
        res.status(411).json({ 
            msg: "Invalid Request as title or description is not valid"
        });
        return;
    }
    await todo.create({
        title: requestPayload.title,
        description: requestPayload.description,
        isCompleted: false
    });
    res.status(201).send({
        msg: "Todo is successfully created"
    })
})

app.get('/todos', (req,res)=> {
    todo.find({}).then(todos => {
        res.status(200).json({
            todos: todos
        })
    })
})

app.put('/completed', async (req,res) => {
    const requestPayload = req.body;
    const parsedPayload = updateTodo.safeParse(requestPayload);
    if(!parsedPayload.success){
        res.status(411).json({ 
            msg: "Invalid Request as id is not valid"
        });
        return;
    }
    await todo.findOneAndUpdate({
        _id:requestPayload.id
    },{
        isCompleted:true
    });
    res.status(200).json({
        msg:"Todo completed successfully"
    })
})

app.all('*',(req,res) => {
    res.status(404).send("Route Not Found");
})

app.listen(PORT, () => {
    console.log("Server starting on port " + PORT);
});