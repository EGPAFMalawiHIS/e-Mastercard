import ApiClient from "./api_client";

export const Properties = {
  MILITARY_SITE: 'military_site',
    HEALTH_CENTER_ID: 'current_health_center_id',
    SITE_PREFIX: 'site_prefix',
    SITE_UUID: 'site_uuid',
}

export default (() => {
  async function getProp(property) {
    return ApiClient
      .get(`global_properties?property=${property}`)
      .then(res => res.json())
      .catch(e => console.error(e))
  }

  async function setProp(property, property_value) {
    return ApiClient
      .post(`/global_properties`, { property, property_value })
      .then(res => res.json())
      .catch(e => console.error(e))
  }

  async function getSitePrefix() {
    return (await getProp(Properties.SITE_PREFIX))[Properties.SITE_PREFIX];
  }
  async function getSiteUUID() {
    return (await getProp(Properties.SITE_UUID))[Properties.SITE_UUID];
  }
  return {getSitePrefix, getSiteUUID, getProp, setProp};
})();