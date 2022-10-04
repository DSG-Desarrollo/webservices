const request = new XMLHttpRequest();
const formData = new FormData();

window.addEventListener('load', function() {
     creatingSessionData();
     setTimeout(function() {
          var sessionData = JSON.parse(sessionStorage.getItem('sessionData'));
          request.onreadystatechange = function() {
               if (this.readyState == 4 && this.status == 200) {
                    var response = JSON.parse(this.responseText);
                    console.log(response);
                    let sideBarR = response.sidebar;
                    var i = sideBarR.length;
                    const containerNavBar = document.getElementById("main-sidebar");
                    const nav = document.createElement("NAV");
                    const ul = document.createElement("UL");

                    nav.classList.add("mt-2");
                    ul.classList.add("nav", "nav-pills", "nav-sidebar", "flex-column");
                    ul.setAttribute("data-widget", "treeview");
                    ul.setAttribute("role", "menu");
                    ul.setAttribute("data-accordion", "false");

                    while (i--) {
                         var li = document.createElement("LI");
                         var a = document.createElement("A");
                         var iIcon = document.createElement("I");
                         var p = document.createElement("P");
                         
                         li.classList.add("nav-item");
                         a.setAttribute("href", "#"); 
                         a.classList.add("nav-link");
                         iIcon.classList.add("nav-icon","fa", `${sideBarR[i].icon}`);

                         li.addEventListener("click", function(evt) {
                              var tabs = document.getElementsByClassName('nav-item');
                              var len = tabs.length;
                              while (len--) {
                                   tabs[len].classList.remove('active');
                              }
                              this.classList.add('active');
                         });
     
                         var title = document.createTextNode(`${sideBarR[i].name}`);
                         a.setAttribute("onclick", `${sideBarR[i].url}`);
     
                         a.appendChild(iIcon);
                         p.appendChild(title);
                         a.appendChild(p);
                         li.appendChild(a);
                         ul.insertBefore(li, ul.childNodes[0]);
                    }
                    nav.appendChild(ul);
                    containerNavBar.appendChild(nav);
               }
          }
          request.open('GET', 'src/ajax_libs/sidebar_navbar_ajax.php', true);
          request.send();    
     }, 2000);
});

function creatingSessionData() {
     var data;
     request.onreadystatechange = function() {
         if (this.readyState == 4 && this.status == 200) {
               data = JSON.parse(this.responseText);
               console.log(data);
               sessionStorage.setItem("sessionData", JSON.stringify(data)); 
         }
     }
     request.open('GET', 'src/ajax_libs/session_data_ajax.php', true);
     request.send();
};