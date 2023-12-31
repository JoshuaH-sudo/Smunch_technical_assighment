import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

/**
 * This abstracts the api calls and ensures error messages are handled correctly
 * @returns An object containing the request methods
 */
// const use_api = () => {
//This will handle any axios errors and pass the error message to the caller
export const response_wrapper = async <T,>(
  response: Promise<AxiosResponse<T>>
) => {
  try {
    return await response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const error_message = error.response?.data.message ?? "Request Failed";
      throw error_message;
    } else {
      throw error;
    }
  }
};

const base = window.origin.toString() + "/";
export const get = async <T = void,>(
  url: string,
  config: AxiosRequestConfig = {}
) => {
  const request_url = base + url;
  return await response_wrapper<T>(axios.get(request_url, config));
};

export const create = async <T = void,>(
  url: string,
  config: AxiosRequestConfig = {}
) => {
  const request_url = base + url;
  return await response_wrapper<T>(axios.post(request_url, config));
};

export const edit = async <T = void,>(
  url: string,
  config: AxiosRequestConfig = {}
) => {
  const request_url = base + url;
  return await response_wrapper<T>(axios.put(request_url, config));
};

export const remove = async <T = void,>(
  url: string,
  config: AxiosRequestConfig = {}
) => {
  const request_url = base + url;
  return await response_wrapper<T>(axios.delete(request_url, config));
};
