const API_URL = "https://be-2-bandung-16-production.up.railway.app";

document.addEventListener("DOMContentLoaded", function () {
    const pemesananForm = document.getElementById("pemesanan");
   
    pemesananForm.addEventListener("submit", function (event) {
      event.preventDefault();
   
      const email = document.getElementById("email").value;
      const name = document.getElementById("name").value;
      const check_in = document.getElementById("checkin").value;
      const check_out = document.getElementById("checkout").value;
      const adults = document.getElementById("adults").value;
      const room = document.getElementById("room").value;
      const type_room = document.getElementById("type_room").value;
   
      if (!email || !name || !check_in || !check_out || !adults || !room || type_room) {
        showSweetAlert(
          "Error",
          "Please complete all the columns in the form!",
          "error"
        );
        return;
      }
   
      const pemesananData = {
        email, 
        name, 
        rooms_id,
        check_in,
        check_out,
        adults,
        room,
        type_room
      };

      fetch(`${API_URL}/pemesanan`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pemesananData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("The form submission encountered an error.");
          }
          return response.json();
        })
        .then((data) => {
          showSweetAlert(
            "Success",
            "Booking Rooms has been sent. Check it in the History page",
            "success",
          ).then(() => {
            //setelah sukses arahkan ke home
            window.location.href = "index.html";
          });
        })
        .catch((error) => {
          console.error("Error:", error.message);
          showSweetAlert(
            "Error",
            "The message sending failed. Please try again later.",
            "error",
          );
        });
    });
  
    function showSweetAlert(title, text, icon) {
      return Swal.fire({
        title: title,
        text: text,
        icon: icon,
        confirmButtonColor: "#645cff",
   // disini untuk ubah tulisan
     });
    }
  });
  
    //GET Rooms API /rooms
    async function setupRoomsPage() {
      try {
        const response = await fetch(`${API_URL}/room`);
        const roomsData = await response.json();
        console.log(roomsData, "room")
    
        const selector = document.getElementById("room");
        roomsData.data.forEach((room) => {
          const optionRooms = document.createElement("option");
          optionRooms.value = room.id;
          optionRooms.textContent = room.rooms; // Assuming room.name is the property containing room names
          selector.appendChild(optionRooms);
        });
      } catch (error) {
        console.error("Error", error);
      }
    }
    
    setupRoomsPage();