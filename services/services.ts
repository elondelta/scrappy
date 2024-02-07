var fs = require('fs');
import { json2csv } from 'json-2-csv';

type PhoneNumbers = {
    number:string,
    verified:boolean
}
type House = {
    publishedDate: string;
        district: string;
        city:string;
        contactName: string;
        phoneNumbers: PhoneNumbers[];
        adDeactivates: string;
        description: string;
        adId: number;
        isMember: boolean;
        isVerified: boolean;
        memberSince: string;
        price: string;
        slug: string;
        title:string;
        address: string;
        bedrooms: string;
        bathrooms: string;
        houseSize: string;
        landSize:string;
}

export function saveRawAd(path:string, rawJson:any)
{
    fs.writeFile(`${path}/${rawJson.adDetail?.data?.ad?.id}.json`, JSON.stringify(rawJson, null, 2), function(err) {
        if (err) {
            console.log(err);
        }
    });
}

export function getHouseAdDetailsFromRawAd(rawJson:any) : House {
    const ad = rawJson.adDetail?.data?.ad
    return {
        publishedDate: ad.adDate,
        district: ad.area?.name,
        city:ad.location.name,
        contactName: ad.contactCard?.name,
        phoneNumbers: ad.contactCard?.phoneNumbers,
        adDeactivates: ad.deactivates,
        description: ad.description?.replace(/\n|\r/g, ""),
        adId: ad.id,
        isMember: ad.isMember,
        isVerified: ad.isVerified,
        memberSince: ad.memberSince,
        price: ad.money.amount,
        slug: ad.slug,
        title: ad.title,
        address: ad.properties.find((prop) => prop.key === 'address')?.value,
        bedrooms: ad.properties.find((prop) => prop.key === 'bedrooms')?.value,
        bathrooms: ad.properties.find((prop) => prop.key === 'bathrooms')?.value,
        houseSize: ad.properties.find((prop) => prop.key === 'house_size')?.value,
        landSize: ad.properties.find((prop) => prop.key === 'land_size')?.value,
    }
}

export async function  creaeteCSVReport(path:string, dataArray: any) {
    const csv = await json2csv(dataArray);
    console.log(csv)
    fs.writeFile(`${path}/${new Date().toUTCString()}-summary.csv`, csv, function(err) {
        if (err) {
            console.log(err);
        }
    });
}
