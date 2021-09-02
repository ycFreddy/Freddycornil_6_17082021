window.onscroll = function (e) {
  const scroll = document.querySelector(".text-scroll");  
  scroll.style.animationDuration = "1s";
  scroll.style.animationFillMode = "forwards";
  if (window.pageYOffset > 20)  scroll.style.animationName = "affichescroll";
  else scroll.style.animationName = "cachescroll";
}

// Création du formulaire de contact
const modalecontact = (photographe) => {
  let parent = document.getElementById("body");
  let modale = creerConteneur("div", "modalebox", "modalebox");    
  modale.style.display = "block";  
  parent.appendChild(modale);

  let modaleContent = creerConteneur("div", "modalecontent", "modalecontent");
  let modaleTop = creerConteneur("div", "modaletop", "modaletop");
  let modaleTitre = creerConteneur("h1", "modaletitre", "modaletitre");
  modaleTitre.innerHTML = "Contactez-moi "+ photographe;  
  let modaleClose = creerConteneur("span", "modaleclose", "modaleclose");
  modaleClose.addEventListener("click", function(){closeModale(modale);}, false);
  modale.appendChild(modaleContent);
  modaleContent.appendChild(modaleTop);
  modaleTop.appendChild(modaleTitre);
  modaleTop.appendChild(modaleClose);

  let modaleBody = creerConteneur("div", "modalebody", "modalebody");
  modaleContent.appendChild(modaleBody);
  let modaleForm = creerConteneur("form", "modaleform", "modaleform");
  modaleBody.appendChild(modaleForm);
  let modalePrenomLabel = creerConteneur("label", "modalePrenomlabel", "modalelabel");
  modalePrenomLabel.innerHTML = "Prénom";
  modalePrenomLabel.htmlFor = "Prenom";
  let modalePrenom = creerConteneur("input", "modalePrenominput", "modaleinput");
  modalePrenom.name = "Prenom";  
  modaleForm.appendChild(modalePrenomLabel);
  modaleForm.appendChild(modalePrenom);

  let modaleNomLabel = creerConteneur("label", "modaleNomlabel", "modalelabel");
  modaleNomLabel.innerHTML = "Nom";
  modaleNomLabel.htmlFor = "Nom";
  let modaleNom = creerConteneur("input", "modaleNominput", "modaleinput");
  modaleNom.name = "Nom";  
  modaleForm.appendChild(modaleNomLabel);
  modaleForm.appendChild(modaleNom);

  let modaleEmailLabel = creerConteneur("label", "modaleEmaillabel", "modalelabel");
  modaleEmailLabel.innerHTML = "Email";
  modaleEmailLabel.htmlFor = "Email";
  let modaleEmail = creerConteneur("input", "modaleEmailinput", "modaleinput");
  modaleEmail.name = "Email";  
  modaleForm.appendChild(modaleEmailLabel);
  modaleForm.appendChild(modaleEmail);

  let modaleMessageLabel = creerConteneur("label", "modaleMessagelabel", "modalelabel");
  modaleMessageLabel.innerHTML = "Votre message";
  modaleMessageLabel.htmlFor = "Message";
  let modaleMessage = creerConteneur("textarea", "modaleMessageinput", "modaletextarea");  
  modaleMessage.rows = "10";
  modaleMessage.name = "Message";  
  modaleForm.appendChild(modaleMessageLabel);
  modaleForm.appendChild(modaleMessage);

  let modaleContentSubmit = creerConteneur("div", "modalecontentsubmit", "modalecontentsubmit");
  modaleForm.appendChild(modaleContentSubmit);
  let modaleSubmit = creerConteneur("input", "modalesubmit", "modalesubmit");
  modaleSubmit.type = "submit";
  modaleSubmit.value = "Envoyer";
  modaleSubmit.name = "Email";    
  modaleContentSubmit.appendChild(modaleSubmit);
}

// Ferme la modale
const closeModale = (modale) => {
  modale.style.display = "none";
}