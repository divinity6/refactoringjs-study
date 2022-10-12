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

export default statement;