//  ----------- To limit the number data/string to show ---------
function limit (string = '', limit = 0) {  
    return string.substring(0, limit)
};

// ------------- Function to show all the projects on projects page -----------
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

// ------------- Function to show single project details ------------------
function showSingleProject(data){
let project = data['project'];
let reviews = project.review

for (let review of reviews){
  console.log(review.owner.first_name);
};
let projectContainer = document.querySelector('#singleProject')

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
<div class="commentList" id="reviewList">

    
</div>
`;
projectContainer.innerHTML = s;

let reviewsContainer = document.querySelector('#reviewList');
if(reviews.length != 0){
  let r = ""
  reviews.forEach((review)=>{
    r += `
    <div class="comment">
    <a href="profile.html">
        <img class="avatar avatar--md"
        src="./images/pfp.jpg" alt="user" />
    </a>
    <div class="comment__details">
        <a href="profile.html" class="comment__author">${review.owner.first_name} ${review.owner.last_name}</a>
        <p class="comment__info">
        ${review.comment}
        </p>
    </div>
    </div>
    `
  });
  reviewsContainer.innerHTML = r;
}else{
  reviewsContainer.innerHTML = "<h6 class='devSkill__title'>No reviews yet</h6>"
}
};