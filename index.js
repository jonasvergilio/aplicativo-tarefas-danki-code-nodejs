const express = require("express")
const path = require("path")

const app = express()

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))

app.engine("html", require("ejs").renderFile)
app.set('view engine', 'html')
app.use('/public', express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, '/views'))

let tarefas = []

app.post('/', (req, res)=>{
    tarefas.push(req.body.tarefa);
    res.render('index', {tarefas})
})

app.get('/', (req, res) =>{
    res.render('index', {
        tarefas
    })
})

app.get('/deletar/:id', (req, res) =>{
    tarefas = tarefas.filter(function(val, index){
        if(index != req.params.id){
            return val; 
        };
    })
    res.render('index', {
        tarefas
    })
})


app.listen(5000, ()=> {
    console.log("server rodando")
})