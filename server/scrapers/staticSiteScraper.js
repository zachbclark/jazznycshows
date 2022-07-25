const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");
const pretty = require("pretty");
const axios = require("axios");
//const { contains } = require("cheerio");

const dataDir = path.join(__dirname, "../data/");

const url = 'https://www.jazzgallery.org/calendar';

const scrapeStaticWebpage = async () => {
    try {
      const { data } = await axios.get(url);
      processData(data);
    } catch (err) {
      console.log("error", err);
    }
};

function processData(data) {
    const $ = cheerio.load(data);
    const items = [];
  
    // after you can target what you want by inspecting page source.
    const list = $('.eventlist.eventlist--upcoming').find('article');

    list.each(function (i, element) {
        const targeted = $(element);

        const title = targeted.find('.eventlist-title').find('a').text().trim();        
        const dates = targeted.find('.event-date').map((i, x) => $(x).attr('datetime')).toArray();
        const link = 'https://www.jazzgallery.org' + targeted.find('.eventlist-title').find('a').attr('href');
        const bandMembers = targeted.find('.eventlist-excerpt').find('p').first().html().trim().split(/<br\s*\/?>/i);
        const bandObject = bandMembers.map(item => {
          const container = {};
          const nameInstrumentPair = item.replace(/<\/em>/ig, '').trim().replace('-', '').replace(' &amp;', ',').split(/<em\s*\/?>/i);

          container.name = nameInstrumentPair[0].trim();
          container.instruments = nameInstrumentPair[1];

          return container;
        });

        const item = {
            title,
            dates,
            bandObject,
            link,
        };
        items.push(item);

    });
    // console.log(JSON.stringify(items));
    writeFile(items, 'jazzGalleryData')
}

function writeFile(data, fileName) {
    fs.writeFile(
        `${dataDir}${fileName}.json`,
        JSON.stringify(data, null, 2),
        (err) => {
          if (err) {
            console.error(err);
            return;
          }
          console.log("Successfully written data to file");
        }
      );
}

module.exports = scrapeStaticWebpage;
