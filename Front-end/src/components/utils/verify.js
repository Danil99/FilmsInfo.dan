import axios from 'axios';

export default function verify() {
  return axios.post('http://localhost:8080/verify', {token: localStorage.jwtToken})
    .then(res => res.data)
}
