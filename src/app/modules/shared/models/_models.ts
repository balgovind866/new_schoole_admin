import { ID } from "../../../../_metronic/helpers"

export type OptionListModel = {
    value?: string | number
    label?: string
}

export const initialOptionList: OptionListModel[] = [
    { value: '', label: '' }
]

export type ResponseOptionList<T> = {
    data?: T
}

export type OptionListResponse = ResponseOptionList<Array<OptionListModel>>

export type AddressModel = {
    address_id?: ID
    entity_type?: EntityEnum
    entity_id?: Number
    street_address_1?: string
    street_address_2?: string
    city?: string
    state?: string
    zip_code?: string
    country?: string
}

export const initialAddress: AddressModel = {
    address_id: 0,
    entity_type: '',
    entity_id: 0,
    street_address_1: '',
    street_address_2: '',
    city: '',
    state: '',
    country: '',
    zip_code: ''
}


export type AlertType = '' | 'success' | 'warning' | 'danger' | 'processing' | 'info'

export interface AlertModel {
    alertType?: AlertType
    alertHeading?: string
    alertMessage?: string
}

export interface MessageModel {
    code: Number
    state: 'success' | 'danger' | 'warning'
    message: string
}

export const defaultMessages: Array<MessageModel> = [
    { code: 200, state: 'success', message: 'Record Updgated Successfully!' },
    { code: 201, state: 'success', message: 'Record Created Successfully!' },
    { code: 500, state: 'danger', message: 'An error occurred while processing your request.' }
]

export const getMessageByCode = (code: Number) => {
    return defaultMessages.find(i => i.code === code)
}

export const initialAlertModel: AlertModel = {
    alertType: undefined,
    alertHeading: undefined,
    alertMessage: undefined
}

export type ResponseModel<T> = {
    status_code?: Number,
    code?: Number,
    errorMessage?: string
    message?: string
    data?: T
}

export type StatusEnum = '' | 'active' | 'inactive' | 'suspended'
export type EntityEnum = '' | 'student' | 'teacher' | 'parent' | 'vender'

export type RelationshipEnum = '' | 'Father' | 'Mother' | 'Guardian'
