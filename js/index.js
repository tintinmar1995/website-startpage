document.getElementById("target").onchange = function(){
  var links = document.links;
  for (var i = 0; i < links.length; i++) {
    links[i].target =  document.getElementById("target").checked ? "_blank" : "_self" ;
  }
  for (elem of document.getElementsByClassName('form-search')) {
    elem.target =  document.getElementById("target").checked ? "_blank" : "_self" ;
  }

}
document.getElementById("target").onchange();

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
