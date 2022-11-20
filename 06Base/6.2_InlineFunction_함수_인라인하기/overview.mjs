/**
 * - 더미 코드
 */

/** @example */
function getRating( driver ){
    return moreThanFiveLateDeliveries( driver ) ? 2: 1;
}

function moreThanFiveLateDeliveries( driver ){
    return driver.numberOfLateDeliveries > 5;
}


/**
 * =============================================================
 *                          Refactor
 * =============================================================
 */

function getRating( driver ){
    return ( driver.numberOfLateDeliveries > 5 ) ? 2: 1;
}
