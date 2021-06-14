export default api => {
  api.axiosInstance.interceptors.response.use(
    response => {
      return response;
    },

    async error => {
      let originalRequest = error.config;
      // console.log('LOG_goterror', originalRequest, error.response);
    },
  );
};
