/**
 * - 더미 코드
 */

/** @example */
function overview(){
    let defaultOwner = { firstName : "마틴" , lastName : "파울러" }
}

/**
 * =============================================================
 *                          Refactor
 * =============================================================
 */

function overview(){
    let defaultOwnerData = { firstName : "마틴" , lastName : "파울러" }

    export function defaultOwner(){
        return defaultOwnerData;
    }

    export function setDefaultOwner( arg ){
        defaultOwnerData = arg;
    }
}

