import axios, { AxiosRequestConfig } from "axios";
import { App } from "vue";
import { useConfigStore } from "../../pinia/config";
import { useUserDataStore } from "../../pinia/userData";
import httpErrorHandler from "./httpErrorHandler";

//默认请求地址

// console.log(import.meta.env);
if (import.meta.env.MODE === "production") {
	axios.defaults.baseURL = "/";
} else {
	axios.defaults.baseURL = "http://channelcz.top/";
}

// http request拦截器
axios.interceptors.request.use(
	function (config: AxiosRequestConfig): AxiosRequestConfig {
		let Token: string | null = localStorage.getItem("ahutOjToken");
		if (Token && config.headers) {
			config.headers.Authorization = Token;
		}
		return config;
	},
	function (error) {
		return Promise.reject(error);
	}
);

// http response拦截器
axios.interceptors.response.use(
	(res) => {
		return res;
	},
	(err) => {
		httpErrorHandler(err.response);
		return err.response;
	}
);

//请求头
const contentType = [
	"application/json; charset=UTF-8",
	"application/json; charset=UTF-8",
	"multipart/form-data",
];

//自定义封装get post
export default {
	install: (app: App<Element>) => {
		app.config.globalProperties.$axios = axios;

		//封装get请求
		app.config.globalProperties.$get = function get(
			url: string,
			params: object | null,
			content: number = 0
		) {
			return axios.get(url, {
				params,
				headers: { "Content-Type": contentType[content] },
			});
		};

		//封装post请求
		app.config.globalProperties.$post = function post(
			url: string,
			data: object | null,
			content: number = 0
		) {
			return axios.post(url, data, {
				headers: { "Content-Type": contentType[content] },
			});
		};

		//封装delete请求
		app.config.globalProperties.$delete = function Delete(
			url: string,
			data: object | null
		) {
			return axios.delete(url, {
				data,
			});
		};
	},
};