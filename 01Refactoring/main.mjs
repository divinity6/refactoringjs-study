// 실제 구현부
import statement from "./statement/14htmlVersion/statement.mjs";

/**
 * @public
 *
 * - JSON 데이터를 가져옵니다
 *
 * @param { String } url
 * @return {Promise<any>}
 */
const fetchJsonData = async ( url ) => {

    const res = await fetch( url );

    return res.json();
}

const getURLData = ( urls , run ) => {

    const _urls = [];

    urls.map( async u => {

         const url = await fetchJsonData( u );

         _urls.push( url );

         if ( urls.length === _urls.length ){
             run( ..._urls );
         }

    } );

}

/**
 * @public
 *
 * - 데이터를 가지고 실행합니다
 *
 * @return { Promise<void> }
 */
const run = async () => {

    const urls = [ "01Refactoring/json/invoices.json" , "01Refactoring/json/plays.json" ];

    getURLData( urls , ( invoices , plays ) => {

        const results = invoices.map( invoice => statement( invoice , plays ) );

        document.querySelector( '#statement' ).innerHTML = results;

    } );

}

run();