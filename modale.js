window.onscroll = function (e) {
  const scroll = document.querySelector(".text-scroll");  
  scroll.style.animationDuration = "1s";
  scroll.style.animationFillMode = "forwards";
  if (window.pageYOffset > 20)  scroll.style.animationName = "affichescroll";
  else scroll.style.animationName = "cachescroll";
}