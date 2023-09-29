
import axios from "axios";



async function fetchImg(query) {
  const BASE_URL = 'https://pixabay.com/api/';
const KEY_URL = "39700521-aba51b42bae9e0a28fdb59303"
const params = {
  q : query,
  key: KEY_URL,
  image_type : photo,
  orientation : horizontal,
  safesearch : true,
  page : page,
  per_page : 40,

};
const response = await axios.get({BASE_URL}, {params})
return response;
  }

 export { fetchImg  } ;

