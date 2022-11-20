/**
 * - 더미 코드
 */


/** @example */

const organization = {
    name : "애크미 구스베리",
    country : 'GB',
}

/**
 * =============================================================
 *                          Refactor
 * =============================================================
 */

class Organization {

    constructor( data ) {

        this._name = data.name;

        this._country = data.country;

    }

    get name(){
        return this._name;
    }

    set name( arg ){
        this._name = arg;
    }

    get country(){
        return this._country;
    }

    set country( arg ){
        this._country = arg;
    }

}