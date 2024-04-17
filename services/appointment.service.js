import { BehaviorSubject } from 'rxjs';
import getConfig from 'next/config';

import { fetchWrapper } from 'helpers';

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/appointment`;
const appointmentSubject = new BehaviorSubject(typeof window !== 'undefined' && JSON.parse(localStorage.getItem('appointment')));

export const appointmentService = {
    appointment: appointmentSubject.asObservable(),
    get appointmentValue() { return appointmentSubject.value },
    create,
    getAll,
    getById,
    update,
    delete: _delete
};

async function create(appointment) {
    await fetchWrapper.post(baseUrl, appointment);
}

async function getAll() {
    return await fetchWrapper.get(baseUrl);
}

async function getById(id) {
    return await fetchWrapper.get(`${baseUrl}/${id}`);
}

async function update(id, params) {
    await fetchWrapper.put(`${baseUrl}/${id}`, params);
}

// prefixed with underscored because delete is a reserved word in javascript
async function _delete(id) {
    await fetchWrapper.delete(`${baseUrl}/${id}`);
}
