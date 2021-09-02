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
    this._prixFormat = data.price + '€/jour'
    this._portrait = data.portrait
    this._portraitUrl = `public/images/PhotographersIDPhotos/${data.portrait}`
    this._medias = data.medias
  }
}

// formatage datas medias
class Factory {
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
fetch('FishEyeData.json')
  .then((response) => {
    return response.json()
  })
  .then((data) => {
    const photographes = []
    const factory = new Factory()
    for (const i of data.photographers) {
      i.medias = []
      for (const j of data.media) {
        if (i.id === j.photographerId) {
          i.medias.push(factory.creerMedia(j, i.name))
        }
      };
      photographes[i.id] = new Photographe(i)
    };
    affichePhotographes(photographes, urlParams.returnUrlTag(), urlParams.returnUrlId())
  })

// Routage de l'affichage en fonction des paramètres url
const affichePhotographes = (photographes, tag = '', id = '') => {
  if (id) {
    affichePhotographe(photographes[id], id)
    listemedias(photographes[id]._medias, 'likes')
    triMedias(photographes[id]._medias)
  } else {
    menuTags(photographes)
    listePhotographes(photographes, tag)
  }
}

// Affiche de le menu de tags uniques
const menuTags = (data) => {
  const parent = document.getElementById('menu')
  const element = document.createElement('ul')
  element.id = 'tagMenu'
  element.className = 'tagMenu'
  parent.appendChild(element)
  let tabtags = []
  data.forEach(obj => {
    if (obj._tags) {
      tabtags = tabtags.concat(obj._tags)
    };
  })
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
const listePhotographes = (photographes, tag) => {
  photographes.forEach(obj => {
    if (tag) { if (isPhotographeTag(obj._tags, tag) === true) creerPhotographe(obj) } else { creerPhotographe(obj) }
  })
}

// Affiche la sélection par tri
const triMedias = (photographe) => {
  const parent = document.getElementById('tri')
  const triConteneur = creerConteneur('div', 'trimedias', 'trimedias')
  parent.appendChild(triConteneur)
  const texttri = creerConteneur('p', 'textetri', 'textetri')
  triConteneur.appendChild(texttri)
  texttri.innerHTML = 'Trier par'
  const selectTri = creerConteneur('select', 'selectTri', 'selectTri')
  parent.appendChild(selectTri)
  selectTri.addEventListener('change', (event) => {
    event.stopPropagation()
    listemedias(photographe, event.target.value)
  })
  const selectOpt0 = creerConteneur('option', 'sellikes', 'selectopt')
  selectOpt0.value = 'likes'
  selectOpt0.innerHTML = 'Popularité'
  selectTri.appendChild(selectOpt0)
  const selectOpt1 = creerConteneur('option', 'seldate', 'selectopt')
  selectOpt1.value = 'date'
  selectOpt1.innerHTML = 'Date'
  selectTri.appendChild(selectOpt1)
  const selectOpt2 = creerConteneur('option', 'seltitre', 'selectopt')
  selectOpt2.value = 'titre'
  selectOpt2.innerHTML = 'Titre'
  selectTri.appendChild(selectOpt2)
}

// Affiche la liste des medias d'un photographe
const listemedias = (medias, tri = '') => {
  document.getElementById('mediasphotographe').innerHTML = ''
  const triParMap = (map, compareFn) => (a, b) => compareFn(map(a), map(b))
  const parValeur = (a, b) => a - b
  if (tri === 'likes') {
    const triVersLikes = e => e.likes
    const parLikes = triParMap(triVersLikes, parValeur)
    medias.sort(parLikes).reverse().forEach(obj => { creerVignetteMedia(obj) })
  } else if (tri === 'date') {
    const triVersDate = e => new Date(e.date).getTime()
    const parDate = triParMap(triVersDate, parValeur)
    medias.sort(parDate).forEach(obj => { creerVignetteMedia(obj) })
  } else {
    const parTexte = (a, b) => {
      if (a.titre < b.titre) return -1
      if (a.titre > b.titre) return 1
      return 0
    }
    medias.sort(parTexte).forEach(obj => { creerVignetteMedia(obj) })
  }
}

// Description d'un photographe sur sa page
const affichePhotographe = (photographe) => {
  document.getElementById('titre').style.display = 'none'
  document.getElementById('photographe').style.display = 'flex'
  const parent = document.getElementById('photographe')
  const element = creerConteneur('div', 'personnageVignette', 'photographeVignette')
  parent.appendChild(element)
  insertElement(element, 'h1', 'namephotographe', photographe._nom)
  insertElement(element, 'p', 'cityphotographe', photographe._lieu)
  insertElement(element, 'p', 'taglinephotographe', photographe._tagline)
  insertElement(element, 'ul', 'tagsphotographe', photographe._tags)
  const contactbox = creerConteneur('div', 'contactbox', 'contactbox')
  parent.appendChild(contactbox)
  const contact = creerConteneur('a', 'contact', 'contact')
  contact.innerHTML = 'contactez-moi'
  contact.addEventListener('click', () => { modalecontact(photographe._nom) })
  contactbox.appendChild(contact)
  const lien = creerConteneur('a', 'lienPersonnage', 'lienPersonnage')
  lien.href = `?id=${photographe._id}`
  parent.appendChild(lien)
  insertElement(lien, 'img', 'portraitphotographe', photographe._portraitUrl)
}

// Description d'un photographe sur la page d'accueil
const creerPhotographe = (photographe) => {
  const parent = document.getElementById('listePhotographes')
  const element = creerConteneur('div', 'personnageVignette', 'personnageVignette')
  parent.appendChild(element)
  const lien = creerConteneur('a', 'lienPersonnage', 'lienPersonnage')
  lien.href = `?id=${photographe._id}`
  element.appendChild(lien)
  insertElement(lien, 'img', 'portrait', photographe._portraitUrl)
  insertElement(lien, 'h2', 'name', photographe._nom)
  insertElement(element, 'p', 'city', photographe._lieu)
  insertElement(element, 'p', 'tagline', photographe._tagline)
  insertElement(element, 'p', 'price', photographe._prixFormat)
  insertElement(element, 'ul', 'tags', photographe._tags)
}

// Affiche la vignette d'un média d'un photographe sur sa page
const creerVignetteMedia = (media) => {
  const parent = document.getElementById('mediasphotographe')
  const element = creerConteneur('div', 'mediasVignette', 'mediasVignette')
  parent.appendChild(element)
  const title = creerConteneur('div', 'titremedia', 'titremedia')
  element.appendChild(title)
  insertElement(title, media.type, 'media', media.mediaUrl)
  insertElement(title, 'p', 'nommedia', media.titre)
  insertElement(title, 'p', 'likes', `${media.likes}<i class="fas fa-heart"></i>`)
}

// Créer un node/conteneur
const creerConteneur = (type, nomId, nomClass) => {
  const element = document.createElement(type)
  element.id = nomId
  element.className = nomClass
  return element
}

// formate l'affiche des champs d'un photographe
const insertElement = (parent, type, key, value) => {
  const element = creerConteneur(type, key, key)
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
}
