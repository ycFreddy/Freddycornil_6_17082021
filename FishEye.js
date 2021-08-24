window.onscroll = function (e) {
  const scroll = document.querySelector(".text-scroll");  
  scroll.style.animationDuration = "1s";
  scroll.style.animationFillMode = "forwards";
  if (window.pageYOffset > 20)  scroll.style.animationName = "affichescroll";
  else scroll.style.animationName = "cachescroll";
}

fetch('FishEyeData.json')
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    menuTags(data.photographers);
    affichePhotographesParTag(data, returnUrlTag(), returnUrlId());    
  })

function returnUrlTag() {
  let str = document.location.href; 
  let url = new URL(str);
  return url.searchParams.get("tag");
}

function returnUrlId() {
  let str = document.location.href; 
  let url = new URL(str);
  return url.searchParams.get("id");
}

function isPhotographeTag(obj, tag) {
  for (let i=0; i<obj.length; i++) {
    if (obj[i] === tag) return true;
  }
}

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

function recuperePhotographes(data) {  
  for (let i=0; i<data.photographers.length; i++) {
    data.photographers[i]["medias"] = [];
    data.media.forEach(media => {
      if (data.photographers[i].id === media.photographerId) {
        data.photographers[i]["medias"].push(media);
      }
    });
  };  
  return data.photographers;
};

function affichePhotographesParTag(data, tag="", id="") {
  const photographes = recuperePhotographes(data);
  if (id) {    
    photographes.forEach(obj => {
      if (obj.id == id) {
        document.getElementById("titre").style.display = "none";
        document.getElementById("menu").style.display = "none";
        affichePhotographe(obj, id)
        listemedias(obj.name, obj.medias);
      }
    });
  }
  else {
    listePhotographes(photographes,tag);
  }  
}

function affichePhotographe(obj, id) {
  let parent = document.getElementById("photographe");
  let element = document.createElement('div');
  element.id = "personnageVignette";
  element.className = "photographeVignette";
  parent.appendChild(element);
  let lien = document.createElement('a');
  lien.id = "lienPersonnage";
  lien.className = "lienPersonnage";
  lien.href = "?id=" + obj.id;
  parent.appendChild(lien);  
  descriptionPhotographe (element, "h1", "namephotographe", obj.name);
  descriptionPhotographe (element, "p", "cityphotographe", obj.city + ", " + obj.country);
  descriptionPhotographe (element, "p", "taglinephotographe", obj.tagline);  
  descriptionPhotographe (element, "ul", "tagsphotographe", obj.tags);
  descriptionPhotographe (lien, "img", "portrait", "public/images/PhotographersIDPhotos/" + obj.portrait);
}

function listemedias(nom, medias) {  
  medias.forEach(obj => {    
    let parent = document.getElementById("mediasphotographe");
    creerVignette(nom, obj, parent);
  });
}

function listePhotographes(photographes,tag) {
  let parent = document.getElementById("listePhotographes");
  photographes.forEach(obj => {    
  if (tag) {
    if (isPhotographeTag(obj.tags, tag) === true) {
      creerPhotographe(obj, parent);
    }
  }
  else {
    creerPhotographe(obj, parent);
  }
  });
}

function creerVignette (nom, media, parent) {
  let element = document.createElement('div');
  element.id = "mediasVignette";
  element.className = "mediasVignette";
  parent.appendChild(element);
  let title = document.createElement('div');
  title.id = "titremedia";
  title.className = "titremedia";  
  element.appendChild(title);
  nom = nom.replace(/ /g, '');
  if (media.image) descriptionPhotographe (title, "img", "media", "public/images/" + nom + "/" + media.image);
  else descriptionPhotographe (title, "video", "media", "public/images/" + nom + "/" + media.video);
  descriptionPhotographe (title, "p", "nommedia", media.title);
  descriptionPhotographe (title, "p", "likes", media.likes + '<i class="fas fa-heart"></i>');
}

function creerPhotographe(obj, parent) {
  let element = document.createElement('div');
  element.id = "personnageVignette";
  element.className = "personnageVignette";
  parent.appendChild(element);
  let lien = document.createElement('a');
  lien.id = "lienPersonnage";
  lien.className = "lienPersonnage";
  lien.href = "?id=" + obj.id;
  element.appendChild(lien);
  descriptionPhotographe (lien, "img", "portrait", "public/images/PhotographersIDPhotos/" + obj.portrait);
  descriptionPhotographe (lien, "h2", "name", obj.name);
  descriptionPhotographe (element, "p", "city", obj.city + ", " + obj.country);
  descriptionPhotographe (element, "p", "tagline", obj.tagline);
  descriptionPhotographe (element, "p", "price", obj.price + "€/jour");
  descriptionPhotographe (element, "ul", "tags", obj.tags);
}

function descriptionPhotographe (parent, type, key, value) { 
  let element = document.createElement(type);
  element.id = key;
  element.className = key;  
  if (type=== "img") {
    element.src = value; 
  }
  else if (type=== "ul") {
    for (let i=0; i<value.length; i++) {
      let li = document.createElement("li");
      li.id = "tagli";
      li.className = "tagli";
      li.innerHTML = "<a href='?tag=" + value[i] + "' class='taglien'>#" + value[i] + "</a>";
      element.appendChild(li);
    }
  }
  else if (type== "video") {
    element.src = value;
  }
  else {
      element.innerHTML = value;
  }  
  parent.appendChild(element);
}