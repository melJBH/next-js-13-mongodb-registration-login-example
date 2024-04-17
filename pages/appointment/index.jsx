import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Spinner } from 'components';
import { Layout } from 'components/appointment';
import { appointmentService } from 'services';

export default Index;

function Index() {
    const [appointment, setAppointment] = useState(null);

    useEffect(() => {
        appointmentService.getAll().then(x => setAppointment(x));
    }, []);

    function deleteAppointment(id) {
        setAppointment(appointment.map(x => {
            if (x.id === id) { x.isDeleting = true; }
            return x;
        }));
        appointmentService.delete(id).then(() => {
            setAppointment(appointments => appointments.filter(x => x.id !== id));
        });
    }

    return (
        <Layout>
            <h1>Medical Appointments</h1>
            <Link href="/appointment/add" className="btn btn-sm btn-success mb-2">Add Appointment</Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '30%' }}>Date and Time</th>
                        <th style={{ width: '30%' }}>User ID</th>
                        <th style={{ width: '30%' }}>Description</th>
                        <th style={{ width: '10%' }}>Status</th>
                        <th style={{ width: '10%' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {appointment && appointment.map(appointment =>
                        <tr key={appointment.id}>
                            <td>{appointment.dateTime}</td>
                            <td>{appointment.userId}</td>
                            <td>{appointment.description}</td>
                            <td>{appointment.status}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <Link href={`/appointment/edit/${appointment.id}`} className="btn btn-sm btn-primary me-1">Edit</Link>
                                <button onClick={() => deleteAppointment(appointment.id)} className="btn btn-sm btn-danger btn-delete-appointment" style={{ width: '60px' }} disabled={appointment.isDeleting}>
                                    {appointment.isDeleting
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>Delete</span>
                                    }
                                </button>
                            </td>
                        </tr>
                    )}
                    {!appointment &&
                        <tr>
                            <td colSpan="5">
                                <Spinner />
                            </td>
                        </tr>
                    }
                    {appointment && !appointment.length &&
                        <tr>
                            <td colSpan="5" className="text-center">
                                <div className="p-2">No Appointments To Display</div>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </Layout>
    );
}
