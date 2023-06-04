import pages from '../json/lua-pages.json' assert {type: 'json'};
import { shortCut, shortCutAll } from "./Main.js";

const rand = (num) => { return Math.floor(Math.random() * num) }
const homeSlogans = ['The Unofficial Wiki!', 'The Most Gaming Wiki!', 'The Weirdest Wiki!', 'The Sussiest Wiki!', 'The Pridest Wiki!']
shortCut('#home-hero-about #home-hero-about-slogan').textContent = homeSlogans[rand(5)]

const homeImages = ['Nails.png', 'Yuh_uh.gif', 'Needy.png', 'OMG.png', 'prideMungus.png']
shortCut('#home-hero-media img').setAttribute('src', `./images/stupid_club/${homeImages[rand(5)]}`)

let allWiki = ''
shortCutAll('#home-hero-about button')[0].addEventListener('click', function() {
     let allWikiCreate = (pageJSON, luaWikiPath) => {
          for (let pagesWiki of pageJSON) { 
               allWiki += `html/${luaWikiPath}/${pagesWiki.toString().toLowerCase()}.html, ` 
          }
     }

     allWikiCreate(pages.lua_coding_docs, 'lua-coding-docs')
     allWikiCreate(pages.lua_script_api, 'lua-script-api')
     window.location.href = allWiki.split(', ')[rand(allWiki.split(', ').length - 2)]
})

const githubLink = 'window.location.href = \'https://github.com/Meme1079/PsychWikiSite-Rewrite\''
shortCutAll('#home-hero-about button')[1].setAttribute('onclick', githubLink)