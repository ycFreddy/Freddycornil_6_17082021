// Récupration des paramètres Url
class urlParams{ 
  static returnUrlTag() {
    return new URL(document.location.href).searchParams.get("tag");
  }    
  static returnUrlId() {
    return new URL(document.location.href).searchParams.get("id");
  }
}

class photographe {
  constructor(data) {
    this._nom = data.name;
    this._id = data.id;
    this._ville = data.city;
    this._pays = data.country;
    this._lieu = data.city + ", " + data.country;
    this._tags = data.tags;
    this._tagline = data.tagline;
    this._prix = data.price;
    this._prixFormat = data.price + "€/jour";
    this._portrait = data.portrait;
    this._portraitUrl = "public/images/PhotographersIDPhotos/" + data.portrait;
    this._medias = data.medias;
  }
}

// formatage des datas json
const Factory = function () {
  this.creerMedia = function (data, photographe) {
    let media = [];        
    media = new mediaUrl(data, photographe);
    media.id = data.id;
    media.idPhotographe = data.photographerId;
    media.titre = data.title;
    media.image = data.image;
    media.tags = data.tags;
    media.likes = data.likes;
    media.date = data.date;
    media.prix = data.price;
    return media;
  }
}

// sélection du type de média
let mediaUrl = function (data, photographe) {
  if (data.image) {
    this.mediaUrl = "public/images/" + photographe.replace(/ /g, '') + "/" + data.image;
    this.type = "img";
  }
  else {
    this.mediaUrl = "public/images/" + photographe.replace(/ /g, '') + "/" + data.video;
    this.type = "video";
  }
};

// Récupère les datas du json
fetch('FishEyeData.json')
  .then(function (response) {
  return response.json();
  })
  .then(function (data) {
    let photographes = [];    
    let factory = new Factory();
    for (let i=0; i<data.photographers.length; i++) {        
      data.photographers[i].medias = [];
      for (let j=0; j<data.media.length; j++) {  
        if (data.photographers[i].id === data.media[j].photographerId) {
          data.photographers[i].medias.push(factory.creerMedia(data.media[j], data.photographers[i].name));
        }          
      };
      photographes[data.photographers[i].id] = new photographe(data.photographers[i]);      
    };
    affichePhotographes(photographes, urlParams.returnUrlTag(),urlParams.returnUrlId());
})

// Routage de l'affichage en fonction des paramètres url
function affichePhotographes(photographes, tag="", id="") {
  if (id) {
    affichePhotographe(photographes[id], id)
    listemedias(photographes[id]._medias);
  }
  else {
    menuTags(photographes);
    listePhotographes(photographes,tag);
  }
}

// Affiche de le menu de tags uniques
function menuTags(data) {
  let parent = document.getElementById("menu");
  let element = document.createElement('ul');
  element.id = "tagMenu";
  element.className = "tagMenu";
  parent.appendChild(element);
  let tabtags = [];
  data.forEach(obj => {    
    if (obj._tags) {
      tabtags = tabtags.concat(obj._tags); 
    };
  });
  let menutags = [...new Set(tabtags)];    
  for (let i=0; i<menutags.length; i++) {
      let li = document.createElement("li");
      li.id = "tagli";
      li.className = "tagli";
      li.innerHTML = "<a href='?tag=" + menutags[i] + "' class='taglien'>#" + menutags[i] + "</a>";
      element.appendChild(li);
  }
}

// Photographes corrospondant au Tag sélectionné
function isPhotographeTag(obj, tag) {
  for (let i=0; i<obj.length; i++) {
    if (obj[i] === tag) return true;
  }
}

// Affiche la liste des photographes en fonction du tag sélectionné
function listePhotographes(photographes,tag) {  
  photographes.forEach(obj => {    
  if (tag) {if (isPhotographeTag(obj._tags, tag) === true) creerPhotographe(obj);}
  else {creerPhotographe(obj);}
  });
}

// Affiche la liste des medias d'un photographe
function listemedias(medias) { 
  medias.forEach(obj => {        
    creerVignetteMedia(obj);
  });
}

// Description d'un photographe sur sa page
function affichePhotographe(photographe) {
  document.getElementById("titre").style.display = "none";
  document.getElementById("photographe").style.display = "flex"; 
  let parent = document.getElementById("photographe");
  let element = creerConteneur("div", "personnageVignette", "photographeVignette");
  parent.appendChild(element);
  insertElement (element, "h1", "namephotographe", photographe._nom);
  insertElement (element, "p", "cityphotographe", photographe._lieu);
  insertElement (element, "p", "taglinephotographe", photographe._tagline);  
  insertElement (element, "ul", "tagsphotographe", photographe._tags);  
  insertElement (parent, "p", "contact", "Contactez-moi");  
  let lien = creerConteneur("a", "lienPersonnage", "lienPersonnage");
  lien.href = "?id=" + photographe._id;    
  parent.appendChild(lien);  
  insertElement (lien, "img", "portraitphotographe", photographe._portraitUrl);  
}

// Description d'un photographe sur la page d'accueil
function creerPhotographe(photographe) {
  let parent = document.getElementById("listePhotographes");
  let element = creerConteneur("div", "personnageVignette", "personnageVignette");
  parent.appendChild(element);
  let lien = creerConteneur("a", "lienPersonnage", "lienPersonnage");
  lien.href = "?id=" + photographe._id;
  element.appendChild(lien);
  insertElement (lien, "img", "portrait", photographe._portraitUrl);
  insertElement (lien, "h2", "name", photographe._nom);
  insertElement (element, "p", "city", photographe._lieu);
  insertElement (element, "p", "tagline", photographe._tagline);
  insertElement (element, "p", "price", photographe._prixFormat);
  insertElement (element, "ul", "tags", photographe._tags);
}

// Affiche la vignette d'un média d'un photographe sur sa page
function creerVignetteMedia (media) {
  let parent = document.getElementById("mediasphotographe");
  let element = creerConteneur("div", "mediasVignette", "mediasVignette");
  parent.appendChild(element);
  let title = creerConteneur("div", "titremedia", "titremedia");
  element.appendChild(title);
  insertElement (title, media.type, "media", media.mediaUrl);  
  insertElement (title, "p", "nommedia", media.titre);
  insertElement (title, "p", "likes", media.likes + '<i class="fas fa-heart"></i>');
}

// Créer un node/conteneur
function creerConteneur(type, nomId, nomClass) {
  let element= document.createElement(type);
  element.id = nomId;
  element.className = nomClass;
  return element;
}

// formate l'affiche des champs d'un photographe
function insertElement (parent, type, key, value) {   
  let element = creerConteneur(type, key, key);  
  if ((type=="img") || (type=="video")) {
    element.src = value; 
  }
  else if (type=="ul") {
    for (let i=0; i<value.length; i++) {
      let li = document.createElement("li");
      li.id = "tagli";
      li.className = "tagli";
      li.innerHTML = "<a href='?tag=" + value[i] + "' class='taglien'>#" + value[i] + "</a>";
      element.appendChild(li);
    }
  }
  else {
      element.innerHTML = value;
  }  
  parent.appendChild(element);
}