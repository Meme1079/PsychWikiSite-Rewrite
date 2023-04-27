import pages from '../json/html-lua-pages.json' assert {type: 'json'};
import { shortCut, shortCutAll } from "./Main.js";

const rand = (num) => { return Math.floor(Math.random() * num) }
const gamingSlogans = ['The Unofficial Wiki!', 'The Most Gaming Wiki!', 'The Weirdest Wiki!', 'The Sussiest Wiki!']
shortCut('#gaming-slogan').textContent = gamingSlogans[rand(4)]

const pathImages = '/images/stupid_club/'
const gamingImages = [pathImages + 'Nails.png', pathImages + 'Yuh_uh.gif', pathImages + 'Needy.png', pathImages + 'OMG.png']
shortCut('#gaming-image').setAttribute('src', gamingImages[rand(4)])

shortCut('#game-random').addEventListener('click', function () {
     let allWiki = ''
     for (let pageCode of pages['lua-coding-docs']) { 
          allWiki += `${pageCode.toString()}, ` 
     }
     for (let pageScript of pages['lua-script-api']) { 
          allWiki += `${pageScript.toString()}, ` 
     }

     window.location.href = allWiki.split(', ')[rand(allWiki.split(', ').length - 2)]
})