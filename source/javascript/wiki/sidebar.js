import { shortCut, shortCutAll } from "../Main.js";

// Inserts the header classes in each header tags
for (let headIncre = 0; headIncre <= 6; headIncre++) {
     let HeadNum = `#wiki-main h${headIncre.toString()}`
     for (let headerClass = 0; headerClass < shortCutAll(HeadNum).length; headerClass++) {
          shortCutAll(HeadNum)[headerClass].setAttribute('class', `header header${headIncre.toString()}`)
     }
}

// Inserts the header inside the Sidebar List
const HeaderMainPath = '#global-sidebar #sidebar-lists ul'
for (let i = 0; i < shortCutAll('#wiki-main .header').length; i++) {
     let HeaderGetClass   = shortCutAll('#wiki-main .header')[i].getAttribute('class')
     let HeaderSliceNum   = HeaderGetClass.slice(HeaderGetClass.length - 1, HeaderGetClass.length)
     let HeaderTextFilter = shortCutAll('#wiki-main .header')[i].innerText.replaceAll(/\(.+\)/g, '()')
     let HeaderTextTitle  = shortCutAll('#wiki-main .header')[i].getAttribute('class').replace(/header/g, '').trim()

     const HeaderNestEleStart = `<ignore-li><a title="H${HeaderTextTitle}"><li class="list-h${HeaderSliceNum}">`
     const HeaderNestEleEnd   = '</li></a></ignore-li>'
     const HeaderNestEle      = `<span class="list-h${HeaderSliceNum}">${HeaderTextFilter}</span>`
     let HeaderTextDisplay = `${HeaderNestEleStart}${HeaderNestEle}${HeaderNestEleEnd}`

     shortCut(`${HeaderMainPath}`).innerHTML += HeaderTextDisplay
}

// Implements the header link in each list
let HeadNumIncre = 1
for (let getHeads = 0; getHeads < shortCutAll('#wiki-main .header').length; getHeads++) {
     let HeadIdValue = shortCutAll('#wiki-main .header')[getHeads].textContent
     let HeadIdValueFilter = HeadIdValue.split('(')[0].trim() + (HeadNumIncre++).toString()
     shortCutAll('#wiki-main .header')[getHeads].setAttribute('id', HeadIdValueFilter)
     shortCutAll(`${HeaderMainPath} a`)[getHeads].setAttribute('href', `#${HeadIdValueFilter}`)
}

const inputPath = '#global-sidebar #sidebar-search #search-main '
function searchInputHeading() {
     const inputStuff = shortCut(inputPath + 'input');
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

shortCut(inputPath + 'input').addEventListener('keyup', searchInputHeading) /* definitely not stolen code */
shortCut(inputPath + '#sidebar-clearIcon').addEventListener('click', () => {
     shortCut(inputPath + 'input').value = ''
     searchInputHeading()
})

// Reverse
const sideBarListPath = '#global-sidebar #sidebar-lists ul'
const sideBarList = shortCutAll(`${sideBarListPath} ignore-li`)

let sideBarListCornObverse = []
let sideBarListCornReverse = []
for (let ignoreListInd of sideBarList) {
     sideBarListCornObverse.push(ignoreListInd.innerHTML)
     sideBarListCornReverse.push(ignoreListInd.innerHTML)
}

sideBarListCornReverse.reverse()
const typeSortPathButton = '#global-sidebar #sidebar-search #search-type'
function isReverse(homo) {
     shortCut(sideBarListPath).innerHTML = ''

     let isDownIcon = homo == true ? 'Down' : 'Up'
     shortCut(`${typeSortPathButton} #type-sort`).setAttribute('title', 'Sort by: ' + isDownIcon)
     shortCut(`${typeSortPathButton} #type-sort i`).setAttribute('class', 'uil uil-sort-amount-' + isDownIcon.toLowerCase())
     if (homo == true) {
          for (let cornInd = 0; cornInd < sideBarListCornObverse.length; cornInd++) {
               shortCut(`${HeaderMainPath}`).innerHTML += sideBarListCornObverse[cornInd]
          }
     } else {
          for (let cornInd = 0; cornInd < sideBarListCornReverse.length; cornInd++) {
               shortCut(`${HeaderMainPath}`).innerHTML += sideBarListCornReverse[cornInd]
          }
     }
}

let reverseCorn = true
shortCut(`${typeSortPathButton} #type-sort`).addEventListener('click', () => {
     if (reverseCorn == true) {
          isReverse(false)
          reverseCorn = false
     } else {
          isReverse(true)
          reverseCorn = true
     }
})

// Check Header Exists
const sidebar_listPath = '#global-sidebar #sidebar-lists ul li.list-h'
function checkHeadList(id) {
     const sidebar_IDlistPath = sidebar_listPath + id.toString()
     try {
          return (shortCutAll(sidebar_IDlistPath)[0].textContent.length > 0)
     } catch (error) {
          return false
     }
}

const sidebar_listoption = '#global-sidebar #sidebar-search #search-type #type-layers select'
for (let headList = 1; headList <= 6; headList++) {
     if (checkHeadList(headList) == false) {
          shortCutAll(`${sidebar_listoption} option`)[headList].setAttribute('disabled', '')
     }
}

function hideHeaderListAll(onlyApper, showAll = false) {
     for (let optionInd = 0; optionInd <= 6; optionInd++) {
          for (let sidebarListInd = 0; sidebarListInd < shortCutAll(sidebar_listPath + optionInd).length; sidebarListInd++) {
               shortCutAll(sidebar_listPath + optionInd)[sidebarListInd].style.display = 'block'
          }

          if (showAll == false) {
               if (optionInd == onlyApper) continue;

               for (let sidebarListInd = 0; sidebarListInd < shortCutAll(sidebar_listPath + optionInd).length; sidebarListInd++) {
                    shortCutAll(sidebar_listPath + optionInd)[sidebarListInd].style.display = 'none'
               }
          }
     }
}

shortCut(sidebar_listoption).addEventListener('change', () => {
     switch (shortCut(sidebar_listoption).value) {
          case 'all':      hideHeaderListAll(1, true); break;
          case 'header-1': hideHeaderListAll(1);       break;
          case 'header-2': hideHeaderListAll(2);       break;
          case 'header-3': hideHeaderListAll(3);       break;
          case 'header-4': hideHeaderListAll(4);       break;
          case 'header-5': hideHeaderListAll(5);       break;
          case 'header-6': hideHeaderListAll(6);       break;
          default:         hideHeaderListAll(1, true); break;
     }
})

// Media Sidebar
const globalTopbarPathButton = '#global-topbar #topbar-list #list-sublist'
let hideSideBar = true
shortCut(`${globalTopbarPathButton} #media-sidebar`).addEventListener('click', () => {
     if (hideSideBar == true) {
          shortCut('#global-sidebar').setAttribute('data-sidebar-media', 'true')
          hideSideBar = false
     } else {
          shortCut('#global-sidebar').setAttribute('data-sidebar-media', 'false')
          hideSideBar = true
     }
})

window.addEventListener('resize', () => {
     if (window.outerWidth >= 1100) {
          shortCut('#global-sidebar').setAttribute('data-sidebar-media', 'false')
          hideSideBar = true
     }

     const getTheStupidInputPlaceholder = '#global-menubar #menubar-list-randomcodekey input'
     if (window.outerWidth <= 300) {
          shortCut(getTheStupidInputPlaceholder).setAttribute('placeholder', 'Key')
     } else {
          shortCut(getTheStupidInputPlaceholder).setAttribute('placeholder', 'Insert Key Code')
     }
})

// Hide Sidebar
function showSideBar(bool) {
     shortCut('#global-sidebar').setAttribute('data-sidebar-hidden', bool.toString())
     shortCut('main #wiki-bg').setAttribute('data-sidebar-hidden', bool.toString())
     shortCut('main header').setAttribute('data-sidebar-hidden', bool.toString())
     shortCut(`${globalTopbarPathButton} #media-sidebar`).setAttribute('data-sidebar-hidden', bool.toString())
     shortCut(`${globalTopbarPathButton} #hidden-sidebar`).setAttribute('data-sidebar-hidden', (!bool).toString())
}

shortCut('#global-sidebar #sidebar-title button').addEventListener('click', () => {
     showSideBar(true)
})

shortCut(`${globalTopbarPathButton} #media-sidebar`).addEventListener('click', () => {
     showSideBar(false)
})

shortCut(`${globalTopbarPathButton} #hidden-sidebar`).addEventListener('click', () => {
     showSideBar(false)
})