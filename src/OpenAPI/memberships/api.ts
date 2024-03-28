const BASE_PATH = "https://api-memberships.chatdaddy.tech".replace(/\/+$/, "");

/* tslint:disable */
/* eslint-disable */
/**
 * Membership Service
 * Membership Service 
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
 * @interface CreateMembershipActionRequest
 */
export interface CreateMembershipActionRequest {
    /**
     * The id of the membership
     * @type {number}
     * @memberof CreateMembershipActionRequest
     */
    'membershipId': number;
    /**
     * 
     * @type {string}
     * @memberof CreateMembershipActionRequest
     */
    'actionType': CreateMembershipActionRequestActionTypeEnum;
    /**
     * The number of points to add or remove
     * @type {number}
     * @memberof CreateMembershipActionRequest
     */
    'amount': number;
}

export const CreateMembershipActionRequestActionTypeEnum = {
    Add: 'add',
    Remove: 'remove'
} as const;

export type CreateMembershipActionRequestActionTypeEnum = typeof CreateMembershipActionRequestActionTypeEnum[keyof typeof CreateMembershipActionRequestActionTypeEnum];

/**
 * 
 * @export
 * @interface GetMembershipSettings200Response
 */
export interface GetMembershipSettings200Response {
    /**
     * 
     * @type {MembershipSettings}
     * @memberof GetMembershipSettings200Response
     */
    'membershipSettings'?: MembershipSettings;
}
/**
 * 
 * @export
 * @interface GetMemberships200Response
 */
export interface GetMemberships200Response {
    /**
     * 
     * @type {Array<Membership>}
     * @memberof GetMemberships200Response
     */
    'memberships'?: Array<Membership>;
    /**
     * 
     * @type {number}
     * @memberof GetMemberships200Response
     */
    'cursor'?: number;
    /**
     * 
     * @type {number}
     * @memberof GetMemberships200Response
     */
    'total'?: number;
}
/**
 * 
 * @export
 * @interface Membership
 */
export interface Membership {
    /**
     * The id of the membership
     * @type {number}
     * @memberof Membership
     */
    'id'?: number;
    /**
     * The userId of the membership
     * @type {string}
     * @memberof Membership
     */
    'contactId'?: string;
    /**
     * The teamId of the membership
     * @type {string}
     * @memberof Membership
     */
    'teamId'?: string;
    /**
     * 
     * @type {Array<MembershipAction>}
     * @memberof Membership
     */
    'actions'?: Array<MembershipAction>;
    /**
     * The number of points the membership has
     * @type {number}
     * @memberof Membership
     */
    'points'?: number;
    /**
     * The date and time the membership was created
     * @type {string}
     * @memberof Membership
     */
    'createdAt'?: string;
    /**
     * The date and time the membership was last updated
     * @type {string}
     * @memberof Membership
     */
    'updatedAt'?: string;
}
/**
 * 
 * @export
 * @interface MembershipAction
 */
export interface MembershipAction {
    /**
     * The id of the pending membership action
     * @type {number}
     * @memberof MembershipAction
     */
    'id': number;
    /**
     * The id of the membership
     * @type {number}
     * @memberof MembershipAction
     */
    'membershipId': number;
    /**
     * The contactId of the membership
     * @type {string}
     * @memberof MembershipAction
     */
    'contactId'?: string;
    /**
     * 
     * @type {string}
     * @memberof MembershipAction
     */
    'actionType': MembershipActionActionTypeEnum;
    /**
     * 
     * @type {string}
     * @memberof MembershipAction
     */
    'approvalState': MembershipActionApprovalStateEnum;
    /**
     * The number of points to add or remove
     * @type {number}
     * @memberof MembershipAction
     */
    'amount': number;
    /**
     * The date and time the pending membership action was created
     * @type {string}
     * @memberof MembershipAction
     */
    'timestamp': string;
}

export const MembershipActionActionTypeEnum = {
    Add: 'add',
    Remove: 'remove'
} as const;

export type MembershipActionActionTypeEnum = typeof MembershipActionActionTypeEnum[keyof typeof MembershipActionActionTypeEnum];
export const MembershipActionApprovalStateEnum = {
    Approved: 'approved',
    Rejected: 'rejected',
    Pending: 'pending'
} as const;

export type MembershipActionApprovalStateEnum = typeof MembershipActionApprovalStateEnum[keyof typeof MembershipActionApprovalStateEnum];

/**
 * 
 * @export
 * @interface MembershipCreate
 */
export interface MembershipCreate {
    /**
     * The userId of the membership
     * @type {string}
     * @memberof MembershipCreate
     */
    'contactId'?: string;
}
/**
 * 
 * @export
 * @interface MembershipSettings
 */
export interface MembershipSettings {
    /**
     * The teamId of the membership
     * @type {string}
     * @memberof MembershipSettings
     */
    'teamId'?: string;
    /**
     * Whether the membership is enabled
     * @type {boolean}
     * @memberof MembershipSettings
     */
    'enabled'?: boolean;
    /**
     * The keywordId to add points
     * @type {string}
     * @memberof MembershipSettings
     */
    'addPointsKeywordId'?: string;
    /**
     * The keywordId to remove points
     * @type {string}
     * @memberof MembershipSettings
     */
    'removePointsKeywordId'?: string;
}
/**
 * 
 * @export
 * @interface MembershipSettingsPatch
 */
export interface MembershipSettingsPatch {
    /**
     * Whether the membership is enabled
     * @type {boolean}
     * @memberof MembershipSettingsPatch
     */
    'enabled'?: boolean;
    /**
     * The keywordId to add points
     * @type {string}
     * @memberof MembershipSettingsPatch
     */
    'addPointsKeywordId'?: string;
    /**
     * The keywordId to remove points
     * @type {string}
     * @memberof MembershipSettingsPatch
     */
    'removePointsKeywordId'?: string;
}
/**
 * 
 * @export
 * @interface UpdateMembershipActionRequest
 */
export interface UpdateMembershipActionRequest {
    /**
     * 
     * @type {string}
     * @memberof UpdateMembershipActionRequest
     */
    'approvalState': UpdateMembershipActionRequestApprovalStateEnum;
}

export const UpdateMembershipActionRequestApprovalStateEnum = {
    Approved: 'approved',
    Rejected: 'rejected'
} as const;

export type UpdateMembershipActionRequestApprovalStateEnum = typeof UpdateMembershipActionRequestApprovalStateEnum[keyof typeof UpdateMembershipActionRequestApprovalStateEnum];

/**
 * 
 * @export
 * @interface UpdateMembershipSettingsRequest
 */
export interface UpdateMembershipSettingsRequest {
    /**
     * 
     * @type {MembershipSettingsPatch}
     * @memberof UpdateMembershipSettingsRequest
     */
    'membershipSettings': MembershipSettingsPatch;
}

/**
 * MembershipsApi - axios parameter creator
 * @export
 */
export const MembershipsApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary Create a membership
         * @param {MembershipCreate} membershipCreate The membership to create
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createMembership: async (membershipCreate: MembershipCreate, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'membershipCreate' is not null or undefined
            assertParamExists('createMembership', 'membershipCreate', membershipCreate)
            const localVarPath = `/memberships`;
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
            localVarRequestOptions.data = serializeDataIfNeeded(membershipCreate, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Create a membership action
         * @param {CreateMembershipActionRequest} createMembershipActionRequest The membership action to create
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createMembershipAction: async (createMembershipActionRequest: CreateMembershipActionRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'createMembershipActionRequest' is not null or undefined
            assertParamExists('createMembershipAction', 'createMembershipActionRequest', createMembershipActionRequest)
            const localVarPath = `/memberships/actions`;
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
            localVarRequestOptions.data = serializeDataIfNeeded(createMembershipActionRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Get a membership
         * @param {string} contactId The contactId of the membership to get
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getMembership: async (contactId: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'contactId' is not null or undefined
            assertParamExists('getMembership', 'contactId', contactId)
            const localVarPath = `/memberships/{contactId}`
                .replace(`{${"contactId"}}`, encodeURIComponent(String(contactId)));
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
         * @summary Get membership settings
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getMembershipSettings: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/membership-settings`;
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
         * @summary Get memberships
         * @param {number} [count] The number of memberships to get
         * @param {number} [cursor] The cursor to get memberships from
         * @param {boolean} [onlyPending] Whether to only get memberships with pending actions
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getMemberships: async (count?: number, cursor?: number, onlyPending?: boolean, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/memberships`;
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

            if (count !== undefined) {
                localVarQueryParameter['count'] = count;
            }

            if (cursor !== undefined) {
                localVarQueryParameter['cursor'] = cursor;
            }

            if (onlyPending !== undefined) {
                localVarQueryParameter['onlyPending'] = onlyPending;
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
         * @summary Update a membership action
         * @param {number} id The id of the membership action to update
         * @param {UpdateMembershipActionRequest} updateMembershipActionRequest The membership action to update
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateMembershipAction: async (id: number, updateMembershipActionRequest: UpdateMembershipActionRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('updateMembershipAction', 'id', id)
            // verify required parameter 'updateMembershipActionRequest' is not null or undefined
            assertParamExists('updateMembershipAction', 'updateMembershipActionRequest', updateMembershipActionRequest)
            const localVarPath = `/memberships/actions/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
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
            await setOAuthToObject(localVarHeaderParameter, "chatdaddy", [], configuration)


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(updateMembershipActionRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Update a membership settings
         * @param {UpdateMembershipSettingsRequest} updateMembershipSettingsRequest The membership settings to update
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateMembershipSettings: async (updateMembershipSettingsRequest: UpdateMembershipSettingsRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'updateMembershipSettingsRequest' is not null or undefined
            assertParamExists('updateMembershipSettings', 'updateMembershipSettingsRequest', updateMembershipSettingsRequest)
            const localVarPath = `/membership-settings`;
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
            await setOAuthToObject(localVarHeaderParameter, "chatdaddy", [], configuration)


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(updateMembershipSettingsRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * MembershipsApi - functional programming interface
 * @export
 */
export const MembershipsApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = MembershipsApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @summary Create a membership
         * @param {MembershipCreate} membershipCreate The membership to create
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async createMembership(membershipCreate: MembershipCreate, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Membership>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.createMembership(membershipCreate, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Create a membership action
         * @param {CreateMembershipActionRequest} createMembershipActionRequest The membership action to create
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async createMembershipAction(createMembershipActionRequest: CreateMembershipActionRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<MembershipAction>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.createMembershipAction(createMembershipActionRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Get a membership
         * @param {string} contactId The contactId of the membership to get
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getMembership(contactId: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Membership>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getMembership(contactId, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Get membership settings
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getMembershipSettings(options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<GetMembershipSettings200Response>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getMembershipSettings(options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Get memberships
         * @param {number} [count] The number of memberships to get
         * @param {number} [cursor] The cursor to get memberships from
         * @param {boolean} [onlyPending] Whether to only get memberships with pending actions
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getMemberships(count?: number, cursor?: number, onlyPending?: boolean, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<GetMemberships200Response>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getMemberships(count, cursor, onlyPending, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Update a membership action
         * @param {number} id The id of the membership action to update
         * @param {UpdateMembershipActionRequest} updateMembershipActionRequest The membership action to update
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async updateMembershipAction(id: number, updateMembershipActionRequest: UpdateMembershipActionRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.updateMembershipAction(id, updateMembershipActionRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Update a membership settings
         * @param {UpdateMembershipSettingsRequest} updateMembershipSettingsRequest The membership settings to update
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async updateMembershipSettings(updateMembershipSettingsRequest: UpdateMembershipSettingsRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<UpdateMembershipSettingsRequest>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.updateMembershipSettings(updateMembershipSettingsRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * MembershipsApi - factory interface
 * @export
 */
export const MembershipsApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = MembershipsApiFp(configuration)
    return {
        /**
         * 
         * @summary Create a membership
         * @param {MembershipsApiCreateMembershipRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createMembership(requestParameters: MembershipsApiCreateMembershipRequest, options?: AxiosRequestConfig): AxiosPromise<Membership> {
            return localVarFp.createMembership(requestParameters.membershipCreate, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Create a membership action
         * @param {MembershipsApiCreateMembershipActionRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createMembershipAction(requestParameters: MembershipsApiCreateMembershipActionRequest, options?: AxiosRequestConfig): AxiosPromise<MembershipAction> {
            return localVarFp.createMembershipAction(requestParameters.createMembershipActionRequest, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Get a membership
         * @param {MembershipsApiGetMembershipRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getMembership(requestParameters: MembershipsApiGetMembershipRequest, options?: AxiosRequestConfig): AxiosPromise<Membership> {
            return localVarFp.getMembership(requestParameters.contactId, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Get membership settings
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getMembershipSettings(options?: AxiosRequestConfig): AxiosPromise<GetMembershipSettings200Response> {
            return localVarFp.getMembershipSettings(options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Get memberships
         * @param {MembershipsApiGetMembershipsRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getMemberships(requestParameters: MembershipsApiGetMembershipsRequest = {}, options?: AxiosRequestConfig): AxiosPromise<GetMemberships200Response> {
            return localVarFp.getMemberships(requestParameters.count, requestParameters.cursor, requestParameters.onlyPending, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Update a membership action
         * @param {MembershipsApiUpdateMembershipActionRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateMembershipAction(requestParameters: MembershipsApiUpdateMembershipActionRequest, options?: AxiosRequestConfig): AxiosPromise<void> {
            return localVarFp.updateMembershipAction(requestParameters.id, requestParameters.updateMembershipActionRequest, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Update a membership settings
         * @param {MembershipsApiUpdateMembershipSettingsRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateMembershipSettings(requestParameters: MembershipsApiUpdateMembershipSettingsRequest, options?: AxiosRequestConfig): AxiosPromise<UpdateMembershipSettingsRequest> {
            return localVarFp.updateMembershipSettings(requestParameters.updateMembershipSettingsRequest, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * Request parameters for createMembership operation in MembershipsApi.
 * @export
 * @interface MembershipsApiCreateMembershipRequest
 */
export interface MembershipsApiCreateMembershipRequest {
    /**
     * The membership to create
     * @type {MembershipCreate}
     * @memberof MembershipsApiCreateMembership
     */
    readonly membershipCreate: MembershipCreate
}

/**
 * Request parameters for createMembershipAction operation in MembershipsApi.
 * @export
 * @interface MembershipsApiCreateMembershipActionRequest
 */
export interface MembershipsApiCreateMembershipActionRequest {
    /**
     * The membership action to create
     * @type {CreateMembershipActionRequest}
     * @memberof MembershipsApiCreateMembershipAction
     */
    readonly createMembershipActionRequest: CreateMembershipActionRequest
}

/**
 * Request parameters for getMembership operation in MembershipsApi.
 * @export
 * @interface MembershipsApiGetMembershipRequest
 */
export interface MembershipsApiGetMembershipRequest {
    /**
     * The contactId of the membership to get
     * @type {string}
     * @memberof MembershipsApiGetMembership
     */
    readonly contactId: string
}

/**
 * Request parameters for getMemberships operation in MembershipsApi.
 * @export
 * @interface MembershipsApiGetMembershipsRequest
 */
export interface MembershipsApiGetMembershipsRequest {
    /**
     * The number of memberships to get
     * @type {number}
     * @memberof MembershipsApiGetMemberships
     */
    readonly count?: number

    /**
     * The cursor to get memberships from
     * @type {number}
     * @memberof MembershipsApiGetMemberships
     */
    readonly cursor?: number

    /**
     * Whether to only get memberships with pending actions
     * @type {boolean}
     * @memberof MembershipsApiGetMemberships
     */
    readonly onlyPending?: boolean
}

/**
 * Request parameters for updateMembershipAction operation in MembershipsApi.
 * @export
 * @interface MembershipsApiUpdateMembershipActionRequest
 */
export interface MembershipsApiUpdateMembershipActionRequest {
    /**
     * The id of the membership action to update
     * @type {number}
     * @memberof MembershipsApiUpdateMembershipAction
     */
    readonly id: number

    /**
     * The membership action to update
     * @type {UpdateMembershipActionRequest}
     * @memberof MembershipsApiUpdateMembershipAction
     */
    readonly updateMembershipActionRequest: UpdateMembershipActionRequest
}

/**
 * Request parameters for updateMembershipSettings operation in MembershipsApi.
 * @export
 * @interface MembershipsApiUpdateMembershipSettingsRequest
 */
export interface MembershipsApiUpdateMembershipSettingsRequest {
    /**
     * The membership settings to update
     * @type {UpdateMembershipSettingsRequest}
     * @memberof MembershipsApiUpdateMembershipSettings
     */
    readonly updateMembershipSettingsRequest: UpdateMembershipSettingsRequest
}

/**
 * MembershipsApi - object-oriented interface
 * @export
 * @class MembershipsApi
 * @extends {BaseAPI}
 */
export class MembershipsApi extends BaseAPI {
    /**
     * 
     * @summary Create a membership
     * @param {MembershipsApiCreateMembershipRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof MembershipsApi
     */
    public createMembership(requestParameters: MembershipsApiCreateMembershipRequest, options?: AxiosRequestConfig) {
        return MembershipsApiFp(this.configuration).createMembership(requestParameters.membershipCreate, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Create a membership action
     * @param {MembershipsApiCreateMembershipActionRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof MembershipsApi
     */
    public createMembershipAction(requestParameters: MembershipsApiCreateMembershipActionRequest, options?: AxiosRequestConfig) {
        return MembershipsApiFp(this.configuration).createMembershipAction(requestParameters.createMembershipActionRequest, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Get a membership
     * @param {MembershipsApiGetMembershipRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof MembershipsApi
     */
    public getMembership(requestParameters: MembershipsApiGetMembershipRequest, options?: AxiosRequestConfig) {
        return MembershipsApiFp(this.configuration).getMembership(requestParameters.contactId, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Get membership settings
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof MembershipsApi
     */
    public getMembershipSettings(options?: AxiosRequestConfig) {
        return MembershipsApiFp(this.configuration).getMembershipSettings(options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Get memberships
     * @param {MembershipsApiGetMembershipsRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof MembershipsApi
     */
    public getMemberships(requestParameters: MembershipsApiGetMembershipsRequest = {}, options?: AxiosRequestConfig) {
        return MembershipsApiFp(this.configuration).getMemberships(requestParameters.count, requestParameters.cursor, requestParameters.onlyPending, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Update a membership action
     * @param {MembershipsApiUpdateMembershipActionRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof MembershipsApi
     */
    public updateMembershipAction(requestParameters: MembershipsApiUpdateMembershipActionRequest, options?: AxiosRequestConfig) {
        return MembershipsApiFp(this.configuration).updateMembershipAction(requestParameters.id, requestParameters.updateMembershipActionRequest, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Update a membership settings
     * @param {MembershipsApiUpdateMembershipSettingsRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof MembershipsApi
     */
    public updateMembershipSettings(requestParameters: MembershipsApiUpdateMembershipSettingsRequest, options?: AxiosRequestConfig) {
        return MembershipsApiFp(this.configuration).updateMembershipSettings(requestParameters.updateMembershipSettingsRequest, options).then((request) => request(this.axios, this.basePath));
    }
}


