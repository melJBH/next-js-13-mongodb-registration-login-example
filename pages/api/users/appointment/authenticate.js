import { apiHandler, appointmentsRepo } from 'helpers/api';

export default apiHandler({
    post: authenticateAppointment
});

async function authenticateAppointment(req, res) {
    try {
        // Autentica la cita utilizando los datos proporcionados en el cuerpo de la solicitud
        const appointment = await appointmentsRepo.authenticate(req.body);
        // Responde con un estado 200 y el objeto de cita autenticada en formato JSON
        return res.status(200).json(appointment);
    } catch (error) {
        // Maneja cualquier error que pueda ocurrir durante el proceso de autenticación
        console.error('Error al autenticar la cita:', error);
        return res.status(500).json({ message: 'Error al autenticar la cita' });
    }
}
