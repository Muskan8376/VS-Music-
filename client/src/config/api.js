/**
 * API Configuration for local development and Vercel production deployment
 * - In local development: defaults to 'http://localhost:5000'
 * - In production: uses VITE_API_URL environment variable if set,
 *   or relative path '' for same-domain serverless API routes on Vercel
 */
export const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.PROD ? '' : 'http://localhost:5000');

export default API_BASE_URL;
