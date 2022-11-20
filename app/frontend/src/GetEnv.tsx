interface Env {
    endpoint  :  string | undefined,
    os        :  string //"mac" | "win" | "android" | "linux",
    browser   :  string //"chrome" | "safari" | "edge" | "firefox",
    window_h  :  number
    window_w  :  number
}

const info:string = window.navigator.userAgent;

function getEnvOs() {
    return 'mac'
}
const env_os = getEnvOs()

function getEnvBrouser() {
    return 'chrome'
}
const env_browser = getEnvBrouser()

const env : Env = {
    endpoint  : process.env.REACT_APP_ENDPOINT_FEEDBACK,
    os        : env_os,
    browser   : env_browser,
    window_h  : document.documentElement.scrollHeight,
    window_w  : window.innerWidth,
}

export default env;