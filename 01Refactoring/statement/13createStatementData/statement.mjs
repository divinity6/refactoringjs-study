import createStatementData from "./createStatementData.mjs";

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