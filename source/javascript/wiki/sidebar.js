import { shortCut, shortCutAll } from "../main.js";

// Inserts the header classes in each header tags
for (let headIncre = 0; headIncre <= 6; headIncre++) {
     let HeadNum = `#wiki-main h${headIncre.toString()}`
     for (let headerClass = 0; headerClass < shortCutAll(HeadNum).length; headerClass++) {
          shortCutAll(HeadNum)[headerClass].setAttribute('class', `header header${headIncre.toString()}`)
     }
}

// Inserts the header inside the Sidebar List
const HeaderMainPath = '#wiki-sidebar #sidebar-lists ul'
for (let i = 0; i < shortCutAll('#wiki-main .header').length; i++) {
     let HeaderGetClass   = shortCutAll('#wiki-main .header')[i].getAttribute('class')
     let HeaderSliceNum   = HeaderGetClass.slice(HeaderGetClass.length - 1, HeaderGetClass.length)
     let HeaderTextFilter = shortCutAll('#wiki-main .header')[i].innerText.replaceAll(/\(.+\)/g, '()')
     let HeaderTextTitle  = shortCutAll('#wiki-main .header')[i].getAttribute('class').replace(/header/g, '').trim()

     const HeaderNestEleStart = `<a title="H${HeaderTextTitle}"><li class="list-h${HeaderSliceNum}">`
     const HeaderNestEleEnd   = '</li></a>'
     const HeaderNestEle      = `<span class="list-h${HeaderSliceNum}">${HeaderTextFilter}</span>`
     let HeaderTextDisplay = `${HeaderNestEleStart}${HeaderNestEle}${HeaderNestEleEnd}`

     shortCut(HeaderMainPath).innerHTML += HeaderTextDisplay
}

// Slices Header Texts
const HeadMaxLength = [29, 28, 27, 26, 25, 24]
for (let headInd = 0; headInd <= 6; headInd++) {
     for (const headList of shortCutAll(`${HeaderMainPath} a li .list-h${headInd}`)) {
          if (headList.textContent.length >= HeadMaxLength[headInd - 1]) {
               headList.textContent = headList.textContent.slice(0, HeadMaxLength[headInd - 1]) + '...'
          }
     }
}

// Implements the header link in each list
let HeadNumIncre = 1
for (let getHeads = 0; getHeads < shortCutAll('#wiki-main .header').length; getHeads++) {
     let HeadIdValue = shortCutAll('#wiki-main .header')[getHeads].textContent
     let HeadIdValueFilter = HeadIdValue.split('(')[0].trim() + (HeadNumIncre++).toString()
     shortCutAll('#wiki-main .header')[getHeads].setAttribute('id', HeadIdValueFilter)
     shortCutAll(`${HeaderMainPath} a`)[getHeads].setAttribute('href', window.location.pathname + '#' + HeadIdValueFilter)
}

const inputPath = '#wiki-sidebar #sidebar-search #sidebar-search-main '
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
shortCut(inputPath + '.uil-times-circle').addEventListener('click', () => {
     shortCut(inputPath + 'input').value = ''
     searchInputHeading()
})

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

window.addEventListener('resize', () => {
     shortCut('html').setAttribute('data-sidebar-media', false)
     mediaSidebar = false
})