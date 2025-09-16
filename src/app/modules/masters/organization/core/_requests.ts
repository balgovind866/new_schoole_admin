import axios, { AxiosResponse } from "axios";
import { OrganizationModel, OrganizationQueryResponse } from "./_models";
import { ID, Response } from "../../../../../_metronic/helpers";
import { OptionListResponse } from "../../../shared/models/_models";

const API_URL = import.meta.env.VITE_APP_API_BASE_URL
const ORGANIZATION_URL = `${API_URL}/organizations`;

const getOrganizationAll = (): Promise<OptionListResponse> => {
    return axios
        .get(`${API_URL}/organization-category/all`)
        .then((response: AxiosResponse<OptionListResponse>) => response.data)
}

const getOrganization = (query: string): Promise<OrganizationQueryResponse> => {
    return axios
        .get(`${ORGANIZATION_URL}/query?${query}`)
        .then((d: AxiosResponse<OrganizationQueryResponse>) => d.data);
};

const getOrganizationById = (id: ID): Promise<OrganizationModel | undefined> => {
    return axios
        .get(`${ORGANIZATION_URL}/${id}`)
        .then((response: AxiosResponse<Response<OrganizationModel>>) => response.data)
        .then((response: Response<OrganizationModel>) => response.data);
};

const createOrganization = (organization: OrganizationModel): Promise<OrganizationModel | undefined> => {
    return axios
        .post(ORGANIZATION_URL, organization)
        .then((response: AxiosResponse<Response<OrganizationModel>>) => response.data)
        .then((response: Response<OrganizationModel>) => response.data);
};

const updateOrganization = (organization: OrganizationModel): Promise<OrganizationModel | undefined> => {
    return axios
        .put(`${ORGANIZATION_URL}/${organization.organization_id}`, organization)
        .then((response: AxiosResponse<Response<OrganizationModel>>) => response.data)
        .then((response: Response<OrganizationModel>) => response.data);
};

export {
    getOrganizationAll,
    getOrganization,
    getOrganizationById,
    createOrganization,
    updateOrganization
}