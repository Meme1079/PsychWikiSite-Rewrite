import { shortCut, shortCutAll } from "../main.js";

// Inserts the header classes in each header tags
for (let headIncre = 0; headIncre <= 6; headIncre++) {
     let HeadNum = `#wiki-main h${headIncre.toString()}`
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

// Implements the header link in each list
let HeadNumIncre = 1
for (let getHeads = 0; getHeads < shortCutAll('#wiki-main .header').length; getHeads++) {
     let HeadIdValue = shortCutAll('#wiki-main .header')[getHeads].textContent
     let HeadIdValueFilter = HeadIdValue.split('(')[0].trim() + '@' + (HeadNumIncre++).toString()

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
     const listStuff  = shortCutAll(`${HeaderMainPath} li`);
     for (let i = 1; i < listStuff.length; i++) {
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

// Select Highlighted Lists
const sideBarListsPath = shortCutAll('#wiki-sidebar #sidebar-lists ul a')
for (let sideBarList = 1; sideBarList < sideBarListsPath.length; sideBarList++) {     
     sideBarListsPath[sideBarList].addEventListener('click', () => {
          Array.prototype.slice.call(sideBarListsPath).forEach((element) => {
               element.removeAttribute('data-selected');
          });
          sideBarListsPath[sideBarList].setAttribute('data-selected', '');
     })
}

for (const iterator of sideBarListsPath) {
     let hi = iterator.getAttribute('data-sections') == window.location.hash.replace('#', '').replace(/%20/g, ' ')
     if (hi == true) {
          iterator.setAttribute('data-selected', '');
     }
}

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