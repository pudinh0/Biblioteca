export class ValidacionError extends Error {
    constructor(public readonly detalles: String[]) {
        super('La peticion no cumplio con el contrato establecido');
        this.name = 'ValidationError';
    }
}