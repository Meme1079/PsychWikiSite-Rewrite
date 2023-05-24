import pages from '../json/hi.json' assert {type: 'json'};
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

const luaSugCodingDocs = shortCutAll('#suggested .lua-coding-docs')
const luaSugScriptAPI  = shortCutAll('#suggested .lua-script-api')
const link_IconDocument = '<i class="uil uil-document-layout-left"></i>'
for (let luaCodingInd = 0; luaCodingInd < luaSugCodingDocs.length; luaCodingInd++) {
     const loopCodingDocs = luaSugCodingDocs[luaCodingInd]
     const filterTag = (`<span class="tag-coding-docs">Lua Coding Docs</span>`).split('Lua Coding Docs')[0]
     loopCodingDocs.innerHTML = `${link_IconDocument}${loopCodingDocs.textContent}${filterTag}`

     loopCodingDocs.addEventListener('click', () => {
          window.location.href = `html/lua-coding-docs/${pages.lua_coding_docs[luaCodingInd]}.html`
     })
}
for (let luaScriptInd = 0; luaScriptInd < luaSugScriptAPI.length; luaScriptInd++) {
     const loopScriptAPI = luaSugScriptAPI[luaScriptInd]
     const filterTag = (`<span class="tag-script-api">Lua Script API</span>`).split('Lua Script API')[0]
     loopScriptAPI.innerHTML = `${link_IconDocument}${loopScriptAPI.textContent}${filterTag}`

     loopScriptAPI.addEventListener('click', () => {
          window.location.href = `html/lua-script-api/${pages.lua_script_api[luaScriptInd]}.html`
     })
}

const luaPopCodingDocs = shortCutAll('#popular .lua-coding-docs')
const luaPopScriptAPI  = shortCutAll('#popular .lua-script-api')
const link_IconGraph = '<i class="uil uil-analytics"></i>' 
for (let luaCodingInd = 0; luaCodingInd < luaPopCodingDocs.length; luaCodingInd++) {
     const loopCodingDocs = luaPopCodingDocs[luaCodingInd]
     const filterTag = (`<span class="tag-coding-docs">Lua Coding Docs</span>`).split('Lua Coding Docs')[0]
     loopCodingDocs.innerHTML = `${link_IconGraph}${loopCodingDocs.textContent}${filterTag}`

     loopCodingDocs.addEventListener('click', () => {
          window.location.href = `html/lua-coding-docs/${pages.lua_coding_docs[luaCodingInd]}.html`
     })
}
for (let luaScriptInd = 0; luaScriptInd < luaPopScriptAPI.length; luaScriptInd++) {
     const loopScriptAPI = luaPopScriptAPI[luaScriptInd]
     const filterTag = (`<span class="tag-script-api">Lua Script API</span>`).split('Lua Script API')[0]
     loopScriptAPI.innerHTML = `${link_IconGraph}${loopScriptAPI.textContent}${filterTag}`

     loopScriptAPI.addEventListener('click', () => {
          let filterDict = (loopScriptAPI.textContent.replaceAll(' ', '_').toLowerCase()).toString()
          window.location.href = `html/lua-script-api/${pages.lua_script_api_dict[filterDict]}.html`
     })
}

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