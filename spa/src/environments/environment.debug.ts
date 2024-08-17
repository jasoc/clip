export const environment = {
    production: false,
    // apiBaseurl: "http://localhost:8008/v1"
    apiBaseurl: `http://localhost:${process.env["CLIP_APISERVER_PORT"]}/v1`
};