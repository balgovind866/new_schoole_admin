import { useNavigate } from "react-router-dom"


const VendorToolbar = () => {
 
    const navigate = useNavigate()

    return(
        <div className="d-flex align-items-center gap-2 gap-lg-3">
        <a
          href="#"
          onClick={() => navigate("/vendors/create")}
          className="btn btn-sm fw-bold btn-primary"
        >
          Create
        </a>
      </div>
    )
}

export {VendorToolbar}