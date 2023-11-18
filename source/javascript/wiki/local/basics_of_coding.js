const codeLine = (line) => { return `<span class="code-line">&gt; main.lua L-${line}:</span> ` }
switch (new Date().getDay()) {
     case 5:
          shortCutAll('*[data-detail-output]')[0].removeAttribute('disabled')
          shortCutAll('*[data-detail-output]')[1].innerHTML = codeLine(4) + 'Day: Friday'
          break;
     default:
          try {
               shortCutAll('*[data-detail-output]')[0].setAttribute('disabled', '')
               shortCutAll('*[data-detail-output]')[1].innerHTML = codeLine(6) + 'Not Friday'
          } catch (error) {}
          break;
}

switch (new Date().getDay()) {
     case 6:  shortCutAll('*[data-detail-output]')[2].innerHTML = codeLine(4) + 'Day: Saturday'
          break;
     case 0:  shortCutAll('*[data-detail-output]')[2].innerHTML = codeLine(6) + 'Day: Sunday'
          break;
     default: shortCutAll('*[data-detail-output]')[2].innerHTML = codeLine(8) + 'Day: Weekdays'
          break;
}