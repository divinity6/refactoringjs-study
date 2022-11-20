/**
 * - 더미 코드
 */
const printBanner = () => {}

const calculateOutstanding = () => {}

/**
 * @param invoice - 청구서
 */
function printOwing( invoice ){

    printBanner();

    let outstanding = calculateOutstanding();

    /** 세부사항 출력 */
    console.log( `고객명 : ${ invoice.customer }` );
    console.log( `고객명 : ${ invoice.customer }` );
}


/**
 * =============================================================
 *                          Refactor
 * =============================================================
 */

/**
 * @param invoice - 청구서
 */
function printOwing( invoice ){

    printBanner();

    let outstanding = calculateOutstanding();

    printDetails( outstanding );

    /** 세부사항 출력 */
    function printDetails( outstanding ){
        console.log( `고객명 : ${ invoice.customer }` );
        console.log( `고객명 : ${ invoice.customer }` );
    }
}
