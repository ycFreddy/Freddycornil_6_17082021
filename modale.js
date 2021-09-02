/* eslint-disable no-undef */
window.onscroll = e => {
  const scroll = document.querySelector('.text-scroll')
  scroll.style.animationDuration = '1s'
  scroll.style.animationFillMode = 'forwards'
  if (window.pageYOffset > 20) scroll.style.animationName = 'affichescroll'
  else scroll.style.animationName = 'cachescroll'
}

// Création du formulaire de contact
const modalecontact = (photographe) => {
  const parent = document.getElementById('body')
  const modale = creerConteneur('div', 'modalebox', 'modalebox')
  modale.style.display = 'block'
  parent.appendChild(modale)

  const modaleContent = creerConteneur('div', 'modalecontent', 'modalecontent')
  const modaleTop = creerConteneur('div', 'modaletop', 'modaletop')
  const modaleTitre = creerConteneur('h1', 'modaletitre', 'modaletitre')
  modaleTitre.innerHTML = 'Contactez-moi ' + photographe
  const modaleClose = creerConteneur('span', 'modaleclose', 'modaleclose')
  modaleClose.addEventListener('click', function () { closeModale(modale) }, false)
  modale.appendChild(modaleContent)
  modaleContent.appendChild(modaleTop)
  modaleTop.appendChild(modaleTitre)
  modaleTop.appendChild(modaleClose)

  const modaleBody = creerConteneur('div', 'modalebody', 'modalebody')
  modaleContent.appendChild(modaleBody)
  const modaleForm = creerConteneur('form', 'modaleform', 'modaleform')
  modaleBody.appendChild(modaleForm)
  const modalePrenomLabel = creerConteneur('label', 'modalePrenomlabel', 'modalelabel')
  modalePrenomLabel.innerHTML = 'Prénom'
  modalePrenomLabel.htmlFor = 'Prenom'
  const modalePrenom = creerConteneur('input', 'modalePrenominput', 'modaleinput')
  modalePrenom.name = 'Prenom'
  modaleForm.appendChild(modalePrenomLabel)
  modaleForm.appendChild(modalePrenom)

  const modaleNomLabel = creerConteneur('label', 'modaleNomlabel', 'modalelabel')
  modaleNomLabel.innerHTML = 'Nom'
  modaleNomLabel.htmlFor = 'Nom'
  const modaleNom = creerConteneur('input', 'modaleNominput', 'modaleinput')
  modaleNom.name = 'Nom'
  modaleForm.appendChild(modaleNomLabel)
  modaleForm.appendChild(modaleNom)

  const modaleEmailLabel = creerConteneur('label', 'modaleEmaillabel', 'modalelabel')
  modaleEmailLabel.innerHTML = 'Email'
  modaleEmailLabel.htmlFor = 'Email'
  const modaleEmail = creerConteneur('input', 'modaleEmailinput', 'modaleinput')
  modaleEmail.name = 'Email'
  modaleForm.appendChild(modaleEmailLabel)
  modaleForm.appendChild(modaleEmail)

  const modaleMessageLabel = creerConteneur('label', 'modaleMessagelabel', 'modalelabel')
  modaleMessageLabel.innerHTML = 'Votre message'
  modaleMessageLabel.htmlFor = 'Message'
  const modaleMessage = creerConteneur('textarea', 'modaleMessageinput', 'modaletextarea')
  modaleMessage.rows = '10'
  modaleMessage.name = 'Message'
  modaleForm.appendChild(modaleMessageLabel)
  modaleForm.appendChild(modaleMessage)

  const modaleContentSubmit = creerConteneur('div', 'modalecontentsubmit', 'modalecontentsubmit')
  modaleForm.appendChild(modaleContentSubmit)
  const modaleSubmit = creerConteneur('input', 'modalesubmit', 'modalesubmit')
  modaleSubmit.type = 'submit'
  modaleSubmit.value = 'Envoyer'
  modaleSubmit.name = 'Email'
  modaleContentSubmit.appendChild(modaleSubmit)
}

// Ferme la modale
const closeModale = (modale) => {
  modale.style.display = 'none'
}
