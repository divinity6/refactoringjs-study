/**
 *
 *
 * @param { Invoice } invoice
 * @param { { Play } } plays
 *
 * @return { string } - 청구서 결과를 문자열로 반환합니다
 */
function statement( invoice , plays ){

    function playFor( aPerformance ){
        return plays[ aPerformance.playID ];
    }

    function amountFor( aPerformance ){

        /** 값이 변경되는 변수는 조심해서 다루어야 한다 */
        let result = 0; // 명확한 이름으로 변경

        /** 공연료 계산 */
        switch( playFor( aPerformance ).type ){
            /** 비극 */
            case "tragedy" :
                result = 40000;
                if ( aPerformance.audience > 30 ){
                    result += 1000 * ( aPerformance.audience - 30 );
                }
                break;

            /** 희극 */
            case "comedy" :
                result = 30000;
                if ( aPerformance.audience > 20 ){
                    result += 1000 + 500 * ( aPerformance.audience - 20 );
                }

                result += 300 * aPerformance.audience;
                break;

            default :
                throw new Error( `알 수 없는 장르 : ${ playFor( aPerformance ).type }` )
        }

        return result;
    }

    /**
     *
     * - volumeCredits 변수는 반복문을 돌때마다 값을 누적해야하기 때문에 까다롭다
     * --> 최선의 선택은 volumeCredits 의 복제본을 초기화하고 계산결과를 반환하는 것.
     *
     * @important 반환하는 함수에서 반환값의 이름을 항상 명시적으로 할것
     *
     * @param { Performance } aPerformance
     *
     * @return { number } - 포인트 적립 누적값
     */
    function volumeCreditsFor( aPerformance ){

        let result = 0;

        result += Math.max( aPerformance.audience - 30 , 0 );

        if ( "comedy" === playFor( aPerformance ).type ){
            result += Math.floor( aPerformance.audience / 5 );
        }

        return result;
    }

    let totalAmount = 0;
    let volumeCredits = 0;

    let result = `청구 내역 ( 고객명 : ${ invoice.customer } )\n`;

    const format = new Intl.NumberFormat( "en-US" , {
        style : "currency" , currency : "USD" , minimumFractionDigits : 2
    } ).format;

    for ( let pref of invoice.performances ){

        /** 포인트 적립 */
        volumeCredits += volumeCreditsFor( pref );

        /** 청구내역 출력 */
        result += `${ playFor( pref ).name } : ${ format( amountFor( pref ) / 100 ) } ( ${ pref.audience }석 )\n`;
        totalAmount += amountFor( pref );

    }

    result += `총액 : ${ format( totalAmount / 100 ) }\n`;
    result += `적립 포인트 : ${ volumeCredits }점 \n`;

    return result;

}


export default statement;