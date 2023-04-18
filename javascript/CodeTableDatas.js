import operators from '../json/operators.json' assert {type: 'json'};
import { shortCut } from "./Main.js";

/**
 * Imports the JSON data into a HTML table.
 * @param { string } jsonData The specifed JSON data to rendered inside the table.
 * @param { string } tag The ID tag of the table; Must be in <thead> element.
 * @param { string[] } styleVal The style of the table data; Must be an array string.
 * @returns Strings
*/
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

importTableDatas(operators.logical, '#tab-logi', ['width: 11.105cm;', ''])
importTableDatas(operators.relational, '#tab-rela')
importTableDatas(operators.arithmetic, '#tab-arit')
importTableDatas(operators.miscellaneous, '#tab-misc', ['width: 11.105cm;', ''])