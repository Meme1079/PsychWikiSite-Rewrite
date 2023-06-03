import { shortCut, shortCutAll } from "../Main.js";

// Inserts the header classes in each header tags
for (let headIncre = 0; headIncre <= 4; headIncre++) {
     let HeadNum = `#wiki h${headIncre.toString()}`
     for (let headerClass = 0; headerClass < shortCutAll(HeadNum).length; headerClass++) {
          shortCutAll(HeadNum)[headerClass].setAttribute('class', `header header${headIncre.toString()}`)
     }
}

// Inserts the header inside the Sidebar List
const HeaderMainPath = '#sidebar-headerlists ul'
for (let i = 0; i < shortCutAll('#wiki .header').length; i++) {
     let HeaderGetClass    = shortCutAll('#wiki .header')[i].getAttribute('class')
     let HeaderSliceNum    = HeaderGetClass.slice(HeaderGetClass.length - 1, HeaderGetClass.length)
     let HeaderTextFilter  = shortCutAll('#wiki .header')[i].innerText.replaceAll(/\(.+\)/g, '()')
     let HeaderTextDisplay = `<li><span class="list-h${HeaderSliceNum}">${HeaderTextFilter}</span></li>`

     shortCut(`${HeaderMainPath}`).innerHTML += HeaderTextDisplay
}

// Implements the header link in each list
let HeadNumIncre = 1
for (let getHeads = 0; getHeads < shortCutAll('#wiki .header').length; getHeads++) {
     let HeadIdValue = shortCutAll('#wiki .header')[getHeads].textContent.split('(')[0].trim() + (HeadNumIncre++).toString()
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
shortCut('#sidebar-search #sidebar-clearIcon').addEventListener('click', () => {
     shortCut('#global-sidebar input').value = ''
     searchInputHeading()
})