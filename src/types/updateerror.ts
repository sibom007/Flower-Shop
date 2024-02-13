interface ErrorMessage {
  message: string;
  // Add other properties if necessary
}

interface ErrorSource {
  errorSources: ErrorMessage[];
  // Add other properties if necessary
}

interface ErrorData {
  errorSources: ErrorSource[];
  // Add other properties if necessary
}

interface ErrorObject {
  data: ErrorData;
  // Add other properties if necessary
}

export interface ResponseWithError {
  error?: ErrorObject;
  // Add other properties if necessary
}