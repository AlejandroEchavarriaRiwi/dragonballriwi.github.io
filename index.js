var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const containerImg = document.querySelector(".container-img");
const body = document.querySelector("body");
let currentPage = 1;
const charactersPerPage = 8;
document.addEventListener("DOMContentLoaded", () => __awaiter(void 0, void 0, void 0, function* () {
    yield loadCharacters(currentPage);
    createPaginationButtons();
}));
const getAllCharacters = (page, limit) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(`https://dragonball-api.com/api/characters?page=${page}&limit=${limit}`);
    let data = yield response.json();
    return data.items;
});
const loadCharacters = (page) => __awaiter(void 0, void 0, void 0, function* () {
    containerImg.innerHTML = '';
    const data = yield getAllCharacters(page, charactersPerPage);
    data.forEach((character) => {
        console.log(character);
        const characterCont = document.createElement("div");
        characterCont.classList.add("character-cont");
        const backgroundCont = document.createElement("div");
        const imagenCont = document.createElement("div");
        const informacion = document.createElement("div");
        backgroundCont.classList.add("backgroundCont");
        imagenCont.classList.add("imagenCont");
        informacion.classList.add("informacion");
        const name = document.createElement("p");
        const image = document.createElement("img");
        const ki = document.createElement("p");
        const maxki = document.createElement("p");
        const raza = document.createElement("p");
        const genero = document.createElement("p");
        const descripcion = document.createElement("p");
        const afiliacion = document.createElement("p");
        name.innerHTML = `${character.name}`;
        image.src = character.image;
        image.className = "image";
        ki.innerText = `Ki: ${character.ki}`;
        maxki.innerText = `MaxKi: ${character.maxKi}`;
        raza.innerHTML = `Raza: ${character.race}`;
        genero.innerText = `Genero: ${character.gender}`;
        descripcion.innerText = `Descripcion: ${character.description}`;
        afiliacion.innerText = `Afiliacion: ${character.affiliation}`;
        imagenCont.appendChild(image);
        informacion.appendChild(name);
        characterCont.appendChild(backgroundCont);
        backgroundCont.appendChild(imagenCont);
        characterCont.appendChild(informacion);
        containerImg.appendChild(characterCont);
        characterCont.addEventListener("click", (ev) => {
            ev.preventDefault();
            const difuminado = document.createElement("div");
            const cuadroInformacion = document.createElement("div");
            difuminado.className = "difuminado";
            cuadroInformacion.className = "cuadro_informacion";
            cuadroInformacion.appendChild(name.cloneNode(true));
            cuadroInformacion.appendChild(ki.cloneNode(true));
            cuadroInformacion.appendChild(maxki.cloneNode(true));
            cuadroInformacion.appendChild(raza.cloneNode(true));
            cuadroInformacion.appendChild(genero.cloneNode(true));
            cuadroInformacion.appendChild(descripcion.cloneNode(true));
            cuadroInformacion.appendChild(afiliacion.cloneNode(true));
            difuminado.appendChild(cuadroInformacion);
            document.body.appendChild(difuminado);
            difuminado.style.position = 'fixed';
            difuminado.style.left = '0';
            difuminado.style.width = '100vw';
            difuminado.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'; // Fondo semi-transparente
            const scrollY = window.scrollY || window.pageYOffset;
            const windowHeight = window.innerHeight;
            const difuminadoHeight = difuminado.clientHeight;
            difuminado.style.top = `${scrollY + windowHeight - difuminadoHeight}px`;
            document.body.style.overflow = 'hidden';
            difuminado.addEventListener('click', (ev) => {
                if (ev.target === difuminado) {
                    difuminado.remove();
                    document.body.style.overflow = '';
                }
            });
        });
    });
});
const createPaginationButtons = () => {
    const paginationContainer = document.createElement("div");
    paginationContainer.className = "pagination-container";
    const prevButton = document.createElement("button");
    prevButton.innerText = "Anterior";
    prevButton.addEventListener("click", () => {
        if (currentPage > 1) {
            currentPage--;
            loadCharacters(currentPage);
        }
    });
    const nextButton = document.createElement("button");
    nextButton.innerText = "Siguiente";
    nextButton.addEventListener("click", () => {
        currentPage++;
        loadCharacters(currentPage);
    });
    paginationContainer.appendChild(prevButton);
    paginationContainer.appendChild(nextButton);
    document.body.appendChild(paginationContainer);
};
export {};
