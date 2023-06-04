import pages from '../json/lua-pages.json' assert {type: 'json'};
import { shortCut, shortCutAll } from "./Main.js";

// open keys stufff

let displaySearchBar = (display) => { shortCut('#global-search').style.display = display }

try {
     shortCut('#topbar-list-search').addEventListener('click',     () => {displaySearchBar('flex')})
     shortCutAll('#list-min ul li')[1].addEventListener('click',   () => {displaySearchBar('flex')})
     shortCut('#global-search-backdrop').addEventListener('click', () => {displaySearchBar('none')})
} catch(error) {
     shortCut('#home-fake-search-bar').addEventListener('click',   () => {displaySearchBar('flex')})
     shortCut('#global-search-backdrop').addEventListener('click', () => {displaySearchBar('none')})
}

shortCut('body').addEventListener('keydown', (event) => {
     if (event.metaKey && event.key == 'k') displaySearchBar('flex');
})

// when searching stuff

const searchPath = '#global-search #global-search-main'
function searchInputHeading() {
     const inputStuff = shortCut(`${searchPath} #search-main-searchbar input`);
     const listStuff  = shortCutAll(`${searchPath} ul li`);
     for (let i = 0; i < listStuff.length; i++) {
          let spanNestStuff = listStuff[i].textContent;
          let spanNestValue = spanNestStuff.trim() || spanNestStuff.innerText.trim();
          if (spanNestValue.toUpperCase().indexOf(inputStuff.value.toUpperCase().trim()) >= 0) {
               listStuff[i].style.display = ""
          } else {
               listStuff[i].style.display = "none"
          }

          try {
               if (inputStuff.value.toUpperCase().trim().length >= 1) {
                    shortCut('#search-main-lists #already-here').style.display = 'none'
                    shortCutAll('#search-main-lists h3')[0].style.display = 'none'
                    shortCutAll('#search-main-lists h3')[1].style.display = 'none'
               } else {
                    shortCut('#search-main-lists #already-here').style.display = 'block'
                    shortCutAll('#search-main-lists h3')[0].style.display = 'block'
                    shortCutAll('#search-main-lists h3')[1].style.display = 'block'
               }
          } catch (error) {
               if (inputStuff.value.toUpperCase().trim().length >= 1) {
                    shortCutAll('#search-main-lists h3')[0].style.display = 'none'
                    shortCutAll('#search-main-lists h3')[1].style.display = 'none'
               } else {
                    shortCutAll('#search-main-lists h3')[0].style.display = 'block'
                    shortCutAll('#search-main-lists h3')[1].style.display = 'block'
               }
          }
     }
}

const searchBarPath = `${searchPath} #search-main-searchbar`
shortCut(`${searchBarPath} input`).addEventListener('keyup', searchInputHeading) /* definitely not stolen code */
shortCut(`${searchBarPath} #search-bar-icon-clear`).addEventListener('click', () => {
     shortCut(`${searchBarPath} input`).value = ''
     searchInputHeading()
})

// when creating list

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

const wikiMetaPageCheck = shortCutAll('meta')[0].getAttribute('wikipage') == 'true'
function createSectionLists(luaWikiPath, pageJSON) {
     const sectionIconBook = '<i aria-hidden="true" class="uil uil-notebooks"></i>'
     for (let page of pageJSON) {
          let sectionList_AInside    = `<a href="${page.toLowerCase()}.html">`
          let sectionList_AOutside   = `<a href="html/${luaWikiPath}/${page.toLowerCase()}.html">`

          let sectionList_A  = wikiMetaPageCheck ? sectionList_AInside : sectionList_AOutside
          let sectionList_LI = `<li class="${luaWikiPath}">${sectionIconBook}${toFirstUpperWord(page)}</li></a>`
          let sectionList    = sectionList_A + sectionList_LI
          shortCut(`#search-main-lists #list-${luaWikiPath}`).innerHTML += sectionList
     }
}

function checkCurWebURL(listType) {
     const listSectionPath = `#list-${listType} li`
     for (let iterator in shortCutAll(listSectionPath)) {
          try { // just to prevent this annoying goddamn error
               let listSectionFilter = shortCutAll(listSectionPath)[iterator].textContent.replaceAll(' ', '_').toLowerCase()
               let windowFilterURL   = window.location.href.split('/')[5].replace('.html', '')
               if (listSectionFilter === windowFilterURL) {
                    shortCutAll(listSectionPath)[iterator].setAttribute('id', 'already-here')
                    shortCutAll(listSectionPath.replace(' li', ' a'))[iterator].removeAttribute('href')
               }
          } catch (error) {
              return error
          }
     }
}

createSectionLists('lua-coding-docs', pages.lua_coding_docs)
createSectionLists('lua-script-api',  pages.lua_script_api)

checkCurWebURL('lua-coding-docs')
checkCurWebURL('lua-script-api')

// when searching stuff but input

const searchInputPath = `${searchPath} #search-main-searchbar input`
shortCut(searchInputPath).addEventListener('keyup', (event) => {
     let filterInputValue = shortCut(searchInputPath).value.toLowerCase().replaceAll(' ', '_')
     if (event.key == 'Enter') {
          for (let page of pages.lua_coding_docs) {
               if (filterInputValue === page) {
                    let linkSearch_Inside  = `${filterInputValue}.html`
                    let linkSearch_Outside = `html/lua-coding-docs/${filterInputValue}.html`

                    shortCut(searchInputPath).value = ''
                    window.location.href = wikiMetaPageCheck ? linkSearch_Inside : linkSearch_Outside
               }
          }
          for (let page of pages.lua_script_api) {
               if (filterInputValue === page) {
                    let linkSearch_Inside  = `${filterInputValue}.html`
                    let linkSearch_Outside = `html/lua-script-api/${filterInputValue}.html`

                    shortCut(searchInputPath).value = ''
                    window.location.href = wikiMetaPageCheck ? linkSearch_Inside : linkSearch_Outside
               }
          }
     }
})