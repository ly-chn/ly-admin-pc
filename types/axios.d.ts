import axios from 'axios'

declare module 'axios' {

  export interface AxiosInstance {
    request<T = any, R = T, D = any>(config: axios.AxiosRequestConfig<D>): Promise<R>;
    get<T = any, R = T, D = any>(url: string, config?: axios.AxiosRequestConfig<D>): Promise<R>;
    delete<T = any, R = T, D = any>(url: string, config?: axios.AxiosRequestConfig<D>): Promise<R>;
    head<T = any, R = T, D = any>(url: string, config?: axios.AxiosRequestConfig<D>): Promise<R>;
    options<T = any, R = T, D = any>(url: string, config?: axios.AxiosRequestConfig<D>): Promise<R>;
    post<T = any, R = T, D = any>(url: string, data?: D, config?: axios.AxiosRequestConfig<D>): Promise<R>;
    put<T = any, R = T, D = any>(url: string, data?: D, config?: axios.AxiosRequestConfig<D>): Promise<R>;
    patch<T = any, R = T, D = any>(url: string, data?: D, config?: axios.AxiosRequestConfig<D>): Promise<R>;
    postForm<T = any, R = T, D = any>(url: string, data?: D, config?: axios.AxiosRequestConfig<D>): Promise<R>;
    putForm<T = any, R = T, D = any>(url: string, data?: D, config?: axios.AxiosRequestConfig<D>): Promise<R>;
    patchForm<T = any, R = T, D = any>(url: string, data?: D, config?: axios.AxiosRequestConfig<D>): Promise<R>;
  }
}