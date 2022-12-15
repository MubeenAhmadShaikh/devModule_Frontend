
let myHeaders = new Headers();
myHeaders.append("Authorization",sessionStorage.getItem("token"));
myHeaders.append('Content-Type','application/json');



function verify() {
	var token = sessionStorage.getItem("token");
	if (token === null){
		window.location.replace("./unauthorized.html");
	}
}
function logout() {
    var x;
    a = confirm("You are about to Logout!")
    if(a){
        sessionStorage.clear();
        window.location.href='login.html'
    }
}

function limit (string = '', limit = 0) {  
  return string.substring(0, limit)
}

function updateNavBar(status){
    if (status){
     navBar = document.querySelector("#navbar");
     login_button = document.querySelector("#loginbtn");;
     navBar.removeChild(login_button);
     navBar.innerHTML += `
     <li class="header__menuItem"><a href="inbox.html">Inbox</a></li>
     <li class="header__menuItem"><a href="account.html">My Account</a></li>
     <li class="header__menuItem" onclick="logout()"><button href="" class="btn btn--sub">Logout</button></li>
     `
    };
}; 


function showDevelopers(data){
  let profileCard = document.querySelector('#dev-list');
  let description = ''
  let intro = ''
  // console.log(data['profiles']['3']['skill']['0'].name);
  
  let s=""

  data['profiles'].forEach((profile,i)=>{
    if(profile.bio){
      description =limit(profile.bio, 180);
    }
    if(profile.short_intro){
      intro =limit(profile.short_intro,29);
    }
    sk =""
    let skills = profile.skill
    if(profile.skill.length != 0){
      let counter = 0;
      skills.forEach((skill)=>{      
        if(counter<=5){
          sk +=
          `
          <span class="tag tag--pill tag--main">
                          <small>${skill.name}</small>
                        </span>
          `
          counter += 1
        }
         
        
        
    })
      
    }
    
    
    
    s += `<div class="column card">
          <div class="dev">
            <a href="profile.html?id=${profile.id}" class="card__body">
              <div class="dev__profile">
                <img class="avatar avatar--md" src="./images/pfp.jpg" />
                <div class="dev__meta">
                  <h3>${profile.first_name+" "+profile.last_name}</h3>
                  <h5>${intro}</h5>
                </div>
              </div>
              <p class="dev__info">
                ${description}
              </p>
              <div class="dev__skills" id='other'>
                          `+sk+`
              </div>
              
            </a>
          </div>
        </div>
            
        `
        
      });
      profileCard.innerHTML = s;
     
        
};

function showSingleDeveloper(data){
  let profile = data['profile'];
  let projects = profile.project
  console.log(!profile.skill.length)
  let skills = profile.skill
  let devInfoContainer = document.querySelector('.dev')
  let devinfo= ""
  devinfo += ` <div class="card__body ">
  <img class="avatar avatar--xl" src="./images/pfp.jpg" />
  <h2 class="dev__name">${profile.first_name} ${profile.last_name}</h2>
  <p class="dev__title">${profile.short_intro}</p>
  <p class="dev__location">Based in ${profile.location}</p>
  <ul class="dev__social">
    <li>
      <a title="Github" href="#" target="_blank"><i class="im im-github"></i></a>
    </li>
    <li>
      <a title="Stackoverflow" href="#" target="_blank"><i class="im im-stackoverflow"></i></a>
    </li>
    <li>
      <a title="Twitter" href="#" target="_blank"><i class="im im-twitter"></i></a>
    </li>
    <li>
      <a title="LinkedIn" href="#" target="_blank"><i class="im im-linkedin"></i></a>
    </li>
    <li>
      <a title="Personal Website" href="#" target="_blank"><i class="im im-globe"></i></a>
    </li>
  </ul>
</div> 
`;
devInfoContainer.innerHTML = devinfo;
let aboutDevContainer = document.querySelector('.aboutdev')
let aboutdev= ""
console.log(profile.bio)
if (!profile.bio){
  aboutdev += `<h3 class='devInfo__title'>About Me</h3>
  <h6 class='devSkill__title'>No description</h6>`
  aboutDevContainer.innerHTML = aboutdev;
}else{
aboutdev += `<h3 class="devInfo__title">About Me</h3>
<p class="devInfo__about">
  ${profile.bio}
</p>`
aboutDevContainer.innerHTML = aboutdev;
}
let majorSkillsContainer = document.querySelector('.devmajorskills')
let extraSkillsContainer = document.querySelector('.devextraskills')
let majorskills= ""
if(!profile.skill.length){
  majorSkillsContainer.innerHTML = "<h6 class='devSkill__title'>No skills mentioned</h6><br>";
  extraSkillsContainer.innerHTML = "<h6 class='devSkill__title'>No skills mentioned</h6>";
}else{
  data['majorSkills'].forEach((skill,i)=>{
    majorskills += `
    <div class="devSkill ">
        <h4 class="devSkill__title">${skill.name}</h4>
        <p class="devSkill__info">
          ${skill.description}
        </p>
        </div>
    `;
    });
    majorSkillsContainer.innerHTML = majorskills;

    let extraskills= ""

    data['extraSkills'].forEach((skill,i)=>{
    extraskills += `
    <span class="tag tag--pill tag--sub tag--lg">
                      <small>${skill.name}</small>
                    </span>

    `;
    });
    extraSkillsContainer.innerHTML = extraskills;
}

let devProjectsContainer = document.querySelector('.devprojects')
let devprojects= ""
if (!projects.length){
  devprojects += "<h6 class='devSkill__title'>No Projects uploaded</h6>"
}else{
  projects.forEach((project,i)=>{
    devprojects += `
    <div class="column">
    <div class="card project">
      <a href="single-project.html?id=${project.id}" class="project">
        <img class="project__thumbnail" src="images/project-c.png" alt="project thumbnail" />
        <div class="card__body">
          <h3 class="project__title">${project.title}</h3>
          <p><a class="project__author" href="">By ${profile.first_name} ${profile.last_name}</a></p>
          <p class="project--rating">
            <span style="font-weight: bold;">36%</span> Postitive
            Feedback (18 Votes)
          </p>
          <div class="project__tags">
            <span class="tag tag--pill tag--main">
              <small>NextJS</small>
            </span>
            <span class="tag tag--pill tag--main">
              <small>GraphQL</small>
            </span>
            <span class="tag tag--pill tag--main">
              <small>TypeScript</small>
            </span>
          </div>
        </div>
      </a>
    </div>
    </div>
    `
  });
};
devProjectsContainer.innerHTML = devprojects;




};
function showAccountDetails(data){
  let profile = data['profile'];
  let projects = profile.project
  // console.log(!profile.skill.length)
  // let skills = profile.skill

  // Developer details left container column
  let devInfoContainer = document.querySelector('.dev')
  let devinfo= ""
  devinfo += ` <div class="card__body dev">
  <a class="tag tag--pill tag--main settings__btn" href="#"><i class="im im-edit"></i> Edit</a>
  <img class="avatar avatar--xl dev__avatar" src="./images/pfp.jpg" />
  <h2 class="dev__name">${profile.first_name} ${profile.last_name}</h2>
  <p class="dev__title">${profile.short_intro}</p>
  <p class="dev__location">Based in ${profile.location}</p>
  <ul class="dev__social">
    <li>
      <a title="Github" href="#" target="_blank"><i class="im im-github"></i></a>
    </li>
    <li>
      <a title="Stackoverflow" href="#" target="_blank"><i class="im im-stackoverflow"></i></a>
    </li>
    <li>
      <a title="Twitter" href="#" target="_blank"><i class="im im-twitter"></i></a>
    </li>
    <li>
      <a title="LinkedIn" href="#" target="_blank"><i class="im im-linkedin"></i></a>
    </li>
    <li>
      <a title="Personal Website" href="#" target="_blank"><i class="im im-globe"></i></a>
    </li>
  </ul>
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
<a class="tag tag--pill tag--sub settings__btn tag--lg" href="#"><i class="bi bi-plus-lg"></i>&nbsp;Update</a>
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
    // <a><i class="bi bi-pencil-fill"></i></a>
    // majorskills += `
    //         <tr>
    //           <td class="settings__tableInfo">
    //             <h4>${skill.name}</h4>
    //             <p>
    //               ${skill.description}
    //             </p>
    //           </td>
    //           <td class="settings__tableActions">
    //             <a class="tag tag--pill tag--main settings__btn" href="#"><i class="im im-edit"></i> Edit</a>
    //             <a class="tag tag--pill tag--main settings__btn" href="#"><i class="im im-x-mark-circle-o"></i>
    //               Delete</a>
    //           </td>
    //         </tr>
    // `;
    });
    majorSkillsContainer.innerHTML = majorskills;

    // let extraskills= ""

    // data['extraSkills'].forEach((skill,i)=>{
    // extraskills += `
    // <span class="tag tag--pill tag--sub tag--lg">
    //                   <small>${skill.name}</small>
    //                 </span>

    // `;
    // });
    // extraSkillsContainer.innerHTML = extraskills;
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
                <a href="single-project.html"><img src="images/project-a.png" alt="Project Thumbnail" /></a>
              </td>
              <td class="settings__tableInfo">
                <a href="single-project.html">${project.title}</a>
                <p>
                  ${description}
                </p>
              </td>
              <td class="settings__tableActions">
                <a class="tag tag--pill tag--main settings__btn" href="#"><i class="im im-edit"></i> Edit</a>
                <a class="tag tag--pill tag--main settings__btn" href="#"><i class="im im-x-mark-circle-o"></i>
                  Delete</a>
              </td>
            </tr>
    `
  });
};
devProjectsContainer.innerHTML = devprojects;

};
function showProjects(data){
  let projectCard = document.querySelector('#projectCard')
    let s = ""
    data['projects'].forEach((project,i)=>{
        s += `<div class="column">
          <div class="card project">
            <a href='single-project.html?id=${project.id}'  id="prj" class="project">
              <img class="project__thumbnail" src="images/project-a.png" alt="project thumbnail" />
              <div class="card__body">
                <h3 class="project__title">${project.title}</h3>
                <p><a>By ${project.owner.first_name+" "+project.owner.last_name}</a></p>
                
                <p class="project--rating">
                  <span style="font-weight: bold;">98%</span> Postitive
                  Feedback (72 Votes)
                </p>
                <div class="project__tags">
                  <span class="tag tag--pill tag--main">
                    <small>NextJS</small>
                  </span>
                  <span class="tag tag--pill tag--main">
                    <small>GraphQL</small>
                    </span>
                    <span class="tag tag--pill tag--main">
                      <small>TypeScript</small>
                      </span>
                </div>
                </div>
            </a>
          </div>
          </div>`
    });
    projectCard.innerHTML = s;
};
function showSingleProject(data){
  let project = data['project'];
  let projectContainer = document.querySelector('#singleProject')
  let commentsContainer = document.querySelector('.comments')
  let s= ""
  s += `
  <img class="singleProject__preview" src="/images/project-c.png" alt="portfolio thumbnail" />
  <a href="profile.html?id=${project.owner.id}" class="singleProject__developer">By ${project.owner.first_name} ${project.owner.last_name}</a>
  <h2 class="singleProject__title">${project.title}</h2>
  <h3 class="singleProject__subtitle">About the Project</h3>
  <div class="singleProject__info" >
    ${project.description}
  </div>
  <h3 class="singleProject__subtitle">Feedback</h3>
  <h5 class="project--rating">
    36% Postitive Feedback (18 Votes)
  </h5>

  <form class="form" action="#" method="POST">
    <!-- Textarea -->
    <div class="form__field">
      <label for="formInput#textarea">Comments: </label>
      <textarea class="input input--textarea" name="message" id="formInput#textarea"
        placeholder="Write your comments here..."></textarea>
    </div>
    <input class="btn btn--sub btn--lg" type="submit" value="Comments" />
  </form>
  <div class="commentList">
    <div class="comment">
      <a href="profile.html">
        <img class="avatar avatar--md"
          src="./images/pfp.jpg" alt="user" />
      </a>
      <div class="comment__details">
        <a href="profile.html" class="comment__author">Sulamita Ivanov</a>
        <p class="comment__info">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit alias numquam perferendis
          mollitia minus minima exercitationem possimus ab deserunt qui, soluta iusto doloribus eveniet
          similique consequuntur ratione, dignissimos ut magni laborum quo.
        </p>
      </div>
    </div>
    <div class="comment">
      <a href="profile.html">
        <img class="avatar avatar--md" src="./images/pfp.jpg" alt="user" />
      </a>
      <div class="comment__details">
        <a href="profile.html" class="comment__author">Dennis Ivanov</a>
        <p class="comment__info">
          Consectetur adipisicing elit. Reprehenderit alias numquam perferendis mollitia minus minima
          exercitationem possimus ab deserunt qui, ratione, dignissimos ut magni laborum quo.
        </p>
      </div>
    </div>
  </div>
  `;
  projectContainer.innerHTML = s;
};