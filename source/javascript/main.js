const shortCutAll = (tag) => { return document.querySelectorAll(tag) }
const shortCut = (tag) => { return document.querySelector(tag) }

window.onload = () => { shortCut('body').style.display = 'block' } //! Don't delete this

for (let linkLength = 0; linkLength < shortCutAll('a').length; linkLength++) {
     shortCutAll('a')[linkLength].setAttribute('rel', 'noopener noreferrer')
}
for (let linkLength = 0; linkLength < shortCutAll('main a').length; linkLength++) {
     shortCutAll('main a')[linkLength].setAttribute('target', '_blank')
}
for (let iconLength = 0; iconLength < shortCutAll('i').length; iconLength++) {
     shortCutAll('i')[iconLength].setAttribute('aria-hidden', 'true')
}

export { shortCutAll, shortCut }