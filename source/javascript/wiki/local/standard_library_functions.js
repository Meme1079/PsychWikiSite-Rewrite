import { shortCutAll } from "../../main.js";
import { implementSectionVisibility } from "../wiki_main.js";
import { rand } from "../search.js";

// Section Visibility
implementSectionVisibility('specifiers')
implementSectionVisibility('flags')
implementSectionVisibility('width')
implementSectionVisibility('precision')

// Silly
const getMonth = new Date().getMonth()
const getDate  = new Date().getDate()
const getYear  = new Date().getFullYear()

shortCutAll('*[data-detail-output]')[0].innerHTML = `${getMonth}/${getDate}/${getYear}`
shortCutAll('*[data-detail-output]')[1].innerHTML = `${rand(9)} ${rand(9)} ${rand(9)}`