import { shortCut, shortCutAll } from "../main.js";

// Insert Code Lines
for (let preInd = 0; preInd < shortCutAll('pre.code-example-code').length; preInd++) {
     let result = ``
     for (let dumbyLines of shortCutAll('pre.code-example-code')[preInd].innerHTML.split('\n')) {
          result += `<span class="code-line">${dumbyLines}</span>\n`
     }
     shortCutAll('pre.code-example-code')[preInd].innerHTML = result.slice(0, result.length - 10)
}

// Adding the "Blocked" to the title
for (let disButton of shortCutAll('button[disabled]')) {
     let withAttr = disButton.getAttribute('title') != null ? disButton.getAttribute('title') + ' (Blocked)' : '(Blocked)'
     disButton.setAttribute('title', withAttr)
}

// Missing Anchor Index Support
try {
     const getHashName = window.location.hash.match(/#.+@?\d*?/s)[0]
     const getHashNameFilter = getHashName.replace(/@\d*/s, '').replace('#', '').replace(/%20/g, ' ')
     function setWindowLocation(headerInd) {
          let index = 0
          while (true) { // first time using this
               index += 1
               if (headerInd.getAttribute('id') == `${getHashNameFilter}@${index}`) {
                    window.location.href = `${window.location.pathname}#${getHashNameFilter}@${index}`
                    break
               }
          }
     }

     for (let headerElement of shortCutAll('.header')) {
          if (headerElement.getAttribute('id').match(getHashNameFilter)) {
               setWindowLocation(headerElement)
               break
          }
     }
} catch (error) {}

// Copy Code, Hide Code, & Switch to Ouput
async function codeCopyToClipboard(preInd) {
     const codeContent = shortCutAll('pre.code-example-code')[preInd].innerText
     await navigator.clipboard.writeText(codeContent).then(() => {
          alert('Hey! Code copied to clipboard')
     });
}

const getCopyCodeButton = shortCutAll('.code-header .code-header-buttons button[title="Copy Code"]')
const getCopyCodeButtonIcon = shortCutAll('.code-header .code-header-buttons button[title="Copy Code"] i')
function executeCopyCode(copyId, codeAttr, codeClass) {
     getCopyCodeButton[copyId].setAttribute(codeAttr, '')
     getCopyCodeButton[copyId].setAttribute('disabled', '')
     getCopyCodeButtonIcon[copyId].setAttribute('class', codeClass)
     setTimeout(() => {
          getCopyCodeButton[copyId].removeAttribute(codeAttr)
          getCopyCodeButton[copyId].removeAttribute('disabled')
          getCopyCodeButtonIcon[copyId].setAttribute('class', 'uil uil-copy-alt')
     }, 1000)
}

for (let codeCopyButton in getCopyCodeButton) {
     if (codeCopyButton == 'entries') break; //! DO NOT DELETE

     const getCodeExampleCodeAll = shortCutAll('pre.code-example-code')[codeCopyButton]
     getCopyCodeButton[codeCopyButton].addEventListener('click', () => {
          try { 
               if (getCodeExampleCodeAll.getAttribute('data-code-invisible').match('true')) {
                    alert('Woah! Tried to attempt to copy a non-code')
                    executeCopyCode(codeCopyButton, 'data-copy-denied', 'uil-times-circle')
                    return;
               } 
          } catch(error) {}

          codeCopyToClipboard(codeCopyButton)
          executeCopyCode(codeCopyButton, 'data-copy-copied', 'uil uil-check-circle')
     })
}

function hideCode(codeExampleId) {
     const folderButtonPath = '.code-header .code-header-buttons button[title="Hide Code"]'

     let isShown = true
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

const getWindowPathNameFilter = window.location.pathname.replace('/source/html/', '').replace(/\//g, ' / ').replace('.html', '').split(' / ')
const getMainHeaderPath = shortCut('main header p')
let incrementByOne = 0
for (let windowPathNameSplit of getWindowPathNameFilter) {
     let headerTagByEachPathName = `<header-tag>${toFirstUpperWord(windowPathNameSplit)}</header-tag> / `
     getMainHeaderPath.innerHTML += headerTagByEachPathName

     incrementByOne += 1
     if (incrementByOne == getWindowPathNameFilter.length) {
          let removeThatOneStupidGoddamnLastSlashChar = getMainHeaderPath.innerHTML.length - (' / ').length
          getMainHeaderPath.innerHTML = getMainHeaderPath.innerHTML.substring(1, removeThatOneStupidGoddamnLastSlashChar)
          break
     }
}

shortCutAll('header-tag')[shortCutAll('header-tag').length - 1].setAttribute('higlighted-page', '')

// Footer Shits
try {
     const footerPrevH3 = shortCut('main footer #footer-goto-buttons #footer-goto-buttons-prev h3')
     const footerNextH3 = shortCut('main footer #footer-goto-buttons #footer-goto-buttons-next h3')
     const footerPrevH3Trimmed = footerPrevH3.textContent.trimStart().trimEnd()
     const footerNextH3Trimmed = footerNextH3.textContent.trimStart().trimEnd()

     footerPrevH3.setAttribute('data-goto-title', footerPrevH3Trimmed)
     footerNextH3.setAttribute('data-goto-title', footerNextH3Trimmed)
     shortCut('main footer #footer-goto-buttons #footer-goto-buttons-prev').setAttribute('title', footerPrevH3Trimmed)
     shortCut('main footer #footer-goto-buttons #footer-goto-buttons-next').setAttribute('title', footerNextH3Trimmed)
} catch (error) {}