export default class PlacesApi {
  /**
   * Create a new Places API.
   */
  constructor(config = {}) {
    if (typeof window === 'undefined' || !window.google)
      return;

    this.config = config;
    this.autocompleteService = new window.google.maps.places.AutocompleteService();
    this.placesService = new window.google.maps.places.PlacesService(document.createElement('div'));
  }

  /**
   * Test if state will result in a rejected promises.
   *
   * @param {string} state
   * @returns {boolean}
   */
  isErrorState(state) {
    return [
      window.google.maps.places.PlacesServiceStatus.INVALID_REQUEST,
      window.google.maps.places.PlacesServiceStatus.OVER_QUERY_LIMIT,
      window.google.maps.places.PlacesServiceStatus.UNKNOWN_ERROR,
      window.google.maps.places.PlacesServiceStatus.REQUEST_DENIED,
    ].includes(state);
  }

  /**
   * Get autocomplete results.
   *
   * @param {object} query
   * @see https://developers.google.com/maps/documentation/javascript/reference#Autocomplete
   * @returns {Promise}
   */
  autocomplete(query) {
    query = {
      componentRestrictions: {country: this.config.country},
      types: ['geocode'],
      ...query,
    };

    return new Promise((resolve, reject) =>
      this.autocompleteService.getPlacePredictions(query, (results, state) => {
        if (this.isErrorState(state))
          return reject(new Error(state));

        return resolve(results);
      })
    );
  }

  /**
   * Format autocomplete results to extract country, city and address.
   *
   * @param {result[]} result[]
   * @param {object} result
   * @param {{value: string}[]} result.terms
   * @param {string} result.place_id
   * @param {string} result.description
   * @returns {object} formattedResult
   * @returns {string} formattedResult.description
   * @returns {string} formattedResult.place_id
   * @returns {string} [formattedResult.country]
   * @returns {string} [formattedResult.city]
   * @returns {string} formattedResult.address
   */
  formatAutocompleteResults(results) {
    return results
      .map(({terms, place_id, description}) => {
        terms = terms.map(({value}) => value);
        const country = terms.pop() || null;
        const city = terms.pop() || null;
        const address = terms.join(', ') || null;

        return {description, country, city, address, place_id};
      });
  }

  /**
   * Get details result.
   *
   * @param {object} query
   * @param {string} query.placeId
   * @see https://developers.google.com/maps/documentation/javascript/reference#PlacesService
   * @returns {Promise}
   */
  details(query) {
    return new Promise((resolve, reject) =>
      this.placesService.getDetails(query, (result, state) => {
        if (this.isErrorState(state))
          return reject(new Error(state));

        return resolve(result);
      })
    );
  }
}
