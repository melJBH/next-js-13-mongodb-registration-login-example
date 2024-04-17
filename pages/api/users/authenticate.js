import { apiHandler, usersRepo } from 'helpers/api';

export default apiHandler({
    post: authenticate
});

async function authenticate(req, res) {
    const user = await usersRepo.authenticate(req.body);
    // Desestructurar el objeto user y agregar las nuevas propiedades al objeto de respuesta
    const { email, role, registrationDate, ...rest } = user;
    const userWithAdditionalInfo = {
        ...rest,
        email,
        role,
        registrationDate
    };

    return res.status(200).json(userWithAdditionalInfo);
}