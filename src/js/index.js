const texx = require('../txt/text.txt');
const greeter = require('../json/greent.json');
const test = (txt) => {
    console.log(txt);
    alert(JSON.stringify(greeter));
}
test(texx);