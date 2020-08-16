/* // Вариант со статическим импортом
import paginationJson from '../paginationDB.json';
import birdJSON from '../birdDB.json';

const restService = {
  paginations: paginationJson.pgnDataItems,
  birds: birdJSON.birdsData
}

export default restService;
 */

//Вариант с динамическим импортом

export default class RestService {

  // _apiBase = 'src/';

  async _getData(url) {
    const res = await import(`../${url}`);

    if (res === undefined) {
      throw new Error(`Could not import module ${url}`);
    }
      
    return res;
  }

  async getPagination() {
    const res = await this._getData('paginationDB.json');
    return res.pgnDataItems;
  }

  async getAnswersAll() {
    const res = await this._getData('birdDB.json');
    return res.birdsData;
  }

  async getAnswers(id) {
    const res = await this.getAnswersAll();
    return res[id];
  }
}
