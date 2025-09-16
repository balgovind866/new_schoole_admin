import { useNavigate } from "react-router-dom";


const AllStudentTollbar = () => {
   const navigate = useNavigate();
  return (
   <div className='d-flex align-items-center gap-2 gap-lg-3'>
            <a
                href='#'
                onClick={() => navigate('/student/create')}
                className='btn btn-sm fw-bold btn-primary'
            >
                Create
            </a>
        </div>
  );
};



export default AllStudentTollbar;