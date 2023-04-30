import operators from '../json/operators.json' assert {type: 'json'};
import { shortCut, shortCutAll } from "./Main.js";

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

function importTableDatas(jsonData, tag, styleVal = ['']) {
     let tableDataResult = ``
     for (let datas = 0; datas < jsonData.length; datas++) {
          tableDataResult += `
          <tr>
               <td style="text-align: center;">${jsonData[datas][0]}</td>
               <td style="${styleVal[0]}">${jsonData[datas][1]}</td>
               <td style="${styleVal[1]}">${jsonData[datas][2]}</td>
          </tr>`
     }
     return shortCut(tag).innerHTML = tableDataResult
}

for (let preLength = 0; preLength < shortCutAll('pre').length; preLength++) {
     getNewLineCode(preLength)
}

switch (shortCutAll('title')[0].textContent.split(': ')[1]) {
     case 'Basics Of Coding':
          importTableDatas(operators.arithmetic, '#tab-arit')
          importTableDatas(operators.relational, '#tab-rela')
          importTableDatas(operators.logical, '#tab-logi', ['width: 11.105cm;', ''])
          importTableDatas(operators.miscellaneous, '#tab-misc', ['width: 11.105cm;', ''])
          
          break;
     case 'Library Methods':
          break;
     case 'Variables':
          break;
     default:
          break;
}