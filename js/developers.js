//  ----------- To limit the number data/string to show ---------
function limit (string = '', limit = 0) {  
    return string.substring(0, limit)
  }

//  -------------- Function to show all the developers on main page ----------------------
function showDevelopers(data){

    let profileCard = document.querySelector('#dev-list');
    let description = ''
    let intro = ''
    // console.log(data['profiles']['3']['skill']['0'].name);
    
    let s=""
    console.log(data)
    console.log(data['profiles'])
    data['profiles'].forEach((profile,i)=>{
      if(profile.bio){
        description =limit(profile.bio, 180);
      }else{
        description = ''
      }
      if(profile.short_intro){
        intro =limit(profile.short_intro,25);
      }else{
        intro = '<h5>Developer</h5>'
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
      
      let pfp_image;
      if (profile.profile_image){
        pfp_image = profile.profile_image
      }else{
        pfp_image = './images/default-profile.png'
      }
      
      s += `<div class="column card">
            <div class="dev">
              <a href="profile.html?id=${profile.id}" class="card__body">
                <div class="dev__profile">
                  <img class="avatar avatar--md" src="${pfp_image}" />
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
  
// --------------- Function to show single developer profile -------------------
async function showSingleDeveloper(data){
let profile = data['profile'];
let projects = profile.project
if(profile.is_active){
  let skills = profile.skill
let devInfoContainer = document.querySelector('.dev')
let devinfo= ""
let location= ""
let short_intro= ""
if(profile.location){
  location = `Based in ${profile.location}`
}else{
  location =  ''
}
if(profile.short_intro){
  intro = profile.short_intro;
}else{
  intro = '<p>Developer</p>'
}

let pfp_image;
if (profile.profile_image != null ){
  pfp_image = profile.profile_image
}else{
  pfp_image = './images/default-profile.png'
}
devinfo += ` <div class="card__body ">
<img class="avatar avatar--xl" src="${pfp_image}" />
<h2 class="dev__name">${profile.first_name} ${profile.last_name}</h2>
<p class="dev__title">${intro}</p>
<p class="dev__location">${location}</p>
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
        <img class="project__thumbnail" src="${project.featured_image}" alt="project thumbnail" />
        <div class="card__body">
        <h3 class="project__title">${project.title}</h3>
        <p><a class="project__author" href="">By ${profile.first_name} ${profile.last_name}</a></p>
        <p class="project--rating">
            <span style="font-weight: bold;">${project.vote_ratio}%</span> Postitive
            Feedback (${project.vote_total} Votes)
        </p>
        </div>
    </a>
    </div>
    </div>
    `
});
};
devProjectsContainer.innerHTML = devprojects;

}else{
  window.location.replace('/index.html')
}




};


async function searchDevelopers(query,token){
  if(!token){
    const response = await fetch('http://127.0.0.1:8000/developers/developers-explore?query='+query, {
          method: 'GET',
        });
        const data = await response.json();
        console.log(data)
        if(data['profiles'].length != 0){
          showDevelopers(data);
        }else{
          document.querySelector("#dev-list").innerHTML = "<h2>No User exist with such details </h2>"
          console.log("NO data found")
        }
  }else{
    const response = await fetch('http://127.0.0.1:8000/developers/?query='+query, {
          method: 'GET',
          headers: myHeaders,
        });
        const data = await response.json();
        console.log(data)
        if(data['profiles'].length != 0){
          showDevelopers(data);
          updateNavBar(data['user'])
          
        }else{
          document.querySelector("#dev-list").innerHTML = "<h2>No User exist with such details </h2>"
          console.log("NO data found")
        }
  }
    
};

 