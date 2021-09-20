function openModal(modal_name) {
  modal = document.getElementById(modal_name);
  modal.style.display = "block";
  document.documentElement.style.overflow = 'hidden';
  document.body.scroll = "no";
}

function closeModal(modal_name) {
  modal = document.getElementById(modal_name);
  modal.style.display = "none";
  document.documentElement.style["overflow-y"] = 'scroll';
  document.documentElement.style["overflow-x"] = 'hidden';
  document.body.scroll = "yes";
}

document.getElementById("MeteoFrance").onclick = function() {
  openModal('modal-meteo');
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == document.getElementById('modal-meteo')) {
    closeModal('modal-meteo');
  }
}

// Optional: This just makes all the links open in a new tab
document.getElementById("target").onchange = function(){
  var links = document.links;
  for (var i = 0; i < links.length; i++) {
    links[i].target =  document.getElementById("target").checked ? "_blank" : "_self" ;
  }
  for (elem of document.getElementsByClassName('form-search')) {
    elem.target =  document.getElementById("target").checked ? "_blank" : "_self" ;
  }

}

// focus on search input
document.getElementById("search-bar").focus();
document.getElementById("search-bar").select();

// Get IP info
var ip = "";
var geolocation = "";
var zipcode = "";
$.ajax({
       url: 'https://api.ipify.org?format=json',
       type: "GET",
       crossDomain: true,
       dataType: "json",
       success: function (response) {
         ip = response.ip;
         document.getElementById("ip").innerText = ip;
         $.ajax({
                url: 'https://ipapi.co/' + ip + '/json/',
                type: "GET",
                crossDomain: true,
                dataType: "json",
                success: function (response) {
                  geolocation = response.city + " (" + response.country_code + ")";
                  zipcode = response.postal;
                  document.getElementById("ip").innerText = ip + " - " + zipcode + " " + geolocation;
                },
                error: function (xhr, status) {
                    console.log("Geoloc : error");
                }
            });
       },
       error: function (xhr, status) {
           console.log("IP : error");
       }
   });
