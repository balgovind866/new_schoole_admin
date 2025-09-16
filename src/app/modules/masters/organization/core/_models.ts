import { ID, Response } from "../../../../../_metronic/helpers"
import { AddressModel, initialAddress, StatusEnum } from "../../../shared/models/_models"

export type OrganizationModel = {
    organization_id?: ID
    category_id?: string | null
    name?: string
    alias?: string
    registration_number?: string
    phone_number?: string
    email?: string
    address_id?: number | undefined
    status?: StatusEnum
    address?: AddressModel
    created_at?: string
    updated_at?: string
}

export type OrganizationQueryResponse = Response<Array<OrganizationModel>>

export const initialOrganization: OrganizationModel = {
    organization_id: undefined,
    category_id: null,
    name: '',
    alias: '',
    registration_number: '',
    phone_number: '',
    email: '',
    address_id: undefined,
    status: '',
    address: { ...initialAddress }
}