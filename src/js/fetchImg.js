
import axios from "axios";

const KEY_URL = "39700521-aba51b42bae9e0a28fdb59303"
axios.defaults.baseURL = 'https://pixabay.com/api/';

async function fetchImg(query, page) {
    return await axios
      .get(
       `?key=${KEY_URL}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`
      )
      .then(response => console.log(response.data))
      .catch(err => {
        console.log(err);
      });
  }
 
 export { fetchImg  } ;