const CHUNK_PUBLIC_PATH = "server/pages/_app.js";
const runtime = require("../chunks/ssr/[turbopack]_runtime.js");
runtime.loadChunk("server/chunks/ssr/[root of the server]__7ca4bc._.js");
runtime.loadChunk("server/chunks/ssr/app_globals_acc2df.css");
module.exports = runtime.getOrInstantiateRuntimeModule("[project]/pages/_app.jsx [ssr] (ecmascript)", CHUNK_PUBLIC_PATH).exports;
