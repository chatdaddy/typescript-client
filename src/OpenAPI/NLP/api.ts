const BASE_PATH = "https://api-keywordreply.chatdaddy.tech".replace(/\/+$/, "");

/* tslint:disable */
/* eslint-disable */
/**
 * ChatDaddy Keyword Reply Service
 * Manage Whatsapp automated replies.
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import { Configuration } from '../configuration';
import globalAxios, { AxiosPromise, AxiosInstance, AxiosRequestConfig } from 'axios';
// Some imports not used depending on template conditions
// @ts-ignore
import { DUMMY_BASE_URL, assertParamExists, setApiKeyToObject, setBasicAuthToObject, setBearerAuthToObject, setOAuthToObject, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from '../common';
// @ts-ignore
import { COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError } from '../base';

/**
 * 
 * @export
 * @interface DeleteTriggers200Response
 */
export interface DeleteTriggers200Response {
    /**
     * 
     * @type {number}
     * @memberof DeleteTriggers200Response
     */
    'affected'?: number;
    /**
     * 
     * @type {Array<object>}
     * @memberof DeleteTriggers200Response
     */
    'raw'?: Array<object>;
}
/**
 * 
 * @export
 * @interface ExecutionFrame
 */
export interface ExecutionFrame {
    /**
     * 
     * @type {string}
     * @memberof ExecutionFrame
     */
    'day'?: ExecutionFrameDayEnum;
    /**
     * 
     * @type {string}
     * @memberof ExecutionFrame
     */
    'startTime': string;
    /**
     * 
     * @type {string}
     * @memberof ExecutionFrame
     */
    'endTime': string;
}

export const ExecutionFrameDayEnum = {
    Monday: 'Monday',
    Tuesday: 'Tuesday',
    Wednesday: 'Wednesday',
    Thursday: 'Thursday',
    Friday: 'Friday',
    Saturday: 'Saturday',
    Sunday: 'Sunday'
} as const;

export type ExecutionFrameDayEnum = typeof ExecutionFrameDayEnum[keyof typeof ExecutionFrameDayEnum];

/**
 * 
 * @export
 * @interface GetExecutionRecord200Response
 */
export interface GetExecutionRecord200Response {
    /**
     * 
     * @type {Array<KeywordActionExecutionRecord>}
     * @memberof GetExecutionRecord200Response
     */
    'logs'?: Array<KeywordActionExecutionRecord>;
    /**
     * 
     * @type {number}
     * @memberof GetExecutionRecord200Response
     */
    'nextPageCursor'?: number;
}
/**
 * 
 * @export
 * @interface GetTriggers200Response
 */
export interface GetTriggers200Response {
    /**
     * 
     * @type {Array<KeywordBasedAction>}
     * @memberof GetTriggers200Response
     */
    'triggers'?: Array<KeywordBasedAction>;
    /**
     * 
     * @type {number}
     * @memberof GetTriggers200Response
     */
    'nextPageCursor'?: number;
}
/**
 * 
 * @export
 * @interface Keyword
 */
export interface Keyword {
    /**
     * 
     * @type {string}
     * @memberof Keyword
     */
    'text'?: string;
    /**
     * An ISO formatted timestamp
     * @type {string}
     * @memberof Keyword
     */
    'createdAt'?: string;
}
/**
 * 
 * @export
 * @interface KeywordActionCreateRequestObj
 */
export interface KeywordActionCreateRequestObj {
    /**
     * Status of reply service
     * @type {boolean}
     * @memberof KeywordActionCreateRequestObj
     */
    'enabled'?: boolean;
    /**
     * Should typing indicator & read receipt be sent
     * @type {boolean}
     * @memberof KeywordActionCreateRequestObj
     */
    'sendTyping'?: boolean;
    /**
     * 
     * @type {TriggerType}
     * @memberof KeywordActionCreateRequestObj
     */
    'triggerType': TriggerType;
    /**
     * Unique triggering keywords
     * @type {Array<Keyword>}
     * @memberof KeywordActionCreateRequestObj
     */
    'keywords': Array<Keyword>;
    /**
     * Flow ids to be triggered
     * @type {Array<string>}
     * @memberof KeywordActionCreateRequestObj
     */
    'flowIds': Array<string>;
    /**
     * Timespan before the keyword can be triggered again, measured in seconds
     * @type {number}
     * @memberof KeywordActionCreateRequestObj
     */
    'delay'?: number;
    /**
     * 
     * @type {Array<ExecutionFrame>}
     * @memberof KeywordActionCreateRequestObj
     */
    'executionFrames'?: Array<ExecutionFrame>;
}
/**
 * 
 * @export
 * @interface KeywordActionEditRequestObj
 */
export interface KeywordActionEditRequestObj {
    /**
     * Keyword Id (auto incrementing)
     * @type {number}
     * @memberof KeywordActionEditRequestObj
     */
    'id': number;
    /**
     * Status of reply service
     * @type {boolean}
     * @memberof KeywordActionEditRequestObj
     */
    'enabled'?: boolean;
    /**
     * Should typing indicator & read receipt be sent
     * @type {boolean}
     * @memberof KeywordActionEditRequestObj
     */
    'sendTyping'?: boolean;
    /**
     * 
     * @type {TriggerType}
     * @memberof KeywordActionEditRequestObj
     */
    'triggerType'?: TriggerType;
    /**
     * Unique triggering keywords
     * @type {Array<Keyword>}
     * @memberof KeywordActionEditRequestObj
     */
    'keywords'?: Array<Keyword>;
    /**
     * Flow ids to be triggered
     * @type {Array<string>}
     * @memberof KeywordActionEditRequestObj
     */
    'flowIds'?: Array<string>;
    /**
     * Timespan before the keyword can be triggered again, measured in seconds
     * @type {number}
     * @memberof KeywordActionEditRequestObj
     */
    'delay'?: number;
    /**
     * 
     * @type {Array<ExecutionFrame>}
     * @memberof KeywordActionEditRequestObj
     */
    'executionFrames'?: Array<ExecutionFrame>;
}
/**
 * 
 * @export
 * @interface KeywordActionExecutionRecord
 */
export interface KeywordActionExecutionRecord {
    /**
     * Keyword Id (auto incrementing)
     * @type {number}
     * @memberof KeywordActionExecutionRecord
     */
    'id': number;
    /**
     * Triggering chatId (jid)
     * @type {string}
     * @memberof KeywordActionExecutionRecord
     */
    'chatId': string;
    /**
     * Incoming message body
     * @type {string}
     * @memberof KeywordActionExecutionRecord
     */
    'text': string;
    /**
     * FlowId to be triggered
     * @type {string}
     * @memberof KeywordActionExecutionRecord
     */
    'flowId'?: string;
    /**
     * An ISO formatted timestamp
     * @type {string}
     * @memberof KeywordActionExecutionRecord
     */
    'timestamp': string;
}
/**
 * 
 * @export
 * @interface KeywordBasedAction
 */
export interface KeywordBasedAction {
    /**
     * Keyword Id (auto incrementing)
     * @type {number}
     * @memberof KeywordBasedAction
     */
    'id': number;
    /**
     * Team the keyword belongs to
     * @type {string}
     * @memberof KeywordBasedAction
     */
    'teamId': string;
    /**
     * Status of reply service
     * @type {boolean}
     * @memberof KeywordBasedAction
     */
    'enabled': boolean;
    /**
     * Should typing indicator & read receipt be sent
     * @type {boolean}
     * @memberof KeywordBasedAction
     */
    'sendTyping'?: boolean;
    /**
     * 
     * @type {TriggerType}
     * @memberof KeywordBasedAction
     */
    'triggerType': TriggerType;
    /**
     * Unique triggering keywords
     * @type {Array<Keyword>}
     * @memberof KeywordBasedAction
     */
    'keywords': Array<Keyword>;
    /**
     * Flow ids to be triggered
     * @type {Array<string>}
     * @memberof KeywordBasedAction
     */
    'flowIds'?: Array<string>;
    /**
     * Timespan before the keyword can be triggered again, measured in seconds
     * @type {number}
     * @memberof KeywordBasedAction
     */
    'delay'?: number;
    /**
     * 
     * @type {Array<ExecutionFrame>}
     * @memberof KeywordBasedAction
     */
    'executionFrames'?: Array<ExecutionFrame>;
    /**
     * An ISO formatted timestamp
     * @type {string}
     * @memberof KeywordBasedAction
     */
    'createdAt': string;
    /**
     * An ISO formatted timestamp
     * @type {string}
     * @memberof KeywordBasedAction
     */
    'updatedAt'?: string;
}
/**
 * Type of trigger
 * @export
 * @enum {string}
 */

export const TriggerType = {
    Contains: 'contains',
    ContainsPhrase: 'containsPhrase',
    StartsWith: 'startsWith',
    KeywordIs: 'keywordIs',
    DefaultReply: 'defaultReply'
} as const;

export type TriggerType = typeof TriggerType[keyof typeof TriggerType];



/**
 * KeywordsApi - axios parameter creator
 * @export
 */
export const KeywordsApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary Create new Keyword Based Action
         * @param {Array<KeywordActionCreateRequestObj>} keywordActionCreateRequestObj 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createTrigger: async (keywordActionCreateRequestObj: Array<KeywordActionCreateRequestObj>, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'keywordActionCreateRequestObj' is not null or undefined
            assertParamExists('createTrigger', 'keywordActionCreateRequestObj', keywordActionCreateRequestObj)
            const localVarPath = `/`;
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
            await setOAuthToObject(localVarHeaderParameter, "chatdaddy", ["KEYWORD_CREATE"], configuration)


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(keywordActionCreateRequestObj, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Delete Keyword Based Action
         * @param {Array<string>} ids 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteTriggers: async (ids: Array<string>, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'ids' is not null or undefined
            assertParamExists('deleteTriggers', 'ids', ids)
            const localVarPath = `/`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'DELETE', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication chatdaddy required
            // oauth required
            await setOAuthToObject(localVarHeaderParameter, "chatdaddy", ["KEYWORD_DELETE"], configuration)

            if (ids) {
                localVarQueryParameter['ids'] = ids;
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
         * @summary Edit Keyword Based Action
         * @param {Array<KeywordActionEditRequestObj>} keywordActionEditRequestObj 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        editTrigger: async (keywordActionEditRequestObj: Array<KeywordActionEditRequestObj>, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'keywordActionEditRequestObj' is not null or undefined
            assertParamExists('editTrigger', 'keywordActionEditRequestObj', keywordActionEditRequestObj)
            const localVarPath = `/`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'PATCH', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication chatdaddy required
            // oauth required
            await setOAuthToObject(localVarHeaderParameter, "chatdaddy", ["KEYWORD_UPDATE"], configuration)


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(keywordActionEditRequestObj, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Returns the trigger log of the keyword reply.
         * @param {string} id 
         * @param {number} [count] 
         * @param {string} [cursor] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getExecutionRecord: async (id: string, count?: number, cursor?: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('getExecutionRecord', 'id', id)
            const localVarPath = `/log/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
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
            await setOAuthToObject(localVarHeaderParameter, "chatdaddy", ["KEYWORD_READ"], configuration)

            if (count !== undefined) {
                localVarQueryParameter['count'] = count;
            }

            if (cursor !== undefined) {
                localVarQueryParameter['cursor'] = cursor;
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
         * @summary Query for user\'s Keyword Actions
         * @param {string} [q] 
         * @param {number} [count] 
         * @param {Array<string>} [id] 
         * @param {TriggerType} [triggerType] Query keywords with the specific trigger type
         * @param {string} [cursor] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getTriggers: async (q?: string, count?: number, id?: Array<string>, triggerType?: TriggerType, cursor?: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/`;
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
            await setOAuthToObject(localVarHeaderParameter, "chatdaddy", ["KEYWORD_READ"], configuration)

            if (q !== undefined) {
                localVarQueryParameter['q'] = q;
            }

            if (count !== undefined) {
                localVarQueryParameter['count'] = count;
            }

            if (id) {
                localVarQueryParameter['id'] = id;
            }

            if (triggerType !== undefined) {
                localVarQueryParameter['triggerType'] = triggerType;
            }

            if (cursor !== undefined) {
                localVarQueryParameter['cursor'] = cursor;
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
 * KeywordsApi - functional programming interface
 * @export
 */
export const KeywordsApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = KeywordsApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @summary Create new Keyword Based Action
         * @param {Array<KeywordActionCreateRequestObj>} keywordActionCreateRequestObj 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async createTrigger(keywordActionCreateRequestObj: Array<KeywordActionCreateRequestObj>, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<KeywordBasedAction>>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.createTrigger(keywordActionCreateRequestObj, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Delete Keyword Based Action
         * @param {Array<string>} ids 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async deleteTriggers(ids: Array<string>, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<DeleteTriggers200Response>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.deleteTriggers(ids, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Edit Keyword Based Action
         * @param {Array<KeywordActionEditRequestObj>} keywordActionEditRequestObj 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async editTrigger(keywordActionEditRequestObj: Array<KeywordActionEditRequestObj>, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<KeywordBasedAction>>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.editTrigger(keywordActionEditRequestObj, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Returns the trigger log of the keyword reply.
         * @param {string} id 
         * @param {number} [count] 
         * @param {string} [cursor] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getExecutionRecord(id: string, count?: number, cursor?: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<GetExecutionRecord200Response>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getExecutionRecord(id, count, cursor, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Query for user\'s Keyword Actions
         * @param {string} [q] 
         * @param {number} [count] 
         * @param {Array<string>} [id] 
         * @param {TriggerType} [triggerType] Query keywords with the specific trigger type
         * @param {string} [cursor] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getTriggers(q?: string, count?: number, id?: Array<string>, triggerType?: TriggerType, cursor?: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<GetTriggers200Response>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getTriggers(q, count, id, triggerType, cursor, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * KeywordsApi - factory interface
 * @export
 */
export const KeywordsApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = KeywordsApiFp(configuration)
    return {
        /**
         * 
         * @summary Create new Keyword Based Action
         * @param {Array<KeywordActionCreateRequestObj>} keywordActionCreateRequestObj 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createTrigger(keywordActionCreateRequestObj: Array<KeywordActionCreateRequestObj>, options?: any): AxiosPromise<Array<KeywordBasedAction>> {
            return localVarFp.createTrigger(keywordActionCreateRequestObj, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Delete Keyword Based Action
         * @param {Array<string>} ids 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteTriggers(ids: Array<string>, options?: any): AxiosPromise<DeleteTriggers200Response> {
            return localVarFp.deleteTriggers(ids, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Edit Keyword Based Action
         * @param {Array<KeywordActionEditRequestObj>} keywordActionEditRequestObj 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        editTrigger(keywordActionEditRequestObj: Array<KeywordActionEditRequestObj>, options?: any): AxiosPromise<Array<KeywordBasedAction>> {
            return localVarFp.editTrigger(keywordActionEditRequestObj, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Returns the trigger log of the keyword reply.
         * @param {string} id 
         * @param {number} [count] 
         * @param {string} [cursor] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getExecutionRecord(id: string, count?: number, cursor?: string, options?: any): AxiosPromise<GetExecutionRecord200Response> {
            return localVarFp.getExecutionRecord(id, count, cursor, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Query for user\'s Keyword Actions
         * @param {string} [q] 
         * @param {number} [count] 
         * @param {Array<string>} [id] 
         * @param {TriggerType} [triggerType] Query keywords with the specific trigger type
         * @param {string} [cursor] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getTriggers(q?: string, count?: number, id?: Array<string>, triggerType?: TriggerType, cursor?: string, options?: any): AxiosPromise<GetTriggers200Response> {
            return localVarFp.getTriggers(q, count, id, triggerType, cursor, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * Request parameters for createTrigger operation in KeywordsApi.
 * @export
 * @interface KeywordsApiCreateTriggerRequest
 */
export interface KeywordsApiCreateTriggerRequest {
    /**
     * 
     * @type {Array<KeywordActionCreateRequestObj>}
     * @memberof KeywordsApiCreateTrigger
     */
    readonly keywordActionCreateRequestObj: Array<KeywordActionCreateRequestObj>
}

/**
 * Request parameters for deleteTriggers operation in KeywordsApi.
 * @export
 * @interface KeywordsApiDeleteTriggersRequest
 */
export interface KeywordsApiDeleteTriggersRequest {
    /**
     * 
     * @type {Array<string>}
     * @memberof KeywordsApiDeleteTriggers
     */
    readonly ids: Array<string>
}

/**
 * Request parameters for editTrigger operation in KeywordsApi.
 * @export
 * @interface KeywordsApiEditTriggerRequest
 */
export interface KeywordsApiEditTriggerRequest {
    /**
     * 
     * @type {Array<KeywordActionEditRequestObj>}
     * @memberof KeywordsApiEditTrigger
     */
    readonly keywordActionEditRequestObj: Array<KeywordActionEditRequestObj>
}

/**
 * Request parameters for getExecutionRecord operation in KeywordsApi.
 * @export
 * @interface KeywordsApiGetExecutionRecordRequest
 */
export interface KeywordsApiGetExecutionRecordRequest {
    /**
     * 
     * @type {string}
     * @memberof KeywordsApiGetExecutionRecord
     */
    readonly id: string

    /**
     * 
     * @type {number}
     * @memberof KeywordsApiGetExecutionRecord
     */
    readonly count?: number

    /**
     * 
     * @type {string}
     * @memberof KeywordsApiGetExecutionRecord
     */
    readonly cursor?: string
}

/**
 * Request parameters for getTriggers operation in KeywordsApi.
 * @export
 * @interface KeywordsApiGetTriggersRequest
 */
export interface KeywordsApiGetTriggersRequest {
    /**
     * 
     * @type {string}
     * @memberof KeywordsApiGetTriggers
     */
    readonly q?: string

    /**
     * 
     * @type {number}
     * @memberof KeywordsApiGetTriggers
     */
    readonly count?: number

    /**
     * 
     * @type {Array<string>}
     * @memberof KeywordsApiGetTriggers
     */
    readonly id?: Array<string>

    /**
     * Query keywords with the specific trigger type
     * @type {TriggerType}
     * @memberof KeywordsApiGetTriggers
     */
    readonly triggerType?: TriggerType

    /**
     * 
     * @type {string}
     * @memberof KeywordsApiGetTriggers
     */
    readonly cursor?: string
}

/**
 * KeywordsApi - object-oriented interface
 * @export
 * @class KeywordsApi
 * @extends {BaseAPI}
 */
export class KeywordsApi extends BaseAPI {
    /**
     * 
     * @summary Create new Keyword Based Action
     * @param {KeywordsApiCreateTriggerRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof KeywordsApi
     */
    public createTrigger(requestParameters: KeywordsApiCreateTriggerRequest, options?: AxiosRequestConfig) {
        return KeywordsApiFp(this.configuration).createTrigger(requestParameters.keywordActionCreateRequestObj, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Delete Keyword Based Action
     * @param {KeywordsApiDeleteTriggersRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof KeywordsApi
     */
    public deleteTriggers(requestParameters: KeywordsApiDeleteTriggersRequest, options?: AxiosRequestConfig) {
        return KeywordsApiFp(this.configuration).deleteTriggers(requestParameters.ids, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Edit Keyword Based Action
     * @param {KeywordsApiEditTriggerRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof KeywordsApi
     */
    public editTrigger(requestParameters: KeywordsApiEditTriggerRequest, options?: AxiosRequestConfig) {
        return KeywordsApiFp(this.configuration).editTrigger(requestParameters.keywordActionEditRequestObj, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Returns the trigger log of the keyword reply.
     * @param {KeywordsApiGetExecutionRecordRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof KeywordsApi
     */
    public getExecutionRecord(requestParameters: KeywordsApiGetExecutionRecordRequest, options?: AxiosRequestConfig) {
        return KeywordsApiFp(this.configuration).getExecutionRecord(requestParameters.id, requestParameters.count, requestParameters.cursor, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Query for user\'s Keyword Actions
     * @param {KeywordsApiGetTriggersRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof KeywordsApi
     */
    public getTriggers(requestParameters: KeywordsApiGetTriggersRequest = {}, options?: AxiosRequestConfig) {
        return KeywordsApiFp(this.configuration).getTriggers(requestParameters.q, requestParameters.count, requestParameters.id, requestParameters.triggerType, requestParameters.cursor, options).then((request) => request(this.axios, this.basePath));
    }
}


