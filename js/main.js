function getData(url) {

    fetch(url)
        .then(function (response) {
            console.log(response)
            return response.json()
        })
        .then(function (data) {
            console.log(data)
            renderPokemons(data)
        })
        .catch(function (err) {
            console.log("Error: ", err)
        })
}
function renderPokemons(data) {
    const { results, next, previous } = data;
    const prevBtn = document.querySelector('#prevBtn');
    const nextBtn = document.querySelector('#nextBtn');
    prevBtn.onclick = function () {
        getData(previous);
    }
    nextBtn.onclick = function () {
        getData(next);
    }
    if (next === null) {
        nextBtn.setAttribute('disabled', true)
    } else {
        nextBtn.removeAttribute('disabled')
    }
    if (previous === null) {
        prevBtn.setAttribute('disabled', true)
    } else {
        prevBtn.removeAttribute('disabled')
    }

    const ul = document.querySelector('ul');
    ul.innerHTML = ""
    results.forEach(item => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        
        
        a.innerText = item.name;
        li.appendChild(a);
        ul.appendChild(li)
        li.addEventListener('click', function (e) {
            console.log(e.target.innerText)
            let pokeName = e.target.innerText
            const url = 'https://pokeapi.co/api/v2/pokemon'
            const photoUrl = document.querySelector('img')
            async function gatherInfo() {
                const response = await fetch(url)
                const data = await response.json()
                data.results.forEach(async function (e) {
                   if(pokeName==e.name){
                       console.log(pokeName)
                       const response2 = await fetch(e.url)
                    const data2 = await response2.json()
                    const id = data2.id
                    photoUrl.srcset = (`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`)
                   }
                })
            }
            gatherInfo()
        })
    });
}
getData('https://pokeapi.co/api/v2/pokemon')




