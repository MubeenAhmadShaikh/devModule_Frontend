//  ----------- To limit the number data/string to show ---------
function limit (string = '', limit = 0) {  
    return string.substring(0, limit)
};
// ------------- Function to show all the projects on projects page -----------
function showProjects(data){
  console.log(data)
    let projectCard = document.querySelector('#projectCard')
      let s = ""
      data['projects'].forEach((project,i)=>{
          s += `<div class="column">
            <div class="card project">
              <a href='single-project.html?id=${project.id}'  id="prj" class="project">
                <img class="project__thumbnail" src="${project.featured_image}" alt="project thumbnail" />
                <div class="card__body">
                  <h3 class="project__title">${project.title}</h3>
                  <p><a href="profile.html?id=${project.owner.id}">By ${project.owner.first_name+" "+project.owner.last_name}</a></p>
                  
                  <p class="project--rating">
                    <span style="font-weight: bold;">${project.vote_ratio}%</span> Postitive
                    Feedback (${project.vote_total} Votes)
                  </p>
                  
                  </div>
              </a>
            </div>
            </div>
            ${(() => {
              if (i == 2) {
                if(token){
                  return `<!-- Load more-->
                  <div class=" mt-6" style="display:table;margin:auto;" id="toggle">
                        <a class="btn btn--sub--outline" style="margin-bottom:1em;align-items:center;" onclick="showProjectAuthenticated('${data.pagination.next}')">Load more <i class="bi bi-arrow-repeat"></i></a>
                  </div>`;
                }else{
                  return `<!-- Load more-->
                  <div class=" mt-6" style="display:table;margin:auto;" id="toggle">
                        <a class="btn btn--sub--outline" style="margin-bottom:1em;align-items:center;" onclick="showProjectUnauthenticated('${data.pagination.next}')">Load more <i class="bi bi-arrow-repeat"></i></a>
                        </div>`;
                }
                  
              }
              else{
                  return ` `;
              }
          })()
          }
            `
      });
      projectCard.innerHTML += s;
  };

// ------------- Function to show single project details ------------------
function showSingleProject(data){
let project = data['project'];
let reviews = project.review
if(project.owner.is_active){
  let projectContainer = document.querySelector('#singleProject')
let linksContainer = document.querySelector('#links')
let link =""
link +=`
<h3 class="singleProject__subtitle">Links</h3>
          
          <a class="singleProject__liveLink" href="${project.source_link}" target="_blank"><i class="im im-external-link"></i>Source Code
          </a>
          <a class="singleProject__liveLink" href="${project.demo_link}" target="_blank"><i class="im im-external-link"></i>Demo Link
          </a>
`;

linksContainer.innerHTML = link;

let s= ""
s += `

<img class="singleProject__preview" src="${project.featured_image}" alt="portfolio thumbnail" />
<a href="profile.html?id=${project.owner.id}" class="singleProject__developer">By ${project.owner.first_name} ${project.owner.last_name}</a>
<h2 class="singleProject__title">${project.title}</h2>
<h3 class="singleProject__subtitle">About the Project</h3>
<div class="singleProject__info" >
    ${project.description}
</div>
<br>
<h3 class="singleProject__subtitle">Feedback</h3>
<h5 class="project--rating">
${project.vote_ratio}% Postitive Feedback (${project.vote_total} Votes)
</h5>
<div id="commentForm">
    
</div>

<div class="commentList" id="reviewList">

    
</div>
`;
projectContainer.innerHTML = s;

let reviewsContainer = document.querySelector('#reviewList');
if(reviews.length != 0){
  let r = ""
  for(let review of reviews){
    let pfp_image;
    if (review.owner.profile_image != null ){
      pfp_image = review.owner.profile_image
    }else{
      pfp_image = './images/default-profile.png'
    }
    if(review.owner.is_active){
      r += `
      <div class="comment">
      <a href="profile.html">
          <img class="avatar avatar--md"
          src="${pfp_image}" alt="user" />
      </a>
      <div class="comment__details">
          <a href="profile.html" class="comment__author">${review.owner.first_name} ${review.owner.last_name}</a>
          <p class="comment__info">
          ${review.comment}
          </p>
      </div>
      </div>
    `
    }else{
      r += `
      <div class="comment">
      <a href="#">
          <img class="avatar avatar--md"
          src="./images/default-profile.png" alt="user" />
      </a>
      <div class="comment__details">
          <a href="#" class="comment__author">Currently this user is inactive</a>
          <p class="comment__info">
          ${review.comment}
          </p>
      </div>
      </div>
    `
    };
    
  };
  reviewsContainer.innerHTML = r;
}else{
  reviewsContainer.innerHTML = "<h6 class='devSkill__title'>No reviews yet</h6>"
}
}else{
  window.location.replace('/projects.html')
}

};
// ------------- Function to add comment form ------------------
function commentForm(token,id){
  let commentContainer = document.querySelector('#commentForm');
  if (!token){
    commentContainer.innerHTML = "<h6 class='devSkill__title'>Login or Signup to add review</h6>"
  }else{
    let comment = `
          <form class="form" id="addComment" method="POST">
          <div class="form__field">
            <label for="">Vote value </label>
            <select id="vote_value" name="vote_value" class="shadow-none bg-gray-100" required>
                <option value="">Select....</option>
                <option value="up">Up Vote</option>
                <option value="down">Down Vote</option>
            </select>
          </div>
          <div class="form__field">
          <label for="formInput#textarea">Comments: </label>
          <textarea class="input input--textarea" name="comment" id="comment"
              placeholder="Write your comments here..." required></textarea>
          </div>
          <a href="javascript:;" onclick="addComment(${id});"><input class="btn btn--sub " type="submit"  value="Add Comment"/></a>
          </form>
    ` 
    commentContainer.innerHTML = comment
  }
};
// ------------- Function to POST Comment  ------------------
function addComment(id){
  let commentForm = document.querySelector("#addComment");
  commentForm.onsubmit = async (e) => {
    e.preventDefault();

    const vote_value = document.querySelector('#vote_value');
    const comment = document.querySelector('#comment');
    data = {
      'vote_value':vote_value.value,
      'comment':comment.value
    }
    let response = await fetch(BASE_URL+'add-review?id='+id, {
        headers: myHeaders,  
        method: 'Post',
        body: JSON.stringify(data),
    });
    
    if(response.status != 201){
      let result = await response.json();
      alert(result['detail'])
    }else{
      alert('review added');
      window.location.reload();
    }
  };
}
// ------------- Function to show searched project details ------------------
async function searchProjects(query,token){
  if(!token){
    const response = await fetch(BASE_URL+'projects/projects-explore?query='+query, {
          method: 'GET',
        });
        const data = await response.json();
        if(data['projects'].length != 0){
          showProjects(data);
        }else{
          document.querySelector("#projectsContainer").innerHTML = "<h2>No Project exist with such details </h2>"
          
        }
  }else{
    const response = await fetch(BASE_URL+'projects?query='+query, {
          method: 'GET',
          headers: myHeaders,
        });
        const data = await response.json();
        if(data['projects'].length != 0){
          showProjects(data);
          updateNavBar(token)
          
        }else{
          document.querySelector("#projectsContainer").innerHTML = "<h2>No Project exist with such details </h2>"
          
        }
  }
    
};