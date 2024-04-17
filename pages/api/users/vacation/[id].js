import { apiHandler, vacationRepo } from 'helpers/api';

export default apiHandler({
    get: getById,
    put: update,
    delete: _delete
});

async function getById(req, res) {
    const vacation = await vacationRepo.getById(req.query.id);

    if (!vacation) throw 'Vacation Not Found';

    return res.status(200).json(vacation);
}

async function update(req, res) {
    await vacationRepo.update(req.query.id, req.body);
    return res.status(200).json({});
}

async function _delete(req, res) {
    await vacationRepo.delete(req.query.id);
    return res.status(200).json({});
}