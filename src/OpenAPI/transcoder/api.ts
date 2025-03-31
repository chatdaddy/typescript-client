const BASE_PATH = "https://api.chatdaddy.tech/transcoder".replace(/\/+$/, "");

/* tslint:disable */
/* eslint-disable */
/**
 * Transcoding Service
 * Transcode media 
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import type { Configuration } from '../configuration';
import type { AxiosPromise, AxiosInstance, AxiosRequestConfig } from 'axios';
import globalAxios from 'axios';
// Some imports not used depending on template conditions
// @ts-ignore
import { DUMMY_BASE_URL, assertParamExists, setApiKeyToObject, setBasicAuthToObject, setBearerAuthToObject, setOAuthToObject, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from '../common';
import type { RequestArgs } from '../base';
// @ts-ignore
import { COLLECTION_FORMATS, BaseAPI, RequiredError } from '../base';

/**
 * 
 * @export
 * @interface Convert200Response
 */
export interface Convert200Response {
    /**
     * 
     * @type {string}
     * @memberof Convert200Response
     */
    'url': string;
}
/**
 * 
 * @export
 * @interface ConvertRequest
 */
export interface ConvertRequest {
    /**
     * 
     * @type {string}
     * @memberof ConvertRequest
     */
    'outputFormat': string;
    /**
     * 
     * @type {string}
     * @memberof ConvertRequest
     */
    'url': string;
}
/**
 * 
 * @export
 * @enum {string}
 */

export const TranscodeMethod = {
    Aes256CbcDecrypt: 'aes-256-cbc-decrypt'
} as const;

export type TranscodeMethod = typeof TranscodeMethod[keyof typeof TranscodeMethod];



/**
 * TranscodeApi - axios parameter creator
 * @export
 */
export const TranscodeApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary Convert audio/video
         * @param {ConvertRequest} convertRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        convert: async (convertRequest: ConvertRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'convertRequest' is not null or undefined
            assertParamExists('convert', 'convertRequest', convertRequest)
            const localVarPath = `/convert`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication chatdaddy required
            // oauth required
            await setOAuthToObject(localVarHeaderParameter, "chatdaddy", [], configuration)


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(convertRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Stream content from an encrypted message attachment
         * @param {string} accountId Account ID
         * @param {string} chatId Chat ID
         * @param {string} id Message ID
         * @param {number} index Attachment index
         * @param {string} [token] ChatDaddy auth token, optionally provide in query
         * @param {string} [mimetype] override the mimetype of the media post transcoding
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        streamMessageAttachment: async (accountId: string, chatId: string, id: string, index: number, token?: string, mimetype?: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'accountId' is not null or undefined
            assertParamExists('streamMessageAttachment', 'accountId', accountId)
            // verify required parameter 'chatId' is not null or undefined
            assertParamExists('streamMessageAttachment', 'chatId', chatId)
            // verify required parameter 'id' is not null or undefined
            assertParamExists('streamMessageAttachment', 'id', id)
            // verify required parameter 'index' is not null or undefined
            assertParamExists('streamMessageAttachment', 'index', index)
            const localVarPath = `/stream-message-attachment/{accountId}/{chatId}/{id}/{index}`
                .replace(`{${"accountId"}}`, encodeURIComponent(String(accountId)))
                .replace(`{${"chatId"}}`, encodeURIComponent(String(chatId)))
                .replace(`{${"id"}}`, encodeURIComponent(String(id)))
                .replace(`{${"index"}}`, encodeURIComponent(String(index)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication chatdaddy required
            // oauth required
            await setOAuthToObject(localVarHeaderParameter, "chatdaddy", ["CHATS_ACCESS_ALL", "CHATS_ACCESS_ASSIGNED"], configuration)

            if (token !== undefined) {
                localVarQueryParameter['token'] = token;
            }

            if (mimetype !== undefined) {
                localVarQueryParameter['mimetype'] = mimetype;
            }


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Transcode hosted media
         * @param {TranscodeMethod} method What to do with the transcoded media
         * @param {string} url The URL to transcode
         * @param {string} [key] Base64 encoded key for decryption
         * @param {string} [iv] Base64 encoded IV for decryption
         * @param {string} [expectedMimetype] expected mimetype of the media post transcoding
         * @param {string} [token] ChatDaddy auth token, optionally provide in query
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        transcode: async (method: TranscodeMethod, url: string, key?: string, iv?: string, expectedMimetype?: string, token?: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'method' is not null or undefined
            assertParamExists('transcode', 'method', method)
            // verify required parameter 'url' is not null or undefined
            assertParamExists('transcode', 'url', url)
            const localVarPath = `/transcode/{method}`
                .replace(`{${"method"}}`, encodeURIComponent(String(method)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication chatdaddy required
            // oauth required
            await setOAuthToObject(localVarHeaderParameter, "chatdaddy", [], configuration)

            if (url !== undefined) {
                localVarQueryParameter['url'] = url;
            }

            if (key !== undefined) {
                localVarQueryParameter['key'] = key;
            }

            if (iv !== undefined) {
                localVarQueryParameter['iv'] = iv;
            }

            if (expectedMimetype !== undefined) {
                localVarQueryParameter['expectedMimetype'] = expectedMimetype;
            }

            if (token !== undefined) {
                localVarQueryParameter['token'] = token;
            }


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * TranscodeApi - functional programming interface
 * @export
 */
export const TranscodeApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = TranscodeApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @summary Convert audio/video
         * @param {ConvertRequest} convertRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async convert(convertRequest: ConvertRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Convert200Response>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.convert(convertRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Stream content from an encrypted message attachment
         * @param {string} accountId Account ID
         * @param {string} chatId Chat ID
         * @param {string} id Message ID
         * @param {number} index Attachment index
         * @param {string} [token] ChatDaddy auth token, optionally provide in query
         * @param {string} [mimetype] override the mimetype of the media post transcoding
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async streamMessageAttachment(accountId: string, chatId: string, id: string, index: number, token?: string, mimetype?: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.streamMessageAttachment(accountId, chatId, id, index, token, mimetype, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Transcode hosted media
         * @param {TranscodeMethod} method What to do with the transcoded media
         * @param {string} url The URL to transcode
         * @param {string} [key] Base64 encoded key for decryption
         * @param {string} [iv] Base64 encoded IV for decryption
         * @param {string} [expectedMimetype] expected mimetype of the media post transcoding
         * @param {string} [token] ChatDaddy auth token, optionally provide in query
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async transcode(method: TranscodeMethod, url: string, key?: string, iv?: string, expectedMimetype?: string, token?: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.transcode(method, url, key, iv, expectedMimetype, token, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * TranscodeApi - factory interface
 * @export
 */
export const TranscodeApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = TranscodeApiFp(configuration)
    return {
        /**
         * 
         * @summary Convert audio/video
         * @param {TranscodeApiConvertRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        convert(requestParameters: TranscodeApiConvertRequest, options?: AxiosRequestConfig): AxiosPromise<Convert200Response> {
            return localVarFp.convert(requestParameters.convertRequest, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Stream content from an encrypted message attachment
         * @param {TranscodeApiStreamMessageAttachmentRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        streamMessageAttachment(requestParameters: TranscodeApiStreamMessageAttachmentRequest, options?: AxiosRequestConfig): AxiosPromise<void> {
            return localVarFp.streamMessageAttachment(requestParameters.accountId, requestParameters.chatId, requestParameters.id, requestParameters.index, requestParameters.token, requestParameters.mimetype, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Transcode hosted media
         * @param {TranscodeApiTranscodeRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        transcode(requestParameters: TranscodeApiTranscodeRequest, options?: AxiosRequestConfig): AxiosPromise<void> {
            return localVarFp.transcode(requestParameters.method, requestParameters.url, requestParameters.key, requestParameters.iv, requestParameters.expectedMimetype, requestParameters.token, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * Request parameters for convert operation in TranscodeApi.
 * @export
 * @interface TranscodeApiConvertRequest
 */
export interface TranscodeApiConvertRequest {
    /**
     * 
     * @type {ConvertRequest}
     * @memberof TranscodeApiConvert
     */
    readonly convertRequest: ConvertRequest
}

/**
 * Request parameters for streamMessageAttachment operation in TranscodeApi.
 * @export
 * @interface TranscodeApiStreamMessageAttachmentRequest
 */
export interface TranscodeApiStreamMessageAttachmentRequest {
    /**
     * Account ID
     * @type {string}
     * @memberof TranscodeApiStreamMessageAttachment
     */
    readonly accountId: string

    /**
     * Chat ID
     * @type {string}
     * @memberof TranscodeApiStreamMessageAttachment
     */
    readonly chatId: string

    /**
     * Message ID
     * @type {string}
     * @memberof TranscodeApiStreamMessageAttachment
     */
    readonly id: string

    /**
     * Attachment index
     * @type {number}
     * @memberof TranscodeApiStreamMessageAttachment
     */
    readonly index: number

    /**
     * ChatDaddy auth token, optionally provide in query
     * @type {string}
     * @memberof TranscodeApiStreamMessageAttachment
     */
    readonly token?: string

    /**
     * override the mimetype of the media post transcoding
     * @type {string}
     * @memberof TranscodeApiStreamMessageAttachment
     */
    readonly mimetype?: string
}

/**
 * Request parameters for transcode operation in TranscodeApi.
 * @export
 * @interface TranscodeApiTranscodeRequest
 */
export interface TranscodeApiTranscodeRequest {
    /**
     * What to do with the transcoded media
     * @type {TranscodeMethod}
     * @memberof TranscodeApiTranscode
     */
    readonly method: TranscodeMethod

    /**
     * The URL to transcode
     * @type {string}
     * @memberof TranscodeApiTranscode
     */
    readonly url: string

    /**
     * Base64 encoded key for decryption
     * @type {string}
     * @memberof TranscodeApiTranscode
     */
    readonly key?: string

    /**
     * Base64 encoded IV for decryption
     * @type {string}
     * @memberof TranscodeApiTranscode
     */
    readonly iv?: string

    /**
     * expected mimetype of the media post transcoding
     * @type {string}
     * @memberof TranscodeApiTranscode
     */
    readonly expectedMimetype?: string

    /**
     * ChatDaddy auth token, optionally provide in query
     * @type {string}
     * @memberof TranscodeApiTranscode
     */
    readonly token?: string
}

/**
 * TranscodeApi - object-oriented interface
 * @export
 * @class TranscodeApi
 * @extends {BaseAPI}
 */
export class TranscodeApi extends BaseAPI {
    /**
     * 
     * @summary Convert audio/video
     * @param {TranscodeApiConvertRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TranscodeApi
     */
    public convert(requestParameters: TranscodeApiConvertRequest, options?: AxiosRequestConfig) {
        return TranscodeApiFp(this.configuration).convert(requestParameters.convertRequest, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Stream content from an encrypted message attachment
     * @param {TranscodeApiStreamMessageAttachmentRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TranscodeApi
     */
    public streamMessageAttachment(requestParameters: TranscodeApiStreamMessageAttachmentRequest, options?: AxiosRequestConfig) {
        return TranscodeApiFp(this.configuration).streamMessageAttachment(requestParameters.accountId, requestParameters.chatId, requestParameters.id, requestParameters.index, requestParameters.token, requestParameters.mimetype, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Transcode hosted media
     * @param {TranscodeApiTranscodeRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TranscodeApi
     */
    public transcode(requestParameters: TranscodeApiTranscodeRequest, options?: AxiosRequestConfig) {
        return TranscodeApiFp(this.configuration).transcode(requestParameters.method, requestParameters.url, requestParameters.key, requestParameters.iv, requestParameters.expectedMimetype, requestParameters.token, options).then((request) => request(this.axios, this.basePath));
    }
}


