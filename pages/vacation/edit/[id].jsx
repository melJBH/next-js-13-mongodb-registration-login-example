import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { Layout, AddEdit } from 'components/vacation';
import { Spinner } from 'components';
import { vacationService, alertService } from 'services';

export default Edit;

function Edit() {
    const router = useRouter();
    const [vacation, setVacation] = useState(null);

    useEffect(() => {
        const { id } = router.query;
        if (!id) return;

        // Fetch vacation and set default form values if in edit mode
        vacationService.getById(id)
            .then(data => setVacation(data))
            .catch(error => alertService.error(error.message));
    }, [router]);

    return (
        <Layout>
            <h1>Edit Vacation</h1>
            {vacation ? <AddEdit vacation={vacation} /> : <Spinner />}
        </Layout>
    );
}
