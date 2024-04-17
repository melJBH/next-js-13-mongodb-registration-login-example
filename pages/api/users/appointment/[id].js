import { apiHandler, appointmentsRepo } from 'helpers/api';

export default apiHandler({
    get: getById,
    put: update,
    delete: _delete
});

async function getById(req, res) {
    const appointment = await appointmentsRepo.getById(req.query.id);

    if (!appointment) throw 'Appointment Not Found';

    return res.status(200).json(appointment);
}

async function update(req, res) {
    await appointmentsRepo.update(req.query.id, req.body);
    return res.status(200).json({});
}

async function _delete(req, res) {
    await appointmentsRepo.delete(req.query.id);
    return res.status(200).json({});
}
