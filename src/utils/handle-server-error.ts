const handleServerError = async (error: Error): Promise<void> => {
  console.log('ERROR in query: ', error);
  return await Promise.reject(new Error('An unexpected error has occurred. Please try again later'));
};

export default handleServerError;
