import React, { Component } from 'react';
import ReactTypes from 'prop-types';
class Son extends Component {
	constructor(props) {
		super(props);
		this.state = {
			init: props.initVal
		};
	}
	// initVal类型校验
	static propTypes = {
		initVal: ReactTypes.number
	};
	// 设置启动参数
	static defaultProps = {
		initVal: 0
	};
	// 生命周期钩子，react16.3开始，中componentWillMount被抛弃了，改成了静态方法，getDerivedStateFromProps
	// React17版本以后，这个钩子的功能包括react17之前的，componentWillMount+componentWillReceiveProps
	static getDerivedStateFromProps(props, state) {
		console.log(props); // 初始的props对象 按钮点击前，{initVal:0} 点击后{initVal:0}
		console.log(state); // 跟踪最新的state对象 按钮点击前 {init:0} 点击后{init:1}
		console.log(document.getElementById('para')); // 按钮点击前，null，点击后<p id="para">1</p>
		// return state;
		return null;
	}
	// 操作dom最早在componentDidMount阶段
	componentDidMount() {
		console.log(document.getElementById('para')); // 按钮点击前，<p id="para">0</p>
	}
	render() {
		console.log(this.myRef); // 按钮点击前，undefined 点击+1按钮后，<p id="para">1</p>,可以拿到更新的dom，但是还不能操作
		console.log(this.myRef && this.myRef.innerText); // 按钮点击前，undefined，点击按钮后，0；最新页面还没有挂载，this.myRef.innerText=0
		return (
			<div>
				<h5>这是Son生命周期钩子</h5>
				{/* 如果Fat父组件汇总不传initVal,this.props.initVal才被使用，一旦在Fat中传了initVal,则一定会使用传值，不
				管它的类型是否通过校验 */}
				<p>{this.props.initVal}</p>
				<button onClick={this.plus}>+1</button>
				<p id="para" ref={(ele) => (this.myRef = ele)}>
					{this.state.init}
				</p>
			</div>
		);
	}
	// 点击按钮，加1操作
	plus = () => {
		this.setState({
			init: this.state.init + 1
		});
	};
	// 点击父组件中的按钮，改变传递过来的initVal的初始值，观察钩子componentWillReceiveProps的参数变化
	/* react17中将这个钩子丢弃了，不再使用，将它的功能放在getDerivedStateFromProps中了 ；控制台报错：
	Son uses getDerivedStateFromProps() but also contains the following legacy lifecycles:
  componentWillReceiveProps The above lifecycles should be removed. Learn more about this warning here:
*/
	// componentWillReceiveProps(props) {
	// 	console.log(this.props);
	// 	// 函数参数的变化
	// 	console.log(props);
	// }
	// 组件是否发生了变化
	shouldComponentUpdate(newProps, newState) {
		// 点击按钮，state变化后，才执行；0：shouldComponentUpdate钩子：1
		console.log(
			newProps.initVal + ':shouldComponentUpdate钩子：' + newState.init
		);
		return true;
	}
	// 重点：这一下的钩子执行前后的变化，必须要靠shouldComponentUpdate来驱动，里面return true语句，执行后，后面的钩子
	// 才会执行
	// 组件发生了更新，更新完成之前触发
	getSnapshotBeforeUpdate(prevProps, prevState) {
		// 点击按钮后，0：getSnapshotBeforeUpdate钩子：0
		console.log(
			prevProps.initVal +
				'：getSnapshotBeforeUpdate钩子：' +
				prevState.init
		);
		return null;
		// return prevState;
	}
	// 组件发生了更新，更新之后触发
	componentDidUpdate(prevProps, prevState) {
		// 点击按钮后：0：getSnapshotBeforeUpdate钩子：0
		console.log(
			prevProps.initVal + '：componentDidUpdate钩子：' + prevState.init
		);
		console.log(this.myRef.innerText); // 1
	}
}

export default Son;
/**
 *
 * @ 关注React17(React16.3版本之后)生命周期钩子的变化
 *
 * 参考文档：
 * https://www.jianshu.com/p/db4112950215
 *
 * https://zhuanlan.zhihu.com/p/370198189
 *
 * React setState 同步异步的魅力
 * https://zhuanlan.zhihu.com/p/399877218
 * 面试题
 * https://zhuanlan.zhihu.com/p/269872938
 * 理解宏任务、同步和异步
 * https://zhuanlan.zhihu.com/p/87684858
 *
 * 主要变化：
 * 一、创建阶段
 * 1.1 react@16.3之前的componentWillMount被移除，取代它的是静态有返回值的方法static getDerivedStateFormProps
 * 1.2 componentDidMount不变
 *
 * 二、更新阶段
 * 2.1 componentWillReceiveProps被移除，他的功能被合并到getDerivedStateFromProps
 * 2.2 shouldComponentUpdate(props,state) 如果是当前组件的state变化引起更新，这个钩子的state将返回更新后的数据对象；
 * 如果是父组件给子组件传递的props变化，执行了shouldComponentUpdate,这个props参数中拿到的是新属性
 *
 * 三、更新阶段生命周期钩子执行的变化
 * 16.3版本以前：
 * a.父组件给子组件传递的属性值发生变化，引起的组件更新；钩子执行顺序：componentWillReceiveProps
 * ---shouldComponentUpdate---componentWillUpdate---render---ComponentDidUpdate
 * b.当前组件自身的state变化，引起的组件更新；shouldComponentUpdate---componentWillUpdate
 * ---render---ComponentDidUpdate
 *
 * 16.3以后的版本
 * a.父组件给子组件传递的属性值变化，引起的组件更新；钩子执行顺序：getDerivedStateFromProps---shouldComponentUpdate
 * ---render---getSnapshotBeforeUpdate---componentDidUpdate
 * **注意render函数的执行提到了替代componentWillUpdate的getSnapshotBeforeUpdate的前面
 * 
 * 注意：
 * getSnapshotBeforeUpdate(){
 * // 任何返回值都可以作为ComponentDidUpdate(prevProps,prevState,third)的第三个参数
 *    return this.myRef.current.scrollHeight;
 * }
 *
 *componentDidUpdate(prevProps,prevState,third) {
		// 第三参数third，是生命周期钩子getSnapshotBeforeUpdate()的返回值

 }
 * 
 * b.当前组件的state值变化，执行的生命周期钩子
 * getDerivedStateFromProps---shouldComponentUpdate---render-getSnapshotBeforeUpdate---componentDidUpdate
 * 16.3版本以后，更新组件要执行的钩子完全一样，执行的顺序也一样；这一点和16.3之前的版本不同，16.3之前的版本，
 * state变化引起的组件更新，componentWillReceiveProps这个钩子不会执行不会执行
 * 
 * 
 *
 */
/* 
点击父组件的按钮，改变传递给子组件的属性值前后数据变化：
点击前
{initVal: 0}
Son.jsx:22 {init: 0}
Son.jsx:23 null
Son.jsx:31 undefined
Son.jsx:32 undefined
Son.jsx:28 <p id=​"para">​0​</p>​



点击后
{initVal: 1}initVal: 1[[Prototype]]: Object
Son.jsx:22 {init: 0}
Son.jsx:23 <p id=​"para">​0​</p>​
Son.jsx:65 1:shouldComponentUpdate钩子：0
Son.jsx:31 <p id=​"para">​0​</p>​
Son.jsx:32 0
Son.jsx:75 0：getSnapshotBeforeUpdate钩子：0
Son.jsx:86 0：componentDidUpdate钩子
*/
/* 
点击当前组件中+1按钮之前
{initVal: 0}
Son.jsx:22 {init: 0}
Son.jsx:23 null
Son.jsx:31 undefined
Son.jsx:32 undefined
Son.jsx:28 <p id=​"para">​0​</p>​


点击+1之后
{initVal: 0}
Son.jsx:22 {init: 1}
Son.jsx:23 <p id=​"para">​1​</p>​
Son.jsx:65 0:shouldComponentUpdate钩子：1
Son.jsx:31 <p id=​"para">​1​</p>​
Son.jsx:32 0
Son.jsx:75 0：getSnapshotBeforeUpdate钩子：0
Son.jsx:86 0：componentDidUpdate钩子：0




*/
