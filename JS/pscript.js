let menu = document.querySelector('#menu-btn');
let navbar = document.querySelector('.header .navbar');

menu.onclick = () => {
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
}

window.onscroll = () => {
    menu.classList.remove('fa-times');
    navbar.classList.remove('active');
}

var swiper = new Swiper(".home-slider", {
    grabCursor:true,
    loop:true,
    centeredSlides:true,
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
    grabCursor:true,
    loop:true,
    centeredSlides:true,
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

function showSweetAlert(title, text, icon) {
  return Swal.fire({
      title: title,
      text: text,
      icon: icon,
      confirmButtonColor: "#645cff",
  });
}

const CodeForm = document.getElementById("code-form");
const ReedemButton = document.getElementById("code-form-submit");
const CodeAccMsg = document.getElementById("code-acc-msg");

ReedemButton.addEventListener("click",(e) => {
    e.preventDefault();

    const code = CodeForm.code.value;
    if (code === "hotel"){
        alert("You Succesfully Reedem Code");
        location.reload();
    } else if(code === "BANDUNG16"){
        alert("You Succesfully Reedem Code");
        location.reload();
    } else{
        CodeAccMsg.style.opacity = 1;
    }
})

const API_URL = "https://be-2-bandung-16-production.up.railway.app";

document.addEventListener("DOMContentLoaded", function () {
  const pemesananForm = document.getElementById("pemesanan");

  pemesananForm.addEventListener("submit", async function (event) {
      event.preventDefault();

      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const check_in = document.getElementById("checkin").value;
      const check_out = document.getElementById("checkout").value;
      const adults = document.getElementById("adults").value;
      const room = document.getElementById("room").value;
      const type_room = document.getElementById("type_room").value;

      if ( !name || !email || !check_in || !check_out || !adults || !room || !type_room) {
          showSweetAlert(
              "Error",
              "Please complete all the columns in the form!",
              "error"
          );
          return;
      }

      const pemesananData = {
          name,
          email,
          rooms_id: room,
          check_in,
          check_out,
          adults,
          room,
          type_room
      };

      try {
          const response = await fetch(`${API_URL}/pemesanan`, {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify(pemesananData),
          });

          if (!response.ok) {
              throw new Error("The form submission encountered an error.");
          }

          const data = await response.json();

          showSweetAlert(
              "Success",
              "Booking Rooms has been sent. Check it in the History page",
              "success",
          ).then(() => {
              //setelah sukses arahkan ke home
              window.location.href = "index.html";
          });
      } catch (error) {
          console.error("Error:", error.message);
          showSweetAlert(
              "Error",
              "The message sending failed. Please try again later.",
              "error",
          );
      }
  });

  async function setupRoomsPage() {
      try {
          const response = await fetch(`${API_URL}/room`);
          const roomsData = await response.json();

          if (!roomsData.data || !Array.isArray(roomsData.data)) {
              console.error("Invalid or missing data in the response:", roomsData);
              return;
          }

          const selector = document.getElementById("room");
          roomsData.data.forEach((room) => {
              const optionRooms = document.createElement("option");
              optionRooms.value = room.id;
              optionRooms.textContent = room.name;
              selector.appendChild(optionRooms);
          });
      } catch (error) {
          console.error("Error", error);
      }
  }

  setupRoomsPage();
});

