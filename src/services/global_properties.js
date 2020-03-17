import ApiClient from "./api_client";

export default (() => {
  async function getSitePrefix() {
    let prefix = await ApiClient.get(
      "global_properties?property=site_prefix"
    );
    let result = await prefix.json();
    return result.site_prefix;
  }

  return {getSitePrefix};
})();