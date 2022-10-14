
/**
 * 공연료 계산기 클래스입니다
 *
 * - 공연료 계산을 이곳에서 수행하기 때문에 코드가 명확해진다
 */
class PerformanceCalculator {

    /** @type { Performance } */
    performance;

    /** @type { Play } */
    play;

    constructor( aPerformance , aPlay ) {

        this.performance = aPerformance;

        this.play = aPlay;
    }
}

/**
 *  - 공연료 계산기( PerformanceCalculator ) 클래스를 생성합니다
 *
 * @param { Invoice } invoice
 * @param { { Play } } plays
 *
 * @return { {
 *      customer : Invoice.customer ,
 *      performances : Invoice.performances,
 *      totalAmount : number ,
 *      totalVolumeCredits : number
 * } } - 해당 값들을 데이터화해서 내보냅니다
 */
export default function createStatementData( invoice , plays ){

    /** 중간 데이터 구조역할 객체 */
    const result = {};

    /** 중간 데이터 객체로 옮김 */
    result.customer = invoice.customer;
    /** 다른 함수에서 값이 수정되지 않도록 얕은 복사 후 건넴 */
    result.performances = invoice.performances.map( enrichPerformance );

    result.totalAmount = totalAmount( result );

    result.totalVolumeCredits = totalVolumeCredits( result );

    return result;

    /** Performance 객체를 채워줍니다 */
    function enrichPerformance( aPerformance ){

        const calculator = new PerformanceCalculator( aPerformance , playFor( aPerformance ) );

        const result = Object.assign( {} , aPerformance );

        /** 계산처리를 이곳에서 처리한다 */

        result.play = calculator.play;

        result.amount = amountFor( result );

        result.volumeCredits = volumeCreditsFor( result );

        return result;
    }

    /** 값을 가져옴 */
    function playFor( aPerformance ){
        return plays[ aPerformance.playID ];
    }

    /** 공연료 계산 - 다형성으로 처리 */
    function amountFor( aPerformance ){

        let result = 0; // 명확한 이름으로 변경

        switch( aPerformance.play.type ){
            case "tragedy" :
                result = 40000;
                if ( aPerformance.audience > 30 ){
                    result += 1000 * ( aPerformance.audience - 30 );
                }
                break;

            case "comedy" :
                result = 30000;
                if ( aPerformance.audience > 20 ){
                    result += 1000 + 500 * ( aPerformance.audience - 20 );
                }

                result += 300 * aPerformance.audience;
                break;

            default :
                throw new Error( `알 수 없는 장르 : ${ aPerformance.play.type }` )
        }

        return result;
    }

    /** 적립 포인트 계산 */
    function volumeCreditsFor( aPerformance ){

        let result = 0;

        result += Math.max( aPerformance.audience - 30 , 0 );

        if ( "comedy" === aPerformance.play.type ){
            result += Math.floor( aPerformance.audience / 5 );
        }

        return result;
    }

    /** 공연료 총합 처리 */
    function totalAmount( data ){

        return data.performances
            .reduce( ( total , p ) => total + p.amount , 0 );
    }

    /** 적립 포인트 총합 처리 */
    function totalVolumeCredits( data ){

        return data.performances
            .reduce( ( total , p ) => total + p.volumeCredits , 0 );
    }
}