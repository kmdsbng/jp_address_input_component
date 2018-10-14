
export interface PrefectureJson {
    prefecture_jis_code: string;
    prefecture_name_kana: string;
    prefecture_name: string;
}

export interface ZipCodeJson {
    prefecture_jis_code: string;
    city_jis_code: string;
    zip_code: string;
    prefecture_name_kana: string;
    city_name_kana: string;
    town_name_kana: string;
    prefecture_name: string;
    city_name: string;
    town_name: string;
}

export interface CityJson {
    prefecture_jis_code: string;
    city_jis_code: string;
    prefecture_name_kana: string;
    city_name_kana: string;
    prefecture_name: string;
    city_name: string;
}

export interface TownJson {
    prefecture_jis_code: string;
    city_jis_code: string;
    town_name_kana: string;
    town_name: string;
}

export interface ZipCodeJpInterface {
    setRootUrl: (url: string) => void;
    getPrefectures: (
        cb: (err: any, prefectures: PrefectureJson[]) => void
    ) => void;
    getAddressesOfZipCode: (
        zipCode: string,
        cb: (err: any, addresses: ZipCodeJson[]) => void
    ) => void;
    getCitiesOfPrefecture: (
        prefectureJisCode: number,
        cb: (err: any, addresses: CityJson[]) => void
    ) => void;
    getTownsOfCity: (
        cityJisCode: number,
        cb: (err: any, addresses: TownJson[]) => void
    ) => void;
}

