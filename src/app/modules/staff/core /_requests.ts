import axios, { AxiosResponse } from "axios";
import { ID, Response } from "../../../../_metronic/helpers";
import { CourtModel } from "./_model";
import { ResponseModel } from "../../shared/models/_models";

const API_URL = import.meta.env.VITE_APP_API_BASE_URL;
const COURTS_URL = `${API_URL}/courts`;

// ==================== GET court list with query ====================
const getCourtsList = (query: string): Promise<CourtModel> => {
  console.log(`Requesting: ${COURTS_URL}?${query}`);
  return axios
    .get(`${COURTS_URL}?${query}`)
    .then((res: AxiosResponse<CourtModel>) => res.data)
    .catch((error) => {
      console.error("Error fetching court list:", error);
      throw error;
    });
};

// ==================== GET court by ID ====================
const getCourtById = (id: ID): Promise<ResponseModel<CourtModel>> => {
  return axios
    .get(`${COURTS_URL}/${id}`)
    .then((res: AxiosResponse<ResponseModel<CourtModel>>) => res.data)
    .catch((error) => {
      console.error(`Error fetching court by ID ${id}:`, error);
      throw error;
    });
};


// ==================== GET court by alias ====================
const getCourtByAlias = (alias: string): Promise<ResponseModel<CourtModel> | undefined> => {
  return axios
    .get(`${COURTS_URL}/details/${alias}`)
    .then((res: AxiosResponse<Response<ResponseModel<CourtModel>>>) => res.data)
    .then((res: Response<ResponseModel<CourtModel>>) => res.data)
    .catch((error) => {
      console.error(`Error fetching court by alias ${alias}:`, error);
      throw error;
    });
};

// ==================== CREATE new court (admin) ====================
const createCourt = (court: CourtModel): Promise<ResponseModel<CourtModel> | undefined> => {
  return axios
    .post(`${API_URL}/admin/courts`, court)
    .then((res: AxiosResponse<Response<ResponseModel<CourtModel>>>) => res.data)
    .then((res: Response<ResponseModel<CourtModel>>) => res.data);
};

// ==================== UPDATE court (admin) ====================
const updateCourt = (court: CourtModel): Promise<ResponseModel<CourtModel> | undefined> => {
  return axios
    .put(`${API_URL}/admin/courts/${court.club_id}`, court)
    .then((res: AxiosResponse<Response<ResponseModel<CourtModel>>>) => res.data)
    .then((res: Response<ResponseModel<CourtModel>>) => res.data);
};

// ==================== DELETE court (admin) ====================
const deleteCourt = (id: ID): Promise<ResponseModel<null> | undefined> => {
  return axios
    .delete(`${API_URL}/admin/courts/${id}`)
    .then((res: AxiosResponse<Response<ResponseModel<null>>>) => res.data)
    .then((res: Response<ResponseModel<null>>) => res.data);
};

// ==================== MARK favorite court ====================
const markFavoriteCourt = (userId: ID, courtId: ID): Promise<ResponseModel<null> | undefined> => {
  return axios
    .post(`${API_URL}/users/${userId}/favorite-courts`, { court_id: courtId })
    .then((res: AxiosResponse<Response<ResponseModel<null>>>) => res.data)
    .then((res: Response<ResponseModel<null>>) => res.data);
};

// ==================== GET favorite courts ====================
const getUserFavoriteCourts = (userId: ID): Promise<ResponseModel<CourtModel[]> | undefined> => {
  return axios
    .get(`${API_URL}/users/${userId}/favorite-courts`)
    .then((res: AxiosResponse<Response<ResponseModel<CourtModel[]>>>) => res.data)
    .then((res: Response<ResponseModel<CourtModel[]>>) => res.data);
};

// ==================== Nearby courts ====================
const getNearbyCourts = (lat: number, lng: number, radius?: number): Promise<ResponseModel<CourtModel[]> | undefined> => {
  const params = new URLSearchParams({ latitude: lat.toString(), longitude: lng.toString() });
  if (radius) params.append("radius", radius.toString());

  return axios
    .get(`${COURTS_URL}/nearby?${params.toString()}`)
    .then((res: AxiosResponse<Response<ResponseModel<CourtModel[]>>>) => res.data)
    .then((res: Response<ResponseModel<CourtModel[]>>) => res.data); 
};

// ==================== Search courts ====================
const searchCourts = (query: string): Promise<ResponseModel<CourtModel[]> | undefined> => {
  return axios
    .get(`${COURTS_URL}/search?query=${encodeURIComponent(query)}`)
    .then((res: AxiosResponse<Response<ResponseModel<CourtModel[]>>>) => res.data)
    .then((res: Response<ResponseModel<CourtModel[]>>) => res.data);
};

export {
  getCourtsList,
  getCourtById,
  getCourtByAlias,
  createCourt,
  updateCourt,
  deleteCourt,
  markFavoriteCourt,
  getUserFavoriteCourts,
  getNearbyCourts,
  searchCourts,
};
