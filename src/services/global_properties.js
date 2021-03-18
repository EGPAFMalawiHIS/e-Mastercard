import ApiClient from "./api_client";
export default (() => {
  async function getSitePrefix() {
    let prefix = await ApiClient.get(
      "global_properties?property=site_prefix"
    );
    if(prefix.status === 404) {
      alert("Site prefix not set, set it in settings/ site_prefix");
    }
    let result = await prefix.json();
    return result.site_prefix;
  }
  async function getSiteUUID() {
    let uuid = await ApiClient.get(
      "global_properties?property=site_uuid"
    );
    if(uuid.status === 404) {
      alert("Site UUID not set, set it in settings/ site_uuid");
    }
    let result = await uuid.json();
    return result.site_uuid;
  }
  return {getSitePrefix, getSiteUUID};
})();