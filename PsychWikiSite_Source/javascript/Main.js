const shortCutAll = (tag) => { return document.querySelectorAll(tag) }
const shortCut = (tag) => { return document.querySelector(tag) }

if (shortCutAll('a').length > 0) { // ! Just to prevent errors lololol
     for (let linkLength = 0; linkLength < shortCutAll('a').length; linkLength++) {
          shortCutAll('a')[0].setAttribute('rel', 'noopener noreferrer')
     }
}

export { shortCutAll, shortCut }