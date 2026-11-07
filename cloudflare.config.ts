import { bindings, defineConfig, defineWorker } from "cf/config";
import { createWorkersResponseStoreSelfContainedConfig } from "@vinext/cloudflare/cache/config";

const cache = await createWorkersResponseStoreSelfContainedConfig({
  worker: "opensynastry",
  bucket: "opensynastry-response-store-cache-bodies",
});

export default defineConfig({
  worker: defineWorker({
    ...cache,
    name: "opensynastry",
    domains: ["synastry.freeastroapi.com"],
    entrypoint: "vinext/server/fetch-handler",
    compatibilityDate: "2026-11-06",
    assets: {
      htmlHandling: "none",
      notFoundHandling: "none",
      runWorkerFirst: ["/*", "!/_next/static/*", "!/*/_next/static/*"],
    },
    env: {
      ...cache.env,
      ASSETS: bindings.assets(),
      ASTRO_API_KEY: bindings.secret(),
    },
  }),
});
