interface CloudflareEnv {
  DB: D1Database;
  STORAGE: R2Bucket;
  NEXT_INC_CACHE_R2_BUCKET: R2Bucket;
  WORKER_SELF_REFERENCE: Fetcher;
  ASSETS: Fetcher;
}
