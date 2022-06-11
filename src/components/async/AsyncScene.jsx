
/**
 * @ setState同步和异步的魅力
 * 
 * 参考文档：
 * https://zhuanlan.zhihu.com/p/399877218
 * 
 * setState内部的实现机制很复杂，但道理很简单。
 * 1.对react生命周期钩子或者onClick、onFocus等合成事件中，封装了一层isBatchingUpdates可以置为true(上锁，需要等待)，表现为异步
 * 2.当setTime、setInterval和addEventListener等原生事件中，isBatchingUpdates始终为false,表现为同步
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
