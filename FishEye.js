fetch('FishEyeData.json')
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    const photographes = data.photographers;
    const medias = data.medias;    
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

function affichePhotographesParTag(data, tag="") {
  var parent = document.getElementById("listePhotographes");
  data.forEach(obj => {    
    if (tag) {
      if (isPhotographeTag(obj.tags, tag) === true) {
        listePhotographe(obj, parent);
      }
    }
    else {
      listePhotographe(obj, parent);
    }
  });
}

function listePhotographe(obj, parent) {
  let element = document.createElement('div');
  element.id = "personnageVignette";
  element.className = "personnageVignette";
  parent.appendChild(element);
  creerPhotographe (element, "img", "portrait", "public/images/PhotographersIDPhotos/" + obj.portrait);
  creerPhotographe (element, "h2", "name", obj.name);
  creerPhotographe (element, "p", "city", obj.city + ", " + obj.country);
  creerPhotographe (element, "p", "tagline", obj.tagline);
  creerPhotographe (element, "p", "price", obj.price + "€/jour");
  creerPhotographe (element, "ul", "tags", obj.tags);
}

function creerPhotographe (parent, type, key, value) {
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
      li.innerHTML = "<a href='index.html?tag=" + value[i] + "' class='taglien'>#" + value[i] + "</a>";
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