
/** 공연료 계산기 클래스입니다 */
class PerformanceCalculator {

    /** @type { Performance } */
    performance;

    /** @type { Play } */
    play;

    /** 공연료 계산 */
    get amount(){

        throw new Error( `서브클래스에서 처리하도록 설계되어있습니다` );

        return 0;
    }

    /** 적립 포인트 계산 */
    get volumeCredits(){

        /** 희극일 경우에만 적립포인트 계산이 달라지기 때문에 기본값으로 생성 */
        return Math.max( this.performance.audience - 30 , 0 );
    }

    constructor( aPerformance , aPlay ) {

        this.performance = aPerformance;

        this.play = aPlay;
    }
}

/** 비극 계산 */
export class TragedyCalculator extends PerformanceCalculator {

    get amount(){

        let result = 40000;

        if ( this.performance.audience > 30 ){
            result += 1000 * ( this.performance.audience - 30 );
        }

        return result;
    }
}

/** 희극 계산 */
export class ComedyCalculator extends PerformanceCalculator {

    get amount(){

        let result = 30000;

        if ( this.performance.audience > 20 ){
            result += 1000 + 500 * ( this.performance.audience - 20 );
        }

        result += 300 * this.performance.audience;

        return result;
    }

    get volumeCredits(){
        /** 희극일 경우에는 슈퍼클래스의 적립포인트 계산에 추가 계산식설정 */
        return super.volumeCredits + Math.floor( this.performance.audience / 5 );
    }
}