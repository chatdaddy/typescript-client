/**
 * Configure the default client to retry requests on failure
 */
import axios from "axios";
import axiosRetry from "axios-retry";
import { BaseAPI } from "../OpenAPI/base";

const TOO_MANY_REQUESTS = 429

export const CLIENT_AXIOS = axios.create()

axiosRetry(
	CLIENT_AXIOS,
	{
		// max number of retries
		retries: 3,
		retryDelay: (...args) => (
			// retry after 500ms, 1000ms, 2000ms, 4000ms, 8000ms
			axiosRetry.exponentialDelay(...args, 500)
		),
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