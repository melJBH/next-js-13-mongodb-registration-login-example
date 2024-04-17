import { apiHandler, vacationRepo } from 'helpers/api';

export default apiHandler({
    get: getAll
});

async function getAll(req, res) {
    try {
        const vacation = await vacationRepo.getAll();
        return res.status(200).json(vacation);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
