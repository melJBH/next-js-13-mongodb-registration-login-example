import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { vacationService, alertService } from 'services';

export { AddEdit };

function AddEdit(props) {
    const vacation = props?.vacation;
    const router = useRouter();

    // form validation rules
    const validationSchema = Yup.object().shape({
        userId: Yup.string().required('User ID is required'),
        startDate: Yup.date().required('Start Date is required'),
        endDate: Yup.date().required('End Date is required').min(Yup.ref('startDate'), 'End Date must be after Start Date'),
        status: Yup.string().required('Status is required').oneOf(['approved', 'pending', 'rejected'], 'Invalid status value'),
        comments: Yup.string()
    });

    const formOptions = { resolver: yupResolver(validationSchema) };

    // set default form values if in edit mode
    if (vacation) {
        formOptions.defaultValues = vacation;
    }

    // get functions to build form with useForm() hook
    const { register, handleSubmit, reset, formState } = useForm(formOptions);
    const { errors } = formState;

    async function onSubmit(data) {
        alertService.clear();
        try {
            // create or update vacation based on vacation prop
            let message;
            if (vacation) {
                await vacationService.update(vacation.id, data);
                message = 'Vacation updated';
            } else {
                await vacationService.create(data);
                message = 'Vacation added';
            }

            // redirect to vacation list with success message
            router.push('/vacation');
            alertService.success(message, true);
        } catch (error) {
            alertService.error(error);
            console.error(error);
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
                <label className="form-label">User ID</label>
                <input name="userId" type="text" {...register('userId')} className={`form-control ${errors.userId ? 'is-invalid' : ''}`} />
                <div className="invalid-feedback">{errors.userId?.message}</div>
            </div>
            <div className="mb-3">
                <label className="form-label">Start Date</label>
                <input name="startDate" type="date" {...register('startDate')} className={`form-control ${errors.startDate ? 'is-invalid' : ''}`} />
                <div className="invalid-feedback">{errors.startDate?.message}</div>
            </div>
            <div className="mb-3">
                <label className="form-label">End Date</label>
                <input name="endDate" type="date" {...register('endDate')} className={`form-control ${errors.endDate ? 'is-invalid' : ''}`} />
                <div className="invalid-feedback">{errors.endDate?.message}</div>
            </div>
            <div className="mb-3">
                <label className="form-label">Status</label>
                <select name="status" {...register('status')} className={`form-control ${errors.status ? 'is-invalid' : ''}`}>
                    <option value="">Select status</option>
                    <option value="approved">Approved</option>
                    <option value="pending">Pending</option>
                    <option value="rejected">Rejected</option>
                </select>
                <div className="invalid-feedback">{errors.status?.message}</div>
            </div>
            <div className="mb-3">
                <label className="form-label">Comments</label>
                <textarea name="comments" {...register('comments')} className="form-control" />
            </div>
            <div className="mb-3">
                <button type="submit" disabled={formState.isSubmitting} className="btn btn-primary me-2">
                    {formState.isSubmitting && <span className="spinner-border spinner-border-sm me-1"></span>}
                    Save
                </button>
                <button onClick={() => reset(formOptions.defaultValues)} type="button" disabled={formState.isSubmitting} className="btn btn-secondary">Reset</button>
                <button onClick={() => router.push('/vacation')} type="button" className="btn btn-link">Cancel</button>
            </div>
        </form>
    );
}
