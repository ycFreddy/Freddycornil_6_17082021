// Récupration des paramètres Url
class urlParams {
  static returnUrlTag () {
    return new URL(document.location.href).searchParams.get('tag')
  }

  static returnUrlId () {
    return new URL(document.location.href).searchParams.get('id')
  }
}

// formatge datas photographes
class Photographe {
  constructor (data) {
    this._nom = data.name
    this._id = data.id
    this._ville = data.city
    this._pays = data.country
    this._lieu = data.city + ', ' + data.country
    this._tags = data.tags
    this._tagline = data.tagline
    this._prix = data.price
    this._prixFormat = `${data.price} €/jour`
    this._portrait = data.portrait
    this._portraitUrl = `public/images/PhotographersIDPhotos/${data.portrait}`
    this._nombreMedias = data.nombreMedias
    this._medias = data.medias
  }
}

// formatage datas medias
class Media {
  constructor () {
    this.creerMedia = (data, photographe) => {
      let media = []
      media = new MediaUrl(data, photographe)
      media.id = data.id
      media.idPhotographe = data.photographerId
      media.titre = data.title
      media.image = data.image
      media.tags = data.tags
      media.likes = data.likes
      media.date = data.date
      media.prix = data.price
      return media
    }
  }
}

// sélection du type de média
class MediaUrl {
  constructor (data, photographe) {
    if (data.image) {
      this.mediaUrl = `public/images/${photographe.replace(/ /g, '')}/${data.image}`
      this.type = 'img'
    } else {
      this.mediaUrl = `public/images/${photographe.replace(/ /g, '')}/${data.video}`
      this.type = 'video'
    }
  }
}

// Récupère les datas du json
const run = fetch('FishEyeData.json')
run.then(response => { return response.json() }).then(data => {
  const photographes = []
  const media = new Media()
  for (const i of data.photographers) {
    i.medias = []
    i.nombreMedias = 0
    let nombreMedias = 0
    for (const j of data.media) {
      if (i.id === j.photographerId) {
        i.medias.push(media.creerMedia(j, i.name))
        nombreMedias = nombreMedias + parseInt(j.likes)
      }
    }
    i.nombreMedias = nombreMedias
    photographes[i.id] = new Photographe(i)
  }
  RouteAffichePhotographes(photographes, urlParams.returnUrlTag(), urlParams.returnUrlId())
})

// Routage de l'affichage en fonction des paramètres url
const RouteAffichePhotographes = (photographes, tag = '', id = '') => {
  if (id) {
    ProcessAffichePhotographe(photographes[id], id)
    ProcessListeMedias(photographes[id]._medias, 'likes')
    ProcessTriMedias(photographes[id]._medias)
  } else {
    ProcessMenuTags(photographes)
    ProcessListePhotographes(photographes, tag)
  }
}

// Affiche de le menu de tags uniques
const ProcessMenuTags = (data) => {
  const parent = document.getElementById('menu')
  const element = document.createElement('ul')
  element.id = 'tagMenu'
  element.className = 'tagMenu'
  parent.appendChild(element)
  let tabtags = []
  data.forEach(obj => { if (obj._tags) tabtags = tabtags.concat(obj._tags) })
  const menutags = [...new Set(tabtags)]
  for (const i of menutags) {
    const li = document.createElement('li')
    li.id = 'tagli'
    li.className = 'tagli'
    li.innerHTML = `<a href=?tag=${i} class="taglien">#${i}</a>`
    element.appendChild(li)
  }
}

// Photographes corrospondant au Tag sélectionné
const isPhotographeTag = (obj, tag) => {
  for (const i of obj) { if (i === tag) return true }
}

// Affiche la liste des photographes en fonction du tag sélectionné
const ProcessListePhotographes = (photographes, tag) => {
  photographes.forEach(obj => {
    if (tag) { if (isPhotographeTag(obj._tags, tag) === true) creerPhotographe(obj) } else { creerPhotographe(obj) }
  })
}

// Affiche la liste des medias d'un photographe
const ProcessListeMedias = (medias, tri = '') => {
  removeElements(document.querySelectorAll('.mediasVignette'))
  const triParMap = (map, compareFn) => (a, b) => compareFn(map(a), map(b))
  const parValeur = (a, b) => a - b
  if (tri === 'likes') {
    const triVersLikes = e => e.likes
    const parLikes = triParMap(triVersLikes, parValeur)
    medias.sort(parLikes).reverse().forEach((obj, key) => { creerVignetteMedia(obj, medias, key) })
  } else if (tri === 'date') {
    const triVersDate = e => new Date(e.date).getTime()
    const parDate = triParMap(triVersDate, parValeur)
    medias.sort(parDate).forEach((obj, key) => { creerVignetteMedia(obj, medias, key) })
  } else {
    const parTexte = (a, b) => {
      if (a.titre < b.titre) return -1
      if (a.titre > b.titre) return 1
      return 0
    }
    medias.sort(parTexte).forEach((obj, key) => { creerVignetteMedia(obj, medias, key) })
  }
}

// Affiche la sélection par tri
const ProcessTriMedias = (photographe) => {
  const parent = document.getElementById('tri')
  const triConteneur = insertElement(parent, 'div', 'trimedias', 'trimedias')
  const texttri = insertElement(triConteneur, 'p', 'textetri', 'textetri')
  texttri.innerHTML = 'Trier par'
  const selectTri = insertElement(parent, 'select', 'selectTri', 'selectTri')
  selectTri.addEventListener('change', (e) => { ProcessListeMedias(photographe, e.target.value) })
  const selectOpt0 = insertElement(selectTri, 'option', 'sellikes', 'selectopt')
  selectOpt0.value = 'likes'
  selectOpt0.innerHTML = 'Popularité'
  const selectOpt1 = insertElement(selectTri, 'option', 'seldate', 'selectopt')
  selectOpt1.value = 'date'
  selectOpt1.innerHTML = 'Date'
  const selectOpt2 = insertElement(selectTri, 'option', 'seltitre', 'selectopt')
  selectOpt2.value = 'titre'
  selectOpt2.innerHTML = 'Titre'
}

// Description d'un photographe sur sa page
const ProcessAffichePhotographe = (photographe) => {
  document.getElementById('titre').style.display = 'none'
  document.getElementById('photographe').style.display = 'flex'
  const parent = document.getElementById('photographe')
  const element = insertElement(parent, 'div', 'personnageVignette', 'photographeVignette')
  insertElement(element, 'h1', 'namephotographe', 'namephotographe', photographe._nom)
  insertElement(element, 'p', 'cityphotographe', 'cityphotographe', photographe._lieu)
  insertElement(element, 'p', 'taglinephotographe', 'taglinephotographe', photographe._tagline)
  insertElement(element, 'ul', 'tagsphotographe', 'tagsphotographe', photographe._tags)
  const contactbox = insertElement(parent, 'div', 'contactbox', 'contactbox')
  const contact = insertElement(contactbox, 'a', 'contact', 'contact')
  contact.innerHTML = 'contactez-moi'
  contact.addEventListener('click', () => { modalecontact(photographe._nom) })
  const lien = insertElement(parent, 'a', 'lienPersonnage', 'lienPersonnage')
  lien.href = `?id=${photographe._id}`
  insertElement(lien, 'img', 'portraitphotographe', 'portraitphotographe', photographe._portraitUrl)
  const likesbox = insertElement(parent, 'div', 'likesbox', 'likesbox')
  insertElement(likesbox, 'p', 'likesB', 'likesB', photographe._nombreMedias)
  insertElement(likesbox, 'p', 'faB', 'faB', ' <i class="fas fa-heart"></i>')
  insertElement(likesbox, 'p', 'priceB', 'priceB', photographe._prixFormat)
}

// Description d'un photographe sur la page d'accueil
const creerPhotographe = (photographe) => {
  const parent = document.getElementById('listePhotographes')
  const element = insertElement(parent, 'div', 'personnageVignette', 'personnageVignette')
  const lien = insertElement(element, 'a', 'lienPersonnage', 'lienPersonnage')
  lien.href = `?id=${photographe._id}`
  insertElement(lien, 'img', 'portrait', 'portrait', photographe._portraitUrl)
  insertElement(lien, 'h2', 'name', 'name', photographe._nom)
  insertElement(element, 'p', 'city', 'city', photographe._lieu)
  insertElement(element, 'p', 'tagline', 'tagline', photographe._tagline)
  insertElement(element, 'p', 'price', 'price', photographe._prixFormat)
  insertElement(element, 'ul', 'tags', 'tags', photographe._tags)
}

// Affiche la vignette d'un média d'un photographe sur sa page
const creerVignetteMedia = (media, medias, key = '') => {
  const parent = document.getElementById('mediasphotographe')
  const element = insertElement(parent, 'div', 'mediasVignette', 'mediasVignette')
  const title = insertElement(element, 'div', 'titremedia', 'titremedia')
  const mediaLink = insertElement(title, media.type, 'media', 'media', media.mediaUrl)
  mediaLink.addEventListener('click', () => { openCarousel(medias, key + 1) })
  insertElement(title, 'p', '', 'nommedia', media.titre)
  insertElement(title, 'p', `likes${media.id}`, 'likes', media.likes)
  const faL = insertElement(title, 'p', '', 'faL', ' <i class="fas fa-heart"></i>')
  faL.addEventListener('click', () => { incrementelikes(media, media.id) })
}

// formate l'affiche des champs
const insertElement = (parent, type, nomId, nomClass, value = '') => {
  const element = document.createElement(type)
  element.id = nomId
  element.className = nomClass
  if ((type === 'img') || (type === 'video')) { element.src = value } else if (type === 'ul') {
    for (const i of value) {
      const li = document.createElement('li')
      li.id = 'tagli'
      li.className = 'tagli'
      li.innerHTML = `<a href=?tag=${i} class=taglien>#${i}</a>`
      element.appendChild(li)
    }
  } else { element.innerHTML = value }
  if (type === 'video') { element.autoplay = true; element.loop = 'true' }
  parent.appendChild(element)
  return element
}

const removeElements = (elms) => elms.forEach(el => el.remove())

const incrementelikes = (media, mediaId) => {
  let nbLikes = parseInt(document.getElementById(`likes${mediaId}`).innerHTML)
  let nbMedias = parseInt(document.getElementById('likesB').innerHTML)
  nbLikes += 1
  nbMedias += 1
  media.likes += 1
  document.getElementById(`likes${mediaId}`).innerHTML = nbLikes
  document.getElementById('likesB').innerHTML = nbMedias
}
