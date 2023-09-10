import { shortCut, shortCutAll } from "../Main.js";

for (let preInd = 0; preInd < shortCutAll('pre').length; preInd++) {
     let result = ``
     for (let dumbyLines of shortCutAll('pre')[preInd].innerHTML.split('\n')) {
          result += `<span class="code-line">${dumbyLines}</span>\n`
     }
     shortCutAll('pre')[preInd].innerHTML = result.slice(0, result.length - 10)  
}

for (let codePrintInd = 0; codePrintInd < shortCutAll('pre span.code-print').length; codePrintInd++) {
     shortCutAll('pre span.code-print')[codePrintInd].setAttribute('title', 'Printed')
}

const pathName = window.location.pathname
const psychwikiPath = window.location.href.match(/([-&\w]+)(?=\.html)/g)[0]
const psychwikiDocs = pathName.match('lua_coding_docs')[0] || pathName.match('lua_script_api')[0]
function toFirstUpperWord(str) {
     const capitalizeFirstLetter = (str) => {
          return str.charAt(0).toUpperCase() + str.slice(1);
     }

     let convert = str.split('_')
     let results = ''
     for (let i in convert) {
          results += capitalizeFirstLetter(convert[i]) + ' '
     }
     let blackListWords = ['Of', 'The'] // Just in case lol!!!!
     for (let i of blackListWords) {
          results = results.replace(i, i.toLowerCase())
     }
     return results.substring(0, results.length - 1)
}

shortCut('main header header-location').textContent = toFirstUpperWord(psychwikiDocs)
shortCut('main header header-name').textContent = toFirstUpperWord(psychwikiPath)