// difineConfig is a type-safe way to configure Cypress
// https://docs.cypress.io/guides/references/configuration#Intelligent-Code-Completion
import { defineConfig } from "cypress";

module.exports = defineConfig({
  projectId: "pteisd",
  // Unless e2e options are specified, Cypress can't find the tests and outputs an error like "The testing type selected (e2e) is not configured in your config file.".
  // https://docs.cypress.io/guides/references/configuration#e2e
  e2e: {
    baseUrl: "https://dev.terakoyaweb.com/",
    // Set false to "supportFile" to avoid the error "The support file is missing or invalid."
    // https://docs.cypress.io/guides/references/error-messages#Support-file-missing-or-invalid
    supportFile: false,
  },
  // Specify environment variables that will be set for all tests unless overridden by a test
  // https://docs.cypress.io/api/cypress-api/env#Examples
  env: {
    CYPRESS_RECORD_KEY: process.env.CYPRESS_RECORD_KEY,
  },
});
