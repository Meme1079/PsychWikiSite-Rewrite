import { shortCut, shortCutAll } from "../Main.js";

let listButtonDrop  = true
const getListButton = shortCutAll('#global-topbar #list-sublist button')[0]
getListButton.addEventListener('click', () => {
     if (listButtonDrop == true) {
          shortCut('#menubar-list-invisibleBG').style.display = 'block'
          shortCut('#global-menubar').style.top = '50px'
          listButtonDrop = false
     } else {
          shortCut('#menubar-list-invisibleBG').style.display = 'none'
          shortCut('#global-menubar').style.top = '-7cm'
          listButtonDrop = true
     }
})

shortCut('#global-menubar #menubar-list-invisibleBG').addEventListener('click', () => {
     shortCut('#menubar-list-invisibleBG').style.display = 'none'
     shortCut('#global-menubar').style.top = '-7cm'
     listButtonDrop = true
})

let selfDestruct  = [false, false, false]
const getMenuInput = document.querySelector('input[name=randomcodekey]')
const getMenuInputMaxCode = `if (this.value > 5) this.value = this.value.slice(0, this.maxLength);`
getMenuInput.setAttribute('oninput', getMenuInputMaxCode)
getMenuInput.addEventListener('keyup', (event) => {
     if (event.key == 'Enter') {
          if (getMenuInput.value == 3711 && selfDestruct[0] == false) {
               for (let i in shortCutAll('hr')) {
                    try { shortCutAll('hr')[i].setAttribute('data-enable-rgb-hr', '') } catch {}
               }
               for (let i in shortCutAll('ol li')) {
                    try { shortCutAll('ol li')[i].setAttribute('data-enable-rgb-orgli', '') } catch {}
               }
               for (let i in shortCutAll('*')) {
                    if (i == 'entries') break;
                    shortCutAll('*')[i].setAttribute('data-enable-rgb-border', '')
               }
               
               selfDestruct[0] = true
               return undefined;
          }

          if (getMenuInput.value == 2011 && selfDestruct[1] == false) {
               const getTopLogoPara  = shortCut('#global-topbar #topbar-logo p')
               const specialLogoPara = '<special-bg><special-main>Trolled</special-main></special-bg>'
               
               if (selfDestruct[2] == true) {
                    getTopLogoPara.innerHTML = `<marquee>Tails Gets ${specialLogoPara}</marquee>`
               } else {
                    getTopLogoPara.innerHTML = 'Tails Gets ' + specialLogoPara
               }
               
               selfDestruct[1] = true
               return undefined;
          }

          if (getMenuInput.value == 6729 && selfDestruct[2] == false) {
               const getTopLogoPara  = shortCut('#global-topbar #topbar-logo p')
               getTopLogoPara.innerHTML = `<marquee>${getTopLogoPara.innerHTML}</marquee>`

               selfDestruct[2] = true
               return undefined;
          }

          function selfDestructMessage(codeNum, isDestroyID) {
               if (getMenuInput.value == codeNum && selfDestruct[isDestroyID] != false) {
                    alert('Code Self Destructed!')
               }
               return 'hello';
          }

          selfDestructMessage(3711, 0)
          selfDestructMessage(2011, 1)
          selfDestructMessage(6729, 2)
     }
})