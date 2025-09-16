import * as Yup from "yup"
import Select from "react-select"
import { FC, useEffect, useState } from "react"
import { useFormik } from "formik"
import { useNavigate } from "react-router-dom"
import { useListView } from "../../core/ListViewProvider"
import { useQueryResponse } from "../../core/QueryResponseProvider"
import { AlertManager } from "../../../shared/components/AlertManager"
import { getMessageByCode } from "../../../shared/models/_models"
import { ListLoading } from "../../../shared/components/ListLoading"
import { DrawerComponent } from "../../../../../_metronic/assets/ts/components"
import { CourtModel, initialCourt } from "../../core/_model"
import { createCourt, updateCourt } from "../../core/_requests"

// ✅ Validation schema
const courtSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    address: Yup.string().required("Address is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
    country: Yup.string().required("Country is required"),
    postal_code: Yup.string().required("Postal code is required"),
    latitude: Yup.number().required("Latitude is required"),
    longitude: Yup.number().required("Longitude is required"),
    court_type: Yup.string().required("Court type is required"),
})

type Props = {
    isCourtLoading: boolean
    courtData: CourtModel
}

const CourtForm: FC<Props> = ({ courtData, isCourtLoading }) => {
    const { setAlertForDrawer, alertForDrawer, setItemIdForUpdate } = useListView()
    const [isFormCleared, setIsFormCleared] = useState(false)
    const [courtForEdit, setCourtForEdit] = useState<CourtModel>(courtData || initialCourt)
    const navigate = useNavigate()
    const { refetch } = useQueryResponse()

    useEffect(() => {
        setCourtForEdit(courtData)
    }, [courtData])

    const formik = useFormik({
        initialValues: courtForEdit,
        validationSchema: courtSchema,
        enableReinitialize: true,
        onSubmit: async (values, { setSubmitting }) => {
            setSubmitting(true)
            try {
                let response
                if (!values.club_id) {
                    response = await createCourt(values)
                    navigate("/courts-management")
                } else {
                    response = await updateCourt(values)
                }

                setAlertForDrawer({
                    alertType: response ? "success" : "danger",
                    alertMessage: getMessageByCode(response ? 200 : 500)?.message,
                })

                clearForm()
            } catch (error) {
                console.error("Error during API call:", error)
                setAlertForDrawer({
                    alertType: "danger",
                    alertMessage: getMessageByCode(500)?.message,
                })
            } finally {
                setSubmitting(false)
            }
        },
    })

    const clearForm = (isCancel?: boolean) => {
        formik.resetForm({ values: initialCourt })
        setItemIdForUpdate(undefined)
        setCourtForEdit(initialCourt)
        if (!isCancel) {
            refetch()
            setIsFormCleared(true)
        } else {
            const drawer = DrawerComponent.getInstance("kt_drawer_court")
            drawer?.hide()
        }
    }

    useEffect(() => {
        if (isFormCleared) {
            const timeout = setTimeout(() => {
                setAlertForDrawer({ alertType: undefined, alertHeading: undefined, alertMessage: undefined })
                setIsFormCleared(false)
                const drawer = DrawerComponent.getInstance("kt_drawer_court")
                drawer?.hide()
            }, 3000)
            return () => clearTimeout(timeout)
        }
    }, [isFormCleared])

    const cancel = () => clearForm(true)

    // Example court type options
    const courtTypeOptions = [
        { value: "indoor", label: "Indoor" },
        { value: "outdoor", label: "Outdoor" },
    ]

    return (
        <>
            <div className="card-body">
                {alertForDrawer?.alertType && (
                    <AlertManager type={alertForDrawer.alertType} message={alertForDrawer.alertMessage ?? ""} />
                )}

                <form id="court_form" className="form" onSubmit={formik.handleSubmit} noValidate>
                    <div className="d-flex flex-column scroll-y">
                        {/* Name */}
                        <div className="fv-row mb-7">
                            <label className="required fs-5 fw-semibold mb-2">Name</label>
                            <input
                                type="text"
                                className="form-control form-control-solid"
                                placeholder="Enter court name"
                                {...formik.getFieldProps("name")}
                                disabled={formik.isSubmitting || isCourtLoading}
                            />
                            {formik.touched.name && formik.errors.name && (
                                <div className="fv-help-block text-danger">{formik.errors.name}</div>
                            )}
                        </div>

                        {/* Address */}
                        <div className="fv-row mb-7">
                            <label className="required fs-5 fw-semibold mb-2">Address</label>
                            <input
                                type="text"
                                className="form-control form-control-solid"
                                placeholder="Enter address"
                                {...formik.getFieldProps("address")}
                                disabled={formik.isSubmitting || isCourtLoading}
                            />
                            {formik.touched.address && formik.errors.address && (
                                <div className="fv-help-block text-danger">{formik.errors.address}</div>
                            )}
                        </div>

                        {/* City, State, Country */}
                        <div className="fv-row mb-7">
                            <label className="required fs-5 fw-semibold mb-2">City</label>
                            <input
                                type="text"
                                className="form-control form-control-solid"
                                placeholder="Enter city"
                                {...formik.getFieldProps("city")}
                                disabled={formik.isSubmitting || isCourtLoading}
                            />
                            {formik.touched.city && formik.errors.city && (
                                <div className="fv-help-block text-danger">{formik.errors.city}</div>
                            )}
                        </div>

                        <div className="fv-row mb-7">
                            <label className="required fs-5 fw-semibold mb-2">State</label>
                            <input
                                type="text"
                                className="form-control form-control-solid"
                                placeholder="Enter state"
                                {...formik.getFieldProps("state")}
                                disabled={formik.isSubmitting || isCourtLoading}
                            />
                            {formik.touched.state && formik.errors.state && (
                                <div className="fv-help-block text-danger">{formik.errors.state}</div>
                            )}
                        </div>

                        <div className="fv-row mb-7">
                            <label className="required fs-5 fw-semibold mb-2">Country</label>
                            <input
                                type="text"
                                className="form-control form-control-solid"
                                placeholder="Enter country"
                                {...formik.getFieldProps("country")}
                                disabled={formik.isSubmitting || isCourtLoading}
                            />
                            {formik.touched.country && formik.errors.country && (
                                <div className="fv-help-block text-danger">{formik.errors.country}</div>
                            )}
                        </div>

                        {/* Postal Code */}
                        <div className="fv-row mb-7">
                            <label className="required fs-5 fw-semibold mb-2">Postal Code</label>
                            <input
                                type="text"
                                className="form-control form-control-solid"
                                placeholder="Enter postal code"
                                {...formik.getFieldProps("postal_code")}
                                disabled={formik.isSubmitting || isCourtLoading}
                            />
                            {formik.touched.postal_code && formik.errors.postal_code && (
                                <div className="fv-help-block text-danger">{formik.errors.postal_code}</div>
                            )}
                        </div>

                        {/* Latitude & Longitude */}
                        <div className="fv-row mb-7">
                            <label className="required fs-5 fw-semibold mb-2">Latitude</label>
                            <input
                                type="number"
                                step="0.000001"
                                className="form-control form-control-solid"
                                {...formik.getFieldProps("latitude")}
                                disabled={formik.isSubmitting || isCourtLoading}
                            />
                            {formik.touched.latitude && formik.errors.latitude && (
                                <div className="fv-help-block text-danger">{formik.errors.latitude}</div>
                            )}
                        </div>

                        <div className="fv-row mb-7">
                            <label className="required fs-5 fw-semibold mb-2">Longitude</label>
                            <input
                                type="number"
                                step="0.000001"
                                className="form-control form-control-solid"
                                {...formik.getFieldProps("longitude")}
                                disabled={formik.isSubmitting || isCourtLoading}
                            />
                            {formik.touched.longitude && formik.errors.longitude && (
                                <div className="fv-help-block text-danger">{formik.errors.longitude}</div>
                            )}
                        </div>

                        {/* Court Type */}
                        <div className="fv-row mb-7">
                            <label className="required fs-5 fw-semibold mb-2">Court Type</label>
                            <Select
                                options={courtTypeOptions}
                                value={courtTypeOptions.find(o => o.value === formik.values.court_type) || null}
                                onChange={opt => formik.setFieldValue("court_type", opt?.value ?? "")}
                                className="react-select-styled react-select-solid"
                                classNamePrefix="react-select"
                                placeholder="Select court type"
                                isDisabled={formik.isSubmitting || isCourtLoading}
                            />
                            {formik.touched.court_type && formik.errors.court_type && (
                                <div className="fv-help-block text-danger">{formik.errors.court_type}</div>
                            )}
                        </div>

                        {/* Optional Fields */}
                        <div className="fv-row mb-7">
                            <label className="fs-5 fw-semibold mb-2">Facilities</label>
                            <textarea
                                className="form-control form-control-solid"
                                placeholder="Enter facilities"
                                {...formik.getFieldProps("facilities")}
                                disabled={formik.isSubmitting || isCourtLoading}
                            />
                        </div>

                        <div className="fv-row mb-7">
                            <label className="fs-5 fw-semibold mb-2">Alias</label>
                            <input
                                type="text"
                                className="form-control form-control-solid"
                                placeholder="Enter alias"
                                {...formik.getFieldProps("alias")}
                                disabled={formik.isSubmitting || isCourtLoading}
                            />
                        </div>

                        {/* Active & Featured */}
                        <div className="fv-row mb-7 d-flex gap-5">
                            <div className="form-check form-check-custom form-check-solid">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    checked={formik.values.is_active}
                                    onChange={() => formik.setFieldValue("is_active", !formik.values.is_active)}
                                    disabled={formik.isSubmitting || isCourtLoading}
                                />
                                <label className="form-check-label">Active</label>
                            </div>

                            <div className="form-check form-check-custom form-check-solid">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    checked={formik.values.is_featured}
                                    onChange={() => formik.setFieldValue("is_featured", !formik.values.is_featured)}
                                    disabled={formik.isSubmitting || isCourtLoading}
                                />
                                <label className="form-check-label">Featured</label>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="pt-15">
                        <button
                            type="reset"
                            onClick={cancel}
                            className="btn btn-light me-3"
                            disabled={formik.isSubmitting || isCourtLoading}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={isCourtLoading || formik.isSubmitting || !formik.isValid}
                        >
                            <span className="indicator-label">Submit</span>
                            {(formik.isSubmitting || isCourtLoading) && (
                                <span className="indicator-progress">
                                    Please wait...
                                    <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                                </span>
                            )}
                        </button>
                    </div>
                </form>
            </div>

            {(formik.isSubmitting || isCourtLoading) && <ListLoading />}
        </>
    )
}

export default CourtForm
