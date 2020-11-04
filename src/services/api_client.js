const ApiClient = (() => {
  let config = {    // Load from config file
    protocol: null,
    host: null,
    port: null,
    apiVersion: 'v1',
    username: null,
    password: null,
    router: null,
    version: null,
    source: null  // The actual config object stored on the server
  }

  async function expandPath(resourcePath) {
    const config = await getConfig();

    return `${config.protocol}://${config.host}:${config.port}/api/${config.apiVersion}/${resourcePath}`
  }

  function headers() {
    return {
      'Authorization': sessionStorage.apiKey,
      'Content-Type': 'application/json'
    }
  }

  async function getConfig() {
    if(localStorage.useLocalStorage && JSON.parse(localStorage.useLocalStorage)) {
        if (config.source) return config;
        sessionStorage.setItem("apiURL", localStorage.getItem("ip-address"));
        let apiURL = localStorage.getItem("ip-address");
        sessionStorage.setItem("apiPort", localStorage.port);
        let apiPort = localStorage.getItem("port");
        sessionStorage.setItem("apiProtocol", "http");
        let apiProtocol = "http";
        config.host = apiURL;
        config.port = apiPort;
        config.protocol = apiProtocol;
        config.version = 'dev';
        config.source = config;

        return config;
    }else {
      try {
        if (config.source) return config;

        const response = await fetch('/config.json');

        if (response.status !== 200) {
          console.error(`Looks like there was a problem. Status Code: ${response.status}`);
          return;
        }

        const data = await response.json()

        sessionStorage.setItem("apiURL", data.apiURL);
        config.host = data.apiURL;
        sessionStorage.setItem("apiPort", data.apiPort);
        config.port = data.apiPort;
        sessionStorage.setItem("apiProtocol", data.apiProtocol);
        config.protocol = data.apiProtocol;
        config.version = data.version;
        config.source = data;

        return config;
      } catch(err) {
        console.log('Fetch Error :-S', err);
        return null;
      }
    }
  }

  function getRouter() {
    if (!config.router) {
      throw new Error('Router not configured');
    }

    return config.router
  }

  async function execFetch(uri, params, {noRedirectCodes = []}) {
    const url = await expandPath(uri)
    params = {...params, mode: 'cors'}

    if (!('headers' in params)) {
      params = {...params, headers: headers()}
    }

    let response

    try {
      response = await fetch(url, params)
    } catch(e) {
      console.error(`Failed to fetch ${url}`, e);
      getRouter().push({name: 'error', query: {'message': `Could not fetch ${url} due to ${e.name} - ${e.message}`}})
      return null
    }

    if (response.status === 401 && !noRedirectCodes.includes(response.status)
                                && window.location.href.search(/login\/?$/) < 0) {
      getRouter().push('/login')
      return null
    } else if (response.status >= 500 && !noRedirectCodes.includes(response.status)) {
      const {error, exception} = await response.json();
      getRouter().push({name: 'error', query: {message: `${error} - ${exception}`}})
      return null
    } else {
      return response
    }
  }

  /**
   * Perform a GET request on the API.
   * 
   * @param {string} uri Path to resource being accessed
   */
  const get = (uri, options = {}) => execFetch(uri, {method: 'GET'}, options)

  /**
   * Perform a POST request on the API
   * 
   * @param {string} uri Path to resource being accessed. 
   * @param {Object} data Parameters to send to API.
   * 
   * Example:
   *   const response = post('people', {given_name: 'Foo', family_name: 'Bar}).then((response) => console.log(response));
   */
  const post = (uri, data, options = {}) => execFetch(uri, {method: 'POST', body: JSON.stringify(data)}, options)
  const remove = (uri, data, options = {}) => execFetch(uri, {method: 'DELETE', body: JSON.stringify(data)}, options)
  const put = (uri, data, options = {}) => execFetch(uri, {method: 'PUT', body: JSON.stringify(data)}, options)
  const setRouter = (router) => config.router = router
  getConfig();
  return {get, post, put, remove, getRouter, setRouter, getConfig, config}
})();

export default ApiClient;

 function GET(url, successCallback, failureCallback, useBasseURL = true) {
    //add loading pop up here
    if(useBasseURL == true) {
      let baseURL = apiProtocol + "://" + apiURL + ":" + apiPort + "/api/v1" ;
      url = baseURL + url;
    }else if(useBasseURL == false){
      //using given url
    }
    
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 ) {
        if ( (this.status == 201 || this.status == 200)) {
          successCallback(JSON.parse(this.responseText), this.status);
          // console.log(this.status);
            // eval(returnToFunction)(obj);
            //put success message here
        }else if (this.status == 404 || this.status == 500) {
          let message = `Error ${this.status}. An error has occured`;
          if(failureCallback) {
            failureCallback(JSON.parse(this.responseText), this.status);
          }else {
            genericError(message);
          }
        }else if (this.status == 401) {
          var message = "Error " + this.status + ". You have been logged out ,Click yes to continue to patient dashboard or No to go to the main dashboard";
          genericError(message);
        }
        }else {
        }
    };
    xhttp.open("GET", url, true);
    xhttp.setRequestHeader('Authorization', sessionStorage.getItem("authorization"));
    xhttp.setRequestHeader('Content-type', "application/json");
    xhttp.send();
  //example call for this function
  //   GET('https://swapi.co/api/people/1', function(data) {
  //     console.log(data);
  //   },function(data) {
  //     console.log(data);
  //   });
  // }
}
function POST(url, parameters, successCallback, failureCallback) {
    //add loading pop up here
    let baseUrl = sessionStorage.apiProtocol + "://" + sessionStorage.apiURL + ":" + sessionStorage.apiPort + "/api/v1" + url;
    var parametersPassed = JSON.stringify(parameters);
    
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 ) {
        if(this.status == 201 || this.status == 200) {
          var obj = JSON.parse(this.responseText);
          successCallback(JSON.parse(this.responseText), this.status);
            //put success message here
            
        }else if (this.status == 404 || this.status == 500) {
          let message = `Error ${this.status}. An error has occured`;
          genericError(message);
        }else if (this.status == 401) {
          var message = "Error " + this.status + ". You have been logged out ,Click yes to continue to patient dashboard or No to go to the main dashboard";
          if(failureCallback) {
            failureCallback(JSON.parse(this.responseText), this.status);
          }else {
            genericError(message);
          }
        }
      }
    };
    xhttp.open("POST", baseUrl, true);
    xhttp.setRequestHeader('Authorization', sessionStorage.getItem("authorization"));
    xhttp.setRequestHeader('Content-type', "application/json");
    xhttp.send(parametersPassed);
  }
function fetchArgumentFromUrlString(argumentName) {
    var url = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : location.href;
  
    var urlToSearch = new URL(url);
    var argument = urlToSearch.searchParams.get(argumentName);
    return argument;
  }
  
  function buildParametersString(params) {
    var paramsString = '';
    Object.keys(params).forEach(function (key, index, array) {
      paramsString += key + '=' + params[key];
      if (index < array.length - 1) {
        paramsString += '&';
      }
    });
    return paramsString;
  }
  
  function getExpected(element) {
    let expected = ["value_group_id","value_boolean","value_coded","value_coded_name_id","value_drug","value_datetime","value_numeric","value_modifier","value_text"] ;
    let key = "";
    Object.keys(element).filter(function(elem) {
      if(expected.includes(elem)){
        key = elem;
      }
    } );
    return key;
  }
  function submitParameters(parameters, url, returnToFunction) {
    if(parameters["observations"]) {
      parameters["observations"] = parameters["observations"].filter(function(element) { 
          return (element[getExpected(element)] !== "" && element[getExpected(element)] !== undefined);
      });
    }
    try {
      buildWall();
      showStatus();
    } catch (e) {
  
    }
    if (url === "/encounters") {
      if (typeof providerID === 'undefined') {
      
    }else {
      if(providerID != null) {
        parameters.provider_id = providerID;
      }
      }
    }
    var url = apiProtocol + "://" + apiURL + ":" + apiPort + "/api/v1" + url;
    
    parameters.program_id = sessionStorage.programID;
    var parametersPassed = JSON.stringify(parameters);
    
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 ) {
        if ( (this.status == 201 || this.status == 200)) {
          var obj = JSON.parse(this.responseText);
            eval(returnToFunction)(obj);
            try {    
                    document.getElementById("innerPop").style.display = "none";
            }catch(e) {
          
            }
        }else if (this.status == 404 || this.status == 500) {
          var message = "Error " + this.status + ". An error has occured,Click yes to continue to patient dashboard or No to go to the main dashboard";
          genericError(message);
        }else if (this.status == 401) {
          var message = "Error " + this.status + ". You have been logged out ,Click yes to continue to patient dashboard or No to go to the main dashboard";
          genericError(message);
        }
        }else {
          // var message = "Error " + this.status + ". An error has occured,Click yes to continue to patient dashboard or No to go to the main dashboard";
          // genericError(message);
        }
    };
    xhttp.open("POST", path, true);
    xhttp.setRequestHeader('Authorization', sessionStorage.getItem("authorization"));
    xhttp.setRequestHeader('Content-type', "application/json");
    xhttp.send(parametersPassed);
}