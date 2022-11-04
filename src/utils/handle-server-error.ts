const handleServerError = (): Promise<void> =>
  Promise.reject(new Error('An unexpected error has occurred. Please try again later'));

export default handleServerError;
