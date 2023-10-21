const shortCutAll = (tag) => { return document.querySelectorAll(tag) }
const shortCut = (tag) => { return document.querySelector(tag) }

window.onload = () => { shortCut('body').style.display = 'block' } //! Don't delete this
window.addEventListener('keydown', (event) => {
     if (event.key == '1') window.scrollTo(0, 0);
     if (event.key == '2') window.scrollTo(0, Number.MAX_SAFE_INTEGER);
})

for (let linkLength = 0; linkLength < shortCutAll('a').length; linkLength++) {
     shortCutAll('a')[linkLength].setAttribute('rel', 'noopener noreferrer')
}

const ancorNotDisable = shortCutAll('main #wiki-header #wiki-main a:not([data-blank-disabled])')
for (let linkLength = 0; linkLength < ancorNotDisable.length; linkLength++) {
     shortCutAll('main a')[linkLength].setAttribute('target', '_blank')
}
for (let iconLength = 0; iconLength < shortCutAll('i').length; iconLength++) {
     shortCutAll('i')[iconLength].setAttribute('aria-hidden', 'true')
}

export { shortCutAll, shortCut }