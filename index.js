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
document.addEventListener("DOMContentLoaded", () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield getAllCharacters();
    data.forEach((character) => {
        console.log(character);
        // Crear contenedor principal para cada personaje
        const characterCont = document.createElement("div");
        characterCont.classList.add("character-cont");
        // Crear contenedor para la imagen y la información del personaje
        const backgroundCont = document.createElement("div");
        const imagenCont = document.createElement("div");
        const informacion = document.createElement("div");
        backgroundCont.classList.add("backgroundCont");
        imagenCont.classList.add("imagenCont");
        informacion.classList.add("informacion");
        // Crear y asignar elementos para la imagen y la información del personaje
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
        // Añadir elementos a los contenedores correspondientes
        imagenCont.appendChild(image);
        informacion.appendChild(name);
        // Añadir contenedores al contenedor principal del personaje
        characterCont.appendChild(backgroundCont);
        backgroundCont.appendChild(imagenCont);
        characterCont.appendChild(informacion);
        // Añadir contenedor principal del personaje al contenedor principal de la página
        containerImg.appendChild(characterCont);
        characterCont.addEventListener("click", (ev) => {
            ev.preventDefault();
            // Crear contenedor para la información adicional del personaje
            const difuminado = document.createElement("div");
            const cuadroInformacion = document.createElement("div");
            // Asignar clases
            difuminado.className = "difuminado";
            cuadroInformacion.className = "cuadro_informacion";
            // Agregar elementos al cuadro de información
            cuadroInformacion.appendChild(name.cloneNode(true));
            cuadroInformacion.appendChild(ki.cloneNode(true));
            cuadroInformacion.appendChild(maxki.cloneNode(true));
            cuadroInformacion.appendChild(raza.cloneNode(true));
            cuadroInformacion.appendChild(genero.cloneNode(true));
            cuadroInformacion.appendChild(descripcion.cloneNode(true));
            cuadroInformacion.appendChild(afiliacion.cloneNode(true));
            // Agregar cuadro de información al difuminado
            difuminado.appendChild(cuadroInformacion);
            // Agregar difuminado al body como último hijo
            document.body.appendChild(difuminado);
            // Establecer estilos CSS para el difuminado
            difuminado.style.position = 'fixed';
            difuminado.style.left = '0';
            difuminado.style.width = '100vw';
            difuminado.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'; // Fondo semi-transparente
            // Calcular la posición top del difuminado
            const scrollY = window.scrollY || window.pageYOffset;
            const windowHeight = window.innerHeight;
            const difuminadoHeight = difuminado.clientHeight;
            // Ajustar posición top del difuminado para que aparezca en la parte inferior visible
            difuminado.style.top = `${scrollY + windowHeight - difuminadoHeight}px`;
            // Deshabilitar scroll del body mientras esté abierto el difuminado
            document.body.style.overflow = 'hidden';
            // Evento para cerrar el difuminado al hacer clic fuera de él
            difuminado.addEventListener('click', (ev) => {
                if (ev.target === difuminado) {
                    difuminado.remove();
                    // Restaurar scroll del body
                    document.body.style.overflow = '';
                }
            });
        });
    });
}));
const getAllCharacters = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch("https://dragonball-api.com/api/characters");
    let data = yield response.json();
    return data.items;
});
export {};
