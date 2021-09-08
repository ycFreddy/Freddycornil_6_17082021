const openCaroussel = (medias, pos) => {
  document.querySelector('.text-scroll').style.display = 'none'
  const parent = document.getElementById('body')
  const modale = insertElement(parent, 'div', 'carousselbox', 'carousselbox')
  modale.style.display = 'flex'
  const modaleContent = insertElement(modale, 'div', 'carousselcontent', 'carousselcontent')
  const left = insertElement(modaleContent, 'div', 'left', 'left')
  const back = insertElement(left, 'a', 'back', 'back')
  back.innerHTML = '<'
  back.addEventListener('click', () => { controls(-1) })
  const center = insertElement(modaleContent, 'div', 'center', 'center')
  const right = insertElement(modaleContent, 'div', 'right', 'right')
  const carousselclose = insertElement(right, 'span', 'carousselclose', 'carousselclose')
  carousselclose.addEventListener('click', () => { closeModale(modale) }, false)
  const forward = insertElement(right, 'a', 'forward', 'forward')
  forward.innerHTML = '>'
  forward.addEventListener('click', () => { controls(1) })
  const centerContent = insertElement(center, 'div', 'centerContent', 'centerContent')
  ProcessListCaroussel(centerContent, medias, tri = 'likes')
  navCaroussel(parseInt(pos))
}

// Affiche Carouselle
const ProcessListCaroussel = (parent, medias, tri = '') => {
  document.getElementById('centerContent').innerHTML = ''
  const triParMap = (map, compareFn) => (a, b) => compareFn(map(a), map(b))
  const parValeur = (a, b) => a - b
  const triVersLikes = e => e.likes
  const parLikes = triParMap(triVersLikes, parValeur)
  medias.sort(parLikes).reverse().forEach(obj => { creerVignetteCaroussel(parent, obj) })
}

// Affiche les vignettes d'un caroussel
const creerVignetteCaroussel = (parent, media) => {
  const element = insertElement(parent, 'div', 'carousselVignette', 'carousselVignette')
  const title = insertElement(element, 'div', 'vignetteContent', 'vignetteContent')
  const mediaLink = insertElement(title, media.type, media.id, 'carousselMedia', media.mediaUrl)
  insertElement(title, 'p', 'nommediaC', 'nommediaC', media.titre)
}

// forward/Back controls
function controls (n) {
  navCaroussel(position += n)
}

function navCaroussel (n) {
  const vignettes = document.getElementsByClassName('carousselVignette')
  if (n > vignettes.length) { n = 1 }
  if (n < 1) { n = vignettes.length }
  for (const i of vignettes) { i.style.display = 'none' }
  vignettes[n - 1].style.display = 'block'
  position = n
}
