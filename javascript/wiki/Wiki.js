import { shortCutAll } from "../Main.js";

for (let preInd = 0; preInd < shortCutAll('pre').length; preInd++) {
     let result = ``
     for (let dumbyLines of shortCutAll('pre')[preInd].innerHTML.split('\n')) {
          result += `<span class="code-line">${dumbyLines}</span>\n`
     }
     shortCutAll('pre')[preInd].innerHTML = result.slice(0, result.length - 10)  
}