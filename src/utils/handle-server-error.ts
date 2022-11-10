const handleServerError = (e: Error): Promise<void> => {
  // console.log('ERROR: ', e.message);
  return Promise.reject(new Error('An unexpected error has occurred'));
};

export default handleServerError;
