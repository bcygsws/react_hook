import './App.css';
import { HashRouter, Link, Route, Switch } from 'react-router-dom';
import Home from './components/Home.jsx';
import About from './components/About.jsx';
function App() {
	return (
		<HashRouter>
			<div className="App">
				<header className="App-header">
					<Link to="/home">主页</Link>
					<Link to="/about">关于</Link>
				</header>
				<Switch>
					<Route path="/home" component={Home}></Route>
					<Route path="/about" component={About}></Route>
				</Switch>
			</div>
		</HashRouter>
	);
}

export default App;
