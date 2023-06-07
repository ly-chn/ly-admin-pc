import axios from 'axios'

declare module 'axios' {

  export interface AxiosInstance {
    request<T = unknown, R = T, D = unknown>(config: axios.AxiosRequestConfig<D>): Promise<R>;
    get<T = unknown, R = T, D = unknown>(url: string, config?: axios.AxiosRequestConfig<D>): Promise<R>;
    delete<T = unknown, R = T, D = unknown>(url: string, config?: axios.AxiosRequestConfig<D>): Promise<R>;
    head<T = unknown, R = T, D = unknown>(url: string, config?: axios.AxiosRequestConfig<D>): Promise<R>;
    options<T = unknown, R = T, D = unknown>(url: string, config?: axios.AxiosRequestConfig<D>): Promise<R>;
    post<T = unknown, R = T, D = unknown>(url: string, data?: D, config?: axios.AxiosRequestConfig<D>): Promise<R>;
    put<T = unknown, R = T, D = unknown>(url: string, data?: D, config?: axios.AxiosRequestConfig<D>): Promise<R>;
    patch<T = unknown, R = T, D = unknown>(url: string, data?: D, config?: axios.AxiosRequestConfig<D>): Promise<R>;
    postForm<T = unknown, R = T, D = unknown>(url: string, data?: D, config?: axios.AxiosRequestConfig<D>): Promise<R>;
    putForm<T = unknown, R = T, D = unknown>(url: string, data?: D, config?: axios.AxiosRequestConfig<D>): Promise<R>;
    patchForm<T = unknown, R = T, D = unknown>(url: string, data?: D, config?: axios.AxiosRequestConfig<D>): Promise<R>;
  }
}
