const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const menuBtnIcon = menuBtn.querySelector("i");

menuBtn.addEventListener("click", (e) => {
  navLinks.classList.toggle("open");

  const isOpen = navLinks.classList.contains("open");
  menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");
});

navLinks.addEventListener("click", (e) => {
  navLinks.classList.remove("open");
  menuBtnIcon.setAttribute("class", "ri-menu-line");
});

const scrollRevealOption = {
  distance: "50px",
  origin: "bottom",
  duration: 1000,
};

// header container
ScrollReveal().reveal(".header__image img", {
  ...scrollRevealOption,
});

ScrollReveal().reveal(
  ".header__content h4, .header__content .section__header",
  {
    ...scrollRevealOption,
    delay: 500,
  }
);

ScrollReveal().reveal(".header__content p", {
  ...scrollRevealOption,
  delay: 1000,
});

ScrollReveal().reveal(".header__btn", {
  ...scrollRevealOption,
  delay: 1500,
});

// about container
ScrollReveal().reveal(".about__image img", {
  ...scrollRevealOption,
  origin: "left",
});

ScrollReveal().reveal(".about__content .section__header", {
  ...scrollRevealOption,
  delay: 500,
});

ScrollReveal().reveal(".about__content .section__description", {
  ...scrollRevealOption,
  delay: 1000,
});

ScrollReveal().reveal(".about__card", {
  ...scrollRevealOption,
  delay: 1500,
  interval: 500,
});

// price container
ScrollReveal().reveal(".price__card", {
  ...scrollRevealOption,
  interval: 500,
});

// var swiper = new Swiper(".swiper", {
//   slidesPerView: "auto",
//   spaceBetween: 30,
//   loop: true,
// navigation: {
//   nextEl: ".swiper-button-next",
//   prevEl: ".swiper-button-prev",
// },
// })

// const swiper = new Swiper(".swiper-slide", {
//   loop: true,
//   // slidesPerView: "auto",
//   // spaceBetween: 20,
// });

// const swiper = new Swiper('.swiper-wrappe', {

//   loop: true,


//   // If we need pagination
//   pagination: {
//     el: '.swiper-pagination',
//   },

//   // Navigation arrows
//   navigation: {
//     nextEl: '.swiper-button-next',
//     prevEl: '.swiper-button-prev',
//   },

// });


/////////// firebase///////////////

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import {getAuth, onAuthStateChanged, signOut} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
 import{getFirestore, getDoc, doc} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBR6aS8BgJP4OAKmHX8sucZtk-rN1KUp1I",
  authDomain: "fitdesk-a7b54.firebaseapp.com",
  projectId: "fitdesk-a7b54",
  storageBucket: "fitdesk-a7b54.appspot.com",
  messagingSenderId: "446791591633",
  appId: "1:446791591633:web:fb62fdaf5fa1dab92147f0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

 const auth=getAuth();
 const db=getFirestore();

 onAuthStateChanged(auth, (user)=>{
   const loggedInUserId=localStorage.getItem('loggedInUserId');
   if(loggedInUserId){
       console.log(user);
       const docRef = doc(db, "users", loggedInUserId);
       getDoc(docRef)
       .then((docSnap)=>{
           if(docSnap.exists()){
               const userData=docSnap.data();
               document.getElementById('loggedUserFName').innerText=userData.firstName;
               document.getElementById('loggedUserEmail').innerText=userData.email;
               document.getElementById('loggedUserLName').innerText=userData.lastName;

           }
           else{
               console.log("no document found matching id")
           }
       })
       .catch((error)=>{
           console.log("Error getting document");
       })
   }
   else{
       console.log("User Id not Found in Local storage")
   }
 })

 const logoutButton=document.getElementById('logout');

 logoutButton.addEventListener('click',()=>{
   localStorage.removeItem('loggedInUserId');
   signOut(auth)
   .then(()=>{
       window.location.href='index.html';
   })
   .catch((error)=>{
       console.error('Error Signing out:', error);
   })
 })