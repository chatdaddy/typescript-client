import axios from "axios";
import axiosRetry from "axios-retry";
import { BaseAPI } from "../OpenAPI/base";

const TOO_MANY_REQUESTS = 429

export const CLIENT_AXIOS = axios.create()

axiosRetry(
	CLIENT_AXIOS,
	{
		retries: 3,
		retryDelay: axiosRetry.exponentialDelay,
		retryCondition: (err) => {
			return (
				axiosRetry.isNetworkError(err) 
				&& axiosRetry.isRetryableError(err)
			)
			|| err.response?.status === TOO_MANY_REQUESTS
		}
	}
)

BaseAPI.DEFAULT_AXIOS = CLIENT_AXIOS