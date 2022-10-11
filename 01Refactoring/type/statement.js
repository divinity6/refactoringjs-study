/**
 * @typedef Invoice
 *
 * @property { string } customer - 고객 이름
 * @property { Performance[] } performances - 공연 ID 및 관객규모를 담은 list 배열
 */

/**
 * @typedef Performance
 *
 * @property { string } playID - 공연 ID
 * @property { number } audience - 관객 규모
 */

/**
 * @typedef Play
 *
 * 공연 정보 및 타입
 *
 * @property { { name : string , type : string } } hamlet
 * @property { { name : string , type : string } } othello
 * @property { { name : string , type : string } } as-like
 */