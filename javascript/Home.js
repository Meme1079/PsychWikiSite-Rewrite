import pages from '../json/html-lua-pages.json' assert {type: 'json'};
import { shortCut, shortCutAll } from "./Main.js";

const rand = (num) => { return Math.floor(Math.random() * num) }
const homeSlogans = ['The Unofficial Wiki!', 'The Most Gaming Wiki!', 'The Weirdest Wiki!', 'The Sussiest Wiki!']
shortCut('#home-hero-about #home-hero-about-slogan').textContent = homeSlogans[rand(4)]

const homeImages = ['Nails.png', 'Yuh_uh.gif', 'Needy.png', 'OMG.png']
shortCut('#home-hero-media img').setAttribute('src', `./images/stupid_club/${homeImages[rand(4)]}`)

shortCutAll('#home-hero-about button')[0].addEventListener('click', function () {
     let allWiki = ''
     for (let pageCode of pages['lua-coding-docs']) { 
          allWiki += `${pageCode.toString()}, ` 
     }
     for (let pageScript of pages['lua-script-api']) { 
          allWiki += `${pageScript.toString()}, ` 
     }

     window.location.href = allWiki.split(', ')[rand(allWiki.split(', ').length - 2)]
})

const githubLink = 'window.location.href = \'https://github.com/Meme1079/PsychWikiSite-Rewrite\''
shortCutAll('#home-hero-about button')[1].setAttribute('onclick', githubLink)

/* Search Bar */

const searchInputPath = '#home-main-search-bar input'
shortCut(searchInputPath).addEventListener('keyup', function(event) {
     let filterInputValue = shortCut(searchInputPath).value.toLowerCase().replaceAll(' ', '_')
     if (event.key == 'Enter') {
          const instaLink = (link) => {
               window.location.href = link
               shortCut(searchInputPath).value = ''
          }

          switch (filterInputValue) {
               case 'basics_of_coding': case 'basic_of_coding':
                    instaLink('html/lua-coding-docs/basics_of_coding.html')
                    break;
               case 'library_methods': case 'library_method':
                    instaLink('html/lua-coding-docs/library_methods.html')
                    break;
               default:
                    alert('Invalid Wiki Page or Wrong Spelling')
                    /* shortCut('#home-main-search-bar').style.border    = '1.5px solid red'
                    shortCut('#home-main-search-bar').style.animation = 'error-shake 0.25s linear 1' */
                    break;
          }
     }
})

shortCut('#search-bar-icon-delete').addEventListener('click', function() {
     shortCut(searchInputPath).value = ''
})