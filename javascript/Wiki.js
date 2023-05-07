import operators from '../json/operators.json' assert {type: 'json'};
import library_methods from "../json/library-methods.json" assert {type: 'json'};

import { shortCut, shortCutAll } from "./Main.js";

function getNewLineCode(preInd = 0) {
     let results = 1
     for (let dumbyLines in shortCutAll('pre')[preInd].textContent.match(/\n/g)) {
          results = Number(dumbyLines) + 1
     }
     for (let limit = 1; limit <= results; limit++) {
          let insertElement = `<span>${limit.toString()}</span>`
          shortCutAll('.code-newlines')[preInd].innerHTML += insertElement
     }
}

function importTableDatas(jsonData, tag, styleVal = ['']) {
     let tableDataResult = ``
     for (let datas = 0; datas < jsonData.length; datas++) {
          if (jsonData[datas][2] != null || jsonData[datas][2] != undefined) {
               tableDataResult += `
               <tr>
                    <td style="text-align: center;">${jsonData[datas][0]}</td>
                    <td style="${styleVal[0]}">${jsonData[datas][1]}</td>
                    <td style="${styleVal[1]}">${jsonData[datas][2]}</td>
               </tr>`
          } else {
               tableDataResult += `
               <tr>
                    <td style="text-align: center;">${jsonData[datas][0]}</td>
                    <td style="${styleVal[0]}">${jsonData[datas][1]}</td>
               </tr>`
          }
     }
     try {
          return shortCut(tag).innerHTML = tableDataResult
     } catch (error) {
          return null
     }
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
          importTableDatas(library_methods.character_classes, '#tab-pattern')
          importTableDatas(library_methods.magic_characters, '#tab-magic')

          break;
     case 'Variables':
          break;
     default:
          break;
}

/* The SideBar */

// You: How many "For Loops" you want?
// Meme1079: yes

for (let headIncre = 0; headIncre <= 4; headIncre++) {
     let HeadNum = `#wiki h${headIncre.toString()}`
     for (let headerClass = 0; headerClass < shortCutAll(HeadNum).length; headerClass++) {
          shortCutAll(HeadNum)[headerClass].setAttribute('class', `header header${headIncre.toString()}`)
     }
}

const HeaderMainPath = '#sidebar-headerlists ul'
for (let i = 0; i < shortCutAll('#wiki .header').length; i++) {
     let HeaderGetClass    = shortCutAll('#wiki .header')[i].getAttribute('class')
     let HeaderSliceNum    = HeaderGetClass.slice(HeaderGetClass.length - 1, HeaderGetClass.length)
     let HeaderTextFilter  = shortCutAll('#wiki .header')[i].innerText.replaceAll(/\(.+\)/g, '()')
     let HeaderTextDisplay = `<li><span class="list-h${HeaderSliceNum}">${HeaderTextFilter}</span></li>`

     shortCut(`${HeaderMainPath}`).innerHTML += HeaderTextDisplay
}

let HeadNumIncre = 1
for (let getHeads = 0; getHeads < shortCutAll('#wiki .header').length; getHeads++) {
     let HeadIdValue = shortCutAll('#wiki .header')[getHeads].textContent.split('(')[0].trim() + HeadNumIncre++
     shortCutAll('#wiki .header')[getHeads].setAttribute('id', HeadIdValue)

     let windowLinkCode = `window.location.href = '#${HeadIdValue}'`
     shortCutAll(`${HeaderMainPath} li`)[getHeads].setAttribute('onclick', windowLinkCode)
}

function searchInputHeading() {
     const inputStuff = shortCut('#global-sidebar input');
     const listStuff  = shortCutAll(`${HeaderMainPath} li`);
     for (let i = 0; i < listStuff.length; i++) {
          let spanNestStuff = listStuff[i].getElementsByTagName("span")[0];
          let spanNestValue = spanNestStuff.textContent.trim() || spanNestStuff.innerText.trim();
          if (spanNestValue.toUpperCase().indexOf(inputStuff.value.toUpperCase().trim()) >= 0) {
               listStuff[i].style.display = "";
          } else {
               listStuff[i].style.display = "none";
          }
     }
}

shortCut('#sidebar-search input').addEventListener('keyup', searchInputHeading) /* definitely not stolen code */
shortCut('#sidebar-search #sidebar-clearIcon').addEventListener('click', function() {
     shortCut('#global-sidebar input').value = ''
     searchInputHeading()
})

function sidebarScrollFix() {
     if (window.scrollY >= 84.5) {
          shortCut('#global-sidebar').style.position = 'fixed'
          shortCut('#global-sidebar').style.top      = '0cm'
     } else {
          shortCut('#global-sidebar').style.position = 'absolute'
          shortCut('#global-sidebar').style.top      = '2.25cm'
     }
}

sidebarScrollFix()
window.addEventListener('scroll', sidebarScrollFix)