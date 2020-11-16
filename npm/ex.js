const valid = require("validator");
//exercise 1
console.log(valid.isEmail("shoobert@dylan"));

console.log(valid.isMobilePhone("786-329-9958", "en-US"));

let blacklist = ["!", "?", ".", "@", "~", ",", "'"];
let text = "I'M SO EXCITED!!!~!";
console.log(valid.blacklist(text, blacklist).toLowerCase());

//exercise 2
const faker = require("faker");

const makeHuman = function (number) {
  for (let i = 0; i < number; i++) {
    const randomName = faker.name.findName(); 
    const randomImage = faker.image.imageUrl(); 
    const randomCompany = faker.company.companyName();
    console.log(randomName, randomImage, randomCompany);
  }
};

makeHuman(3)
