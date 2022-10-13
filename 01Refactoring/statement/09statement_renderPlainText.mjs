/**
 *
 * - 중첩함수
 *
 * @param { Invoice } invoice
 * @param { { Play } } plays
 *
 * @return { string } - 청구서 결과를 문자열로 반환합니다
 */
function statement( invoice , plays ){

    /** 중간 데이터 구조역할을 할 객체 생성 */
    const statementData = {};

    /** 실제 행위를 별도의 함수로 분리 */
    return renderPlainText( statementData , invoice , plays );
}

/**
 * - 실제 본문자체를 PlainText 라는 함수 객체로 분리합니다
 *
 * @param { {} } data - 중간 데이터 구조입니다
 * @param { Invoice } invoice
 * @param { { Play } } plays
 *
 * @return { string } - 청구서 결과를 문자열로 반환합니다
 */
function renderPlainText( data , invoice , plays ){

    let result = `청구 내역 ( 고객명 : ${ invoice.customer } )\n`;

    for ( let pref of invoice.performances ){

        result += `${ playFor( pref ).name } : ${ usd( amountFor( pref ) ) } ( ${ pref.audience }석 )\n`;

    }

    result += `총액 : ${ usd( totalAmount() ) }\n`;

    result += `적립 포인트 : ${ totalVolumeCredits() }점 \n`;

    return result;

    function totalAmount(){

        let result = 0;

        for ( let pref of invoice.performances ){
            result += amountFor( pref );
        }

        return result;
    }

    /** 중첩함수 시작 */
    function totalVolumeCredits(){

        let result = 0;

        for ( let pref of invoice.performances ){

            result += volumeCreditsFor( pref );
        }
        return result;
    }

    function usd( aNumber ){
        return  new Intl.NumberFormat( "en-US" , {
            style : "currency" , currency : "USD" , minimumFractionDigits : 2
        } ).format( aNumber / 100 );
    }

    function volumeCreditsFor( aPerformance ){

        let result = 0;

        result += Math.max( aPerformance.audience - 30 , 0 );

        if ( "comedy" === playFor( aPerformance ).type ){
            result += Math.floor( aPerformance.audience / 5 );
        }

        return result;
    }

    function playFor( aPerformance ){
        return plays[ aPerformance.playID ];
    }

    function amountFor( aPerformance ){

        let result = 0; // 명확한 이름으로 변경

        switch( playFor( aPerformance ).type ){
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
                throw new Error( `알 수 없는 장르 : ${ playFor( aPerformance ).type }` )
        }

        return result;
    }

}


export default statement;