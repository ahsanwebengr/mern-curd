import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { deleteUser, getAllUsers } from "../redux/features/user.slice";
import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";
import { FaEye, FaRegEdit, FaPlus } from "react-icons/fa";

const Users = () => {
    const [users, setUsers] = useState([]);
    const dispatch = useDispatch();

    const allUserSuccess = (res) => {
        const getUsers = res?.data;
        setUsers(getUsers);
    };


    useEffect(() => {
        dispatch(getAllUsers({ successCallBack: allUserSuccess }));
    }, [dispatch]);

    const handleDelete = (id) => {
        const deleteSuccess = (res) => {
            const confirmation = confirm('Are you sure you want to delete');
            if (confirmation) {
                toast.success(res.message);
                dispatch(getAllUsers({ successCallBack: allUserSuccess }));
            } else {
                toast.success(res.message);
            }
        };
        dispatch(deleteUser({ id, successCallBack: deleteSuccess }));

    };

    return (
        <div className="vh-100 d-flex align-items-center justify-content-center bg-primary">
            <div className="row w-100 justify-content-center">
                <div className="col-md-8 rounded shadow p-3 bg-white">
                    <Link to={'/create'} className="btn btn-success d-inline-flex align-items-center gap-2">Add <FaPlus /> </Link>
                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">No.</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Age</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users?.length > 0 ? (
                                    users?.map((user, index) => {
                                        const { name, email, age, _id } = user;
                                        return (
                                            <tr key={_id}>
                                                <td>{index + 1}</td>
                                                <td>{name}</td>
                                                <td>{email}</td>
                                                <td>{age}</td>
                                                <td>
                                                    <Link to={`update/${_id}`} className="btn btn-warning me-2"><FaRegEdit /></Link>
                                                    <button className="btn btn-danger me-2" onClick={() => handleDelete(_id)}> <MdDelete /> </button>
                                                    <Link to={`view/${_id}`} className="btn btn-secondary me-2"><FaEye /></Link>
                                                </td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="text-center fs-3">
                                            No Record found...
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Users;
