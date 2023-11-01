import searchData from "../../json/search_data.json" assert { type: "json" };
import { shortCut, shortCutAll } from "../main.js";

// Window Fun Fact's and Opening or Closing
const rand = (num) => { return Math.floor(Math.random() * num); };

function generateFacts() {
     const stupidDate = new Date();
     const funiiLink = "'https://www.youtube.com/watch?v=dQw4w9WgXcQ'";
     const funiiTroll = `onclick="window.location.href = ${funiiLink}"`;

     const stupidBirthdays = (birtYear, nameOfSomething) => {
          const births = (stupidDate.getFullYear() - birtYear).toString();
          
          let dateSuffix = "th";
          if (births.match(/1$/g)) dateSuffix = "st";
          if (births.match(/2$/g)) dateSuffix = "nd";
          if (births.match(/3$/g)) dateSuffix = "rd";
          gooberTexts = `Happy ${births + dateSuffix} Birthday ${nameOfSomething}!!!`;
     }

     let gooberTexts = searchData.fun_facts[rand(searchData.fun_facts.length)];
     if (stupidDate.getMonth() == 2 && stupidDate.getDate() == 14) {
          gooberTexts = "Happy Pi Day!";
     } else if (stupidDate.getMonth() == 3 && stupidDate.getDate() == 1) {
          gooberTexts = `<span ${funiiTroll}>New Feature Added, Try it!</span>`;
     } else if (stupidDate.getMonth() == 5 && stupidDate.getDate() == 1) {
          gooberTexts = "It's Pride Month, nothing else";
     } else if (stupidDate.getMonth() == 9 && stupidDate.getDate() == 31) {
          gooberTexts = "It's Spooky Month!";
     } else if (stupidDate.getHours() >= 0 && stupidDate.getHours() < 6) {
          gooberTexts = "Go to sleep, idiot!";
     } else if (stupidDate.getMonth() == 9 && stupidDate.getDate() == 5) {
          stupidBirthdays(2020, 'Friday Night Funkin\'')
     } else if (stupidDate.getMonth() == 7 && stupidDate.getDate() == 4) {
          stupidBirthdays(2022, 'PsychWiki')
     }

     shortCut('#wiki-search goober-facts').innerHTML = gooberTexts;
}

function showSearchWindow() {
     shortCut('#wiki-search').showModal();
     generateFacts()
}

shortCut('#wiki-topbar #topbar-list #list-search').addEventListener('click', showSearchWindow)
document.body.addEventListener('keydown', (event) => {
     if (event.metaKey && event.key == 'k') showSearchWindow();
     if (event.ctrlKey && event.key == 'r') generateFacts();
})

shortCut('#wiki-search #search-lists').addEventListener('click', () => {
     shortCut('#wiki-search').close();
})
window.addEventListener('click', (event) => {
     if (window.innerWidth > 750) {
          if (event.target == shortCut('#wiki-search')) shortCut('#wiki-search').close();
     }
})

// Search Window Lists
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

function createSearchLists(path, pathName) {
     const data = path
     const listIcons = '<i class="uil uil-search"></i>'
     const listType  = '<i class="uil uil-folder"></i>'
     for (let dataInd in data) {
          let listInnerContent = `<li>${listIcons}${toFirstUpperWord(data[dataInd])}<br/><span>${listType}${pathName}</span><li>`
          let listOuterContent = `<a href="html/lua_coding_docs/${data[dataInd]}.html">${listInnerContent}</a>`
          shortCut('#search-lists ul').innerHTML += listOuterContent
     
          if (window.location.href.match(data[dataInd])) {
               shortCutAll('#search-lists ul a li')[dataInd].setAttribute('data-disable-searchlist', '')
               shortCutAll('#search-lists ul a li')[dataInd].setAttribute('onclick', `alert('You are already here silly!')`)
               shortCutAll('#search-lists ul a li')[dataInd].setAttribute('title', 'You are already here silly!')
          }
     }
}

createSearchLists(searchData.datas.lua_coding_docs, 'Lua Coding Docs')
//createSearchLists(searchData.datas.lua_script_api, 'Lua Script API')

// Window List WebURL Checker
for (let dataAnchor of shortCutAll('#search-lists ul a')) {
     if (window.location.href.match(dataAnchor.getAttribute('href'))) {
          dataAnchor.removeAttribute('href')
          break;
     }
}

//! Deleting this is a big no no
// Window List Bug Remover :smart:
for (let dataEven = 1; dataEven < shortCutAll('#search-lists ul li').length; dataEven += 2) {
    shortCutAll('#search-lists ul li')[dataEven].setAttribute('data-search-invalid', '')
}
for (let dataInvalid of shortCutAll('*[data-search-invalid]')) {
     dataInvalid.remove()
}

// Search Input Stuff
const searchInput = shortCut('#wiki-search #search-search input')
function filterInputPages() {
     const searchInputFilter = searchInput.value.toUpperCase().replace(/_/g, '')

     for (let listContent of shortCutAll('#wiki-search #search-lists a')) {
          let getLists = listContent.querySelectorAll(':not(li[data-disable-searchlist])')[0]
          let txtValue = getLists.textContent || getLists.innerText
          if (txtValue.toUpperCase().indexOf(searchInputFilter) > -1) {
               listContent.style.display = ''
          } else {
               listContent.style.display = 'none'
          }
     }
}

searchInput.addEventListener('keyup', filterInputPages)
searchInput.addEventListener('keyup', (event) => {
     let filterInputValue = searchInput.value.toLowerCase().replaceAll(' ', '_')
     if (event.key == 'Enter') {
          for (let page of searchData.datas.lua_coding_docs) {
               if (filterInputValue === page) {
                    shortCut('#wiki-search #search-search input').value = ''
                    window.location.href = `html/lua_coding_docs/${page}.html`
               }
          }

          for (let page of searchData.datas.lua_script_api) {
               if (filterInputValue === page) {
                    shortCut('#wiki-search #search-search input').value = ''
                    window.location.href = `html/lua_script_api/${page}.html`
               }
          }
     }
})