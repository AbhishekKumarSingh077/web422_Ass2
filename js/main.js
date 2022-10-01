/********************************************************************************** 
* WEB422 – Assignment 2 
* I declare that this assignment is my own work in accordance with Seneca Academic Policy. 
* No part of this assignment has been copied manually or electronically from any other source 
* (including web sites) or distributed to other students. 
* 
* Name: ABHISHEK KUMAR SINGH Student ID: 133410209 Date: 30-09-2022
* Cyclic Link: 
* 
***********************************************************************************/

let page = 1;
const perPage = 10;

function loadMovieData(title = null) {
  let url = title ? `https://light-scrubs-lamb.cyclic.app/api/movies?page=${page}&perPage=${perPage}&title=${title}` : `https://light-scrubs-lamb.cyclic.app/api/movies?page=${page}&perPage=${perPage}`
    let ulE = document.querySelector('.pagination');

    title ? ulE.classList.add("d-none") : ulE.classList.remove("d-none");

    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            let addRows = `
        ${data.map(add => (
                `<tr data-id=${add._id}>
             <td>${add.year}</td>
             <td>${add.title}</td>
             <td>${add.plot ? add.plot : 'N/A'}</td>
             <td>${add.rated ? add.rated : 'N/A'}</td>
             <td>${Math.floor(add.runtime / 60)}:${(add.runtime % 60).toString().padStart(2, '0')}</td>
             </tr>`
            )).join('')}
        `;
            document.querySelector('#moviesTable tbody').innerHTML = addRows;
            document.querySelector('#current-page').innerHTML = page;

            document.querySelectorAll('#moviesTable tbody tr').forEach(row => {
                row.addEventListener("click", (e) => {
                    let clickedId = row.getAttribute("data-id");
                    fetch(`https://light-scrubs-lamb.cyclic.app/api/movies/${clickedId}`).
                        then((res) => res.json())
                        .then(data => {
                            if(data.poster){
                                display = `<img class="img-fluid w-100" src=${data.poster}><br><br><strong>Directed By:</strong> ${data.directors.join(",")}<br><br><p>${data.fullplot}</p><strong>Cast:</strong> ${data.cast ? data.cast.join(',') : 'N/A'}<br><br><strong>Awards:</strong> ${data.awards.text}<br><strong>IMDB Rating:</strong> ${data.imdb.rating} (${data.imdb.votes} votes)`;
                              }
                              else{
                                display = `<strong>Directed By:</strong> ${data.directors.join(",")}<br><br><p>${data.fullplot}</p><strong>Cast:</strong> ${data.cast ? data.cast.join(',') : 'N/A'}<br><br><strong>Awards:</strong> ${data.awards.text}<br><strong>IMDB Rating:</strong> ${data.imdb.rating} (${data.imdb.votes} votes)`;
                              }
                
                            document.querySelector('#detailsModal .modal-title').innerHTML = data.title;
                            document.querySelector("#detailsModal .modal-body").innerHTML = display;

                            let modal = new bootstrap.Modal(document.getElementById("detailsModal"), {
                                backdrop: "static",
                                keyboard: false
                            });
                            modal.show();

                        });

                });
            });
        });
}





document.addEventListener('DOMContentLoaded', function () {
  loadMovieData();

  document.querySelector('#searchForm').addEventListener('submit', function(e){
        e.preventDefault();
        loadMovieData(document.querySelector("#title").value);
    });

  document.getElementById("previous-page").addEventListener("click", function (e) {
      if (page > 1) {
          page--;
          loadMovieData();
      }
  })

  document.getElementById("next-page").addEventListener("click", function (e) {
    page++;
    loadMovieData();
  })

  document.querySelector('#clearForm').addEventListener('click', function(e){
    e.preventDefault();
    document.querySelector('#searchForm').reset();
    loadMovieData();
});

});





