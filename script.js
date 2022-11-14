var form = document.getElementById("github-form");
document.addEventListener("DOMContentLoaded", localStorageRead);
const clear = document.getElementById("clear-last-users");
clear.addEventListener("click", localStorageDelete);

form.addEventListener("submit", function (e) {
  e.preventDefault();
  var search = document.getElementById("githubname").value;

  fetch("https://api.github.com/users/" + search)
    .then((result) => result.json())
    .then((data) => {
      const cardbody = document.getElementById("profile");
      const row = `<div class="row">
        <div class="col-md-4">
          <a href="https://github.com/users/${data.login}" target="_blank">
            <img class="img-fluid img-thumbnail rounded mb-2 full-width" src="${data.avatar_url}" />
          </a>
        </div>
        <div class="col-md-8">
          <h5 id="fullName">
            <strong>${data.name}</strong>
          </h5>

          <hr />

          <a href="" class="btn btn-secondary" target="_blank">
            Takipçi <span class="badge badge-light">${data.followers}</span>
          </a>

          <a href="" class="btn btn-info" target="_blank">
            Takip Edilen <span class="badge badge-light">${data.following}</span>
          </a>

          <a href="" class="btn btn-danger" target="_blank">
            Repolar <span class="badge badge-light">${data.public_repos}</span>
          </a>

          <hr />

          <ul class="list-group">
            <li class="list-group-item borderzero">
              <img src="" width="30px" /> <span id="company">${data.company}</span>
            </li>

            <li class="list-group-item borderzero">
              <img src="" width="30px" />
              <span id="location">${data.location} </span>
            </li>

            <li class="list-group-item borderzero">
              <img src="" width="30px" />
              <span id="mail">${data.email}</span>
            </li>
          </ul>
        </div>
      </div>`;
      cardbody.innerHTML = row;
    });

  fetch("https://api.github.com/users/" + search + "/repos")
    .then((result) => result.json())
    .then((data) => {
      const reposBody = document.getElementById("repos");
      reposBody.innerHTML = "";
      data.forEach(function (data) {
        const body = `<div class="row">
            <div class="col-md-6">
              <a href="${data.html_url}" target="_blank"
                id="repoName">${data.name}</a>
            </div>
            <div class="col-md-6 text-right">
              <button class="btn btn-secondary mb-3">
                Starlar <span class="badge badge-light" id="repoStar">${data.stargazers_count}</span>
              </button>
              <button class="btn btn-info mb-3">
                Forklar <span class="badge badge-light" id="repoFork">${data.forks_count}</span>
              </button>
            </div>
          </div>`;
        reposBody.insertAdjacentHTML("beforeend", body);
      });
    });
  localStorageAdd(search);
});

function addlastUser(local) {
  const lastUser = document.getElementById("last-users");
  const addLastUser = `<li class="list-group-item searched-li">${local}</li>`;
  lastUser.insertAdjacentHTML("beforeend", addLastUser);
}

function localStorageAdd(save) {
  let local;
  if (localStorage.getItem("local") === null) {
    local = [];
  } else {
    local = JSON.parse(localStorage.getItem("local"));
  }
  local.push(save);
  localStorage.setItem("local", JSON.stringify(local));
}
function localStorageRead() {
  let local;
  if (localStorage.getItem("local") === null) {
    local = [];
  } else {
    local = JSON.parse(localStorage.getItem("local"));
  }
  local.forEach(function (local) {
    addlastUser(local);
  });
}
function localStorageDelete() {
  console.log("localdeleteçalıştı");
  let local;
  if (localStorage.getItem("local") === null) {
    local = [];
  } else {
    local = JSON.parse(localStorage.getItem("local"));
  }
  localStorage.clear();
}

form.addEventListener("submit", useradd);
function useradd() {
  var search = document.getElementById("githubname").value;
  const lastUser = document.getElementById("last-users");
  const addLastUser = `<li class="list-group-item searched-li">${search}</li>`;
  lastUser.insertAdjacentHTML("beforeend", addLastUser);
  form.reset();
}
clear.addEventListener("click", userDelete);
const child = document.getElementById("last-users");
function userDelete() {
  while (child.firstChild) {
    child.removeChild(child.lastChild);
  }
}
