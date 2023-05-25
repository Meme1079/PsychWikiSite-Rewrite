import pages from '../json/lua-pages.json' assert {type: 'json'};
import { shortCut, shortCutAll } from "./Main.js";

const rand = (num) => { return Math.floor(Math.random() * num) }
const homeSlogans = ['The Unofficial Wiki!', 'The Most Gaming Wiki!', 'The Weirdest Wiki!', 'The Sussiest Wiki!']
shortCut('#home-hero-about #home-hero-about-slogan').textContent = homeSlogans[rand(4)]

const homeImages = ['Nails.png', 'Yuh_uh.gif', 'Needy.png', 'OMG.png']
shortCut('#home-hero-media img').setAttribute('src', `./images/stupid_club/${homeImages[rand(4)]}`)

shortCutAll('#home-hero-about button')[0].addEventListener('click', function() {
     let allWiki = ''
     for (let pagesWiki of pages.lua_coding_docs) { 
          allWiki += `${pagesWiki.toString()}, ` 
     }
     for (let pagesWiki of pages.lua_script_api) { 
          allWiki += `${pagesWiki.toString()}, ` 
     }

     window.location.href = allWiki.split(', ')[rand(allWiki.split(', ').length - 2)]
})

const githubLink = 'window.location.href = \'https://github.com/Meme1079/PsychWikiSite-Rewrite\''
shortCutAll('#home-hero-about button')[1].setAttribute('onclick', githubLink)

/* Search Bar */

shortCut('#home-fake-search #home-fake-search-bar').addEventListener('click', function() {
     shortCut('#home-search').style.display = 'flex'
})

shortCut('#home-search-backdrop').addEventListener('click', function() {
     shortCut('#home-search').style.display = 'none'
})

function searchInputHeading() {
     const inputStuff = shortCut('#home-search-main-searchbar input');
     const listStuff  = shortCutAll('#suggested li');
     for (let i = 0; i < listStuff.length; i++) {
          let spanNestStuff = listStuff[i].textContent;
          let spanNestValue = spanNestStuff.trim() || spanNestStuff.innerText.trim();
          if (spanNestValue.toUpperCase().indexOf(inputStuff.value.toUpperCase().trim()) >= 0) {
               listStuff[i].style.display = ""
          } else {
               listStuff[i].style.display = "none"
          }

          if (inputStuff.value.toUpperCase().trim().length > 0) {
               shortCutAll('h3')[1].style.marginTop = "0cm"
               shortCutAll('h3')[0].style.display = "none"
               shortCut('#popular').style.display = "none"
          } else {
               shortCutAll('h3')[1].style.marginTop = "0.15cm"
               shortCutAll('h3')[0].style.display = ""
               shortCut('#popular').style.display = ""
          }
     }
}

shortCut('#home-search-main-searchbar input').addEventListener('keyup', searchInputHeading) /* definitely not stolen code */
shortCut('#home-search-main-searchbar #search-bar-icon-clear').addEventListener('click', function() {
     shortCut('#home-search-main-searchbar input').value = ''
     searchInputHeading()
})

function createSectionLists(listCategory, iconCategory, tagType, jsonData) {
     const searchSectionType = shortCutAll(listCategory)
     const searchSectionIcon = `<i class="uil uil-${iconCategory}"></i>`
     for (let luaSectionInd = 0; luaSectionInd < searchSectionType.length; luaSectionInd++) {
          const loopLuaSection = searchSectionType[luaSectionInd]
          const tagTypeConvert = tagType.replaceAll(' ', '-').replaceAll('Lua', 'tag').toLowerCase()
          const tagInsert      = (`<span class="${tagTypeConvert}">${tagType}</span>`).split(tagType)[0]
          loopLuaSection.innerHTML = searchSectionIcon + loopLuaSection.textContent + tagInsert

          loopLuaSection.addEventListener('click', () => {
               const tagTypePath = tagType.replaceAll(' ', '-').toLowerCase()
               switch (listCategory.match(/#\w+/)[0].toLowerCase()) {
                    case '#suggested':
                         window.location.href = `html/${tagTypePath}/${jsonData[luaSectionInd]}.html`
                         break;
                    case '#popular':
                         let filterDict = loopLuaSection.textContent.replaceAll(' ', '_').toLowerCase()
                         window.location.href = `html/${tagTypePath}/${jsonData[filterDict]}.html`
                         break;
                    default:
                         console.error('Erm not a real case ewwww')
                         break;
               }
          })
     }
}

createSectionLists('#suggested .lua-coding-docs', 'document-layout-left', 'Lua Coding Docs', pages.lua_coding_docs)
createSectionLists('#suggested .lua-script-api', 'document-layout-left', 'Lua Script API', pages.lua_script_api)
createSectionLists('#popular .lua-coding-docs', 'analytics', 'Lua Coding Docs', pages.lua_coding_docs_dict)
createSectionLists('#popular .lua-script-api', 'analytics', 'Lua Script API', pages.lua_script_api_dict)

const searchLocalPath = '#home-search #home-search-main-searchbar'
const searchInputPath = `${searchLocalPath} input`
shortCut(searchInputPath).addEventListener('keyup', function(event) {
     let filterInputValue = shortCut(searchInputPath).value.toLowerCase().replaceAll(' ', '_')
     if (event.key == 'Enter') {
          for (let i of pages.lua_coding_docs) {
               if (filterInputValue === i) {
                    shortCut(searchInputPath).value = ''
                    window.location.href = `html/lua-coding-docs/${filterInputValue}.html`
               }
          }
          for (let i of pages.lua_script_api) {
               if (filterInputValue === i) {
                    shortCut(searchInputPath).value = ''
                    window.location.href = `html/lua-script-api/${filterInputValue}.html`
               }
          }
     }
})