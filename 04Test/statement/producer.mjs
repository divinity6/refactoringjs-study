/**
 * 단순한 데이터 저장로 사용하는 생성자 객체
 */
export default class Producer {

    constructor( aProvince , data ) {

        this._province = aProvince;

        this._cost = data.cost;

        this._name = data.name;

        this._production = data.production || 0;

    }

    get name(){
        return this._name;
    }

    get cost(){
        return this._cost;
    }

    /** 숫자로 파싱해서 저장 */
    set cost( arg ){
        this._cost = parseInt( arg );
    }

    get production(){
        return this._production;
    }

    set production( amountStr ){

        const amount = parseInt( amountStr );

        const newProduction = Number.isNaN( amount ) ? 0 : amount;

        this._province.totalProduction += newProduction - this._production;

        this._production = newProduction;
    }

}