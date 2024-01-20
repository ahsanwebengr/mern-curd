import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../redux/features/user.slice";
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

const UserCreate = () => {
    const { register, handleSubmit, formState: { errors } } =
        useForm({
            mode: 'onChange',
            resolver: yupResolver(schema),
        });

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const createLoading = useSelector((state) => state?.user?.createUser?.isLoading);

    const onSubmit = async (data) => {
        const payload = {
            name: data.name,
            email: data.email,
            age: data.age,
        };

        dispatch(createUser({ payload, successCallBack: createUserSuccess }));
    };

    const createUserSuccess = (res) => {
        if (res.status) {
            navigate('/');
            toast.success(res?.message);
        } else {
            toast.error(res?.errors?.email);
        }
    };

    return (
        <div className="vh-100 d-flex align-items-center justify-content-center bg-primary">
            <div className="row w-100 align-items-center justify-content-center">
                <div className="col-md-5 bg-white shadow rounded p-3">
                    <BackButton />
                    <h2 className="mb-4 text-center">Add New User</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input
                                type="text"
                                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                {...register("name")}
                                placeholder="Enter Name"
                            />
                            {errors.name && <small className="invalid-feedback">{errors.name.message}</small>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="text"
                                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                {...register("email")}
                                placeholder="Enter Email"
                            />
                            {errors.email && <small className="invalid-feedback">{errors.email.message}</small>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="age" className="form-label">Age</label>
                            <input
                                type="number"
                                className={`form-control ${errors.age ? 'is-invalid' : ''}`}
                                {...register("age")}
                                placeholder="Enter Age"
                            />
                            {errors.age && <small className="invalid-feedback">{errors.age.message}</small>}
                        </div>

                        <button type="submit" className="btn btn-success">
                            {createLoading ? <Spinner /> : 'Submit'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UserCreate;
