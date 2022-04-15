
/**
 * @ setState同步和异步的魅力
 * 
 * 参考文档：
 * https://zhuanlan.zhihu.com/p/399877218
 * 
 * setState内部的实现机制很复杂，但道理很简单。当setTime、setInterval和addEventListener和dom的原生事件中，会对
 * setState进行一层封装，将isBatchingUpdate设置为true,此时走同步的分支
 *
 * 
 * 
 */
import React, { Component } from 'react';

class AsyncScene extends Component {
	state = {
		count: 0
	};
	// count +1
	increment = () => {
		console.log('increment setState前的count', this.state.count);
		this.setState({
			count: this.state.count + 1
		});
		console.log('increment setState后的count', this.state.count);
	};

	// count +1 三次
	triple = () => {
		console.log('triple setState前的count', this.state.count);
		this.setState({
			count: this.state.count + 1
		});
		this.setState({
			count: this.state.count + 1
		});
		this.setState({
			count: this.state.count + 1
		});
		console.log('triple setState后的count', this.state.count);
	};
	// count - 1
	reduce = () => {
		setTimeout(() => {
			console.log('reduce setState前的count', this.state.count);
			this.setState({
				count: this.state.count - 1
			});
			console.log('reduce setState后的count', this.state.count);
		}, 0);
	};
	render() {
		return (
			<div>
				<button onClick={this.increment}> +1 </button>
				<button onClick={this.triple}> +1 三次 </button>
				<button onClick={this.reduce}> -1 </button>
			</div>
		);
	}
}

export default AsyncScene;
