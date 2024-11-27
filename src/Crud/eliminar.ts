import '../style.css';
import '../Controlador/TLista';

document.addEventListener("DOMContentLoaded", () => {
    ListarDesdeLocalStorage();
});

function ListarDesdeLocalStorage() {
    const tabla = document.querySelector<HTMLTableElement>('#tabla-H tbody');
    if (tabla) {
        tabla.innerHTML = '';

        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key?.startsWith('hero-')) {
                const heroData = localStorage.getItem(key);
                if (heroData) {
                    const heroe = JSON.parse(heroData);

                    const row = tabla.insertRow();
                    const cellCodigo = row.insertCell(0);
                    const cellNombre = row.insertCell(1);
                    const cellEdad = row.insertCell(2);
                    const cellCiudad = row.insertCell(3);
                    const cellImagen = row.insertCell(4);
                    const cellAcciones = row.insertCell(5);

                    const codigo = key.replace('hero-', '');
                    cellCodigo.textContent = codigo;
                    cellNombre.textContent = heroe.nombre;
                    cellEdad.textContent = heroe.edad.toString();
                    cellCiudad.textContent = heroe.ciudad;

                    const img = document.createElement("img");
                    img.src = heroe.imagen;
                    img.alt = heroe.nombre;
                    img.style.width = "50px";
                    img.style.height = "50px";
                    cellImagen.appendChild(img);

                    const eliminarBtn = document.createElement("button");
                    eliminarBtn.classList.add("btn", "eliminar");
                    eliminarBtn.textContent = "Eliminar";

                    cellAcciones.appendChild(eliminarBtn);

                    eliminarBtn.addEventListener("click", () => {
                        localStorage.removeItem(key);

                        row.remove();
                    });
                }
            }
        }
    }
}
