import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { updateUser, getSingleUser } from "../redux/features/user.slice";
import Spinner from "./Spinner";
import toast from "react-hot-toast";
import BackButton from "./BackButton";

const schema = yup.object().shape({
    name: yup.string().required('Name is required'),
    email: yup.string().required('Email is required').email('Invalid email Pattern'),
    age: yup
        .string()
        .required('Age is required')
        .matches(/^[0-9]+$/, 'Age must contain only numeric characters')
        .test('maxDigits', 'Age must be less than 3 digits', value => (value && value.length <= 2)),
});

const UserUpdate = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const updateLoading = useSelector((state) => state?.user?.updateUser?.isLoading);

    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        mode: 'onChange',
        resolver: yupResolver(schema),

    });

    const onSubmit = async (data) => {
        const userData = {
            name: data.name,
            email: data.email,
            age: data.age,
        };

        const updateSuccess = (res) => {
            if (res.status) {
                navigate('/');
                toast.success(res.message);
            } else {
                toast.error(res.message);
            }
        };

        try {
            await dispatch(updateUser({ id, payload: userData, successCallBack: updateSuccess }));
        } catch (error) {
            console.error('Update user failed:', error);
        }
    };

    useEffect(() => {
        const moveRouter = (res) => {
            setValue('name', res?.user?.name);
            setValue('email', res?.user?.email);
            setValue('age', res?.user?.age);
        };
        dispatch(getSingleUser({ id, successCallBack: moveRouter }));
    }, [dispatch, id, setValue]);

    return (
        <div className="vh-100 d-flex align-items-center justify-content-center bg-primary">
            <div className="row w-100 align-items-center justify-content-center">
                <div className="col-md-5 bg-white shadow rounded p-3">
                    <BackButton />
                    <h2 className="mb-4 text-center">Update User Details</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input
                                type="text"
                                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                {...register("name", { required: 'Name is required' })}
                                placeholder="Enter Name"
                            />
                            {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="email"
                                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                {...register("email", { required: 'Email is required', pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email address' } })}
                                placeholder="Enter Email"
                            />
                            {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="age" className="form-label">Age</label>
                            <input
                                type="number"
                                className={`form-control ${errors.age ? 'is-invalid' : ''}`}
                                {...register("age", { required: 'Age is required', min: { value: 1, message: 'Age must be at least 1' }, max: { value: 99, message: 'Age must be at most 99' } })}
                                placeholder="Enter Age"
                            />
                            {errors.age && <div className="invalid-feedback">{errors.age.message}</div>}
                        </div>

                        <button type="submit" className="btn btn-success">
                            {updateLoading ? <Spinner /> : 'Update'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UserUpdate;
