import Province from "./statement/province.mjs";
import sampleProvinceData from "./statement/sampleProvinceData.mjs";

const run = () => {

    const _province = new Province( sampleProvinceData() )

    console.log( _province );
}

run();