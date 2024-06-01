"use strict";

const recruitMainTitle = document.querySelector('.p-recruit-mainvisual-title');
function recruitFunc(entry){
  if(entry[0].isIntersecting){
    recruitMainTitle.classList.add('-active');
  }
}
const recruitMvOb = new IntersectionObserver(recruitFunc,{
  rootMargin: "0px 0px 0px 0px",
  threshold: 1,
});

recruitMvOb.observe(recruitMainTitle);