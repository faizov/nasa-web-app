import axios from "axios";
import cheerio from "cheerio";

const url = "https://apod.nasa.gov/apod/astropix.html";

export const getParsingApod = () => {
  axios
    .get(url)
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);

      const date = $('b:contains("2023")').text().trim();
      const explanation = $('b:contains("Explanation:")')
        .next("a")
        .text()
        .trim();
      const hdurl = $('a[href*="image/"]').attr("href");
      const mediaType =
        $('script[id="_fed_an_ua_tag"]').length > 0 ? "image" : "video";
      const serviceVersion = $('script[id="_fed_an_ua_tag"]').attr("src");
      const title = $("title").text().trim();
      const url = $('a[href*="image/"]').find("img").attr("src");

      const data = {
        date,
        explanation,
        hdurl,
        media_type: mediaType,
        service_version: serviceVersion,
        title,
        url,
      };

      console.log(JSON.stringify(data));
    })
    .catch((error) => {
      console.log("Error loading page: ", error);
    });
};
