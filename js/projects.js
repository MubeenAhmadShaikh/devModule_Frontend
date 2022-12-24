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
                <img class="project__thumbnail" src="${project.featured_image}" alt="project thumbnail" />
                <div class="card__body">
                  <h3 class="project__title">${project.title}</h3>
                  <p><a>By ${project.owner.first_name+" "+project.owner.last_name}</a></p>
                  
                  <p class="project--rating">
                    <span style="font-weight: bold;">${project.vote_ratio}%</span> Postitive
                    Feedback (${project.vote_total} Votes)
                  </p>
                  
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


let projectContainer = document.querySelector('#singleProject')

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
                <option >Select....</option>
                <option value="up">Up Vote</option>
                <option value="down">Down Vote</option>
            </select>
          </div>
          <div class="form__field">
          <label for="formInput#textarea">Comments: </label>
          <textarea class="input input--textarea" name="comment" id="comment"
              placeholder="Write your comments here..."></textarea>
          </div>
          <a href="javascript:;" onclick="addComment(${id});"><input class="btn btn--sub " type="submit"  value="Add Comment"/></a>
          </form>
    ` 
    commentContainer.innerHTML = comment
  }
};

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
    console.log(data)
    let response = await fetch('http://127.0.0.1:8000/add-review?id='+id, {
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