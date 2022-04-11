import React, { Component } from 'react';
import Son from './Son.jsx';
class Fat extends Component {
	constructor(props) {
		super(props);
		this.state = {
			// 提供向子组件传递的属性initVal的值，当它变化时，观察子组件中，componentWillReceiveProps钩子的变化
			num: 0
		};
	}
	render() {
		return (
			<div>
				<h4>这是Fat父组件</h4>
				{/* 类型校验错误 */}
				{/* 	<Son initVal="asfdas"></Son> */}
				{/* <Son></Son> */}
				<button onClick={this.changeNum}>
					将传给子组件的initVal属性的初始值加1
				</button>
				<Son initVal={this.state.num}></Son>
			</div>
		);
	}
	// 点击按钮，更爱num值
	changeNum = () => {
		this.setState({ num: this.state.num + 1 });
	};
}

export default Fat;
