import axios from "axios";

const API_TOKEN = process.env.REACT_APP_TOKEN

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  timeout: 1000,
  headers: { "content-type": "movies-info" },
});

const options =  axios.create({
  method: 'GET',
  params: {language: 'en-US'},
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_TOKEN}`
  }
});


const trailer = axios.create({
  timeout: 1000,
  headers: { "content-type": "trailer-info" },
})


const moviePage =  axios.create({
  method: 'GET',
  params: {language: 'en-US'},
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_TOKEN}`
  }
});




// 요청 인터셉터 추가하기
api.interceptors.request.use(
  function (config) {
    // 요청이 전달되기 전에 작업 수행
    console.log("requst", config);
    return config;
  },
  function (error) {
    // 요청 오류가 있는 작업 수행
    return Promise.reject(error);
  }
);

// 응답 인터셉터 추가하기
api.interceptors.response.use(
  function (response) {
    console.log("response", response);
    // 2xx 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
    // 응답 데이터가 있는 작업 수행
    return response;
  },
  function (error) {
    // 2xx 외의 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
    // 응답 오류가 있는 작업 수행
    return Promise.reject(error);
  }
);

export { api, options, trailer,moviePage };
