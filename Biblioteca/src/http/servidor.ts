import expres from 'express';
import { InMemoryPrestamoRepository } from '../infra/in-memory-prestamo.repository.js';
import { PrestamoService } from '../servicios/prestamo.service.js';
import { aResponseDto, ErrorResponseDTO } from '../contrato/prestamo-response.dto.js';
import { validarCrearPrestamo } from './validar.js';
import { EjemplarPrestadoError } from '../errores/ejemplar-prestado.error.js';

const PORT = 3000;

const repositorio = new InMemoryPrestamoRepository();
const servicio = new PrestamoService(repositorio);

const app = expres();

app.use(expres.json());
app.use(expres.static('dist/cliente'));

app.get('/api/prestamos', async (req, res) => {
    const libroId = req.query.libroId;

    if (typeof libroId !== 'string' || libroId.trim() === '') {
        const error: ErrorResponseDTO = {
            error: "PARAMETRO_FALTANTE",
            mensaje: "Se requiere el parametro faltante"
        };
        res.status(400).json(error);
        return;
    }

    const prestamos = await servicio.listarPorLibro(libroId);
    res.status(200).json(prestamos.map(aResponseDto));
});

app.post('/api/prestamos', async (req, res) => {
    try {
        const dto = validarCrearPrestamo(req.body);
        const prestamo = await servicio.crear(dto);
        res.status(201).json(aResponseDto(prestamo));
    } catch (err) {
        if (err instanceof EjemplarPrestadoError) {
            const error: ErrorResponseDTO = {
                error: "EJEMPLAR_PRESTADO",
                mensaje: err.message
            };
            res.status(409).json(error);
            return;
        }

        const error: ErrorResponseDTO = {
            error: "DATOS_INVALIDOS",
            mensaje: err instanceof Error ? err.message : "Error inesperado"
        };
        res.status(400).json(error);
    }
});

app.listen(PORT, () => {
    console.log("El servidor esta corriendo en puerto " + PORT);
});