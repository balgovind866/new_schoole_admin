import { FC, useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import clsx from 'clsx'
import Select from 'react-select'

import { initialOrganization, OrganizationModel } from "../../core/_models"
import { useListView } from '../../core/ListViewProvider'
import { useQueryResponse } from '../../core/QueryResponseProvider'
import { DrawerComponent } from '../../../../../../_metronic/assets/ts/components'
import { isNotEmpty } from '../../../../../../_metronic/helpers'
import { createOrganization, updateOrganization } from '../../core/_requests'
import { ListLoading } from '../../../../shared/components/ListLoading'
import { AlertManager } from '../../../../shared/components/AlertManager'
import { getMessageByCode, OptionListModel } from '../../../../shared/models/_models'

type Props = {
    isOrganizationLoading: boolean
    organization: OrganizationModel
    categoryList: Array<OptionListModel>
}

const organizationSchema = Yup.object().shape({
    name: Yup.string()
        .required('Organization name is required'),
    category_id: Yup.string()
        .required('Category required'),
    alias: Yup.string()
        .max(10, 'Short Name shold be less than 10 characters')
        .required('Short Name required'),
})


const OrganizationForm: FC<Props> = ({ organization, isOrganizationLoading, categoryList }) => {

    const { setItemIdForUpdate, setAlertForDrawer, alertForDrawer } = useListView()
    const { refetch } = useQueryResponse()

    const [isFormCleared, setIsFormCleared] = useState(false);

    const [organizationState, setOrganizationState] = useState<OrganizationModel>(organization || initialOrganization)

    // Effect to update state when Organization prop changes
    useEffect(() => {
        setOrganizationState(organization || initialOrganization)
    }, [])

    const formik = useFormik({
        initialValues: organizationState,
        validationSchema: organizationSchema,
        enableReinitialize: true,
        onSubmit: async (values, { setSubmitting }) => {
            setSubmitting(true)
            try {
                if (isNotEmpty(values.organization_id)) {
                    const response = await updateOrganization(values)
                    if (response?.status_code === 200) {
                        setAlertForDrawer({
                            alertType: 'success',
                            alertMessage: getMessageByCode(200)?.message
                        })
                        clearForm()
                    } else {
                        setAlertForDrawer({
                            alertType: 'danger',
                            alertMessage: response?.errorMessage
                        })
                    }
                } else {
                    const response = await createOrganization(values)
                    if (response?.status_code === 200) {
                        setAlertForDrawer({
                            alertType: 'success',
                            alertMessage: getMessageByCode(201)?.message
                        })
                        clearForm()

                    } else {
                        setAlertForDrawer({
                            alertType: 'danger',
                            alertMessage: response?.errorMessage
                        })
                    }
                }
            } catch (error) {
                console.error(error)
                setAlertForDrawer({
                    alertType: 'danger',
                    alertMessage: getMessageByCode(500)?.message
                })
            } finally {
                setSubmitting(false)
            }
        }
    })

    const clearForm = (isCancel?: boolean) => {

        formik.resetForm({ values: initialOrganization })

        setItemIdForUpdate(undefined)
        setOrganizationState(initialOrganization)

        if (!isCancel) {
            refetch()
            setIsFormCleared(true)
        } else {
            const drawer = DrawerComponent.getInstance("kt_drawer_organization")
            drawer?.hide()
        }
    }

    useEffect(() => {
        if (isFormCleared) {
            const timeout = setTimeout(() => {
                setAlertForDrawer({
                    alertType: undefined,
                    alertHeading: undefined,
                    alertMessage: undefined,
                });
                setIsFormCleared(false); // Reset the state

                //Close Drawer
                const drawer = DrawerComponent.getInstance("kt_drawer_organization")
                drawer?.hide()


            }, 3000);

            return () => clearTimeout(timeout);
        }
    }, [isFormCleared]);

    const cancel = () => {
        clearForm(true);
    }

    return (
        <>
            <div className="card-body" id="kt_drawer_organization_form_body">
                <div
                    id='kt_organization_scroll'
                    className='position-relative scroll-y me-n5 pe-5'
                    data-kt-scroll='true'
                    data-kt-scroll-height='auto'
                    data-kt-scroll-wrappers='#kt_drawer_organization_form_body'
                    data-kt-scroll-dependencies='#kt_drawer_organization_form_header, #kt_drawer_organization_form_footer'
                    data-kt-scroll-offset='5px'
                >
                    {alertForDrawer && alertForDrawer.alertType && <AlertManager type={alertForDrawer.alertType} message={alertForDrawer.alertMessage ?? ''} />}

                    <form id='organization_form' className='form' onSubmit={formik.handleSubmit} noValidate>
                        <div className="d-flex flex-column scroll-y">
                            <div className='row mb-7'>
                                <div className="col-lg-4 fv-row">
                                    <label htmlFor='category_id' className="required fs-5 fw-semibold mb-2">Category</label>
                                    <Select options={categoryList}
                                        className='react-select-styled react-select-solid'
                                        classNamePrefix='react-select'
                                        data-control="select2"
                                        placeholder="Category"
                                        value={categoryList.find(option => option.value === formik.values.category_id) || null}
                                        onChange={selectedOption => formik.setFieldValue('category_id', selectedOption ? selectedOption.value : null)}
                                        isDisabled={formik.isSubmitting || isOrganizationLoading}
                                    />
                                    {formik.touched.category_id && formik.errors.category_id && (
                                        <div className='fv-plugins-message-container'>
                                            <div className='fv-help-block'>
                                                <span role="alert">{formik.errors.category_id}</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="col-lg-4 fv-row">
                                    <label htmlFor='name' className='required fw-bold fs-6 mb-2'>Organization Name</label>
                                    <input
                                        type="text"
                                        placeholder="Organization Name"
                                        {...formik.getFieldProps('name')}
                                        name='name'
                                        className={clsx(
                                            'form-control form-control-solid mb-3 mb-lg-0',
                                            { 'is-invalid': formik.touched.name && formik.errors.name },
                                            { 'is-valid': formik.touched.name && formik.errors.name }
                                        )}
                                        autoComplete="off"
                                        disabled={formik.isSubmitting || isOrganizationLoading} />
                                    {formik.touched.name && formik.errors.name && (
                                        <div className='fv-plugins-message-container'>
                                            <div className='fv-help-block'>
                                                <span role="alert">{formik.errors.name}</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="col-lg-4 fv-row">
                                    <label htmlFor='alias' className='required fw-bold fs-6 mb-2'>Short Name</label>
                                    <input
                                        type="text"
                                        placeholder="Short Name"
                                        {...formik.getFieldProps('alias')}
                                        name='alias'
                                        className={clsx(
                                            'form-control form-control-solid mb-3 mb-lg-0',
                                            { 'is-invalid': formik.touched.alias && formik.errors.alias },
                                            { 'is-valid': formik.touched.alias && formik.errors.alias }
                                        )}
                                        autoComplete="off"
                                        disabled={formik.isSubmitting || isOrganizationLoading} />
                                    {formik.touched.alias && formik.errors.alias && (
                                        <div className='fv-plugins-message-container'>
                                            <div className='fv-help-block'>
                                                <span role="alert">{formik.errors.alias}</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className='row mb-7'>
                                <div className="col-lg-4 fv-row">
                                    <label htmlFor='phone_number' className='fw-bold fs-6 mb-2'>Contact Number</label>
                                    <input
                                        type="text"
                                        placeholder="Contact Number"
                                        {...formik.getFieldProps('phone_number')}
                                        className='form-control form-control-solid mb-3 mb-lg-0'
                                        disabled={formik.isSubmitting || isOrganizationLoading} />
                                </div>
                                <div className="col-lg-4 fv-row">
                                    <label htmlFor='email' className='fw-bold fs-6 mb-2'>Email</label>
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        {...formik.getFieldProps('email')}
                                        className='form-control form-control-solid mb-3 mb-lg-0'
                                        disabled={formik.isSubmitting || isOrganizationLoading} />
                                </div>
                                <div className="col-lg-4 fv-row">
                                    <label htmlFor='registration_number' className='fw-bold fs-6 mb-2'>Registration Number</label>
                                    <input
                                        type="text"
                                        placeholder="Email"
                                        {...formik.getFieldProps('registration_number')}
                                        className='form-control form-control-solid mb-3 mb-lg-0'
                                        disabled={formik.isSubmitting || isOrganizationLoading} />
                                </div>
                            </div>
                            {/*  begin: Address  */}
                            <div className="card  mb-5 mb-xl-10">
                                {/*  begin::Card header  */}
                                <div className="card-header">
                                    {/*  begin::Title  */}
                                    <div className="card-title">
                                        <h3>Address</h3>
                                    </div>
                                    {/*  end::Title  */}
                                </div>
                                {/*  end::Card header  */}
                                {/*  begin::Card body  */}
                                <div className="card-body">
                                    <div className="row mb-6">
                                        <div className='col-lg-6'>
                                            <div className="d-flex flex-column mb-5 fv-row fv-plugins-icon-container">
                                                <label htmlFor='address.street_address_1' className="fs-5 fw-semibold mb-2">Address Line 1</label>
                                                <input
                                                    className="form-control form-control-solid"
                                                    placeholder="Address Line 1"
                                                    {...formik.getFieldProps('address.street_address_1')}
                                                />
                                            </div>
                                        </div>
                                        <div className='col-lg-6'>
                                            <div className="d-flex flex-column mb-5 fv-row fv-plugins-icon-container">
                                                <label htmlFor='address.street_address_2' className="fs-5 fw-semibold mb-2">Address Line 2</label>
                                                <input
                                                    className="form-control form-control-solid"
                                                    placeholder="Address Line 2"
                                                    {...formik.getFieldProps('address.street_address_2')} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mb-6">
                                        <div className='col-lg-3'>
                                            <div className="d-flex flex-column mb-5 fv-row fv-plugins-icon-container">
                                                <label htmlFor='address.city' className="fs-5 fw-semibold mb-2">City</label>
                                                <input
                                                    className="form-control form-control-solid"
                                                    placeholder="City"
                                                    {...formik.getFieldProps('address.city')}
                                                />
                                            </div>
                                        </div>
                                        <div className='col-lg-3'>
                                            <div className="d-flex flex-column mb-5 fv-row fv-plugins-icon-container">
                                                <label htmlFor='address.state' className="fs-5 fw-semibold mb-2">State</label>
                                                <input
                                                    className="form-control form-control-solid"
                                                    placeholder="State"
                                                    {...formik.getFieldProps('address.state')}
                                                />
                                            </div>
                                        </div>
                                        <div className='col-lg-3'>
                                            <div className="d-flex flex-column mb-5 fv-row fv-plugins-icon-container">
                                                <label htmlFor='address.zip_code' className="fs-5 fw-semibold mb-2">Zip Code</label>
                                                <input
                                                    className="form-control form-control-solid"
                                                    placeholder="Zip Code"
                                                    {...formik.getFieldProps('address.zip_code')}
                                                />
                                            </div>
                                        </div>
                                        <div className='col-lg-3'>
                                            <div className="d-flex flex-column mb-5 fv-row fv-plugins-icon-container">
                                                <label htmlFor='address.country' className="fs-5 fw-semibold mb-2">Country</label>
                                                <input
                                                    className="form-control form-control-solid"
                                                    placeholder="Country"
                                                    {...formik.getFieldProps('address.country')}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/*  end::Card body  */}
                            </div>
                            {/*  end::Address  */}
                        </div>
                        {/* begin::Actions */}
                        <div className="pt-15">
                            <button
                                type="reset"
                                onClick={() => cancel()}
                                className="btn btn-light me-3"
                                disabled={formik.isSubmitting || isOrganizationLoading}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={isOrganizationLoading || formik.isSubmitting || !formik.isValid || !formik.touched}
                            >
                                <span className="indicator-label">Submit</span>
                                {(formik.isSubmitting || isOrganizationLoading) && (
                                    <span className='indicator-progress'>
                                        Please wait ..... {' '}
                                        <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                                    </span>
                                )}
                            </button>
                        </div>
                        {/* end::Actions */}
                    </form>
                </div>
            </div>
            {(formik.isSubmitting || isOrganizationLoading) && <ListLoading />}
        </>
    )
}
export { OrganizationForm }