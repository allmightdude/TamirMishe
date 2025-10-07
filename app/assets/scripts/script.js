// SIDENAV - Enhanced with backdrop and submenu support
const sidenav = document.querySelector(".sidenav");
const sidenavBackdrop = document.querySelector(".sidenav-backdrop");
const menuIcon = document.querySelector(".menu-icon");
const closeIcon = document.querySelector(".sidenav .close-icon");
const submenuItems = document.querySelectorAll(".sidenav__menu-item.has-submenu");

// Function to open sidenav
function openSidenav() {
  sidenav.classList.add("active");
  sidenavBackdrop.classList.add("active");
  document.body.style.overflow = "hidden"; // Prevent background scrolling
}

// Function to close sidenav
function closeSidenav() {
  sidenav.classList.remove("active");
  sidenavBackdrop.classList.remove("active");
  document.body.style.overflow = ""; // Restore scrolling
  
  // Close all submenus when closing sidenav
  submenuItems.forEach(item => {
    item.classList.remove("active");
    const submenu = item.querySelector(".sidenav__submenu");
    if (submenu) {
      submenu.classList.remove("active");
    }
  });
}

// Open sidenav when menu icon is clicked
if (menuIcon) {
  menuIcon.addEventListener("click", openSidenav);
}

// Close sidenav when close icon is clicked
if (closeIcon) {
  closeIcon.addEventListener("click", closeSidenav);
}

// Close sidenav when backdrop is clicked
if (sidenavBackdrop) {
  sidenavBackdrop.addEventListener("click", closeSidenav);
}

// Handle submenu toggles
submenuItems.forEach(item => {
  const link = item.querySelector(".sidenav__link");
  const submenu = item.querySelector(".sidenav__submenu");
  
  if (link && submenu) {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      
      // Toggle current item
      const isActive = item.classList.contains("active");
      
      // Close all other submenus
      submenuItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove("active");
          const otherSubmenu = otherItem.querySelector(".sidenav__submenu");
          if (otherSubmenu) {
            otherSubmenu.classList.remove("active");
          }
        }
      });
      
      // Toggle current submenu
      if (!isActive) {
        item.classList.add("active");
        submenu.classList.add("active");
      } else {
        item.classList.remove("active");
        submenu.classList.remove("active");
      }
    });
  }
});

// Close sidenav with ESC key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && sidenav.classList.contains("active")) {
    closeSidenav();
  }
});

// Handle touch swipe to close on mobile
let touchStartX = 0;
let touchEndX = 0;

if (sidenav) {
  sidenav.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  sidenav.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });

  function handleSwipe() {
    // If swipe right to left (close gesture)
    if (touchStartX - touchEndX > 50) {
      closeSidenav();
    }
  }
}

const toTopbutton = document.querySelector(".btn-toTop");

if (toTopbutton) {
  toTopbutton.addEventListener("click", () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  });
}

let popup = document.querySelector(".popuop-flash");

// async function submitForm(e) {
//   document.querySelector(".loader-form").style.display = "flex";

//   let form = e.target.parentElement;
//   let data = new FormData(form);

//   let result = await axios.post("http://localhost:8080", {
//     fullName: data.get("fullName"),
//     phoneNumber: data.get("phoneNumber"),
//     description: data.get("description"),
//   });
//   console.log(result.data);

//   if (result) {
//     popup.innerHTML = result.data.msg;

//     if (result.data.success) {
//       popup.classList.add("success");
//     } else {
//       popup.classList.add("danger");
//     }

//     document.querySelector(".loader-form").style.display = "none";
//     popup.style.opacity = 1;
//     popup.style.visibility = "visible";
//   }

//   setTimeout(() => {
//     popup.style.opacity = 0;
//     popup.style.visibility = "hidden";
//   }, 3000);
// }

const reviewButton = document.querySelector(".review__button");

if (reviewButton) {
  reviewButton.addEventListener("click", function () {
    document.querySelector(".review__create").classList.add("active");
  });
}

const closeReviewButton = document.querySelector(".review__create .close-icon");

if (closeReviewButton) {
  closeReviewButton.addEventListener("click", () => {
    document.querySelector(".review__create").classList.remove("active");
  });
}

// stars
let stars = document.querySelectorAll(".reviewPannel__stars .star-o-icon");
let starValue = 0;

stars.forEach((star) => {
  star.addEventListener("click", () => {
    starValue = star.getAttribute("value");

    for (let i = 0; i < starValue; i++) {
      stars[
        i
      ].innerHTML = `<svg class="star-icon" value = ${i}><use xlink:href="images/sprite.svg#icon-star1"></use></svg>`;
    }
    console.log(starValue);
  });
});

const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};
