Reactive toggle is a vanila based js package based on es6 concepts 

in order to use this package the following please run the following commands : 
npm -i --save "package-name" in your project directory.

after installing the package you must use a tool like browserify.. etc in order to compile it down to bundle file which you will then have to include like so : 
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>

<body>
    <ul>
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
    </ul>
    <link rel="stylesheet" href="./node_modules/reactive-toggle/style.css">
    <script src="./bundle.js"></script>
</body>

</html>


after doing so you going to have to call the "init" function from your script file like so :
let reactiveToggle = require("reactive-toggle");
reactiveToggle.init();

to the init function you can pass copule of variables which are the 
1. True state text to display
2. the false text to display
3. the current state (0/1) when 0 is false and 1 is true.
4. an custom property name (which is a must ) - in order to get incidations back from the toggle
5. an custom property value (again..its a must)
6. an index, in cases that there is more then 1 toggle in the site, this is a MUST. each one of the toggle must get an unieq id.
7. Off state custom color (not a must)
8. On state custom color (not a must)


and you can use this component as follows : 
let reactiveToggle = require("reactive-toggle");
let listArray = Array.prototype.slice.call(document.querySelectorAll("li"));
console.log(listArray);
listArray.forEach((listItem,index) => {
    let toggle = reactiveToggle.init("False","True",1,"data-toggle",index,index);
    listItem.appendChild(toggle);
});


