/**
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

    function volumeCreditsFor( aPerformance ){

        let result = 0;

        result += Math.max( aPerformance.audience - 30 , 0 );

        if ( "comedy" === playFor( aPerformance ).type ){
            result += Math.floor( aPerformance.audience / 5 );
        }

        return result;
    }

    function usd( aNumber ){
        return  new Intl.NumberFormat( "en-US" , {
            style : "currency" , currency : "USD" , minimumFractionDigits : 2
        } ).format( aNumber / 100 );
    }

    function totalVolumeCredits(){
        let result = 0;
        /** 값을 누적하는 로직을 별도로 분리한다 */
        for ( let pref of invoice.performances ){
            /** 포인트 적립 */
            result += volumeCreditsFor( pref );
        }
        return result;
    }

    /**
     * @important 임시이름 부여( appleSauce )
     *
     * - totalAmount 를 함수로 추출하는게 제일 좋지만,
     *   이미 같은 이름의 변수가 있기 때문에, appleSauce 같은 이름을 일단 붙여준다
     *
     * - 그 후, 변수들을 제거하고, 인라인하며 의미 있는 이름으로 리팩터링 한다.
     *
     *   @return { number }
     */
    function totalAmount(){

        let result = 0;

        for ( let pref of invoice.performances ){
            result += amountFor( pref );
        }

        return result;
    }

    let result = `청구 내역 ( 고객명 : ${ invoice.customer } )\n`;

    for ( let pref of invoice.performances ){

        result += `${ playFor( pref ).name } : ${ usd( amountFor( pref ) ) } ( ${ pref.audience }석 )\n`;

    }

    result += `총액 : ${ usd( totalAmount() ) }\n`;

    result += `적립 포인트 : ${ totalVolumeCredits() }점 \n`;

    return result;

}


export default statement;