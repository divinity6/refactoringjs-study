/**
 * - 더미 코드
 */

/** @example */
function overview( anOrder ){
    let basePrice = anOrder.basePrice;
    return ( basePrice > 1000 );
}

/**
 * =============================================================
 *                          Refactor
 * =============================================================
 */

function overview( anOrder ){
    return anOrder.basePrice > 1000;
}
