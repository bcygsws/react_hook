import './App.css';
import { HashRouter, Link, Route, Switch, Redirect } from 'react-router-dom';
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
					{/* 废弃了Redirect,使用Route */}
					<Redirect from="/" to="/home" exact />
				</Switch>
			</div>
		</HashRouter>
	);
}

export default App;
/**
 *
 * @ 关注变化1；react-router-dom路由的变化
 * react-router-dom v5 当前使用的
 * react-router-dom v6 参考文档：https://blog.csdn.net/weixin_47809584/article/details/122096676?spm=1001.2101.3001.6650.1&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-1.pc_relevant_aa&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-1.pc_relevant_aa&utm_relevant_index=2
 *
 *
 */
/**
 *
 * @ npx create-react-app 项目名
 *
 * 创建的项目时，react18版本，新版本的特性，还待研究；不使用最新版本，使用更为成熟、稳定的版本react17
 *
 * 步骤如下：
 * 1.安装开发依赖，webpack4.43.0 html-webpack-plugin 4.5.0
 * 2.安装 react17 和react-dom 17,以及react-router-dom v5版本
 * 3.降低react-scripts的版本，降为 v5版本
 *
 *
 */
