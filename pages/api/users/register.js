import { apiHandler, usersRepo } from 'helpers/api';

export default apiHandler({
    post: register
});

async function register(req, res) {
    // Extraer los campos del cuerpo de la solicitud
    const { username, password, firstName, lastName, email, role, registrationDate } = req.body;

    // Crear un objeto con los campos requeridos
    const params = {
        username,
        password,
        firstName,
        lastName,
        email,
        role,
        registrationDate
    };

    try {
        // Crear el usuario con los nuevos campos
        await usersRepo.create(params);
        // Devolver una respuesta exitosa
        return res.status(200).json({ message: 'User registered successfully' });
    } catch (error) {
        // Manejar errores si ocurren
        return res.status(500).json({ message: error.message });
    }
}