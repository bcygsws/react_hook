import React, { Component } from 'react';
import Son from './Son.jsx';
class Fat extends Component {
	render() {
		return (
			<div>
				<h4>这是Fat父组件</h4>
				{/* 类型校验错误 */}
				{/* 	<Son initVal="asfdas"></Son> */}
				{/* <Son></Son> */}
				<Son initVal={0}></Son>
			</div>
		);
	}
}

export default Fat;
