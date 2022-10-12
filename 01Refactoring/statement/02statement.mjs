/**
 *
 * - 공연료 청구서를 출력하는 함수입니다
 *
 * @param { Invoice } invoice
 * @param { Play } plays
 *
 * @return { string } - 청구서 결과를 문자열로 반환합니다
 */
function statement( invoice , plays ){

    let totalAmount = 0;
    let volumeCredits = 0;

    let result = `청구 내역 ( 고객명 : ${ invoice.customer } )\n`;

    const format = new Intl.NumberFormat( "en-US" , {
        style : "currency" , currency : "USD" , minimumFractionDigits : 2
    } ).format;

    for ( let pref of invoice.performances ){

        const play = plays[ pref.playID ];

        /** 공연료 계산 */
        let thisAmount = amountFor( pref , play );

        /** 포인트 적립 */
        volumeCredits += Math.max( pref.audience - 30 , 0 );

        /** 희극 관객 5명마다 추가 포인트를 제공한다 */
        if ( "comedy" === play.type ){
            volumeCredits += Math.floor( pref.audience / 5 );
        }

        /** 청구내역 출력 */
        result += `${ play.name } : ${ format( thisAmount / 100 ) } ( ${ pref.audience }석 )\n`;
        totalAmount += thisAmount;

    }

    result += `총액 : ${ format( totalAmount / 100 ) }\n`;
    result += `적립 포인트 : ${ volumeCredits }점 \n`;

    return result;

}

/**
 *
 * - pref 와 play 는 추출한 새로운 함수에서도 필요하지만, 값을 변경하지는 않는다.
 * --> 따라서 파라미터로 전달하기 적합하다
 *
 * 그러나 thisAmount 는 함수안에서 값이 변경되기 때문에 다룰때 조심해야한다
 *
 * @param { Performance } pref
 * @param { Play } play
 *
 * @return { number } - 현재 청구내역
 */
function amountFor( pref , play ){

    /** 값이 변경되는 변수는 조심해서 다루어야 합니다 */
    let thisAmount = 0;

    /** 공연료 계산 */
    switch( play.type ){
        /** 비극 */
        case "tragedy" :
            thisAmount = 40000;
            if ( pref.audience > 30 ){
                thisAmount += 1000 * ( pref.audience - 30 );
            }
            break;

        /** 희극 */
        case "comedy" :
            thisAmount = 30000;
            if ( pref.audience > 20 ){
                thisAmount += 1000 + 500 * ( pref.audience - 20 );
            }

            thisAmount += 300 * pref.audience;
            break;

        default :
            throw new Error( `알 수 없는 장르 : ${ play.type }` )
    }

    return thisAmount;
}

export default statement;