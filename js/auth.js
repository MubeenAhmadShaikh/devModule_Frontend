// ------- Adding the token from sessionStorage to Headers if exist for each request --------
let myHeaders = new Headers();
myHeaders.append("Authorization",sessionStorage.getItem("token"));
myHeaders.append('Content-Type','application/json');
//  ----------- To limit the number data/string to show ---------
function limit (string = '', limit = 0) {  
  return string.substring(0, limit)
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

// -------------- Function to show the account details for logged in user ------------
function showAccountDetails(data){
  let profile = data['profile'];
  let projects = profile.project
  // console.log(!profile.skill.length)
  // let skills = profile.skill
  let pfp_image;
  if (profile.profile_image){
    pfp_image = profile.profile_image
  }else{
    pfp_image = './images/default-profile.png'
  }
  if(profile.location){
    profilelocation = `Based in ${profile.location}`
  }else{
    profilelocation =  ''
  }
  if(profile.short_intro){
    intro = profile.short_intro;
  }else{
    intro = '<p>Developer</p>'
  }

  // Developer details left container column
  let devInfoContainer = document.querySelector('.dev')
  let devinfo= ""
  devinfo += ` <div class="card__body dev">
  <a class="tag tag--pill tag--main settings__btn" href="update-profile.html?id=${profile.id}"><i class="bi bi-pencil-square"></i> Edit</a>
  <img class="avatar avatar--xl dev__avatar" src="${pfp_image}" />
  <h2 class="dev__name">${profile.first_name} ${profile.last_name}</h2>
  <p class="dev__title">${intro}</p>
  <p class="dev__location">${profilelocation}</p>
  <ul class="dev__social">
    <li>
    <a title="Github" href="#" target="_blank">
    <span>
    <i class="bi bi-github"></i>
    </span>
    </a>
    </li>
    <li>
    <a title="LinkedIn" href="#" target="_blank">
    <span>
    <i class="bi bi-linkedin"></i>
    </span>
    </a>
    </li>
    <li>
    <a title="Twitter" href="#" target="_blank">
    <span>
    <i class="bi bi-twitter"></i>
    </span>
    </a>
    </li>
    <li>
    <a title="YouTube" href="#" target="_blank">
    <span>
    <i class="bi bi-youtube"></i>
    </span>
    </a>
    </li>
    <li>
    <a title="Website" href="#" target="_blank">
    <span>
    <i class="bi bi-globe"></i>
    </span>
    </a>
    </li>
    
  </ul>
  <a href='javascript:;' onclick='deleteProfile();' class="btn btn--del btn--md"><i class="bi bi-x-circle"></i>&nbsp Deactivate Account</a>
</div>
`;
devInfoContainer.innerHTML = devinfo;
// Dev Info/AboutMe right container
let aboutDevContainer = document.querySelector('.aboutdev')
let aboutdev= ""
if (!profile.bio){
  aboutdev += `<h3 class='devInfo__title'>About Me</h3>
  <h6 class='devSkill__title'>No description</h6>`
  aboutDevContainer.innerHTML = aboutdev;
}else{
aboutdev += `<div class="settings">
<h3 class="settings__title">About Me</h3>
<a class="tag tag--pill tag--sub settings__btn tag--lg" href="update-profile.html?id=${profile.id}"><i class="bi bi-pencil-square"></i>&nbsp;Update</a>
</div><br/>
<p class="devInfo__about">
  ${profile.bio}
</p>`
aboutDevContainer.innerHTML = aboutdev;
}

// Skills section
let majorSkillsContainer = document.querySelector('.devmajorskills')
// let extraSkillsContainer = document.querySelector('.devextraskills')
let majorskills= ""
if(!profile.skill.length){
  majorSkillsContainer.innerHTML = "<h6 class='devSkill__title'>No skills mentioned</h6><br>";
  // extraSkillsContainer.innerHTML = "<h6 class='devSkill__title'>No skills mentioned</h6>";
}else{
  console.log(data['profile']['skill'])
  data['profile']['skill'].forEach((skill,i)=>{
    majorskills += `<a href="update-skill.html?id=${skill.id}">
    <span class="tag tag--pill tag--sub tag--lg">
    <small>${skill.name}</small>&nbsp;
    
    <i class="bi bi-pencil-square"></i>
    </span>
    </a>
    `
    });
    majorSkillsContainer.innerHTML = majorskills;

};
// Projects Section
let devProjectsContainer = document.querySelector('.devprojects')
let description = ''

let devprojects= ""
if (!projects.length){
  devprojects += `
  <h6 class='devSkill__title'>You have not uploaded any projects yet</h6>`
}else{
  projects.forEach((project,i)=>{
    description=limit(project.description, 180);
    devprojects += `
    <tr>
              <td class="settings__thumbnail">
                <a href="single-project.html?id=${project.id}"><img src="${project.featured_image}" alt="Project Thumbnail" /></a>
              </td>
              <td class="settings__tableInfo">
                <a href="single-project.html?id=${project.id}">${project.title}</a>
                <p>
                  ${description}
                </p>
              </td>
              <td class="settings__tableActions">
                <a class="tag tag--pill tag--main settings__btn" href="update-project.html?id=${project.id}"><i class="bi bi-pencil-square"></i>&nbsp Edit</a>
                <a class="tag tag--pill tag--main settings__btn" href='javascript:;' onclick='deleteProject(${project.id});'><i class="bi bi-trash"></i>&nbspDelete</a>
              </td>
            </tr>
    `
  });
};
devProjectsContainer.innerHTML = devprojects;

};

