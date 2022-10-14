import { TragedyCalculator , ComedyCalculator } from "./performanceCalculator.mjs";


/** 공연료 계산기를 반환하는 팩터리 함수 */
function createPerformanceCalculator( aPerformance , aPlay ){

    switch ( aPlay.type ){
        case "tragedy" :
            return new TragedyCalculator( aPerformance , aPlay );
        case "comedy" :
            return new ComedyCalculator( aPerformance , aPlay );
        default :
            throw new Error( `알 수 없는 장르 : ${ aPlay.type }` )
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

    result.performances = invoice.performances.map( enrichPerformance );

    result.totalAmount = totalAmount( result );

    result.totalVolumeCredits = totalVolumeCredits( result );

    return result;

    /** Performance 객체를 채워줍니다 */
    function enrichPerformance( aPerformance ){

        const calculator = createPerformanceCalculator( aPerformance , playFor( aPerformance ) );

        const result = Object.assign( {} , aPerformance );

        /** 계산처리를 이곳에서 처리한다 */

        result.play = calculator.play;

        result.amount = calculator.amount;

        result.volumeCredits = calculator.volumeCredits;

        return result;
    }

    /** 값을 가져옴 */
    function playFor( aPerformance ){
        return plays[ aPerformance.playID ];
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