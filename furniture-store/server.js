const express = require("express")
const app = express()
const path = require("path")
app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))

const store = [
    { name: "table", inventory: 3, price: 800 },
    { name: "chair", inventory: 16, price: 120 },
    { name: "couch", inventory: 1, price: 1200 },
    { name: "picture frame", inventory: 31, price: 70 }
]

app.get('/', function(req, res){
    res.send("you are running smoothly")
})

app.get('/priceCheck/:name', function(req, res){
    const item = store.find(i => i.name === req.params.name)
    if(item){
        res.send(item.price+'')
    }else{
        res.send({price: null})
    }
})

app.get('/buy/:name', function(req,res){
    const item = store.find(s => s.name === req.params.name)
    item.inventory -= 1 
    res.send(item)
})

app.get('/sale', function(req,res){
    if(req.query.admin === 'true'){
        store.map(s => {
            if(s.inventory > 10){
                s.price *= 0.5
            }
        })
    }
    res.send(store)
})

const port =3000
app.listen(port, function(){
    console.log(`you are running on port ${port}`);
})