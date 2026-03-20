import RESTSerializer from '@ember-data/serializer/rest';

export default class OrgSerializer extends RESTSerializer {
  // The primary key in your API response
  primaryKey = 'id';

  // Normalize the response from findAll (GET /api/organizations)
  normalizeArrayResponse(store, primaryModelClass, payload, id, requestType) {
    // Extract the array from payload.data
    const normalizedPayload = {
      orgs: payload.data || [],
    };

    return super.normalizeArrayResponse(
      store,
      primaryModelClass,
      normalizedPayload,
      id,
      requestType
    );
  }

  // Normalize the response from findRecord (GET /api/organizations/:id)
  normalizeSingleResponse(store, primaryModelClass, payload, id, requestType) {
    // Check if payload is already normalized (has 'org' key)
    // or if it's the raw API response (has 'data' key)
    const normalizedPayload = payload.org
      ? payload
      : {
          org: payload.data,
        };

    return super.normalizeSingleResponse(
      store,
      primaryModelClass,
      normalizedPayload,
      id,
      requestType
    );
  }

  // Normalize the response from createRecord (POST /api/organizations)
  normalizeCreateRecordResponse(
    store,
    primaryModelClass,
    payload,
    id,
    requestType
  ) {
    // Check if payload is already normalized or raw API response
    const normalizedPayload = payload.org
      ? payload
      : {
          org: payload.data,
        };

    return super.normalizeCreateRecordResponse(
      store,
      primaryModelClass,
      normalizedPayload,
      id,
      requestType
    );
  }

  // Normalize the response from updateRecord (PUT/PATCH /api/organizations/:id)
  normalizeUpdateRecordResponse(
    store,
    primaryModelClass,
    payload,
    id,
    requestType
  ) {
    const normalizedPayload = {
      org: payload.data,
    };

    return super.normalizeUpdateRecordResponse(
      store,
      primaryModelClass,
      normalizedPayload,
      id,
      requestType
    );
  }

  // Normalize the response from deleteRecord (DELETE /api/organizations/:id)
  normalizeDeleteRecordResponse(
    store,
    primaryModelClass,
    payload,
    id,
    requestType
  ) {
    // For delete, we might not get data back, so handle that
    const normalizedPayload = {
      org: payload.data || { id },
    };

    return super.normalizeDeleteRecordResponse(
      store,
      primaryModelClass,
      normalizedPayload,
      id,
      requestType
    );
  }

  // Prevent RESTSerializer from wrapping the payload
  serializeIntoHash(hash, typeClass, snapshot, options) {
    // Instead of: { org: { organization, location, ... } }
    // We want: { organization, location, ... }
    const serialized = super.serialize(snapshot, options);
    Object.assign(hash, serialized);
  }
}
