import axios from "axios";
import { SalesReportRequest } from "/@src/utils/interfaces/reports";
import { newUser, newUserStatus } from "/@src/utils/interfaces/schema";

const BASE_URL = import.meta.env.VITE_API_BASE_URL
const BASE_URL_CLOUD_FUNCTION = import.meta.env.VITE_CLOUD_FUNCTION_BASE_URL;
const BASE_AON_URL_CLOUD_FUNCTION = import.meta.env.VITE_AON_CLOUD_FUNCTION_BASE_URL;
const SEND_PRINT_PDF = import.meta.env.VITE_SEND_PRINT_PDF;
const SEND_PRINT_ACCESO = import.meta.env.VITE_SEND_PRINT_ACCESO;

/** INIT AUTH */
export const tryLogin = async (email: string, password: string) => {
  try {
    const body = { email, password };
    const { data } = await axios.post(`${BASE_URL}/auth/login`, body);
    return data;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

export async function login(body: any) {
  try {
    const response = await axios.post(
      `${BASE_URL}/auth/login`,
      body
    )

    return response.data
  } catch (ex) {
    throw ex
  }
}

export const tryGetUsers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/user/getOperators`);
    return response.data;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

export const tryCreateUser = async (form: newUser) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/auth/create`, form);
    return data;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

/** INIT DASHBOARD */
export const tryGetGeneralDashboard = async (startDate: string, endDate: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/dashboard/brasil?startDate=${startDate}&endDate=${endDate}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

/**INIT EXPORT-EXCEL */
export const generateExcel = async (accessTokenCore: any, body: any) => {
  const bearer = `Bearer ${accessTokenCore}`

  try {
    const response = await axios.post(
      `${BASE_URL}/report/reportAllSalesDownload`, body, {
      responseType: "arraybuffer",
      headers: {
        Authorization: bearer,
        Accept: "application/octet-stream",
      },
    }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
}


export const tryGetDatastudioCompanies = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/report/hogar/getAllowedDatastudio`,
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export const tryGetPoliciesReport = async (accessTokenCore: any, body: any) => {
  const bearer = `Bearer ${accessTokenCore}`
  try {
    const response = await axios.post(
      `${BASE_URL}/report/reportAllSales`, body, {
      headers: {
        Authorization: bearer,
      },
    }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
}

export const trySendEmail = async (body: any) => {

  try {
    const response = await axios.post(
      `${BASE_URL}/user/sendEmail`, body
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export const tryActiveUsers = async (body: any) => {

  try {
    const response = await axios.post(
      `${BASE_URL}/user/activeUsers`, body
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export const tryGetClosingShift = async (accessTokenCore: any) => {
  const bearer = `Bearer ${accessTokenCore}`
  try {
    const response = await axios.get(
      `${BASE_URL}/turn/getClosedTurns`, {
      headers: {
        Authorization: bearer,
      },
    }

    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export const tryGetClosingTurns = async (accessTokenCore: any, body: any) => {
  console.log('closed turns', body);

  const bearer = `Bearer ${accessTokenCore}`
  try {
    const response = await axios.post(
      `${BASE_URL}/report/closedTurnSales`, body, {
      headers: {
        Authorization: bearer,
      },
    }

    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
}



