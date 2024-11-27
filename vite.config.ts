import { defineConfig } from 'vite'

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: 'index.html',
                eliminar: 'eliminar.html',
                editar: 'editar.html',
                agregar: 'add_edit.html',
            }
        }
    }
})