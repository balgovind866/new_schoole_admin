import { ID, Response } from "../../../../_metronic/helpers"
import { AddressModel, initialAddress as importedInitialAddress } from "../../shared/models/_models"

// Define the Vendor model
export type VendorModel = {
    vendor_id?: ID
    company_name?: string
    representative_name?: string
    contact_number?: string
    email?: string
    vendor_type?: string
    registration_number?: string
    gst_number?: string
    contract_start_date?: Date
    contract_end_date?: Date
    created_at?: Date
    updated_at?: Date
    address?: AddressModel
}

// Define Vendor view model to display simplified information
export type VendorViewModel = {
    vendor_id?: ID
    company_name?: string
    representative_name?: string
    email?: string
    contact_number?: string
    vendor_type?: string
    registration_number?: string
    gst_number?: string
    contract_start_date?: string
    contract_end_date?: string
}

// Define response type for querying Vendor
export type VendorQueryResponse = Response<Array<VendorViewModel>>

// Initial Vendor model with default values
export const initialVendor: VendorModel = {
    vendor_id: 0,
    company_name: '',
    representative_name: '',
    contact_number: '',
    email: '',
    vendor_type: '',
    registration_number: '',
    gst_number: '',
    contract_start_date: undefined,
    contract_end_date: undefined,
    created_at: undefined,
    updated_at: undefined,
    address: importedInitialAddress
}

// Initial Address model with default values (assuming initialAddress is already defined in _models)
export const initialAddress: AddressModel = {
    street_address_1: '',
    street_address_2: '',
    city: '',
    state: '',
    zip_code: '',
    country: ''
}
