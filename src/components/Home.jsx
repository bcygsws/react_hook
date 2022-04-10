import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import Fat from './hook/Fat.jsx';

class Home extends Component {
	render() {
		return (
			<div>
				<h3>这是Home组件</h3>
				<Link to="/home/hook">
					父子元素传值，体会React17.x生命周期的钩子
				</Link>
				<Switch>
					<Route path="/home/hook" component={Fat}></Route>
				</Switch>
			</div>
		);
	}
}

export default Home;
