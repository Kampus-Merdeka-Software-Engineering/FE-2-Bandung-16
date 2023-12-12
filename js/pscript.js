let menu = document.querySelector("#menu-btn");
let navbar = document.querySelector(".header .navbar");

menu.onclick = () => {
  menu.classList.toggle("fa-times");
  navbar.classList.toggle("active");
};

window.onscroll = () => {
  menu.classList.remove("fa-times");
  navbar.classList.remove("active");
};

var swiper = new Swiper(".home-slider", {
  grabCursor: true,
  loop: true,
  centeredSlides: true,
  autoplay: {
    delay: 7500,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

var swiper = new Swiper(".room-slider", {
  spaceBetween: 20,
  grabCursor: true,
  loop: true,
  centeredSlides: true,
  autoplay: {
    delay: 7500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    991: {
      slidesPerView: 3,
    },
  },
});

const CodeForm = document.getElementById("code-form");
const ReedemButton = document.getElementById("code-form-submit");
const CodeAccMsg = document.getElementById("code-acc-msg");

ReedemButton.addEventListener("click", async (e) => {
  e.preventDefault();

  const code = CodeForm.code.value;
  if (code === "hotel" || code === "BANDUNG16") {
    alert("You Successfully Redeemed Code");
    location.reload();
  } else {
    CodeAccMsg.style.opacity = 1;
  }
});

const API_URL = "https://be-2-bandung-16-production.up.railway.app";

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("pemesanan");

  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const checkin = document.getElementById("checkin").value;
    const checkout = document.getElementById("checkout").value;
    const adults = document.getElementById("adults").value;
    const childs = document.getElementById("childs").value;
    const rooms = document.getElementById("rooms").value;
    const typeRoom = document.getElementById("type_room").value;

    try {
      const response = await fetch(`${API_URL}/pemesanan`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          full_name: name,
          email,
          checkin,
          checkout,
          adults,
          childs,
          rooms,
          typeRoom,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Success:", data);
        showSweetAlert(
          "Booking Successful",
          "Thank you ${full_name} for booking with us!",
          "success"
        );
      } else {
        const errorData = await response.json();
        console.error("Error:", errorData);
        showSweetAlert(
          "Booking Failed",
          "Oops! Something went wrong. Please try again later.",
          "error"
        );
      }
    } catch (error) {
      console.error("Error:", error);
      showSweetAlert(
        "Booking Failed",
        "Oops! Something went wrong. Please try again later.",
        "error"
      );
    }
  });
});

function showSweetAlert(title, text, icon) {
  return Swal.fire({
    title: title,
    text: text,
    icon: icon,
    confirmButtonColor: "#645cff",
  });
}