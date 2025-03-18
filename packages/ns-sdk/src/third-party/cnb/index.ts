import axios from 'axios';

const config = {
  token: '',
  openApi: 'https://api.cnb.cool',
};

export function setConfig(v: typeof config) {
  Object.entries(v).forEach(([key, value]) => {
    config[key as keyof typeof config] = value;
  });
}

export function invoke<T = any>(
  path: string,
  method: string,
  data: Record<string, any>,
) {
  const { openApi, token } = config;
  if (!openApi || !token) {
    throw new Error('Third-party error: Coding config not set');
  }
  return axios
    .request({
      method,
      url: `${openApi}${path.startsWith('/') ? path : `/${path}`}`,
      data,
      headers: {
        Authorization: token,
      },
    })
    .then((res) => {
      const { data } = res;
      const { errcode, errmsg } = data;
      if (errcode) {
        throw new Error(errmsg || 'CNB api error');
      }
      return data as T;
    });
}

export const get = <T = any>(path: string, data: Record<string, any>) =>
  invoke<T>(path, 'get', data);
export const post = <T = any>(path: string, data: Record<string, any>) =>
  invoke<T>(path, 'post', data);
export const del = <T = any>(path: string, data: Record<string, any>) =>
  invoke<T>(path, 'delete', data);
export const put = <T = any>(path: string, data: Record<string, any>) =>
  invoke<T>(path, 'put', data);
export const head = <T = any>(path: string, data: Record<string, any>) =>
  invoke<T>(path, 'head', data);

export default {
  setConfig,
  invoke,
  get,
  post,
  put,
  head,
  delete: del,
};
