// 실제 구현부
import statement from "./statement/07statement_totalAmount.mjs";

/**
 * @public
 *
 * - 데이터를 가져옵니다
 *
 * @param { String } url
 * @return {Promise<any>}
 */
const getData = async ( url ) => {

    const res = await fetch( url );

    return res.json();
}

/**
 * @public
 *
 * - 데이터를 가지고 실행합니다
 *
 * @return { Promise<void> }
 */
const run = async () => {

    const invoices = await getData( "01Refactoring/json/invoices.json" )

    const plays = await getData( "01Refactoring/json/plays.json" );

    const results = invoices.map( invoice => statement( invoice , plays ) );

    console.log( results );

    debugger;

}

run();