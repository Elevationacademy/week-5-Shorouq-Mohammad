const express = require("express");
const router = express.Router();
const validator = require("validator")

const wordCounter= {}
router.get("/sanity", function (req, res) {
    res.send('Server up and running')
});

router.get('/word/:word', function(req,res){
    const word = req.params. word
    const value = wordCounter[word]
    if(value){
        res.send({count: value})
    }else{
        res.send({count: 0})
    }
})

router.post('/word', function(req,res){
    const word = req.body.word
    if(wordCounter[word]){
        wordCounter[word] += 1
    }else{
        wordCounter[word] = 1 
    }
    res.send({text: `Added ${word}`, currentCount: wordCounter[word] })
})

router.post('/words', function(req,res){
    let sentence = req.body.sentence.toLowerCase()
    let blacklist = ["!", "?", ".", "@", "~", ",", "'","*"]
    sentence = validator.blacklist(sentence, blacklist)
    const words = sentence.split(" ")
    let numNewWords =0
    let numOldWords =0
    for(let word of words){
        if(wordCounter[word]){
            wordCounter[word] += 1 
            numOldWords += 1
        }else {
            wordCounter[word] =1 
            numNewWords += 1
        }
    }
    res.send({text: `Added ${numNewWords} words, ${numOldWords} already existed`, currentCount: -1})
})

router.get('/total', function(req,res){
    let sum =0
    for (const key in wordCounter) {
        sum += wordCounter[key]
    }
    res.send({text: "Total count", count: sum })
})

router.get('/popular', function(req, res){
    let max = 1
    let word ={}
    for(const key in wordCounter){
        if(wordCounter[key]> max){
            max = wordCounter[key]
            word = {text: key, count: wordCounter[key] }
        }
    }
    res.send(word)
})

router.get('/ranking', function(req,res){
    const arr = Object.entries(wordCounter)
    arr.sort(function(a, b){return b[1]-a[1]})
    console.log(arr)
    const resultArr = []
    for(let i=0; i< 5; i++){
        const obj ={}
        const key = arr[i][0]
        obj[key]= arr[i][1]
        resultArr.push(obj)
    }
    res.send({ranking: resultArr})
})


module.exports = router;
