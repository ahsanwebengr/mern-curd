import { IoArrowBackSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
    const navigate = useNavigate();
    return (
        <div className="mb-4">
            <button className="btn btn-secondary" onClick={() => navigate('/')}> <IoArrowBackSharp /> </button>
        </div>
    );
};

export default BackButton;