const CHUNK_PUBLIC_PATH = "server/pages/test/[id].js";
const runtime = require("../../chunks/ssr/[turbopack]_runtime.js");
runtime.loadChunk("server/chunks/ssr/[root of the server]__1867b8._.js");
runtime.loadChunk("server/chunks/ssr/node_modules_b1a747._.js");
runtime.loadChunk("server/chunks/ssr/app_globals_acc2df.css");
runtime.loadChunk("server/chunks/ssr/[externals]_react-lottie_fde9ba._.js");
module.exports = runtime.getOrInstantiateRuntimeModule("[project]/node_modules/next/dist/esm/build/templates/pages.js { INNER_PAGE => \"[project]/pages/test/[id].js [ssr] (ecmascript)\", INNER_DOCUMENT => \"[project]/node_modules/next/document.js [ssr] (ecmascript)\", INNER_APP => \"[project]/pages/_app.jsx [ssr] (ecmascript)\" } [ssr] (ecmascript)", CHUNK_PUBLIC_PATH).exports;