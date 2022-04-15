import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import Fat from './hook/Fat.jsx';
// 异步任务-setState验证
import Async from './async/Async.jsx';
import AsyncScene from './async/AsyncScene.jsx';
// 自定义全局样式
import '../css/base.scss';
class Home extends Component {
	render() {
		return (
			<div className="container">
				<h3>这是Home组件</h3>
				<Link to="/home/hook">
					父子元素传值，体会React17.x生命周期的钩子
				</Link>
				<Link to="/home/async">setState异步性的验证和事件循环</Link>
				<Link to="/home/async_scene">setState异步和同步的场景</Link>
				<Switch>
					<Route path="/home/hook" component={Fat}></Route>
					<Route path="/home/async" component={Async}></Route>
					<Route
						path="/home/async_scene"
						component={AsyncScene}
					></Route>
				</Switch>
			</div>
		);
	}
}

export default Home;
