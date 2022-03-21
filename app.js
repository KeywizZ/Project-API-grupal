const baseUrl = "https://glacial-spire-78193.herokuapp.com/"

window.onload = () => {
    init();
}

let data;
let randomArtist;

const init = async () => {
    data = await getArtists();
    console.log(data)
    getAlbums();
}

const mainPage = () => {
    location.reload()
}

const getArtists = async () => {
    try {
        let data = await fetch("https://glacial-spire-78193.herokuapp.com/artist")
        let dataToJson = await data.json();
        return dataToJson
    } catch (error) {
        console.error("error", error);
    }
}

let divContainer = document.querySelector('.divContainer');
const printArtists = () => {
    divContainer.innerHTML = '';
    for (let i = 0; i < data.length; i++) {
        printArtist(data[i])
    }
}

const printArtist = (artist) => {
    let card = document.createElement('div');
    card.className = 'artistCard flexCard';

    console.log(artist.name)

    let name = document.createElement('h1');
    name.className = ('artistName');
    name.innerHTML = artist.name;
    card.appendChild(name);
    let albumsContainer = document.createElement('div')
    albumsContainer.className = 'albumsContainer'

    for (let i = 0; i < artist.albums.length; i++) {
        let album = document.createElement('div')
        album.className = 'albumContainer'
        albumName = document.createElement('h2')
        albumName.className = 'albumName'
        albumName.innerHTML = artist.albums[i].name
        album.appendChild(albumName);
        let imageContainer = document.createElement('div')
        imageContainer.className = 'imageContainer';
        let image = document.createElement('img');
        image.src = artist.albums[i].img;
        imageContainer.appendChild(image);
        album.appendChild(imageContainer);
        albumsContainer.appendChild(album);
    }
    card.appendChild(albumsContainer)
    divContainer.appendChild(card)
}

const getRandomArtist = async () => {
    divContainer.innerHTML = '';
    let data = await getArtists();
    let random = Math.floor(Math.random() * data.length);

    console.log(data.length)
    console.log(data[random].name)
    return printArtist(data[random])
}

const getAlbums = () => {
    let albums = [];
    for (let i = 0; i < data.length; i++) {
        albums.push(data[i].albums)
    }
}

const printAlbum = (album) => {
    let card = document.createElement('div');
    card.className = 'albumCard';

    console.log('Esto es el nomrbe del album: ' + album.name)

    let name = document.createElement('div');
    name.className = ('albumName');
    name.innerHTML = album.name;
    card.appendChild(name);
    divContainer.appendChild(card)
}

let genres = [];
const getGenres = () => {
    genres = [];
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].albums.length; j++) {
            if (!genres.includes(data[i].albums[j].genre)) {
                genres.push(data[i].albums[j].genre.toLowerCase())
            }
        }

    }
    console.log(genres)
    divContainer.innerHTML = '';
    for (let i = 0; i < genres.length; i++) {
        let genreContainer = document.createElement('div');
        genreContainer.className = 'genreContainer';
        genreContainer.innerHTML = genres[i].toUpperCase();
        genreContainer.setAttribute('onclick', `getAlbumsByGenre('${genres[i]}')`)
        divContainer.appendChild(genreContainer)
    }

}

const getAlbumsByGenre = (genre) => {
    divContainer.innerHTML = '';
    getGenres();
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].albums.length; j++) {
            if (data[i].albums[j].genre == genre) {
                printAlbum(data[i].albums[j])
                console.log('Genero imprimido: ' + data[i].albums[j].genre)
            }
        }
    }
}

/* ---------------------------------------- ANIMACIONES ----------------------------------- */

window.addEventListener('load', function (event) {
    var targetClassName = 'flex-wrap-anim';
    var defaultDuration = '0.3s';

    var divList = [];
    function addMotion(item, duration) {
        var top = item.offsetTop;
        var left = item.offsetLeft;
        setTimeout(function () {
            item.style.position = 'absolute';
            item.style.top = top + 'px';
            item.style.left = left + 'px';

            var movingDiv = document.createElement('div');
            movingDiv.classList.add(targetClassName + '-div');
            var rect = item.getBoundingClientRect();

            movingDiv.style.width = rect.width + 'px';
            movingDiv.style.height = rect.height + 'px';
            movingDiv.style.visibility = 'hidden';

            movingDiv['__' + targetClassName + '_pair'] = item;
            movingDiv['__' + targetClassName + '_duration'] = duration;
            item.parentNode.appendChild(movingDiv);
            divList.push(movingDiv);
        }, 0);
    }

    var conts = document.getElementsByClassName(targetClassName);
    for (var i = 0, max = conts.length; i < max; i++) {
        var cont = conts[i];
        cont.style.position = 'relative';
        var duration = cont.getAttribute('data-duration')
            || defaultDuration;
        var items = cont.getElementsByTagName('div');
        for (var i = 0, max = items.length; i < max; i++) {
            addMotion(items[i], duration);
        }
    }

    window.addEventListener('resize', function (event) {
        divList.forEach(function (movingDiv) {

            var item = movingDiv['__' + targetClassName + '_pair'];
            var duration = movingDiv['__' + targetClassName + '_duration'];

            if (item.offsetTop != movingDiv.offsetTop) {
                item.style.transition = 'all ' + duration;
                item.style.top = movingDiv.offsetTop + 'px';
                item.style.left = movingDiv.offsetLeft + 'px';
            } else {
                item.style.transition = '';
                item.style.left = movingDiv.offsetLeft + 'px';
            }
        });
    });
});


