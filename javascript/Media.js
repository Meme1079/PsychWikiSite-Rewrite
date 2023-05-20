import { shortCut } from "./Main.js";

let windowMatchMediaMax = window.matchMedia("(max-width: 950px)")
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
     
     windowMatchMediaMax.addEventListener('change', hideWhenSizing)
})

window.addEventListener('scroll', function() {
     shortCut('#topbar-list-min ul').style.right = sideBarHide
     hideBar = true
})

/* TopBar */

let windowMatchMediaMin = window.matchMedia("(min-width: 860px)")
function hideWhenScrolling(switchy) {
     if (switchy === true) {
          if (window.scrollY >= 84.5) {
               shortCut('#global-topbar').style.position = 'fixed'
               shortCut('#global-topbar').style.top      = '-15px'
          } else {
               shortCut('#global-topbar').style.position = 'relative'
               shortCut('#global-topbar').style.bottom   = '15px'
          }     
     } else {
          if (window.scrollY >= 0) {
               shortCut('#global-topbar').style.position = 'relative'
               shortCut('#global-topbar').style.bottom   = '15px'
          }
     }
}

function changeTopBarProperty(switchy) {
     if (! switchy.matches) {
          hideWhenScrolling(true)
          window.addEventListener('scroll', function() { hideWhenScrolling(true) })
     } else {
          hideWhenScrolling(false)
          window.addEventListener('scroll', function() { hideWhenScrolling(false) })
     }
}

changeTopBarProperty(windowMatchMediaMin)
windowMatchMediaMin.addEventListener('change', changeTopBarProperty)