import { makeHasseDiagram } from "./utils/hasseUtils.2024-07-13T23-28-17.js";
import { drawHasse } from "./utils/d3Utils.2024-07-13T23-28-17.js";

console.log("voi voi. se on korvakoira.");

const rs = new Map();
rs.set('Divisible',    (a, b) => (b % a == 0));
rs.set('Less than',    (a, b) => (b - a >= 0));
rs.set('Greater than', (a, b) => (a - b >= 0));

// var S = [ [], [1], [2], [1,2,3], [1,3], [1,2], [2,3], [4], [2,4] ]
// var R = (a, b) => {
//   for (let i = 0; i < a.length; i++)
//     if (!b.includes(a[i]))
//       return false;
//   return true;
// }
// var r = (a, b) => (a.length - b.length);

var S = [24, 2, 3, 4, 6, 2, 12, 1, 5, 25, 25, 72, 36, 150];
var hasse = makeHasseDiagram(S, rs.get('Divisible'), rs.get('Greater than'));
drawHasse(hasse);

document.getElementById('hasseForm')
        .addEventListener('submit', (event) => {
           event.preventDefault();

           var inputSet = document.getElementById('inputSet')
                                  .value
                                  .split(' ')
                                  .map(Number)
                                  .filter(x => !isNaN(x));

           var selectRelation = document.getElementById('selectRelation')
                                        .value;

           var newHasse = makeHasseDiagram(
             inputSet,
             rs.get(selectRelation),
             rs.get('Greater than')
           );
           drawHasse(newHasse);
         });
