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
  const modale = insertElement(parent, 'div', 'modalebox', 'modalebox')
  modale.style.display = 'block'
  modale.role = 'dialog'
  const modaleContent = insertElement(modale, 'div', 'modalecontent', 'modalecontent')
  const modaleTop = insertElement(modaleContent, 'div', 'modaletop', 'modaletop')
  const modaleTitre = insertElement(modaleTop, 'h1', 'modaletitre', 'modaletitre')
  modaleTitre.innerHTML = 'Contactez-moi ' + photographe
  const modaleClose = insertElement(modaleTop, 'span', 'modaleclose', 'modaleclose')
  modaleClose.addEventListener('click', () => { closeModale(modale) })
  modaleClose.addEventListener('keypress', () => { closeModale(modale) })
  modaleClose.tabIndex = 1
  modaleClose.focus()
  const modaleBody = insertElement(modaleContent, 'div', 'modalebody', 'modalebody')
  const modaleForm = insertElement(modaleBody, 'form', 'modaleform', 'modaleform')
  const modalePrenomLabel = insertElement(modaleForm, 'label', 'modalePrenomlabel', 'modalelabel')
  modalePrenomLabel.innerHTML = 'Prénom'
  modalePrenomLabel.htmlFor = 'Prenom'
  const modalePrenom = insertElement(modaleForm, 'input', 'modalePrenominput', 'modaleinput')
  modalePrenom.name = 'Prenom'
  modalePrenom.tabIndex = 1
  const modaleNomLabel = insertElement(modaleForm, 'label', 'modaleNomlabel', 'modalelabel')
  modaleNomLabel.innerHTML = 'Nom'
  modaleNomLabel.htmlFor = 'Nom'
  const modaleNom = insertElement(modaleForm, 'input', 'modaleNominput', 'modaleinput')
  modaleNom.name = 'Nom'
  modaleNom.tabIndex = 1
  const modaleEmailLabel = insertElement(modaleForm, 'label', 'modaleEmaillabel', 'modalelabel')
  modaleEmailLabel.innerHTML = 'Email'
  modaleEmailLabel.htmlFor = 'Email'
  const modaleEmail = insertElement(modaleForm, 'input', 'modaleEmailinput', 'modaleinput')
  modaleEmail.name = 'Email'
  modaleEmail.tabIndex = 1
  const modaleMessageLabel = insertElement(modaleForm, 'label', 'modaleMessagelabel', 'modalelabel')
  modaleMessageLabel.innerHTML = 'Votre message'
  modaleMessageLabel.htmlFor = 'Message'
  const modaleMessage = insertElement(modaleForm, 'textarea', 'modaleMessageinput', 'modaletextarea')
  modaleMessage.rows = '10'
  modaleMessage.name = 'Message'
  modaleMessage.tabIndex = 1
  const modaleContentSubmit = insertElement(modaleForm, 'div', 'modalecontentsubmit', 'modalecontentsubmit')
  const modaleSubmit = insertElement(modaleContentSubmit, 'input', 'modalesubmit', 'modalesubmit')
  modaleSubmit.type = 'submit'
  modaleSubmit.value = 'Envoyer'
  modaleSubmit.name = 'envoyer'
  modaleSubmit.tabIndex = 1
  modaleSubmit.addEventListener('focusout', () => { document.getElementById('modaleclose').focus() })
}

// Ferme la modale
const closeModale = (modale) => {
  modale.style.display = 'none'
  indexFocus()
}
