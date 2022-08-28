import axios from "axios";

/**
 * Api to get movie list
 * @param filter : filter to send as aquery param
 * @returns 
 */
export async function getShowsList(filter: string) {
    let url = 'https://api.tvmaze.com/search/shows';
    if (filter) {
        url = url + '?q=' + filter;
    }
    return axios.get(url).then((res) => {
        console.log(res);
        return res;
    });
}