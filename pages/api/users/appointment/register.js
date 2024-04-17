import { apiHandler, appointmentsRepo } from 'helpers/api';

export default apiHandler({
    post: registerAppointment
});

async function registerAppointment(req, res) {
    try {
        // Crea una nueva cita utilizando los datos proporcionados en el cuerpo de la solicitud
        await appointmentsRepo.create(req.body);
        // Responde con un estado 200 y un cuerpo vacío para indicar éxito
        return res.status(200).json({});
    } catch (error) {
        // Maneja cualquier error que pueda ocurrir durante el proceso de registro
        console.error('Error al registrar la cita:', error);
        return res.status(500).json({ message: 'Error al registrar la cita' });
    }
}
