// src/api/contentfulClient.js
import { createClient } from 'contentful-management';

const contentfulClient = createClient({
  accessToken: process.env.CONTENTFUL_MANAGEMENT_API_KEY // 🔐 paste your token here
});

export default contentfulClient;
