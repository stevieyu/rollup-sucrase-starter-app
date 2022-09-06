import ReactDOM from 'react-dom';
import React from 'react';

const App = () => {
    return (
        <div>hello word !</div>
    )
}


class XApp extends HTMLElement {
    connectedCallback() {
        const fragment = this.attachShadow({ mode: 'open' })
        ReactDOM.render(<App />, fragment);
    }
}
customElements.define('x-app', XApp);
document.body.appendChild(document.createElement('x-app'))


