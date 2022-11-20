/**
 * - 더미 코드
 */

/** @example */
function base( aReading ){}

function taxableCharge( aReading ){}

/**
 * =============================================================
 *                          Refactor
 * =============================================================
 */

function enrichReading( argReading ){

    /** lodash cloneDeep 을 활용 - 일단은 얕은복사함 */
    const aReading = Object.assign( {} , argReading );

    aReading.baseCharge = base( aReading );

    aReading.taxableCharge = taxableCharge( aReading );

    return aReading;

    function base( aReading ){}

    function taxableCharge( aReading ){}
}
