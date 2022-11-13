import Province from "../statement/province.mjs";
import sampleProvinceData from "../statement/sampleProvinceData.mjs";

describe( "province , 지역 전체 테스트" , function(){

    /** 생산 부족분을 계산하는 테스트 */
    it( "shorfall , 생산 부족분 계산" , function(){

        /** 픽스처( fixture : 고정장치 ) 설정 */
        const asia = new Province( sampleProvinceData() );

        /** 검증 */
        expect( asia.shortfall ).toBe( 5 );

    } );

    /** 총 수익이 제대로 계산되는지 테스트 */
    it( "profit , 총 수익 계산" , function(){

        const asia = new Province( sampleProvinceData() );

        expect( asia.profit ).toBe( 230 );

    } )


} );

/** beforeEach 적용 */
describe( "province , 지역 전체 테스트 - beforeEach 적용" , function(){

    let asia;

    beforeEach( function(){
        asia = new Province( sampleProvinceData() );
    } );

    /** 생산 부족분을 계산하는 테스트 */
    it( "shorfall , 생산 부족분 계산" , function(){
        expect( asia.shortfall ).toBe( 5 );

    } );

    /** 총 수익이 제대로 계산되는지 테스트 */
    it( "profit , 총 수익 계산" , function(){
        expect( asia.profit ).toBe( 230 );

    } )

    it( "change production 검증" , function(){

        asia.producers[ 0 ].production = 20;

        expect( asia.shortfall ).toBe( -6 );

        expect( asia.profit ).toBe( 292 );
    } )

    /** 숫자형이 0일 경우 */
    it( "zero demand , 수요가 없을 경우" , function(){

        asia.demand = 0;

        expect( asia.shortfall ).toBe( -25 );

        expect( asia.profit ).toBe( 0 );
    } );

    /** 수요가 음수일 경우 */
    it( "negative demand , 수요가 마이너스일 경우" , function(){
        asia.demand = -1;

        expect( asia.shortfall ).toBe( -26 );

        expect( asia.profit ).toBe( -10 );
    } )

    /** 수요 입력란이 비어있을 경우 */
    it( "empty string demand , 수요가 비어있을 경우" , function(){

        asia.demand = "";

        expect( asia.shortfall ).toBeNaN();

        expect( asia.profit ).toBeNaN();
    } )

} );

/** 경계지점에 문제가 생기면 어떤일이 생기는지 보여주는 테스트 */
describe( "no producers , producers 컬렉션이 비었을 경우" , function(){

    let noProducers;

    beforeEach( function(){

        const data = {
            name      : "No producers",

            producers : [],

            demand    : 30,

            price     : 20,
        }

        noProducers = new Province( data );
    } );

    it( "shorfall , 생산 부족분 계산" , function(){
        expect( asia.shortfall ).toBe( 5 );

    } );

    /** 총 수익이 제대로 계산되는지 테스트 */
    it( "profit , 총 수익 계산" , function(){
        expect( asia.profit ).toBe( 230 );

    } )

} );

describe( "string for producers , producers 가 문자열일 경우" , function(){

    it( "" , function(){

        const data = {
            name: "String produsers",

            producers: "",

            demand: 30,

            price: 20,
        };

        const prov = new Province( data );

        expect(  prov.shortfall ).toBe( 0 );
    } )

} );