import { Field, FieldArray, ErrorMessage } from "formik";

export const ParentInfo = () => {
  return (
    <FieldArray name="parent_info">
      {({ push, remove, form }) => (
        <div>
          {form.values.parent_info.map((_: any, index: number) => (
            <div key={index} className="border p-3 mb-3 rounded">
              <div className="mb-2">
                <label>First Name</label>
                <Field name={`parent_info.${index}.first_name`} className="form-control" />
                <ErrorMessage name={`parent_info.${index}.first_name`} component="div" className="text-danger" />
              </div>

              <div className="mb-2">
                <label>Last Name</label>
                <Field name={`parent_info.${index}.last_name`} className="form-control" />
                <ErrorMessage name={`parent_info.${index}.last_name`} component="div" className="text-danger" />
              </div>

              <div className="mb-2">
                <label>Email</label>
                <Field name={`parent_info.${index}.email`} className="form-control" />
                <ErrorMessage name={`parent_info.${index}.email`} component="div" className="text-danger" />
              </div>

              <div className="mb-2">
                <label>Phone</label>
                <Field name={`parent_info.${index}.phone_number`} className="form-control" />
                <ErrorMessage name={`parent_info.${index}.phone_number`} component="div" className="text-danger" />
              </div>

              <div className="mb-2">
                <label>Relationship</label>
                <Field name={`parent_info.${index}.relationship`} className="form-control" />
                <ErrorMessage name={`parent_info.${index}.relationship`} component="div" className="text-danger" />
              </div>

              <button type="button" className="btn btn-danger" onClick={() => remove(index)}>
                Remove
              </button>
            </div>
          ))}

          <button
            type="button"
            className="btn btn-primary"
            onClick={() => push({ first_name: "", last_name: "", email: "", phone_number: "", relationship: "" })}
          >
            Add Parent
          </button>
        </div>
      )}
    </FieldArray>
  );
};
