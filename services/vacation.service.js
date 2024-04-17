import { BehaviorSubject } from 'rxjs';
import getConfig from 'next/config';

import { fetchWrapper } from 'helpers';

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/vacation`;
const vacationSubject = new BehaviorSubject(typeof window !== 'undefined' && JSON.parse(localStorage.getItem('vacation')));

export const vacationService = {
    vacation: vacationSubject.asObservable(),
    get vacationValue() { return vacationSubject.value },
    create,
    getAll,
    getById,
    update,
    delete: _delete
};

async function create(vacation) {
    await fetchWrapper.post(baseUrl, vacation);
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

// Prefixed with underscored because delete is a reserved word in JavaScript
async function _delete(id) {
    await fetchWrapper.delete(`${baseUrl}/${id}`);
}