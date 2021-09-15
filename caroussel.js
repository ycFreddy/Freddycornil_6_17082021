const openCarousel = (medias, pos) => {
  document.querySelector('.text-scroll').style.display = 'none'
  const parent = document.getElementById('body')
  const modale = insertElement(parent, 'div', 'carouselbox', 'carouselbox')
  modale.style.display = 'flex'
  const carouselContent = insertElement(modale, 'div', 'carouselcontent', 'carouselcontent')
  const left = insertElement(carouselContent, 'div', 'left', 'left')
  const back = insertElement(left, 'a', 'back', 'back')
  back.innerHTML = '<'
  back.tabIndex = 1
  back.addEventListener('click', () => { controls(-1) })
  back.addEventListener('keypress', () => { controls(-1) })
  const center = insertElement(carouselContent, 'div', 'center', 'center')
  const right = insertElement(carouselContent, 'div', 'right', 'right')
  const carouselclose = insertElement(right, 'span', 'carouselclose', 'carouselclose')
  carouselclose.addEventListener('click', () => { closeCarousel(modale) })
  carouselclose.addEventListener('keypress', () => { closeCarousel(modale) })
  carouselclose.tabIndex = 1
  const forward = insertElement(right, 'a', 'forward', 'forward')
  forward.innerHTML = '>'
  forward.tabIndex = 1
  forward.focus()
  forward.addEventListener('click', () => { controls(1) })
  forward.addEventListener('keypress', () => { controls(1) })
  forward.addEventListener('focusout', () => { document.getElementById('back').focus() })
  const centerContent = insertElement(center, 'div', 'centerContent', 'centerContent')
  ProcessListCarousel(centerContent, medias)
  navCarousel(parseInt(pos))
}

// Affiche Carouselle
const ProcessListCarousel = (parent, medias) => {
  medias.forEach(obj => { creerVignetteCarousel(parent, obj) })
}

// Affiche les vignettes d'un caroussel
const creerVignetteCarousel = (parent, media) => {
  const element = insertElement(parent, 'div', 'carousselVignette', 'carousselVignette')
  const title = insertElement(element, 'div', 'vignetteContent', 'vignetteContent')
  insertElement(title, media.type, media.id, 'carousselMedia', media.mediaUrl)
  insertElement(title, 'p', 'nommediaC', 'nommediaC', media.titre)
}

// forward/Back controls
function controls (n) {
  navCarousel(position += n)
}

function navCarousel (n) {
  const vignettes = document.getElementsByClassName('carousselVignette')
  if (n > vignettes.length) { n = 1 }
  if (n < 1) { n = vignettes.length }
  for (const i of vignettes) { i.style.display = 'none' }
  vignettes[n - 1].style.display = 'block'
  position = n
}

// Ferme la modale
const closeCarousel = (modale) => {
  removeElements(document.querySelectorAll('.carousselVignette'))
  modale.style.display = 'none'
  indexFocus()
}
