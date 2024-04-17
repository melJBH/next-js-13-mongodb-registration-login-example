import { db } from 'helpers/api';

const Appointment = db.Appointment;

export const appointmentsRepo = {
    create,
    getAll,
    getById,
    update,
    delete: _delete
};

async function create(params) {
    try {
        return await Appointment.create(params);
    } catch (error) {
        throw error;
    }
}

async function getAll() {
    try {
        return await Appointment.find();
    } catch (error) {
        throw error;
    }
}

async function getById(id) {
    try {
        return await Appointment.findById(id);
    } catch (error) {
        throw error;
    }
}

async function update(id, params) {
    try {
        return await Appointment.findByIdAndUpdate(id, params, { new: true });
    } catch (error) {
        throw error;
    }
}

async function _delete(id) {
    try {
        await Appointment.findByIdAndDelete(id);
    } catch (error) {
        throw error;
    }
}