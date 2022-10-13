/**
 *
 * @param { Invoice } invoice
 * @param { { Play } } plays
 *
 * @return { string } - 청구서 결과를 문자열로 반환합니다
 */
function statement( invoice , plays ){

    return renderPlainText( createStatementData( invoice , plays ) );

}

/**
 *  - 계산관련 함수들을 전부 별도의 함수로 분리합니다
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
function createStatementData( invoice , plays ){

    /** 중간 데이터 구조역할 객체 */
    const result = {};

    /** 중간 데이터 객체로 옮김 */
    result.customer = invoice.customer;
    /** 다른 함수에서 값이 수정되지 않도록 얕은 복사 후 건넴 */
    result.performances = invoice.performances.map( enrichPerformance );

    result.totalAmount = totalAmount( result );

    result.totalVolumeCredits = totalVolumeCredits( result );

    return result;

    /**
     * @important 반복문을 파이프라인 처리한다
     *
     * @param { Performance } aPerformance - Performance
     *
     * @return { Performance } - 얕은 복사한 Performance 객체
     */
    function enrichPerformance( aPerformance ){

        const result = Object.assign( {} , aPerformance );

        /** 계산처리를 이곳에서 처리한다 */

        result.play = playFor( result );

        result.amount = amountFor( result );

        result.volumeCredits = volumeCreditsFor( result );

        return result;
    }

    /** 값을 가져옴 */
    function playFor( aPerformance ){
        return plays[ aPerformance.playID ];
    }

    /** 공연료 계산 */
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

/**
 * - 여기는 정말 UI 에 데이터를 뿌려주는 역할만합니다
 *
 * @param { {
 *      customer : Invoice.customer ,
 *      performances : Invoice.performances,
 *      totalAmount : number ,
 *      totalVolumeCredits : number
 *
 * } } data - 중간 데이터 구조입니다
 *
 * @return { string } - 청구서 결과를 문자열로 반환합니다
 */
function renderPlainText( data ){

    let result = `청구 내역 ( 고객명 : ${ data.customer } )\n`;

    for ( let pref of data.performances ){

        result += `${ pref.play.name } : ${ usd( pref.amount ) } ( ${ pref.audience }석 )\n`;

    }

    result += `총액 : ${ usd( data.totalAmount ) }\n`;

    result += `적립 포인트 : ${ data.totalVolumeCredits }점 \n`;

    return result;

    function usd( aNumber ){
        return  new Intl.NumberFormat( "en-US" , {
            style : "currency" , currency : "USD" , minimumFractionDigits : 2
        } ).format( aNumber / 100 );
    }

}


export default statement;