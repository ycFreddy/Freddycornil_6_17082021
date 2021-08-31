// Récupration des paramètres Url
class urlParams{ 
  static returnUrlTag() {
    let str = document.location.href; 
    let url = new URL(str);
    return url.searchParams.get("tag");
  }    
  static returnUrlId() {
    let str = document.location.href; 
    let url = new URL(str);
    return url.searchParams.get("id");
  }
}

// formatage des datas json
let Factory = function () {
  this.creerPhotographe = function (data) {
    let photographe = [];
    photographe.nom = data.name;
    photographe.id = data.id;
    photographe.ville = data.city;
    photographe.pays = data.country;
    photographe.lieu = data.city + ", " + data.country;
    photographe.tags = data.tags;
    photographe.tagline = data.tagline;
    photographe.prix = data.price;
    photographe.prixFormat = data.price + "€/jour";
    photographe.portrait = data.portrait;
    photographe.portraitUrl = "public/images/PhotographersIDPhotos/" + data.portrait;
    photographe.medias = data.medias;
    return photographe;
  }
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
      photographes[data.photographers[i].id] = factory.creerPhotographe(data.photographers[i]);
    };
    affichePhotographes(photographes, urlParams.returnUrlTag(),urlParams.returnUrlId());
})

// Routage de l'affichage en fonction des paramètres url
function affichePhotographes(photographes, tag="", id="") {
  if (id) {
    affichePhotographe(photographes[id], id)
    listemedias(photographes[id].nom, photographes[id].medias);
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
    if (obj.tags) {
      tabtags = tabtags.concat(obj.tags); 
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
  if (tag) {if (isPhotographeTag(obj.tags, tag) === true) creerPhotographe(obj);}
  else {creerPhotographe(obj);}
  });
}

// Affiche la liste des medias d'un photographe
function listemedias(nom, medias) {  
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
  descriptionPhotographe (element, "h1", "namephotographe", photographe.nom);
  descriptionPhotographe (element, "p", "cityphotographe", photographe.lieu);
  descriptionPhotographe (element, "p", "taglinephotographe", photographe.tagline);  
  descriptionPhotographe (element, "ul", "tagsphotographe", photographe.tags);  
  descriptionPhotographe (parent, "p", "contact", "Contactez-moi");  
  let lien = creerConteneur("a", "lienPersonnage", "lienPersonnage");
  lien.href = "?id=" + photographe.id;    
  parent.appendChild(lien);  
  descriptionPhotographe (lien, "img", "portraitphotographe", photographe.portraitUrl);  
}

// Description d'un photographe sur la page d'accueil
function creerPhotographe(photographe) {
  let parent = document.getElementById("listePhotographes");
  let element = creerConteneur("div", "personnageVignette", "personnageVignette");
  parent.appendChild(element);
  let lien = creerConteneur("a", "lienPersonnage", "lienPersonnage");
  lien.href = "?id=" + photographe.id;
  element.appendChild(lien);
  descriptionPhotographe (lien, "img", "portrait", photographe.portraitUrl);
  descriptionPhotographe (lien, "h2", "name", photographe.nom);
  descriptionPhotographe (element, "p", "city", photographe.lieu);
  descriptionPhotographe (element, "p", "tagline", photographe.tagline);
  descriptionPhotographe (element, "p", "price", photographe.prixFormat);
  descriptionPhotographe (element, "ul", "tags", photographe.tags);
}

// Affiche la vignette d'un média d'un photographe sur sa page
function creerVignetteMedia (media) {
  let parent = document.getElementById("mediasphotographe");
  let element = creerConteneur("div", "mediasVignette", "mediasVignette");
  parent.appendChild(element);
  let title = creerConteneur("div", "titremedia", "titremedia");
  element.appendChild(title);
  descriptionPhotographe (title, media.type, "media", media.mediaUrl);  
  descriptionPhotographe (title, "p", "nommedia", media.titre);
  descriptionPhotographe (title, "p", "likes", media.likes + '<i class="fas fa-heart"></i>');
}

// Créer un node/conteneur
function creerConteneur(type, nomId, nomClass) {
  let element= document.createElement(type);
  element.id = nomId;
  element.className = nomClass;
  return element;
}

// formate l'affiche des champs d'un photographe
function descriptionPhotographe (parent, type, key, value) { 
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