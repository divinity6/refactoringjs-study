/**
 * Province 클래스 생성자에서 인수로 사용할 JSON 데이터를 생성하는 객체
 */
function sampleProvinceData(){

    return {
        name : "Asia",

        producers : [
            // 생산자 , 비용 , 생산량
            { name : "Byzantium" , cost : 10 , production: 9 },
            { name : "Attalia"   , cost : 12 , production: 10 },
            { name : "Sinope"    , cost : 10 , production: 6 },
        ],

        demand : 30, // 수요

        price : 20, // 가격

    }
}

export default sampleProvinceData;