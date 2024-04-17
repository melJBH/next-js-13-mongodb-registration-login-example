import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { appointmentService, alertService } from 'services';

export { AddEdit };

function AddEdit(props) {
    const appointment = props?.appointment; 
    const router = useRouter();

    // form validation rules
    const validationSchema = Yup.object().shape({
        dateTime: Yup.date().required('Date and time is required'),
        userId: Yup.string().required('User ID is required'),
        description: Yup.string().required('Description is required'),
        status: Yup.string().oneOf(['pending', 'completed', 'cancelled']).required('Status is required')
    });

    const formOptions = { resolver: yupResolver(validationSchema) };

    // set default form values if in edit mode
    if (appointment) {
        formOptions.defaultValues = appointment;
    }

    // get functions to build form with useForm() hook
    const { register, handleSubmit, reset, formState } = useForm(formOptions);
    const { errors } = formState;

    async function onSubmit(data) {
        alertService.clear();
        try {
            // create or update appointment based on appointment prop
            let message;
            if (appointment) {
                await appointmentService.update(appointment.id, data);
                message = 'Appointment updated';
            } else {
                await appointmentService.create(data);
                message = 'Appointment added';
            }

            // redirect to appointment list with success message
            router.push('/appointment');
            alertService.success(message, true);
        } catch (error) {
            alertService.error(error);
            console.error(error);
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
                <label className="form-label">Date and Time</label>
                <input name="dateTime" type="datetime-local" {...register('dateTime')} className={`form-control ${errors.dateTime ? 'is-invalid' : ''}`} />
                <div className="invalid-feedback">{errors.dateTime?.message}</div>
            </div>
            <div className="mb-3">
                <label className="form-label">User ID</label>
                <input name="userId" type="text" {...register('userId')} className={`form-control ${errors.userId ? 'is-invalid' : ''}`} />
                <div className="invalid-feedback">{errors.userId?.message}</div>
            </div>
            <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea name="description" {...register('description')} className={`form-control ${errors.description ? 'is-invalid' : ''}`} />
                <div className="invalid-feedback">{errors.description?.message}</div>
            </div>
            <div className="mb-3">
                <label className="form-label">Status</label>
                <select name="status" {...register('status')} className={`form-control ${errors.status ? 'is-invalid' : ''}`}>
                    <option value="">Select status</option>
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                </select>
                <div className="invalid-feedback">{errors.status?.message}</div>
            </div>
            <div className="mb-3">
                <button type="submit" disabled={formState.isSubmitting} className="btn btn-primary me-2">
                    {formState.isSubmitting && <span className="spinner-border spinner-border-sm me-1"></span>}
                    Save
                </button>
                <button onClick={() => reset(formOptions.defaultValues)} type="button" disabled={formState.isSubmitting} className="btn btn-secondary">Reset</button>
                <button onClick={() => router.push('/appointment')} type="button" className="btn btn-link">Cancel</button>
            </div>
        </form>
    );
}