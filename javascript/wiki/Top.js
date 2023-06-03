import { shortCut } from "../Main.js";

const miniBarPath = '#global-topbar-list #list-min'
let showMiniBar = false
shortCut(`${miniBarPath} #topbar-list-menu`).addEventListener('click', () => {
     if (showMiniBar == false) {
          shortCut(`${miniBarPath} ul`).style.right = '0.29cm'
          showMiniBar = true
     } else {
          shortCut(`${miniBarPath} ul`).style.right = '-1.5cm'
          showMiniBar = false
     }
})

window.matchMedia("(max-width: 1050px)").addEventListener('change', (match) => {
     if (!match.matches) {
          shortCut(`${miniBarPath} ul`).style.right = '-1.5cm'
          showMiniBar = false
     }
})