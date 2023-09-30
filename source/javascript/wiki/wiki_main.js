import { shortCut, shortCutAll } from "../main.js";

// Inser Code Lines
for (let preInd = 0; preInd < shortCutAll('pre.code-example-code').length; preInd++) {
     let result = ``
     for (let dumbyLines of shortCutAll('pre.code-example-code')[preInd].innerHTML.split('\n')) {
          result += `<span class="code-line">${dumbyLines}</span>\n`
     }
     shortCutAll('pre.code-example-code')[preInd].innerHTML = result.slice(0, result.length - 10)
}

for (let preInd = 0; preInd < shortCutAll('pre.code-example-output').length; preInd++) {
     let result = ``
     for (let dumbyLines of shortCutAll('pre.code-example-output')[preInd].innerHTML.split('\n')) {
          result += `<span class="code-line">${dumbyLines}</span>\n`
     }
     shortCutAll('pre.code-example-output')[preInd].innerHTML = result.slice(0, result.length - 10)
}

// Copy Code, Hide Code, & Switch to Ouput
async function codeCopyToClipboard(preInd) {
     const codeContent = shortCutAll('pre.code-example-code')[preInd].innerText
     await navigator.clipboard.writeText(codeContent);
}

function toSeconds(mili) {
     return mili * 1000
}

const getCopyCodeButton = shortCutAll('.code-header .code-header-buttons button[title="Copy Code"]')
const getCopyCodeButtonIcon = shortCutAll('.code-header .code-header-buttons button[title="Copy Code"] i')
function executeCopyCode(copyId, codeAttr, codeClass, codeMessage) {
     getCopyCodeButton[copyId].setAttribute(codeAttr, '')
     getCopyCodeButton[copyId].setAttribute('disabled', '')
     getCopyCodeButtonIcon[copyId].setAttribute('class', codeClass)
     alert(codeMessage)
     setTimeout(() => {
          getCopyCodeButton[copyId].removeAttribute(codeAttr)
          getCopyCodeButton[copyId].removeAttribute('disabled')
          getCopyCodeButtonIcon[copyId].setAttribute('class', 'uil uil-copy-alt')
     }, toSeconds(1))
}

for (let codeCopyButton in getCopyCodeButton) {
     if (codeCopyButton == 'entries') break; //! DO NOT DELETE

     const getCodeExampleCodeAll = shortCutAll('pre.code-example-code')[codeCopyButton]
     const finalMessage = 'Hey! Code copied to clipboard'
     const errorMessage = 'Woah! Tried to attempt to copy a non-code'
     getCopyCodeButton[codeCopyButton].addEventListener('click', () => {
          try {
               if (getCodeExampleCodeAll.getAttribute('data-code-invisible').match('true')) {
                    executeCopyCode(codeCopyButton, 'data-copy-denied', 'uil-times-circle', errorMessage)
                    return;
               }
          } catch (error) {}
          executeCopyCode(codeCopyButton, 'data-copy-copied', 'uil uil-check-circle', finalMessage)
          codeCopyToClipboard(codeCopyButton)
     })
}

function hideCode(codeExampleId) {
     let isShown = true
     const folderButtonPath = '.code-header .code-header-buttons button[title="Hide Code"]'
     shortCutAll(folderButtonPath)[codeExampleId].addEventListener('click', () => {
          if (isShown == true) {
               shortCutAll(`${folderButtonPath} i`)[codeExampleId].setAttribute('class', 'uil uil-folder-open')
               shortCutAll(`${folderButtonPath} i`)[codeExampleId].setAttribute('title', 'Show Code')
               shortCutAll('.code-header')[codeExampleId].setAttribute('data-hidden', '')
               shortCutAll('.code-border')[codeExampleId].style.display = 'none';
               isShown = false
          } else {
               shortCutAll(`${folderButtonPath} i`)[codeExampleId].setAttribute('class', 'uil uil-folder')
               shortCutAll(`${folderButtonPath} i`)[codeExampleId].setAttribute('title', 'Hide Code')
               shortCutAll('.code-header')[codeExampleId].removeAttribute('data-hidden')
               shortCutAll('.code-border')[codeExampleId].style.display = 'block';
               isShown = true
          }
     })
}

function switchToOutput(preInd) {
     const buttonCodePath = '.code-header .code-header-display-buttons button:nth-child(1)'
     const buttonOutputPath = '.code-header .code-header-display-buttons button:nth-child(2)'
     shortCutAll(buttonOutputPath)[preInd].addEventListener('click', () => {
          shortCutAll(buttonCodePath)[preInd].setAttribute('class', 'inactive-button')
          shortCutAll(buttonOutputPath)[preInd].setAttribute('class', 'active-button')
          shortCutAll('pre.code-example-code')[preInd].setAttribute('data-code-invisible', 'true')
          shortCutAll('pre.code-example-output')[preInd].setAttribute('data-code-visible', 'true')
     })

     shortCutAll(buttonCodePath)[preInd].addEventListener('click', () => {
          shortCutAll(buttonCodePath)[preInd].setAttribute('class', 'active-button')
          shortCutAll(buttonOutputPath)[preInd].setAttribute('class', 'inactive-button')
          shortCutAll('pre.code-example-code')[preInd].removeAttribute('data-code-invisible')
          shortCutAll('pre.code-example-output')[preInd].removeAttribute('data-code-visible')
     })
}

for (let iterator in shortCutAll('.code-example-code')) {
     if (iterator == 'entries') break; //! DO NOT DELETE
     hideCode(iterator)
}

for (let iterator in shortCutAll('.code-border')) {
     if (iterator == 'entries') break; //! DO NOT DELETE
     switchToOutput(iterator)
}

// Location Format
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