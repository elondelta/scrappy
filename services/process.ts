import {getHouseAdDetailsFromRawAd, creaeteCSVReport} from "./services"

import inputJson from '../65b880fb863e0600202f0c65.json';

const house = getHouseAdDetailsFromRawAd(inputJson)
console.log(house)
creaeteCSVReport('./', [house])