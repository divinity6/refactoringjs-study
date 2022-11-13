import Producer from "./producer.mjs";

/**
 *
 * - 지역 전체를 표현하는 클래스
 *
 */
export default class Province {

    constructor( doc ) {

        this._name = doc.name;
        /** @type { Producer[] } */
        this._producers = [];

        this._totalProduction = 0;

        this._demand = doc.demand; // 요청

        this._price = doc.price;

        doc.producers.forEach( d => this.addProducer( new Producer( this , d ) ) );
    }

    /** @param { Producer } arg */
    addProducer( arg ){

        this._producers.push( arg );

        this._totalProduction += arg.production;
    }

    /** 지역이름 */
    get name(){
        return this._name;
    }

    /** 지역의 각각 생산자들 */
    get producers(){
        return this._producers.slice();
    }

    /** 전체 생산량 */
    get totalProduction(){
        return this._totalProduction;
    }

    set totalProduction( arg ){
        this._totalProduction = arg;
    }

    /** 수요 */
    get demand(){
        return this._demand;
    }

    /** 숫자로 파싱해서 저장 */
    set demand( arg ){
        this._demand = parseInt( arg );
    }

    /** 가격 */
    get price(){
        return this._price;
    }

    /** 숫자로 파싱해서 저장 */
    set price( arg ){
        this._price = parseInt( arg );
    }

    /** 생산 부족분을 계산하는 코드 */
    get shortfall(){
        return this._demand - this.totalProduction;
    }

    /** 수익을 계산하는 코드 */
    get profit(){
        return this.demandValue - this.demandCost;
    }

    get demandValue(){
        return this.satisfiedDemand * this.price;
    }

    /** 만족한 수요 */
    get satisfiedDemand(){
        return Math.min( this._demand , this.totalProduction );
    }

    get demandCost(){

        /** 남은 수요 */
        let remainingDemand = this.demand;

        let result = 0;

        this.producers
            .sort( ( a , b ) => a.cost - b.cost )
            .forEach( p => {

                const contribution = Math.min( remainingDemand , p.production );

                remainingDemand -= contribution;

                result += contribution * p.cost;

            } );

        return result;

    }


}