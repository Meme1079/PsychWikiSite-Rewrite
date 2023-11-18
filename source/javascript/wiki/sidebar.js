import { shortCut, shortCutAll } from "../main.js";

// Inserts the header classes in each header tags
for (let headIncre = 0; headIncre <= 6; headIncre++) {
     let HeadNum = `#wiki-main h${headIncre.toString()}:not([data-disabled])`
     for (let headerClass = 0; headerClass < shortCutAll(HeadNum).length; headerClass++) {
          shortCutAll(HeadNum)[headerClass].setAttribute('class', `header header${headIncre.toString()}`)
     }
}

// Inserts the header inside the Sidebar List
const HeaderMainPath = '#wiki-sidebar #sidebar-lists ul:not([data-disabled])'
for (let i = 0; i < shortCutAll('#wiki-main .header').length; i++) {
     let HeaderGetClass   = shortCutAll('#wiki-main .header')[i].getAttribute('class')
     let HeaderSliceNum   = HeaderGetClass.slice(HeaderGetClass.length - 1, HeaderGetClass.length)
     let HeaderTextFilter = shortCutAll('#wiki-main .header')[i].innerText.replaceAll(/\(.+\)/g, '()')
     let HeaderTextTitle  = shortCutAll('#wiki-main .header')[i].getAttribute('class').replace(/header/g, '').trim()

     const HeaderNestEleStart = `<a title="H${HeaderTextTitle} [${HeaderTextFilter.trim()}]"><li class="list-h${HeaderSliceNum}">`
     const HeaderNestEleEnd   = '</li></a>'
     const HeaderNestEle      = `<span class="list-h${HeaderSliceNum}">${HeaderTextFilter}</span>`
     let HeaderTextDisplay = `${HeaderNestEleStart}${HeaderNestEle.trimEnd().trimStart()}${HeaderNestEleEnd}`

     try {
          shortCut(HeaderMainPath).innerHTML += HeaderTextDisplay
     } catch (error) {}
}

// Anti-Duplicate Header Hash
const getContentTrim = (element) => { return element.textContent.trimStart().trimEnd() }

const allHeaderElemContent = []
for (const headerElems of shortCutAll('#wiki-main .header')) {
     allHeaderElemContent.push(getContentTrim(headerElems))
}

function getElementByCount(arr) {
     const counts = {};
     arr.forEach((x) => { counts[x] = (counts[x] || 0) + 1; });

     return counts
}

function pushSelectedElems(checkIteration) {
     for (const headerElems of shortCutAll('#wiki-main .header')) {
          if (getContentTrim(headerElems) == checkIteration) {
               headerElemSelected.push(getContentTrim(headerElems))
               headerElemSelectedContent.push(headerElems)
          } else {
               continue
          }
     }
}

const headerElemSelected = []
const headerElemSelectedContent = []
for (const [content, counts] of Object.entries(getElementByCount(allHeaderElemContent))) {
     if (counts > 1) {
          pushSelectedElems(content)
     } else {
          continue
     }
}

let hashIndex = 0
for (let headSelectInd = 1; headSelectInd < headerElemSelectedContent.length; headSelectInd++) {
     let mainHeaderElemContent   = headerElemSelectedContent[headSelectInd]
     let mainHeaderElemPreSelect = headerElemSelected[headSelectInd - 1]
     let mainHeaderElemSelect    = headerElemSelected[headSelectInd]

     if (getContentTrim(mainHeaderElemContent) == mainHeaderElemSelect) {
          hashIndex += 1
          if (mainHeaderElemPreSelect != mainHeaderElemSelect) {
               hashIndex = 0
               mainHeaderElemContent.removeAttribute('data-althash')
          } else {
               mainHeaderElemContent.setAttribute('data-althash', `:alt-${hashIndex}`)
          }
     }
}

console.log(headerElemSelectedContent)

// Implements the header link in each list
let HeadNumIncre = 1
for (let getHeads = 0; getHeads < shortCutAll('#wiki-main .header').length; getHeads++) {
     let HeadIdElement = shortCutAll('#wiki-main .header')[getHeads]
     let HeadIdValue = HeadIdElement.textContent

     let getAltHash = HeadIdElement.getAttribute('data-althash')
     let getAltHashContent = HeadIdElement.getAttribute('data-althash') != null ? getAltHash : ''
     let HeadIdValueFilter = `${HeadIdValue.split('(')[0].trim()}${getAltHashContent}@${(HeadNumIncre++).toString()}`

     try {
          shortCutAll('#wiki-main .header')[getHeads].setAttribute('id', HeadIdValueFilter)
          shortCutAll(`${HeaderMainPath} a`)[getHeads].setAttribute('data-sections', HeadIdValueFilter)
          shortCutAll(`${HeaderMainPath} a`)[getHeads].setAttribute('href', window.location.pathname + '#' + HeadIdValueFilter)
     } catch(error) {}
}

// Implements the special "Top" button
const specialTopButtonStart = '<a title="Top" id="special-top" onclick=" window.scrollTo(0, 0) ">'
const specialTopButtonEnd   = '<li class="list-h1"><span class="list-h1">(Top)</span></li></a>'
let insertHeaderLists = []
for (const themListies of shortCutAll(`${HeaderMainPath} a`)) {
     insertHeaderLists.push(themListies.outerHTML)
}

shortCut(HeaderMainPath).innerHTML = ''
insertHeaderLists.reverse()
insertHeaderLists.push(specialTopButtonStart + specialTopButtonEnd)
insertHeaderLists.reverse()

for (const themListies of insertHeaderLists) {
     shortCut(HeaderMainPath).innerHTML += themListies
}

const inputPath = '#wiki-sidebar #sidebar-search #sidebar-search-main '
function searchInputHeading() {
     const inputStuff = shortCut(inputPath + 'input');
     const listStuff  = shortCutAll(`${HeaderMainPath} a:not(#special-top)`);
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

shortCut(inputPath + 'input').addEventListener('keyup', searchInputHeading) /* definitely not stolen code */
shortCut(inputPath + '.uil-times-circle').addEventListener('click', () => {
     shortCut(inputPath + 'input').value = ''
     searchInputHeading()
})

// Select Highlighted Lists & Header
const sideBarListsPath = shortCutAll('#wiki-sidebar #sidebar-lists ul a:not(#special-top)')
for (let sideBarList = 0; sideBarList < sideBarListsPath.length; sideBarList++) {     
     sideBarListsPath[sideBarList].addEventListener('click', () => {
          Array.prototype.slice.call(sideBarListsPath).forEach((element) => {
               element.removeAttribute('data-selected');
          });
          sideBarListsPath[sideBarList].setAttribute('data-selected', '');
     })
}

const setSidebarListSelectHash = () => {
     for (const sideBarList of sideBarListsPath) {
          let checkURL = sideBarList.getAttribute('data-sections') == window.location.hash.replace('#', '').replace(/%20/g, ' ')
          if (checkURL == true) sideBarList.setAttribute('data-selected', '');
     }
}

setSidebarListSelectHash()
window.addEventListener('hashchange', setSidebarListSelectHash)

const setHeaderListSelectHash = () => {
     for (const headerList of shortCutAll('main #wiki-header #wiki-main .header')) {
          if (headerList.getAttribute('id') == window.location.hash.replace('#', '').replace(/%20/g, ' ')) {
               headerList.setAttribute('data-selected', '')
          } else {
               headerList.removeAttribute('data-selected')
          }
     }
}

setHeaderListSelectHash()
window.addEventListener('hashchange', setHeaderListSelectHash)

// Hiding & Media Support
shortCut('html').setAttribute('data-sidebar-hidden', localStorage.getItem('local-data-sidebar-hidden'))

let mediaSidebar = false
shortCut('button[title="Hide Sidebar"]').addEventListener('click', () => {
     localStorage.setItem('local-data-sidebar-hidden', true)
     shortCut('html').setAttribute('data-sidebar-hidden', true)
     shortCut('html').setAttribute('data-sidebar-media', false)
     mediaSidebar = false
})

shortCut('button[title="Show Sidebar"]').addEventListener('click', () => {
     localStorage.setItem('local-data-sidebar-hidden', false)
     shortCut('html').setAttribute('data-sidebar-hidden', false)
})

shortCut('button[title="Sidebar"]').addEventListener('click', () => {
     if (mediaSidebar == false) {
          shortCut('html').setAttribute('data-sidebar-media', true)
          mediaSidebar = true
     } else {
          shortCut('html').setAttribute('data-sidebar-media', false)
          mediaSidebar = false
     }
})

function sidebarResizeThingy() {
     shortCut('#wiki-sidebar #sidebar-lists').addEventListener('click', () => {
          shortCut('html').setAttribute('data-sidebar-media', false)
          mediaSidebar = false
     })
     shortCut('#wiki-sidebar #sidebar-header').addEventListener('click', () => {
          shortCut('html').setAttribute('data-sidebar-media', false)
          mediaSidebar = false
     })

     if (window.innerWidth <= 1000) {
          shortCut('main').addEventListener('click', () => {
               shortCut('html').setAttribute('data-sidebar-media', false)
               mediaSidebar = false
          })
     }
}

sidebarResizeThingy()
window.addEventListener('resize', sidebarResizeThingy)

// Window Sidebar Shortcuts
window.addEventListener('keydown', (event) => {
     if (event.ctrlKey && event.key == 'h') {
          shortCut('#wiki-sidebar #sidebar-search-main input').focus();
     }
})