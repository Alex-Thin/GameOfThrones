export default class GotService {

    constructor() {
        this._apiBase = 'https://www.anapioficeandfire.com/api';
        this.tellNoData = this.tellNoData.bind(this);
    }
    getResource = async (url) => {
        const res =await fetch(`${this._apiBase}${url}`);
    
        if (!res.ok) {
            throw new Error(`Could not fethc ${url}, status: ${res.status}`)
        }

        return await res.json();
    }

    getAllCharacters = async () =>  {
        const res = await this.getResource("/characters?page=5&pageSize=10");
        return res.map(item => this._transformCharacter(item));
    }

    getCharacter = async (id) =>  {
        const character = await this.getResource(`/characters/${id}`);
        return this._transformCharacter(character);
    }

    getAllHouses = async () => {
        const res = await this.getResource("/houses/");
        return res.map(item => this._transformHouse(item));
    }

    getHouse = async (id) => {
        const res = await this.getResource(`/houses/${id}/`);
        return this._transformHouse(res);
    }

    getBook = async (id) => {
        const res = await this.getResource(`/books/${id}/`);
        return this._transformBook(res);
    }

    getAllBooks = async () => {
        const res = await this.getResource("/books/");
        return res.map(item => this._transformBook(item));
    }

    _transformCharacter = (char) => {
        const new_char = {
            id: this._extractId(char),
            name: this.tellNoData(char.name),
            gender: this.tellNoData(char.gender),
            born: this.tellNoData(char.born),
            died: this.tellNoData(char.died),
            culture: this.tellNoData(char.culture)
        }
        return new_char
    }

    _transformHouse = (house) => {
        return {
            id: this._extractId(house),
            name: house.name,
            region: house.region,
            words:house.words,
            titles:house.titles,
            overlord: house.overlord,
            ancestralWeapons: house.ancestralWeapons
        }
    }

    _transformBook = (book) => {
        return {
            id: this._extractId(book),
            name: book.name,
            numberOfPages: book.numberOfPages,
            publisher : book.publisher,
            released: book.released
        }
    }

    tellNoData(str) {
        if (str == "") {
            return "no data :c";} else {return str;} 
    }

    _extractId = (item) => {
        const idRegExp = /\/([0-9]*)$/;
        return item.url.match(idRegExp)[1];
    }
}
