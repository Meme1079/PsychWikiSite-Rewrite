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

// TODO Sonic

let y = []
for (const iterator of shortCutAll('#wiki-main .header')) {
     y.push(iterator.textContent.trimStart().trimEnd())
}

const counts = {};
const sampleArray = y;
sampleArray.forEach((x) => { counts[x] = (counts[x] || 0) + 1; });

let q = []
for (const [k,_] of Object.entries(counts)) {
     for (const iterator of shortCutAll('#wiki-main .header')) {
          if (iterator.textContent.trimStart().trimEnd() == k) {
               q.push(iterator.textContent.trimStart().trimEnd())
          }
     }
}

let index = 0
for (let iterator = 1; iterator < shortCutAll('#wiki-main .header').length; iterator++) {
     let d = q[iterator]
     let m = q[iterator - 1]

     if (shortCutAll('#wiki-main .header')[iterator].textContent.trimStart().trimEnd() == q[iterator]) {
          index += 1
          if (m != d) {
               index = 0
               shortCutAll('#wiki-main .header')[iterator].removeAttribute('data-althash')
          } else {
               shortCutAll('#wiki-main .header')[iterator].setAttribute('data-althash', `:alt-${index}`)
          }
     }
}

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
     for (const iterator of shortCutAll('#wiki-sidebar > :not(#sidebar-search)')) {
          iterator.addEventListener('click', () => {
               shortCut('html').setAttribute('data-sidebar-media', false)
               mediaSidebar = false
          })
     } 

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