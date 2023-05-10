import { shortCut } from "./Main.js";

let hideBar = true
const [sideBarShow, sideBarHide] = ['0.28cm', '-1.8cm']
shortCut('#topbar-list-min button').addEventListener('click', function() {
     if (hideBar == true) {
          shortCut('#topbar-list-min ul').style.right = sideBarShow
          hideBar = false
     } else {
          shortCut('#topbar-list-min ul').style.right = sideBarHide
          hideBar = true
     }

     function hideWhenSizing(match) {
          if (match.matches) {
               shortCut('#topbar-list-min ul').style.display = 'block'
               shortCut('#topbar-list-min ul').style.right   = sideBarHide
          } else {
               shortCut('#topbar-list-min ul').style.display = 'none'
               hideBar = true
          }          
     }
     
     var windowMatchMedia = window.matchMedia("(max-width: 950px)")
     windowMatchMedia.addEventListener('change', hideWhenSizing)
})

window.addEventListener('scroll', function() {
     shortCut('#topbar-list-min ul').style.right = sideBarHide
     hideBar = true
})