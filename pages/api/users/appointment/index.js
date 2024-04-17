import { apiHandler, appointmentsRepo } from 'helpers/api';

export default apiHandler({
    get: getAll
});

async function getAll(req, res) {
    const appointments = await appointmentsRepo.getAll();
    return res.status(200).json(appointments);
}