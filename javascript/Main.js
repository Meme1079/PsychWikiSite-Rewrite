const shortCutAll = (tag) => { return document.querySelectorAll(tag) }
const shortCut = (tag) => { return document.querySelector(tag) }

for (let linkLength = 0; linkLength < shortCutAll('a').length; linkLength++) {
     shortCutAll('a')[linkLength].setAttribute('rel', 'noopener noreferrer')
}

export { shortCutAll, shortCut }