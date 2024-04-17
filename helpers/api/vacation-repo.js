import { db } from 'helpers/api';

const Vacation = db.Vacation;

export const vacationRepo = {
    create,
    getAll,
    getById,
    update,
    delete: _delete
};

async function create(params) {
    try {
        return await Vacation.create(params);
    } catch (error) {
        throw error;
    }
}

async function getAll() {
    try {
        return await Vacation.find();
    } catch (error) {
        throw error;
    }
}

async function getById(id) {
    try {
        return await Vacation.findById(id);
    } catch (error) {
        throw error;
    }
}

async function update(id, params) {
    try {
        return await Vacation.findByIdAndUpdate(id, params, { new: true });
    } catch (error) {
        throw error;
    }
}

async function _delete(id) {
    try {
        await Vacation.findByIdAndDelete(id);
    } catch (error) {
        throw error;
    }
}