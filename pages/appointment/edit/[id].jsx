import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { Layout, AddEdit } from 'components/appointment'; // Asegúrate de importar el componente AddEditAppointment correcto
import { Spinner } from 'components';
import { appointmentService, alertService } from 'services';

export default Edit;

function Edit() {
    const router = useRouter();
    const [appointment, setAppointment] = useState(null);

    useEffect(() => {
        const { id } = router.query;
        if (!id) return;

        // fetch appointment and set default form values if in edit mode
        appointmentService.getById(id)
            .then(appointment => setAppointment(appointment))
            .catch(error => alertService.error(error.message || 'Error fetching appointment'));
    }, [router]);

    return (
        <Layout>
            <h1>Edit Appointment</h1>
            {appointment ? <AddEdit appointment={appointment} /> : <Spinner />}
        </Layout>
    );
}
