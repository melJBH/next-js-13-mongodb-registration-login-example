import { apiHandler, usersRepo } from 'helpers/api';

export default apiHandler({
    get: getAll
});

async function getAll(req, res) {
    const users = await usersRepo.getAll();
    // Mapeamos cada usuario para agregar los nuevos campos
    const usersWithAdditionalInfo = users.map(user => ({
        ...user.toJSON(), // Convertimos el objeto Mongoose a JSON
        email: user.email,
        role: user.role,
        registrationDate: user.registrationDate
    }));

    return res.status(200).json(usersWithAdditionalInfo);
}