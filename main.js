let form = document.getElementById("form");

form.addEventListener('submit', function(e) {
  e.preventDefault();
  document.querySelector('.content').innerHTML = '';

  let search = document.getElementById("search").value

  fetch(`https://api.github.com/search/repositories?q=${search}&per_page=10`)
  .then((result) => result.json())
  .then((data) => {
    if (data.items.length == 0) {
      document.querySelector('.info').innerHTML = `<p class = "red">Ничего не найдено</p>`;
    } else {
      document.querySelector('.info').innerHTML = `<p>Найдено ${data.items.length} репозиториев: </p>`;
    }
    data.items.forEach(element => {
      let rep = document.createElement('div')
      rep.classList.add('rep');
      rep.innerHTML = `<a target="_blank" href="${element.html_url}">${element.name}</a>
      <p>Автор: ${element.owner.login}</p>
      <p>Просмотры: ${element.watchers}</p>`;
      document.querySelector('.content').appendChild(rep);
    });
  });
})