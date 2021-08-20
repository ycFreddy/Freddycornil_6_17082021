fetch('FishEyeData.json')
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    const photographes = data.photographers;
    const medias = data.medias;
    MenuTags(photographes);
    affichePhotographesParTag(photographes, returnUrlTag());    
  })

function returnUrlTag() {
  let str = document.location.href; 
  let url = new URL(str);
  return url.searchParams.get("tag");
}

function isPhotographeTag(obj, tag) {
  for (let i=0; i<obj.length; i++) {
    if (obj[i] === tag) return true;
  }
}

function MenuTags(data) {
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

function affichePhotographesParTag(data, tag="") {
  let parent = document.getElementById("listePhotographes");
  data.forEach(obj => {    
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

function descriptionPhotographe (parent, type, key, value, param="") { 
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
  else {
      element.innerHTML = value;
  }  
  parent.appendChild(element);
}
/*
function recuperePhotographes(data) {  
  const photographes = data.photographers;
  const medias = data.media;  
  for (let i=0; i<photographes.length; i++) {
    photographes[i]["medias"] = [];
    medias.forEach(media => {
      if (photographes[i].id === media.photographerId) {
        photographes[i]["medias"].push(media);
      }
    });
  };
};
*/