// ------- Adding the token from sessionStorage to Headers if exist for each request --------
const LOCALHOST_BASE_URL = 'http://127.0.0.1:8000/'
// const LOCALHOST_BASE_URL = 'https://devmodule.onrender.com/'
const BASE_URL = 'https://devmodule-production.up.railway.app/'
let myHeaders = new Headers();
myHeaders.append("Authorization",sessionStorage.getItem("token"));
myHeaders.append('Content-Type','application/json');


//  ----------- To limit the number data/string to show ---------
function limit (string = '', limit = 0) {  
  return string.substring(0, limit)
}
function showloader() {
    $(".loading").show();
}
function hideloader() {
    $(".loading").fadeOut("slow");;
}
// ----------------- Function for authorization of user ------------------
function verify() {
	var token = sessionStorage.getItem("token");
	if (token === null){
		window.location.replace("./unauthorized.html");
	}
}

//--------------- Function for logging out the user ---------------------
function logout() {
    var x;
    a = confirm("You are about to Logout!")
    if(a){
        sessionStorage.clear();
        window.location.href='login.html'
    }
}

// --------- Function for updating the nav bar for authorized and unauthorized user ---------
function updateNavBar(status){
    if (status){
     navBar = document.querySelector("#navbar");
     login_button = document.querySelector("#loginbtn");;
     navBar.removeChild(login_button);
     navBar.innerHTML += `
     <li class="header__menuItem"><a href="account.html">My Account</a></li>
     <li class="header__menuItem" onclick="logout()"><button href="" class="btn btn--sub">Logout</button></li>
     `
    };
}; 



