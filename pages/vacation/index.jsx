import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Spinner } from 'components';
import { Layout } from 'components/vacation';
import { vacationService } from 'services';

export default Index;

function Index() {
    const [vacation, setVacations] = useState(null);

    useEffect(() => {
        vacationService.getAll().then(data => setVacations(data));
    }, []);

    function deleteVacation(id) {
        setVacations(vacation.map(vacation => {
            if (vacation.id === id) { vacation.isDeleting = true; }
            return vacation;
        }));
        vacationService.delete(id).then(() => {
            setVacations(vacation => vacation.filter(vacation => vacation.id !== id));
        });
    }

    return (
        <Layout>
            <h1>Vacations</h1>
            <Link href="/vacation/add" className="btn btn-sm btn-success mb-2">Add Vacation</Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '20%' }}>Date and Time</th>
                        <th style={{ width: '20%' }}>User ID</th>
                        <th style={{ width: '40%' }}>Description</th>
                        <th style={{ width: '10%' }}>Status</th>
                        <th style={{ width: '10%' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {vacation ? (
                        vacation.map(vacation => (
                            <tr key={vacation.id}>
                                <td>{vacation.dateTime}</td>
                                <td>{vacation.userId}</td>
                                <td>{vacation.description}</td>
                                <td>{vacation.status}</td>
                                <td style={{ whiteSpace: 'nowrap' }}>
                                    <Link href={`/vacation/edit/${vacation.id}`} className="btn btn-sm btn-primary me-1">Edit</Link>
                                    <button onClick={() => deleteVacation(vacation.id)} className="btn btn-sm btn-danger btn-delete-vacation" style={{ width: '60px' }} disabled={vacation.isDeleting}>
                                        {vacation.isDeleting
                                            ? <span className="spinner-border spinner-border-sm"></span>
                                            : <span>Delete</span>
                                        }
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="text-center">
                                <Spinner />
                            </td>
                        </tr>
                    )}
                    {vacation && !vacation.length && (
                        <tr>
                            <td colSpan="5" className="text-center">
                                <div className="p-2">No Vacations To Display</div>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </Layout>
    );
}
