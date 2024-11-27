document.addEventListener("DOMContentLoaded", () => {
    const urlPath = window.location.pathname;

    if (urlPath.endsWith("add_edit.html")) {
        manejarFormulario();
    } else if (urlPath.endsWith("editar.html")) {
        manejarTabla();
    }
});

function manejarFormulario() {
    const params = new URLSearchParams(window.location.search);
    const opcion = params.get("opcion");
    const codigo = params.get("codigo");

    const tituloForm = document.getElementById("titulo-form") as HTMLHeadingElement;
    const codigoInput = document.getElementById("codigo") as HTMLInputElement;
    const nombreInput = document.getElementById("nombre") as HTMLInputElement;
    const edadInput = document.getElementById("edad") as HTMLInputElement;
    const ciudadInput = document.getElementById("ciudad") as HTMLInputElement;
    const imagenInput = document.getElementById("imagen") as HTMLInputElement;
    const form = document.getElementById("hero-form") as HTMLFormElement;

    if (opcion === "agregar") {
        tituloForm.textContent = "Agregar Nuevo Héroe";
        codigoInput.disabled = false;
    } else if (codigo) {
        // Lógica para editar
        tituloForm.textContent = "Editar Héroe";
        codigoInput.disabled = true;

        const heroData = localStorage.getItem(`hero-${codigo}`);
        if (heroData) {
            const heroe = JSON.parse(heroData);
            codigoInput.value = codigo;
            nombreInput.value = heroe.nombre;
            edadInput.value = heroe.edad.toString();
            ciudadInput.value = heroe.ciudad;
            imagenInput.value = heroe.imagen;
        } else {
            alert("No se encontró el héroe con el código proporcionado.");
            window.location.href = "editar.html";
        }
    }

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const heroe = {
            nombre: nombreInput.value,
            edad: parseInt(edadInput.value, 10),
            ciudad: ciudadInput.value,
            imagen: imagenInput.value,
        };

        const heroKey = `hero-${codigoInput.value}`;
        localStorage.setItem(heroKey, JSON.stringify(heroe));

        alert(opcion === "agregar" ? "Héroe agregado con éxito." : "Héroe editado con éxito.");
        window.location.href = "editar.html";
    });
}

function manejarTabla() {
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

                    const editarBtn = document.createElement("button");
                    editarBtn.classList.add("btn", "editar");
                    editarBtn.textContent = "Editar";

                    cellAcciones.appendChild(editarBtn);

                    editarBtn.addEventListener("click", () => {
                        window.location.href = `add_edit.html?codigo=${codigo}`;
                    });
                }
            }
        }
    }
}
