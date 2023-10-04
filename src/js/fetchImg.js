
import axios from "axios";
const KEY_URL = "39700521-aba51b42bae9e0a28fdb59303"
axios.defaults.baseURL = 'https://pixabay.com/api/';


async function fetchImg (query, page, perPage) {

  
      const response = await axios.get(`?key=${KEY_URL}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`);
  console.log(response.data);
      
     return response.data;
    
      
  }
      
  export { fetchImg  } ;