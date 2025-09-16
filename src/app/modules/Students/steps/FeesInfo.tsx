// ./steps/FeesInfo.tsx
import { Field } from "formik";

export const FeesInfo = () => {
  return (
    <>
      <h4 className="mb-5">Fees Info</h4>
      <div className="mb-3">
        <label className="form-label">Fees Structure ID</label>
        <Field name="fees_info.fees_structure_id" type="number" className="form-control" />
      </div>
    </>
  );
};
