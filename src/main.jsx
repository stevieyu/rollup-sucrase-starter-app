import ReactDOM from 'react-dom';


const App = () => {
    return (
        <div>hello word</div>
    )
}

const el = document.createElement('div')
document.body.appendChild(el)

ReactDOM.render(<App />, el);
