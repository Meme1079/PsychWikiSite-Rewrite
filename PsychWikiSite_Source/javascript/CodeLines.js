import { shortCutAll } from "./Main.js";

/**
 * Display the new lines inside the code block
 * @param { int } preInd The code block to display
 * @returns Int (i think)
 */
function getNewLineCode(preInd = 0) {
     let results = 1
     for (let dumbyLines in shortCutAll('pre')[preInd].textContent.match(/\n/g)) {
          results = Number(dumbyLines) + 1
     }
     for (let limit = 1; limit <= results; limit++) {
          let insertElement = `<span style="display: block;">${limit.toString()}</span>`
          shortCutAll('.code-newlines')[preInd].innerHTML += insertElement
     }
}

if (shortCutAll('pre').length > 0) { // ! Just to prevent errors lololol
     for (let preLength = 0; preLength < shortCutAll('pre').length; preLength++) {
          getNewLineCode(preLength)
     }
}