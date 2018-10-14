
import * as React from 'react';
import * as ReactDOM from "react-dom";
import { render} from 'react-dom';
import {Application, JpAddressInputComponent} from '../../src/index';
import {ZipCodeJpInterface} from '../../src/ZipCodeJpInterface'
declare var ZipCodeJp: ZipCodeJpInterface;

ZipCodeJp.setRootUrl('https://kmdsbng.github.io/zipcode_jp/')

//const App = () => (
//    <JpAddressInputComponent
//    />
//);
//render(<App />, document.getElementById("root"));


class Renderer {
    app: Application;

    constructor(app: Application) {
        this.app = app;
    }

    render() {
        ReactDOM.render(
            <JpAddressInputComponent app={this.app} />,
            document.getElementById('root')
        );
    }
}


const app = new Application();
const renderer = new Renderer(app);
app.on(function() {
    renderer.render();
});

app.notifyUpdate();

