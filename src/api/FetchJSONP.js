import fetchJsonp from "fetch-jsonp";
import token from "../api/token.json";

export default async function selectAPI(option) {
  const TOKEN = token.token;
  console.log(TOKEN);

  if (option.method == "database.getUniversities") {
    let res = await fetchJsonp(
      `https://api.vk.com/method/${option.method}?count=${option.count}&city_id=${option.city_id}&country_id=${option.country_id}&q=${option.q}&access_token=${TOKEN}&v=5.131`
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        console.log("parsed json", json);
        return json.response.items;
      })
      .catch(function (ex) {
        console.log("parsing failed", ex);
      });

    return res;
  } else if (option.method == "database.getCities") {
    let res = await fetchJsonp(
      `https://api.vk.com/method/${option.method}?count=${option.count}&country_id=${option.country_id}&region_id=&q=${option.q}&access_token=${TOKEN}&v=5.131`
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        return json.response.items;
      })
      .catch(function (ex) {
        console.log("parsing failed", ex);
      });

    return res;
  }
}

export { selectAPI };
