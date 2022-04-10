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
	// 生命周期钩子，react17中componentWillMount被抛弃了，改成了静态方法，getDerivedStateFromProps
	static getDerivedStateFromProps(props, state) {
		console.log(props); // 初始的props对象 按钮点击前，{initVal:0} 点击后{initVal:0}
		console.log(state); // 跟踪最新的state对象 按钮点击前 {init:0} 点击后{init:1}
		console.log(document.getElementById('para')); // 按钮点击前，null，点击后<p id="para">1</p>
		return state;
	}
	// 操作dom最早在componentDidMount阶段
	componentDidMount() {
		console.log(document.getElementById('para')); // 按钮点击前，<p id="para">0</p>
	}
	render() {
		console.log(this.myRef); // 按钮点击前，undefined
		console.log(this.myRef && this.myRef.innerText); // 按钮点击前，undefined
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
		// return null;
		return prevState;
	}
	// 组件发生了更新，更新之后触发
	componentDidUpdate(prevProps, prevState) {
		// 点击按钮后：0：getSnapshotBeforeUpdate钩子：0
		console.log(
			prevProps.initVal + '：componentDidUpdate钩子：' + prevState.init
		);
	}
}

export default Son;
/**
 *
 * @ 关注React17生命周期钩子的变化
 * 
 * 参考文档：
 * https://www.jianshu.com/p/db4112950215
 * 
 *
 *
 */
