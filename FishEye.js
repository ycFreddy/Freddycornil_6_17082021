fetch('FishEyeData.json')
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    const photographes = data.photographers;
    const madias = data.madias;
    affiche(photographes);
  })

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
        li.innerHTML = "<a href='#' class='taglien'>#" + value[i] + "</a>";
        element.appendChild(li);
      }
    }
    else {      
      element.innerHTML = value;
    }
    parent.appendChild(element);
  }

  function affiche(data) {
    var parent = document.getElementById("listePhotographes");    
    data.forEach(obj => {
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
    });
  }