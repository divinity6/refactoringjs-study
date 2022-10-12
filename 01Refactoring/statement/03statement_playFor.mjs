/**
 *
 * - 이전 코드에서는 for of 루프를 한번 돌때마다 공연을 한번 조회했지만,
 *   리팩터링한 코드에서는 세번이나 조회한다
 *
 * --> 성능에 큰 영향은 없다
 *     설사 느려지더라도, 제대로 리팩터링된 코드베이스는 그렇지않은 코드보다 성능을 개선하기 쉽다
 *
 * @param { Invoice } invoice
 * @param { { Play } } plays
 *
 * @return { string } - 청구서 결과를 문자열로 반환합니다
 */
function statement( invoice , plays ){

    /**
     * - aPerformance 는 반복문을 돌때마다 자연스럽게 값이 변경되지만, play 는 파라미터로 전달할 필요가 없다
     * 그냥 내부에서 다시 계산하면 되는 것...
     *
     * @important 이렇게 함수로 추출하면 computedValue 가 되고, 파라미터로 반환할 필요가 없지
     *            그렇지만 그럼 인라인함수로 들어가 있어야하는데...?
     *
     * @param { Performance } aPerformance
     * @return { Play }
     */
    function playFor( aPerformance ){
        return plays[ aPerformance.playID ];
    }

    /**
     *
     * - pref 와 play 는 추출한 새로운 함수에서도 필요하지만, 값을 변경하지는 않는다.
     * --> 따라서 파라미터로 전달하기 적합하다
     *
     * 그러나 thisAmount 는 함수안에서 값이 변경되기 때문에 다룰때 조심해야한다
     *
     * @param { Performance } aPerformance - 명확한 이름으로 파라미터 이름변경
     *
     * @return { number } - 현재 청구내역
     */
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


    let totalAmount = 0;
    let volumeCredits = 0;

    let result = `청구 내역 ( 고객명 : ${ invoice.customer } )\n`;

    const format = new Intl.NumberFormat( "en-US" , {
        style : "currency" , currency : "USD" , minimumFractionDigits : 2
    } ).format;

    for ( let pref of invoice.performances ){

        /** 포인트 적립 */
        volumeCredits += Math.max( pref.audience - 30 , 0 );

        /** 희극 관객 5명마다 추가 포인트를 제공한다 */
        if ( "comedy" === playFor( pref ).type ){
            volumeCredits += Math.floor( pref.audience / 5 );
        }

        /** 청구내역 출력 */
        result += `${ playFor( pref ).name } : ${ format( amountFor( pref ) / 100 ) } ( ${ pref.audience }석 )\n`;
        totalAmount += amountFor( pref );

    }

    result += `총액 : ${ format( totalAmount / 100 ) }\n`;
    result += `적립 포인트 : ${ volumeCredits }점 \n`;

    return result;

}


export default statement;