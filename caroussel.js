const openCarousel = (medias, pos) => {
  document.querySelector('.text-scroll').style.display = 'none'
  const parent = document.getElementById('body')
  const modale = insertElement(parent, 'div', 'carouselbox', 'carouselbox')
  modale.style.display = 'flex'
  const modaleContent = insertElement(modale, 'div', 'carouselcontent', 'carouselcontent')
  const left = insertElement(modaleContent, 'div', 'left', 'left')
  const back = insertElement(left, 'a', 'back', 'back')
  back.innerHTML = '<'
  back.addEventListener('click', () => { controls(-1) })
  const center = insertElement(modaleContent, 'div', 'center', 'center')
  const right = insertElement(modaleContent, 'div', 'right', 'right')
  const carouselclose = insertElement(right, 'span', 'carouselclose', 'carouselclose')
  carouselclose.addEventListener('click', () => { closeModale(modale) }, false)
  const forward = insertElement(right, 'a', 'forward', 'forward')
  forward.innerHTML = '>'
  forward.addEventListener('click', () => { controls(1) })
  const centerContent = insertElement(center, 'div', 'centerContent', 'centerContent')
  ProcessListCarousel(centerContent, medias, tri = 'likes')
  navCarousel(parseInt(pos))
}

// Affiche Carouselle
const ProcessListCarousel = (parent, medias, tri = '') => {
  document.getElementById('centerContent').innerHTML = ''
  const triParMap = (map, compareFn) => (a, b) => compareFn(map(a), map(b))
  const parValeur = (a, b) => a - b
  const triVersLikes = e => e.likes
  const parLikes = triParMap(triVersLikes, parValeur)
  medias.sort(parLikes).reverse().forEach(obj => { creerVignetteCarousel(parent, obj) })
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
