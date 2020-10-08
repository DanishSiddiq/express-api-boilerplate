const ApiProblem  = require('express-api-problem');
const axios       = require('axios');
const moment      = require('moment');
const HttpStatus = require('http-status-codes');

/**
 * Calls the relevant API with the provided params
 * @param url
 * @param method
 * @param query
 * @param body
 * @param headers
 * @param timeoutMs
 * @return {{httpStatus, response}}
 */
export async function callRest({ url, method, query = {}, body = {}, headers = {}, timeoutMs = 70000 }) {
  const startTime = moment();

  try {
    const response = await axios({
      url,
      method,
      timeout: timeoutMs,
      params: query,
      data: body,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      }
    });

    // Get the time spent on the API call
    const endTime = moment();
    const diffMs = endTime.diff(startTime, 'ms');

    return {
      httpStatus: response.status,
      response: response.data,
      stats: {
        startTime,
        endTime,
        diffMs
      },
    };
  } catch (e) {
    // Handle the JavaScript exceptions i.e. any exceptions thrown
    // by axios itself e.g. because of no internet connection etc
    if (!e || !e.response || !e.response.data) {
      throw new ApiProblem(HttpStatus.INTERNAL_SERVER_ERROR, 'Internal error while calling external rest', e.message);
    }

    // Get the time spent on the API call
    const endTime = moment();
    const diffMs = endTime.diff(startTime, 'ms');

    return {
      httpStatus: e.response.status,
      response: e.response.data,
      stats: {
        startTime,
        endTime,
        diffMs
      },
    };
  }
}
