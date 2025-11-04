import type * as types from './types';
import type { ConfigOptions, FetchResponse } from 'api/dist/core'
import Oas from 'oas';
import APICore from 'api/dist/core';
import definition from './openapi.json';

class SDK {
  spec: Oas;
  core: APICore;

  constructor() {
    this.spec = Oas.init(definition);
    this.core = new APICore(this.spec, 'viterbit/1.0.0 (api/6.1.3)');
  }

  /**
   * Optionally configure various options that the SDK allows.
   *
   * @param config Object of supported SDK options and toggles.
   * @param config.timeout Override the default `fetch` request timeout of 30 seconds. This number
   * should be represented in milliseconds.
   */
  config(config: ConfigOptions) {
    this.core.setConfig(config);
  }

  /**
   * If the API you're using requires authentication you can supply the required credentials
   * through this method and the library will magically determine how they should be used
   * within your API request.
   *
   * With the exception of OpenID and MutualTLS, it supports all forms of authentication
   * supported by the OpenAPI specification.
   *
   * @example <caption>HTTP Basic auth</caption>
   * sdk.auth('username', 'password');
   *
   * @example <caption>Bearer tokens (HTTP or OAuth 2)</caption>
   * sdk.auth('myBearerToken');
   *
   * @example <caption>API Keys</caption>
   * sdk.auth('myApiKey');
   *
   * @see {@link https://spec.openapis.org/oas/v3.0.3#fixed-fields-22}
   * @see {@link https://spec.openapis.org/oas/v3.1.0#fixed-fields-22}
   * @param values Your auth credentials for the API; can specify up to two strings or numbers.
   */
  auth(...values: string[] | number[]) {
    this.core.setAuth(...values);
    return this;
  }

  /**
   * If the API you're using offers alternate server URLs, and server variables, you can tell
   * the SDK which one to use with this method. To use it you can supply either one of the
   * server URLs that are contained within the OpenAPI definition (along with any server
   * variables), or you can pass it a fully qualified URL to use (that may or may not exist
   * within the OpenAPI definition).
   *
   * @example <caption>Server URL with server variables</caption>
   * sdk.server('https://{region}.api.example.com/{basePath}', {
   *   name: 'eu',
   *   basePath: 'v14',
   * });
   *
   * @example <caption>Fully qualified server URL</caption>
   * sdk.server('https://eu.api.example.com/v14');
   *
   * @param url Server URL
   * @param variables An object of variables to replace into the server URL.
   */
  server(url: string, variables = {}) {
    this.core.setServer(url, variables);
  }

  /**
   * Use this endpoint to retrieve the details of a killer questions template.
   *
   * @summary Retrieve a killer questions template
   * @throws FetchError<400, types.RetrieveKillerQuestionsTemplateResponse400> This response will be sent when bad request
   * @throws FetchError<401, types.RetrieveKillerQuestionsTemplateResponse401> This response will be sent when unauthorized
   * @throws FetchError<403, types.RetrieveKillerQuestionsTemplateResponse403> This response will be sent when forbidden
   * @throws FetchError<404, types.RetrieveKillerQuestionsTemplateResponse404> This response will be sent when not found
   * @throws FetchError<422, types.RetrieveKillerQuestionsTemplateResponse422> This response will be sent when unprocessable
   */
  retrieveKillerQuestionsTemplate(metadata: types.RetrieveKillerQuestionsTemplateMetadataParam): Promise<FetchResponse<200, types.RetrieveKillerQuestionsTemplateResponse200>> {
    return this.core.fetch('/v1/jobs/killer-questions/{id}', 'get', metadata);
  }

  /**
   * Use this endpoint to retrieve lists of killer questions template.
   *
   * @summary List killer questions template
   * @throws FetchError<400, types.ListKillerQuestionsTemplateResponse400> This response will be sent when bad request
   * @throws FetchError<401, types.ListKillerQuestionsTemplateResponse401> This response will be sent when unauthorized
   * @throws FetchError<403, types.ListKillerQuestionsTemplateResponse403> This response will be sent when forbidden
   * @throws FetchError<422, types.ListKillerQuestionsTemplateResponse422> This response will be sent when unprocessable
   */
  listKillerQuestionsTemplate(metadata?: types.ListKillerQuestionsTemplateMetadataParam): Promise<FetchResponse<200, types.ListKillerQuestionsTemplateResponse200>> {
    return this.core.fetch('/v1/jobs/killer-questions', 'get', metadata);
  }

  /**
   * Use this endpoint to retrieve lists of job stage types.
   *
   * @summary List job stage types
   * @throws FetchError<400, types.ListJobStageTypesResponse400> This response will be sent when bad request
   * @throws FetchError<401, types.ListJobStageTypesResponse401> This response will be sent when unauthorized
   * @throws FetchError<403, types.ListJobStageTypesResponse403> This response will be sent when forbidden
   * @throws FetchError<422, types.ListJobStageTypesResponse422> This response will be sent when unprocessable
   */
  listJobStageTypes(): Promise<FetchResponse<200, types.ListJobStageTypesResponse200>> {
    return this.core.fetch('/v1/jobs/stage-types', 'get');
  }

  /**
   * Use this endpoint to retrieve lists of custom fields.
   *
   * @summary List custom fields
   * @throws FetchError<400, types.ListCustomFieldsResponse400> This response will be sent when bad request
   * @throws FetchError<401, types.ListCustomFieldsResponse401> This response will be sent when unauthorized
   * @throws FetchError<403, types.ListCustomFieldsResponse403> This response will be sent when forbidden
   * @throws FetchError<422, types.ListCustomFieldsResponse422> This response will be sent when unprocessable
   */
  listCustomFields(metadata: types.ListCustomFieldsMetadataParam): Promise<FetchResponse<200, types.ListCustomFieldsResponse200>> {
    return this.core.fetch('/v1/custom-fields/{type}', 'get', metadata);
  }

  /**
   * Use this endpoint to create an custom field.
   *
   * @summary Create custom field
   * @throws FetchError<400, types.CreateCustomFieldResponse400> This response will be sent when bad request
   * @throws FetchError<401, types.CreateCustomFieldResponse401> This response will be sent when unauthorized
   * @throws FetchError<403, types.CreateCustomFieldResponse403> This response will be sent when forbidden
   * @throws FetchError<422, types.CreateCustomFieldResponse422> This response will be sent when unprocessable
   */
  createCustomField(body: types.CreateCustomFieldBodyParam, metadata: types.CreateCustomFieldMetadataParam): Promise<FetchResponse<201, types.CreateCustomFieldResponse201>>;
  createCustomField(metadata: types.CreateCustomFieldMetadataParam): Promise<FetchResponse<201, types.CreateCustomFieldResponse201>>;
  createCustomField(body?: types.CreateCustomFieldBodyParam | types.CreateCustomFieldMetadataParam, metadata?: types.CreateCustomFieldMetadataParam): Promise<FetchResponse<201, types.CreateCustomFieldResponse201>> {
    return this.core.fetch('/v1/custom-fields/{type}', 'post', body, metadata);
  }

  /**
   * Use this endpoint to retrieve an custom field.
   *
   * @summary Find custom field
   * @throws FetchError<400, types.FindCustomFieldResponse400> This response will be sent when bad request
   * @throws FetchError<401, types.FindCustomFieldResponse401> This response will be sent when unauthorized
   * @throws FetchError<403, types.FindCustomFieldResponse403> This response will be sent when forbidden
   * @throws FetchError<422, types.FindCustomFieldResponse422> This response will be sent when unprocessable
   */
  findCustomField(metadata: types.FindCustomFieldMetadataParam): Promise<FetchResponse<200, types.FindCustomFieldResponse200>> {
    return this.core.fetch('/v1/custom-fields/{type}/{id}', 'get', metadata);
  }

  /**
   * Use this endpoint to delete an custom field.
   *
   * @summary Delete custom field
   * @throws FetchError<400, types.DeleteCustomFieldResponse400> This response will be sent when bad request
   * @throws FetchError<401, types.DeleteCustomFieldResponse401> This response will be sent when unauthorized
   * @throws FetchError<403, types.DeleteCustomFieldResponse403> This response will be sent when forbidden
   * @throws FetchError<422, types.DeleteCustomFieldResponse422> This response will be sent when unprocessable
   */
  deleteCustomField(metadata: types.DeleteCustomFieldMetadataParam): Promise<FetchResponse<204, types.DeleteCustomFieldResponse204>> {
    return this.core.fetch('/v1/custom-fields/{type}/{id}', 'delete', metadata);
  }

  /**
   * Use this endpoint to update an custom field.
   *
   * @summary Update custom field
   * @throws FetchError<400, types.UpdateCustomFieldsResponse400> This response will be sent when bad request
   * @throws FetchError<401, types.UpdateCustomFieldsResponse401> This response will be sent when unauthorized
   * @throws FetchError<403, types.UpdateCustomFieldsResponse403> This response will be sent when forbidden
   * @throws FetchError<422, types.UpdateCustomFieldsResponse422> This response will be sent when unprocessable
   */
  updateCustomFields(body: types.UpdateCustomFieldsBodyParam, metadata: types.UpdateCustomFieldsMetadataParam): Promise<FetchResponse<200, types.UpdateCustomFieldsResponse200>>;
  updateCustomFields(metadata: types.UpdateCustomFieldsMetadataParam): Promise<FetchResponse<200, types.UpdateCustomFieldsResponse200>>;
  updateCustomFields(body?: types.UpdateCustomFieldsBodyParam | types.UpdateCustomFieldsMetadataParam, metadata?: types.UpdateCustomFieldsMetadataParam): Promise<FetchResponse<200, types.UpdateCustomFieldsResponse200>> {
    return this.core.fetch('/v1/custom-fields/{type}/{id}', 'patch', body, metadata);
  }

  /**
   * Use this endpoint to retrieve the details of a department.
   *
   * @summary Retrieve a department
   * @throws FetchError<400, types.RetrieveDepartmentResponse400> This response will be sent when bad request
   * @throws FetchError<401, types.RetrieveDepartmentResponse401> This response will be sent when unauthorized
   * @throws FetchError<403, types.RetrieveDepartmentResponse403> This response will be sent when forbidden
   * @throws FetchError<404, types.RetrieveDepartmentResponse404> This response will be sent when not found
   * @throws FetchError<422, types.RetrieveDepartmentResponse422> This response will be sent when unprocessable
   */
  retrieveDepartment(metadata: types.RetrieveDepartmentMetadataParam): Promise<FetchResponse<200, types.RetrieveDepartmentResponse200>> {
    return this.core.fetch('/v1/departments/{id}', 'get', metadata);
  }

  /**
   * Use this endpoint to retrieve the details of a department profile.
   *
   * @summary Retrieve a profile of department
   * @throws FetchError<400, types.RetrieveProfileOfDepartmentResponse400> This response will be sent when bad request
   * @throws FetchError<401, types.RetrieveProfileOfDepartmentResponse401> This response will be sent when unauthorized
   * @throws FetchError<403, types.RetrieveProfileOfDepartmentResponse403> This response will be sent when forbidden
   * @throws FetchError<404, types.RetrieveProfileOfDepartmentResponse404> This response will be sent when not found
   * @throws FetchError<422, types.RetrieveProfileOfDepartmentResponse422> This response will be sent when unprocessable
   */
  retrieveProfileOfDepartment(metadata: types.RetrieveProfileOfDepartmentMetadataParam): Promise<FetchResponse<200, types.RetrieveProfileOfDepartmentResponse200>> {
    return this.core.fetch('/v1/departments/{departmentId}/profiles/{profileId}', 'get', metadata);
  }

  /**
   * Use this endpoint to retrieve lists of departments.
   *
   * @summary List departments
   * @throws FetchError<400, types.ListDepartmentsResponse400> This response will be sent when bad request
   * @throws FetchError<401, types.ListDepartmentsResponse401> This response will be sent when unauthorized
   * @throws FetchError<403, types.ListDepartmentsResponse403> This response will be sent when forbidden
   * @throws FetchError<422, types.ListDepartmentsResponse422> This response will be sent when unprocessable
   */
  listDepartments(metadata?: types.ListDepartmentsMetadataParam): Promise<FetchResponse<200, types.ListDepartmentsResponse200>> {
    return this.core.fetch('/v1/departments', 'get', metadata);
  }

  /**
   * Use this endpoint to retrieve the list of profiles for a department.
   *
   * @summary List of profiles for a department
   * @throws FetchError<400, types.ListProfilesOfDepartmentResponse400> This response will be sent when bad request
   * @throws FetchError<401, types.ListProfilesOfDepartmentResponse401> This response will be sent when unauthorized
   * @throws FetchError<403, types.ListProfilesOfDepartmentResponse403> This response will be sent when forbidden
   * @throws FetchError<422, types.ListProfilesOfDepartmentResponse422> This response will be sent when unprocessable
   */
  listProfilesOfDepartment(metadata: types.ListProfilesOfDepartmentMetadataParam): Promise<FetchResponse<200, types.ListProfilesOfDepartmentResponse200>> {
    return this.core.fetch('/v1/departments/{id}/profiles', 'get', metadata);
  }

  /**
   * Use this endpoint to retrieve lists of departments.
   *
   * @summary Search departments
   * @throws FetchError<400, types.SearchDepartmentsResponse400> This response will be sent when bad request
   * @throws FetchError<401, types.SearchDepartmentsResponse401> This response will be sent when unauthorized
   * @throws FetchError<403, types.SearchDepartmentsResponse403> This response will be sent when forbidden
   * @throws FetchError<422, types.SearchDepartmentsResponse422> This response will be sent when unprocessable
   */
  searchDepartments(body: types.SearchDepartmentsBodyParam): Promise<FetchResponse<200, types.SearchDepartmentsResponse200>> {
    return this.core.fetch('/v1/departments/search', 'post', body);
  }

  /**
   * Use this endpoint to retrieve the details of a location.
   *
   * @summary Retrieve a location
   * @throws FetchError<400, types.RetrieveLocationResponse400> This response will be sent when bad request
   * @throws FetchError<401, types.RetrieveLocationResponse401> This response will be sent when unauthorized
   * @throws FetchError<403, types.RetrieveLocationResponse403> This response will be sent when forbidden
   * @throws FetchError<404, types.RetrieveLocationResponse404> This response will be sent when not found
   * @throws FetchError<422, types.RetrieveLocationResponse422> This response will be sent when unprocessable
   */
  retrieveLocation(metadata: types.RetrieveLocationMetadataParam): Promise<FetchResponse<200, types.RetrieveLocationResponse200>> {
    return this.core.fetch('/v1/locations/{id}', 'get', metadata);
  }

  /**
   * Use this endpoint to retrieve lists of locations.
   *
   * @summary List locations
   * @throws FetchError<400, types.ListLocationsResponse400> This response will be sent when bad request
   * @throws FetchError<401, types.ListLocationsResponse401> This response will be sent when unauthorized
   * @throws FetchError<403, types.ListLocationsResponse403> This response will be sent when forbidden
   * @throws FetchError<422, types.ListLocationsResponse422> This response will be sent when unprocessable
   */
  listLocations(metadata?: types.ListLocationsMetadataParam): Promise<FetchResponse<200, types.ListLocationsResponse200>> {
    return this.core.fetch('/v1/locations', 'get', metadata);
  }

  /**
   * Use this endpoint to retrieve lists of locations.
   *
   * @summary Search locations
   * @throws FetchError<400, types.SearchLocationsResponse400> This response will be sent when bad request
   * @throws FetchError<401, types.SearchLocationsResponse401> This response will be sent when unauthorized
   * @throws FetchError<403, types.SearchLocationsResponse403> This response will be sent when forbidden
   * @throws FetchError<422, types.SearchLocationsResponse422> This response will be sent when unprocessable
   */
  searchLocations(body: types.SearchLocationsBodyParam): Promise<FetchResponse<200, types.SearchLocationsResponse200>> {
    return this.core.fetch('/v1/locations/search', 'post', body);
  }

  /**
   * Use this endpoint to retrieve the details of a user.
   *
   * @summary Retrieve a user
   * @throws FetchError<400, types.RetrieveUserResponse400> This response will be sent when bad request
   * @throws FetchError<401, types.RetrieveUserResponse401> This response will be sent when unauthorized
   * @throws FetchError<403, types.RetrieveUserResponse403> This response will be sent when forbidden
   * @throws FetchError<404, types.RetrieveUserResponse404> This response will be sent when not found
   * @throws FetchError<422, types.RetrieveUserResponse422> This response will be sent when unprocessable
   */
  retrieveUser(metadata: types.RetrieveUserMetadataParam): Promise<FetchResponse<200, types.RetrieveUserResponse200>> {
    return this.core.fetch('/v1/users/{id}', 'get', metadata);
  }

  /**
   * Use this endpoint to retrieve lists of users.
   *
   * @summary List users
   * @throws FetchError<400, types.ListUsersResponse400> This response will be sent when bad request
   * @throws FetchError<401, types.ListUsersResponse401> This response will be sent when unauthorized
   * @throws FetchError<403, types.ListUsersResponse403> This response will be sent when forbidden
   * @throws FetchError<422, types.ListUsersResponse422> This response will be sent when unprocessable
   */
  listUsers(metadata?: types.ListUsersMetadataParam): Promise<FetchResponse<200, types.ListUsersResponse200>> {
    return this.core.fetch('/v1/users', 'get', metadata);
  }

  /**
   * Use this endpoint to retrieve lists of users.
   *
   * @summary Search users
   * @throws FetchError<400, types.SearchUsersResponse400> This response will be sent when bad request
   * @throws FetchError<401, types.SearchUsersResponse401> This response will be sent when unauthorized
   * @throws FetchError<403, types.SearchUsersResponse403> This response will be sent when forbidden
   * @throws FetchError<422, types.SearchUsersResponse422> This response will be sent when unprocessable
   */
  searchUsers(body: types.SearchUsersBodyParam): Promise<FetchResponse<200, types.SearchUsersResponse200>> {
    return this.core.fetch('/v1/users/search', 'post', body);
  }

  /**
   * Use this endpoint to create candidate(s) from cv file.
   *
   * @summary Create candidate(s) from cv file
   * @throws FetchError<400, types.CreateCandidatesFromCvFileResponse400> This response will be sent when bad request
   * @throws FetchError<401, types.CreateCandidatesFromCvFileResponse401> This response will be sent when unauthorized
   * @throws FetchError<403, types.CreateCandidatesFromCvFileResponse403> This response will be sent when forbidden
   * @throws FetchError<404, types.CreateCandidatesFromCvFileResponse404> This response will be sent when not found
   * @throws FetchError<422, types.CreateCandidatesFromCvFileResponse422> This response will be sent when unprocessable
   */
  createCandidatesFromCvFile(body: types.CreateCandidatesFromCvFileBodyParam): Promise<FetchResponse<201, types.CreateCandidatesFromCvFileResponse201>> {
    return this.core.fetch('/v1/candidates/from-cv-file', 'post', body);
  }

  /**
   * Use this endpoint to retrieve the details of a candidate.
   *
   * @summary Retrieve a candidate
   * @throws FetchError<400, types.RetrieveCandidateResponse400> This response will be sent when bad request
   * @throws FetchError<401, types.RetrieveCandidateResponse401> This response will be sent when unauthorized
   * @throws FetchError<403, types.RetrieveCandidateResponse403> This response will be sent when forbidden
   * @throws FetchError<404, types.RetrieveCandidateResponse404> This response will be sent when not found
   * @throws FetchError<422, types.RetrieveCandidateResponse422> This response will be sent when unprocessable
   */
  retrieveCandidate(metadata: types.RetrieveCandidateMetadataParam): Promise<FetchResponse<200, types.RetrieveCandidateResponse200>> {
    return this.core.fetch('/v1/candidates/{id}', 'get', metadata);
  }

  /**
   * Use this endpoint to update candidate.
   *
   * @summary Update candidate
   * @throws FetchError<400, types.UpdateCandidateResponse400> This response will be sent when bad request
   * @throws FetchError<401, types.UpdateCandidateResponse401> This response will be sent when unauthorized
   * @throws FetchError<403, types.UpdateCandidateResponse403> This response will be sent when forbidden
   * @throws FetchError<422, types.UpdateCandidateResponse422> This response will be sent when unprocessable
   */
  updateCandidate(body: types.UpdateCandidateBodyParam, metadata: types.UpdateCandidateMetadataParam): Promise<FetchResponse<200, types.UpdateCandidateResponse200>> {
    return this.core.fetch('/v1/candidates/{id}', 'patch', body, metadata);
  }

  /**
   * Use this endpoint to retrieve lists of candidates.
   *
   * @summary List candidates
   * @throws FetchError<400, types.ListCandidatesResponse400> This response will be sent when bad request
   * @throws FetchError<401, types.ListCandidatesResponse401> This response will be sent when unauthorized
   * @throws FetchError<403, types.ListCandidatesResponse403> This response will be sent when forbidden
   * @throws FetchError<422, types.ListCandidatesResponse422> This response will be sent when unprocessable
   */
  listCandidates(metadata?: types.ListCandidatesMetadataParam): Promise<FetchResponse<200, types.ListCandidatesResponse200>> {
    return this.core.fetch('/v1/candidates', 'get', metadata);
  }

  /**
   * Use this endpoint to retrieve lists of candidates.
   *
   * @summary Search candidates
   * @throws FetchError<400, types.SearchCandidatesResponse400> This response will be sent when bad request
   * @throws FetchError<401, types.SearchCandidatesResponse401> This response will be sent when unauthorized
   * @throws FetchError<403, types.SearchCandidatesResponse403> This response will be sent when forbidden
   * @throws FetchError<422, types.SearchCandidatesResponse422> This response will be sent when unprocessable
   */
  searchCandidates(body: types.SearchCandidatesBodyParam): Promise<FetchResponse<200, types.SearchCandidatesResponse200>> {
    return this.core.fetch('/v1/candidates/search', 'post', body);
  }

  /**
   * Use this endpoint to change current stage of candidature.
   *
   * @summary Change current stage of candidature
   * @throws FetchError<400, types.ChangeCandidatureStageResponse400> This response will be sent when bad request
   * @throws FetchError<401, types.ChangeCandidatureStageResponse401> This response will be sent when unauthorized
   * @throws FetchError<403, types.ChangeCandidatureStageResponse403> This response will be sent when forbidden
   * @throws FetchError<422, types.ChangeCandidatureStageResponse422> This response will be sent when unprocessable
   */
  changeCandidatureStage(body: types.ChangeCandidatureStageBodyParam, metadata: types.ChangeCandidatureStageMetadataParam): Promise<FetchResponse<200, types.ChangeCandidatureStageResponse200>> {
    return this.core.fetch('/v1/candidatures/{id}/stage', 'post', body, metadata);
  }

  /**
   * Use this endpoint to retrieve lists of candidatures.
   *
   * @summary List candidatures
   * @throws FetchError<400, types.ListCandidaturesResponse400> This response will be sent when bad request
   * @throws FetchError<401, types.ListCandidaturesResponse401> This response will be sent when unauthorized
   * @throws FetchError<403, types.ListCandidaturesResponse403> This response will be sent when forbidden
   * @throws FetchError<422, types.ListCandidaturesResponse422> This response will be sent when unprocessable
   */
  listCandidatures(metadata?: types.ListCandidaturesMetadataParam): Promise<FetchResponse<200, types.ListCandidaturesResponse200>> {
    return this.core.fetch('/v1/candidatures', 'get', metadata);
  }

  /**
   * Use this endpoint to assign a candidate to a job.
   *
   * @summary Create candidature
   * @throws FetchError<400, types.CreateCandidatureResponse400> This response will be sent when bad request
   * @throws FetchError<401, types.CreateCandidatureResponse401> This response will be sent when unauthorized
   * @throws FetchError<403, types.CreateCandidatureResponse403> This response will be sent when forbidden
   * @throws FetchError<422, types.CreateCandidatureResponse422> This response will be sent when unprocessable
   */
  createCandidature(body: types.CreateCandidatureBodyParam): Promise<FetchResponse<201, types.CreateCandidatureResponse201>> {
    return this.core.fetch('/v1/candidatures', 'post', body);
  }

  /**
   * Use this endpoint to retrieve the details of a candidature.
   *
   * @summary Retrieve a candidature
   * @throws FetchError<400, types.RetrieveCandidatureResponse400> This response will be sent when bad request
   * @throws FetchError<401, types.RetrieveCandidatureResponse401> This response will be sent when unauthorized
   * @throws FetchError<403, types.RetrieveCandidatureResponse403> This response will be sent when forbidden
   * @throws FetchError<404, types.RetrieveCandidatureResponse404> This response will be sent when not found
   * @throws FetchError<422, types.RetrieveCandidatureResponse422> This response will be sent when unprocessable
   */
  retrieveCandidature(metadata: types.RetrieveCandidatureMetadataParam): Promise<FetchResponse<200, types.RetrieveCandidatureResponse200>> {
    return this.core.fetch('/v1/candidatures/{id}', 'get', metadata);
  }

  /**
   * Use this endpoint to retrieve lists of candidatures.
   *
   * @summary Search candidatures
   * @throws FetchError<400, types.SearchCandidaturesResponse400> This response will be sent when bad request
   * @throws FetchError<401, types.SearchCandidaturesResponse401> This response will be sent when unauthorized
   * @throws FetchError<403, types.SearchCandidaturesResponse403> This response will be sent when forbidden
   * @throws FetchError<422, types.SearchCandidaturesResponse422> This response will be sent when unprocessable
   */
  searchCandidatures(body: types.SearchCandidaturesBodyParam): Promise<FetchResponse<200, types.SearchCandidaturesResponse200>> {
    return this.core.fetch('/v1/candidatures/search', 'post', body);
  }

  /**
   * Use this endpoint to retrieve lists of contract types.
   *
   * @summary List contract types
   * @throws FetchError<400, types.ListContractTypesResponse400> This response will be sent when bad request
   * @throws FetchError<401, types.ListContractTypesResponse401> This response will be sent when unauthorized
   * @throws FetchError<403, types.ListContractTypesResponse403> This response will be sent when forbidden
   * @throws FetchError<422, types.ListContractTypesResponse422> This response will be sent when unprocessable
   */
  listContractTypes(metadata?: types.ListContractTypesMetadataParam): Promise<FetchResponse<200, types.ListContractTypesResponse200>> {
    return this.core.fetch('/v1/contract-types', 'get', metadata);
  }

  /**
   * Use this endpoint to retrieve lists of education types.
   *
   * @summary List education types
   * @throws FetchError<400, types.ListEducationTypesResponse400> This response will be sent when bad request
   * @throws FetchError<401, types.ListEducationTypesResponse401> This response will be sent when unauthorized
   * @throws FetchError<403, types.ListEducationTypesResponse403> This response will be sent when forbidden
   * @throws FetchError<422, types.ListEducationTypesResponse422> This response will be sent when unprocessable
   */
  listEducationTypes(metadata?: types.ListEducationTypesMetadataParam): Promise<FetchResponse<200, types.ListEducationTypesResponse200>> {
    return this.core.fetch('/v1/education-types', 'get', metadata);
  }

  /**
   * Use this endpoint to retrieve lists of hiring plan requisitions.
   *
   * @summary List hiring plan requisitions
   * @throws FetchError<400, types.ListHiringPlanRequisitionResponse400> This response will be sent when bad request
   * @throws FetchError<401, types.ListHiringPlanRequisitionResponse401> This response will be sent when unauthorized
   * @throws FetchError<403, types.ListHiringPlanRequisitionResponse403> This response will be sent when forbidden
   * @throws FetchError<422, types.ListHiringPlanRequisitionResponse422> This response will be sent when unprocessable
   */
  listHiringPlanRequisition(metadata?: types.ListHiringPlanRequisitionMetadataParam): Promise<FetchResponse<200, types.ListHiringPlanRequisitionResponse200>> {
    return this.core.fetch('/v1/hiring-plan/requisitions', 'get', metadata);
  }

  /**
   * Use this endpoint to create a hiring plan requisition.
   *
   * @summary Create Hiring Plan Requisition
   * @throws FetchError<400, types.CreateHiringPlanRequisitionResponse400> This response will be sent when bad request
   * @throws FetchError<401, types.CreateHiringPlanRequisitionResponse401> This response will be sent when unauthorized
   * @throws FetchError<403, types.CreateHiringPlanRequisitionResponse403> This response will be sent when forbidden
   * @throws FetchError<422, types.CreateHiringPlanRequisitionResponse422> This response will be sent when unprocessable
   */
  createHiringPlanRequisition(body: types.CreateHiringPlanRequisitionBodyParam): Promise<FetchResponse<201, types.CreateHiringPlanRequisitionResponse201>> {
    return this.core.fetch('/v1/hiring-plan/requisitions', 'post', body);
  }

  /**
   * Use this endpoint to retrieve the details of a hiring plan requisition.
   *
   * @summary Retrieve a hiring plan requisition
   * @throws FetchError<400, types.RetrieveHiringPlanRequisitionResponse400> This response will be sent when bad request
   * @throws FetchError<401, types.RetrieveHiringPlanRequisitionResponse401> This response will be sent when unauthorized
   * @throws FetchError<403, types.RetrieveHiringPlanRequisitionResponse403> This response will be sent when forbidden
   * @throws FetchError<404, types.RetrieveHiringPlanRequisitionResponse404> This response will be sent when not found
   * @throws FetchError<422, types.RetrieveHiringPlanRequisitionResponse422> This response will be sent when unprocessable
   */
  retrieveHiringPlanRequisition(metadata: types.RetrieveHiringPlanRequisitionMetadataParam): Promise<FetchResponse<200, types.RetrieveHiringPlanRequisitionResponse200>> {
    return this.core.fetch('/v1/hiring-plan/requisitions/{id}', 'get', metadata);
  }

  /**
   * Use this endpoint to retrieve the details of a hiring plan template.
   *
   * @summary Retrieve a hiring plan template
   * @throws FetchError<400, types.RetrieveHiringPlanTemplateResponse400> This response will be sent when bad request
   * @throws FetchError<401, types.RetrieveHiringPlanTemplateResponse401> This response will be sent when unauthorized
   * @throws FetchError<403, types.RetrieveHiringPlanTemplateResponse403> This response will be sent when forbidden
   * @throws FetchError<404, types.RetrieveHiringPlanTemplateResponse404> This response will be sent when not found
   * @throws FetchError<422, types.RetrieveHiringPlanTemplateResponse422> This response will be sent when unprocessable
   */
  retrieveHiringPlanTemplate(metadata: types.RetrieveHiringPlanTemplateMetadataParam): Promise<FetchResponse<200, types.RetrieveHiringPlanTemplateResponse200>> {
    return this.core.fetch('/v1/hiring-plan/templates/{id}', 'get', metadata);
  }

  /**
   * Use this endpoint to retrieve the details of a hiring plan workflow.
   *
   * @summary Retrieve a hiring plan workflow
   * @throws FetchError<400, types.RetrieveHiringPlanWorkflowResponse400> This response will be sent when bad request
   * @throws FetchError<401, types.RetrieveHiringPlanWorkflowResponse401> This response will be sent when unauthorized
   * @throws FetchError<403, types.RetrieveHiringPlanWorkflowResponse403> This response will be sent when forbidden
   * @throws FetchError<404, types.RetrieveHiringPlanWorkflowResponse404> This response will be sent when not found
   * @throws FetchError<422, types.RetrieveHiringPlanWorkflowResponse422> This response will be sent when unprocessable
   */
  retrieveHiringPlanWorkflow(metadata: types.RetrieveHiringPlanWorkflowMetadataParam): Promise<FetchResponse<200, types.RetrieveHiringPlanWorkflowResponse200>> {
    return this.core.fetch('/v1/hiring-plan/workflows/{id}', 'get', metadata);
  }

  /**
   * Use this endpoint to retrieve lists of hiring plan templates.
   *
   * @summary List hiring plan templates
   * @throws FetchError<400, types.ListHiringPlanTemplateResponse400> This response will be sent when bad request
   * @throws FetchError<401, types.ListHiringPlanTemplateResponse401> This response will be sent when unauthorized
   * @throws FetchError<403, types.ListHiringPlanTemplateResponse403> This response will be sent when forbidden
   * @throws FetchError<422, types.ListHiringPlanTemplateResponse422> This response will be sent when unprocessable
   */
  listHiringPlanTemplate(metadata?: types.ListHiringPlanTemplateMetadataParam): Promise<FetchResponse<200, types.ListHiringPlanTemplateResponse200>> {
    return this.core.fetch('/v1/hiring-plan/templates', 'get', metadata);
  }

  /**
   * Use this endpoint to retrieve lists of hiring plan workflows.
   *
   * @summary List hiring plan workflows
   * @throws FetchError<400, types.ListHiringPlanWorkflowResponse400> This response will be sent when bad request
   * @throws FetchError<401, types.ListHiringPlanWorkflowResponse401> This response will be sent when unauthorized
   * @throws FetchError<403, types.ListHiringPlanWorkflowResponse403> This response will be sent when forbidden
   * @throws FetchError<422, types.ListHiringPlanWorkflowResponse422> This response will be sent when unprocessable
   */
  listHiringPlanWorkflow(metadata?: types.ListHiringPlanWorkflowMetadataParam): Promise<FetchResponse<200, types.ListHiringPlanWorkflowResponse200>> {
    return this.core.fetch('/v1/hiring-plan/workflows', 'get', metadata);
  }

  /**
   * Use this endpoint to retrieve lists of Hiring Plan Requisitions.
   *
   * @summary Search hiring plan requisitions
   * @throws FetchError<400, types.SearchHiringPlanRequisitionsResponse400> This response will be sent when bad request
   * @throws FetchError<401, types.SearchHiringPlanRequisitionsResponse401> This response will be sent when unauthorized
   * @throws FetchError<403, types.SearchHiringPlanRequisitionsResponse403> This response will be sent when forbidden
   * @throws FetchError<422, types.SearchHiringPlanRequisitionsResponse422> This response will be sent when unprocessable
   */
  searchHiringPlanRequisitions(body: types.SearchHiringPlanRequisitionsBodyParam): Promise<FetchResponse<200, types.SearchHiringPlanRequisitionsResponse200>> {
    return this.core.fetch('/v1/hiring-plan/requisitions/search', 'post', body);
  }

  /**
   * Use this endpoint to change status of job.
   *
   * @summary Change status of job
   * @throws FetchError<400, types.ChangeStatusOfJobResponse400> This response will be sent when bad request
   * @throws FetchError<401, types.ChangeStatusOfJobResponse401> This response will be sent when unauthorized
   * @throws FetchError<403, types.ChangeStatusOfJobResponse403> This response will be sent when forbidden
   * @throws FetchError<422, types.ChangeStatusOfJobResponse422> This response will be sent when unprocessable
   */
  changeStatusOfJob(body: types.ChangeStatusOfJobBodyParam, metadata: types.ChangeStatusOfJobMetadataParam): Promise<FetchResponse<200, types.ChangeStatusOfJobResponse200>> {
    return this.core.fetch('/v1/jobs/{id}/status', 'post', body, metadata);
  }

  /**
   * Use this endpoint to retrieve lists of jobs.
   *
   * @summary List jobs
   * @throws FetchError<400, types.ListJobsResponse400> This response will be sent when bad request
   * @throws FetchError<401, types.ListJobsResponse401> This response will be sent when unauthorized
   * @throws FetchError<403, types.ListJobsResponse403> This response will be sent when forbidden
   * @throws FetchError<422, types.ListJobsResponse422> This response will be sent when unprocessable
   */
  listJobs(metadata?: types.ListJobsMetadataParam): Promise<FetchResponse<200, types.ListJobsResponse200>> {
    return this.core.fetch('/v1/jobs', 'get', metadata);
  }

  /**
   * Use this endpoint to create a job.
   *
   * @summary Create Job
   * @throws FetchError<400, types.CreateJobResponse400> This response will be sent when bad request
   * @throws FetchError<401, types.CreateJobResponse401> This response will be sent when unauthorized
   * @throws FetchError<403, types.CreateJobResponse403> This response will be sent when forbidden
   * @throws FetchError<422, types.CreateJobResponse422> This response will be sent when unprocessable
   */
  createJob(body: types.CreateJobBodyParam): Promise<FetchResponse<201, types.CreateJobResponse201>> {
    return this.core.fetch('/v1/jobs', 'post', body);
  }

  /**
   * Use this endpoint to retrieve the details of a job.
   *
   * @summary Retrieve a job
   * @throws FetchError<400, types.RetrieveJobResponse400> This response will be sent when bad request
   * @throws FetchError<401, types.RetrieveJobResponse401> This response will be sent when unauthorized
   * @throws FetchError<403, types.RetrieveJobResponse403> This response will be sent when forbidden
   * @throws FetchError<404, types.RetrieveJobResponse404> This response will be sent when not found
   * @throws FetchError<422, types.RetrieveJobResponse422> This response will be sent when unprocessable
   */
  retrieveJob(metadata: types.RetrieveJobMetadataParam): Promise<FetchResponse<200, types.RetrieveJobResponse200>> {
    return this.core.fetch('/v1/jobs/{id}', 'get', metadata);
  }

  /**
   * Use this endpoint to update job.
   *
   * @summary Update job
   * @throws FetchError<400, types.UpdateJobResponse400> This response will be sent when bad request
   * @throws FetchError<401, types.UpdateJobResponse401> This response will be sent when unauthorized
   * @throws FetchError<403, types.UpdateJobResponse403> This response will be sent when forbidden
   * @throws FetchError<422, types.UpdateJobResponse422> This response will be sent when unprocessable
   */
  updateJob(body: types.UpdateJobBodyParam, metadata: types.UpdateJobMetadataParam): Promise<FetchResponse<200, types.UpdateJobResponse200>> {
    return this.core.fetch('/v1/jobs/{id}', 'patch', body, metadata);
  }

  /**
   * Use this endpoint to retrieve lists of jobs.
   *
   * @summary Search jobs
   * @throws FetchError<400, types.SearchJobsResponse400> This response will be sent when bad request
   * @throws FetchError<401, types.SearchJobsResponse401> This response will be sent when unauthorized
   * @throws FetchError<403, types.SearchJobsResponse403> This response will be sent when forbidden
   * @throws FetchError<422, types.SearchJobsResponse422> This response will be sent when unprocessable
   */
  searchJobs(body: types.SearchJobsBodyParam): Promise<FetchResponse<200, types.SearchJobsResponse200>> {
    return this.core.fetch('/v1/jobs/search', 'post', body);
  }
}

const createSDK = (() => { return new SDK(); })()
;

export default createSDK;

export type { ChangeCandidatureStageBodyParam, ChangeCandidatureStageMetadataParam, ChangeCandidatureStageResponse200, ChangeCandidatureStageResponse400, ChangeCandidatureStageResponse401, ChangeCandidatureStageResponse403, ChangeCandidatureStageResponse422, ChangeStatusOfJobBodyParam, ChangeStatusOfJobMetadataParam, ChangeStatusOfJobResponse200, ChangeStatusOfJobResponse400, ChangeStatusOfJobResponse401, ChangeStatusOfJobResponse403, ChangeStatusOfJobResponse422, CreateCandidatesFromCvFileBodyParam, CreateCandidatesFromCvFileResponse201, CreateCandidatesFromCvFileResponse400, CreateCandidatesFromCvFileResponse401, CreateCandidatesFromCvFileResponse403, CreateCandidatesFromCvFileResponse404, CreateCandidatesFromCvFileResponse422, CreateCandidatureBodyParam, CreateCandidatureResponse201, CreateCandidatureResponse400, CreateCandidatureResponse401, CreateCandidatureResponse403, CreateCandidatureResponse422, CreateCustomFieldBodyParam, CreateCustomFieldMetadataParam, CreateCustomFieldResponse201, CreateCustomFieldResponse400, CreateCustomFieldResponse401, CreateCustomFieldResponse403, CreateCustomFieldResponse422, CreateHiringPlanRequisitionBodyParam, CreateHiringPlanRequisitionResponse201, CreateHiringPlanRequisitionResponse400, CreateHiringPlanRequisitionResponse401, CreateHiringPlanRequisitionResponse403, CreateHiringPlanRequisitionResponse422, CreateJobBodyParam, CreateJobResponse201, CreateJobResponse400, CreateJobResponse401, CreateJobResponse403, CreateJobResponse422, DeleteCustomFieldMetadataParam, DeleteCustomFieldResponse204, DeleteCustomFieldResponse400, DeleteCustomFieldResponse401, DeleteCustomFieldResponse403, DeleteCustomFieldResponse422, FindCustomFieldMetadataParam, FindCustomFieldResponse200, FindCustomFieldResponse400, FindCustomFieldResponse401, FindCustomFieldResponse403, FindCustomFieldResponse422, ListCandidatesMetadataParam, ListCandidatesResponse200, ListCandidatesResponse400, ListCandidatesResponse401, ListCandidatesResponse403, ListCandidatesResponse422, ListCandidaturesMetadataParam, ListCandidaturesResponse200, ListCandidaturesResponse400, ListCandidaturesResponse401, ListCandidaturesResponse403, ListCandidaturesResponse422, ListContractTypesMetadataParam, ListContractTypesResponse200, ListContractTypesResponse400, ListContractTypesResponse401, ListContractTypesResponse403, ListContractTypesResponse422, ListCustomFieldsMetadataParam, ListCustomFieldsResponse200, ListCustomFieldsResponse400, ListCustomFieldsResponse401, ListCustomFieldsResponse403, ListCustomFieldsResponse422, ListDepartmentsMetadataParam, ListDepartmentsResponse200, ListDepartmentsResponse400, ListDepartmentsResponse401, ListDepartmentsResponse403, ListDepartmentsResponse422, ListEducationTypesMetadataParam, ListEducationTypesResponse200, ListEducationTypesResponse400, ListEducationTypesResponse401, ListEducationTypesResponse403, ListEducationTypesResponse422, ListHiringPlanRequisitionMetadataParam, ListHiringPlanRequisitionResponse200, ListHiringPlanRequisitionResponse400, ListHiringPlanRequisitionResponse401, ListHiringPlanRequisitionResponse403, ListHiringPlanRequisitionResponse422, ListHiringPlanTemplateMetadataParam, ListHiringPlanTemplateResponse200, ListHiringPlanTemplateResponse400, ListHiringPlanTemplateResponse401, ListHiringPlanTemplateResponse403, ListHiringPlanTemplateResponse422, ListHiringPlanWorkflowMetadataParam, ListHiringPlanWorkflowResponse200, ListHiringPlanWorkflowResponse400, ListHiringPlanWorkflowResponse401, ListHiringPlanWorkflowResponse403, ListHiringPlanWorkflowResponse422, ListJobStageTypesResponse200, ListJobStageTypesResponse400, ListJobStageTypesResponse401, ListJobStageTypesResponse403, ListJobStageTypesResponse422, ListJobsMetadataParam, ListJobsResponse200, ListJobsResponse400, ListJobsResponse401, ListJobsResponse403, ListJobsResponse422, ListKillerQuestionsTemplateMetadataParam, ListKillerQuestionsTemplateResponse200, ListKillerQuestionsTemplateResponse400, ListKillerQuestionsTemplateResponse401, ListKillerQuestionsTemplateResponse403, ListKillerQuestionsTemplateResponse422, ListLocationsMetadataParam, ListLocationsResponse200, ListLocationsResponse400, ListLocationsResponse401, ListLocationsResponse403, ListLocationsResponse422, ListProfilesOfDepartmentMetadataParam, ListProfilesOfDepartmentResponse200, ListProfilesOfDepartmentResponse400, ListProfilesOfDepartmentResponse401, ListProfilesOfDepartmentResponse403, ListProfilesOfDepartmentResponse422, ListUsersMetadataParam, ListUsersResponse200, ListUsersResponse400, ListUsersResponse401, ListUsersResponse403, ListUsersResponse422, RetrieveCandidateMetadataParam, RetrieveCandidateResponse200, RetrieveCandidateResponse400, RetrieveCandidateResponse401, RetrieveCandidateResponse403, RetrieveCandidateResponse404, RetrieveCandidateResponse422, RetrieveCandidatureMetadataParam, RetrieveCandidatureResponse200, RetrieveCandidatureResponse400, RetrieveCandidatureResponse401, RetrieveCandidatureResponse403, RetrieveCandidatureResponse404, RetrieveCandidatureResponse422, RetrieveDepartmentMetadataParam, RetrieveDepartmentResponse200, RetrieveDepartmentResponse400, RetrieveDepartmentResponse401, RetrieveDepartmentResponse403, RetrieveDepartmentResponse404, RetrieveDepartmentResponse422, RetrieveHiringPlanRequisitionMetadataParam, RetrieveHiringPlanRequisitionResponse200, RetrieveHiringPlanRequisitionResponse400, RetrieveHiringPlanRequisitionResponse401, RetrieveHiringPlanRequisitionResponse403, RetrieveHiringPlanRequisitionResponse404, RetrieveHiringPlanRequisitionResponse422, RetrieveHiringPlanTemplateMetadataParam, RetrieveHiringPlanTemplateResponse200, RetrieveHiringPlanTemplateResponse400, RetrieveHiringPlanTemplateResponse401, RetrieveHiringPlanTemplateResponse403, RetrieveHiringPlanTemplateResponse404, RetrieveHiringPlanTemplateResponse422, RetrieveHiringPlanWorkflowMetadataParam, RetrieveHiringPlanWorkflowResponse200, RetrieveHiringPlanWorkflowResponse400, RetrieveHiringPlanWorkflowResponse401, RetrieveHiringPlanWorkflowResponse403, RetrieveHiringPlanWorkflowResponse404, RetrieveHiringPlanWorkflowResponse422, RetrieveJobMetadataParam, RetrieveJobResponse200, RetrieveJobResponse400, RetrieveJobResponse401, RetrieveJobResponse403, RetrieveJobResponse404, RetrieveJobResponse422, RetrieveKillerQuestionsTemplateMetadataParam, RetrieveKillerQuestionsTemplateResponse200, RetrieveKillerQuestionsTemplateResponse400, RetrieveKillerQuestionsTemplateResponse401, RetrieveKillerQuestionsTemplateResponse403, RetrieveKillerQuestionsTemplateResponse404, RetrieveKillerQuestionsTemplateResponse422, RetrieveLocationMetadataParam, RetrieveLocationResponse200, RetrieveLocationResponse400, RetrieveLocationResponse401, RetrieveLocationResponse403, RetrieveLocationResponse404, RetrieveLocationResponse422, RetrieveProfileOfDepartmentMetadataParam, RetrieveProfileOfDepartmentResponse200, RetrieveProfileOfDepartmentResponse400, RetrieveProfileOfDepartmentResponse401, RetrieveProfileOfDepartmentResponse403, RetrieveProfileOfDepartmentResponse404, RetrieveProfileOfDepartmentResponse422, RetrieveUserMetadataParam, RetrieveUserResponse200, RetrieveUserResponse400, RetrieveUserResponse401, RetrieveUserResponse403, RetrieveUserResponse404, RetrieveUserResponse422, SearchCandidatesBodyParam, SearchCandidatesResponse200, SearchCandidatesResponse400, SearchCandidatesResponse401, SearchCandidatesResponse403, SearchCandidatesResponse422, SearchCandidaturesBodyParam, SearchCandidaturesResponse200, SearchCandidaturesResponse400, SearchCandidaturesResponse401, SearchCandidaturesResponse403, SearchCandidaturesResponse422, SearchDepartmentsBodyParam, SearchDepartmentsResponse200, SearchDepartmentsResponse400, SearchDepartmentsResponse401, SearchDepartmentsResponse403, SearchDepartmentsResponse422, SearchHiringPlanRequisitionsBodyParam, SearchHiringPlanRequisitionsResponse200, SearchHiringPlanRequisitionsResponse400, SearchHiringPlanRequisitionsResponse401, SearchHiringPlanRequisitionsResponse403, SearchHiringPlanRequisitionsResponse422, SearchJobsBodyParam, SearchJobsResponse200, SearchJobsResponse400, SearchJobsResponse401, SearchJobsResponse403, SearchJobsResponse422, SearchLocationsBodyParam, SearchLocationsResponse200, SearchLocationsResponse400, SearchLocationsResponse401, SearchLocationsResponse403, SearchLocationsResponse422, SearchUsersBodyParam, SearchUsersResponse200, SearchUsersResponse400, SearchUsersResponse401, SearchUsersResponse403, SearchUsersResponse422, UpdateCandidateBodyParam, UpdateCandidateMetadataParam, UpdateCandidateResponse200, UpdateCandidateResponse400, UpdateCandidateResponse401, UpdateCandidateResponse403, UpdateCandidateResponse422, UpdateCustomFieldsBodyParam, UpdateCustomFieldsMetadataParam, UpdateCustomFieldsResponse200, UpdateCustomFieldsResponse400, UpdateCustomFieldsResponse401, UpdateCustomFieldsResponse403, UpdateCustomFieldsResponse422, UpdateJobBodyParam, UpdateJobMetadataParam, UpdateJobResponse200, UpdateJobResponse400, UpdateJobResponse401, UpdateJobResponse403, UpdateJobResponse422 } from './types';
