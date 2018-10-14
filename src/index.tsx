import * as React from 'react';
import * as ReactDOM from "react-dom";
import './styles.css';
import {ZipCodeJson, CityJson, ZipCodeJpInterface, PrefectureJson, TownJson} from './ZipCodeJpInterface'
declare var ZipCodeJp: ZipCodeJpInterface;

//const MyComponent = () => {
//    return (
//      <h1>Hello from My Component</h1>
//    );
//};
//export default MyComponent;







export interface JpAddressInputComponentProps {
    app: Application
}


export class JpAddressInputComponent extends React.Component<JpAddressInputComponentProps, {}> {
    render() {
        var addresses = this.props.app.addresses.map(function(address, i) {
            return (
                <li key={i}>
                    {JSON.stringify(address)}
                </li>
            );
        });

        var prefectures = this.props.app.prefectures.map(function(prefecture, i) {
            return (
                <li key={i}>
                    {JSON.stringify(prefecture)}
                </li>
            );
        });

        var cities = this.props.app.cities.map(function(city, i) {
            return (
                <li key={i}>
                    {JSON.stringify(city)}
                </li>
            );
        });

        var towns = this.props.app.towns.map(function(town, i) {
            return (
                <li key={i}>
                    {JSON.stringify(town)}
                </li>
            );
        });

        return (
            <div>
                Input zip code:
                <input type="text" size={10} value={this.props.app.zip_code} onChange={this.onChangeZipCode.bind(this)} />
                <button onClick={this.onSearchStart.bind(this)}>search address</button>

                <ol>
                    {addresses}
                </ol>

                <button onClick={this.onLoadPrefectureStart.bind(this)}>load prefectures</button>

                <ol>
                    {prefectures}
                </ol>

                Input prefecture jis code: (1〜47)
                <input type="text" size={10} value={this.props.app.prefecture_jis_code} onChange={this.onChangePrefectureJisCode.bind(this)} />
                <button onClick={this.onLoadCityStart.bind(this)}>load cities</button>

                <ol>
                    {cities}
                </ol>

                Input city jis code:
                <input type="text" size={10} value={this.props.app.city_jis_code} onChange={this.onChangeCityJisCode.bind(this)} />
                <button onClick={this.onLoadTownStart.bind(this)}>load towns</button>

                <ol>
                    {towns}
                </ol>
            </div>
        );
    }

    onChangeZipCode(e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) {
        this.props.app.updateZipCode(e.currentTarget.value);
    }

    onChangePrefectureJisCode(e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) {
        this.props.app.updatePrefectureJisCode(e.currentTarget.value);
    }

    onChangeCityJisCode(e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) {
        this.props.app.updateCityJisCode(e.currentTarget.value);
    }

    onSearchStart() {
        this.props.app.searchAddress();
    }

    onLoadPrefectureStart() {
        this.props.app.loadPrefectures();
    }

    onLoadCityStart() {
        this.props.app.loadCities();
    }

    onLoadTownStart() {
        this.props.app.loadTowns();
    }
}

export class Application {
    observers: (() => void)[];
    zip_code: string;
    prefecture_jis_code: string;
    addresses: ZipCodeJson[];
    prefectures: PrefectureJson[];
    cities: CityJson[];
    towns: TownJson[];
    city_jis_code: string;

    constructor() {
        this.observers = [];
        this.zip_code = "6000000";
        this.prefecture_jis_code = "01";
        this.city_jis_code = "01220";
        this.addresses = [];
        this.prefectures = [];
        this.cities = [];
        this.towns = [];
    }

    on(cb: () => void) {
        this.observers.push(cb);
    }

    notifyUpdate() {
        for (var i=0; i < this.observers.length; ++i) {
            this.observers[i]();
        }
    }

    updateZipCode(zip: string) {
        this.zip_code = zip;
        this.notifyUpdate();
    }

    updatePrefectureJisCode(code: string) {
        this.prefecture_jis_code = code;
        this.notifyUpdate();
    }

    updateCityJisCode(code: string) {
        this.city_jis_code = code;
        this.notifyUpdate();
    }

    searchAddress() {
        const app = this;
        ZipCodeJp.getAddressesOfZipCode(
            app.zip_code,
            function(err, addresses) {
                app.addresses = addresses;
                app.notifyUpdate();
            }
        );
    }

    loadPrefectures() {
        const app = this;
        ZipCodeJp.getPrefectures(
            function(err, prefectures) {
                app.prefectures = prefectures;
                app.notifyUpdate();
            }
        );
    }

    loadCities() {
        const app = this;
        ZipCodeJp.getCitiesOfPrefecture(
            parseInt(app.prefecture_jis_code),
            function(err, cities) {
                app.cities = cities;
                app.notifyUpdate();
            }
        );
    }

    loadTowns() {
        const app = this;
        ZipCodeJp.getTownsOfCity(
            parseInt(app.city_jis_code),
            function(err, towns) {
                app.towns = towns;
                app.notifyUpdate();
            }
        );
    }
}

//const app = new Application();
//const renderer = new Renderer(app);
//app.on(function() {
//    renderer.render();
//});
//
//app.notifyUpdate();



