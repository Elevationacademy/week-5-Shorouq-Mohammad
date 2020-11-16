const consts = require("./consts")
const hc = require("./complaintsHandler")

let complaint1 = {
    text: "I'm not getting enough money",
    type: consts.finance
}

let complaint2 = {
    text: "My salary hasn't come in yet",
    type: consts.finance
}

let complaint3 = {
    text: "I'm always full of energy",
    type: consts.emotions
}

hc.handleComplaint(complaint1) //should print "Money doesn't grow on trees, you know."
hc.handleComplaint(complaint2) //should print "Money doesn't grow on trees, you know."
hc.handleComplaint(complaint3) //should print "It'll pass, as all things do, with time."
