/**
 *
 * @ 一道react面试题
 * 体会：setState的异步
 * 以及回顾事件循环-Event Loop
 * 执行顺序：同步的宏任务-异步微任务-异步宏任务，如此循环
 * 参考文档：
 * 深入理解事件循环，这一篇就够了
 * https://zhuanlan.zhihu.com/p/87684858
 * react的setState的异步
 * https://zhuanlan.zhihu.com/p/269872938
 *
 *
 */
import React, { Component } from 'react';

class Async extends Component {
	constructor(props) {
		super(props);
		this.state = {
			count: 0
		};
	}
	render() {
		return (
			<div>
				<h3>这是setState异步性，验证案例</h3>
				{/* 点击按钮，观察终端打印的this.state.count */}
				<button onClick={this.increase}>
					点击按钮，观察终端打印的this.state.count
				</button>
			</div>
		);
	}
	increase = () => {
		this.setState({
			// setState1
			count: this.state.count + 1
		});
		console.log(this.state.count);
		this.setState({
			// setState2
			count: this.state.count + 1
		});
		console.log(this.state.count);
		setTimeout(() => {
			this.setState({
				// setState3
				count: this.state.count + 1
			});
			console.log(this.state.count);
			this.setState({
				// setState4
				count: this.state.count + 1
			});
			console.log(this.state.count);
		}, 1000);
	};
}

export default Async;
/**
 * @ 打印结果：0 0 2 3
 *
 * 原因分析：
 * 在通过辨别宏任务和微任务后，将其分别置于主线程任务斩和任务队列中，事件函数合成结束，开始执行代码，参考：https://zhuanlan.zhihu.com/p/269872938
 * 1.代码执行到第一个setState时，它是异步任务，将setState1放入任务队列中，执行紧跟其后的console语句，它是同步宏任务，
 * 打印出0
 * 2.代码执行到第二个setState时，他是异步任务，将setState2放入任务队列中，检查发现队列中已经存在键为count的setState，
 * setState2就会覆盖setState1,只保留1个。而后跟随的console.log语句属于同步的宏任务，立即执行打印0
 * 3.宏任务在主线程中执行结束，就会判断是否有任务队列，会先去执行微任务，这里没有promise语句，没有微任务，主线程继续读取
 * 4.主线程就会去队列中读取异步任务了，setTimeout()属性宏任务-异步的，在第二步已经将那个覆盖过的setState执行，count此时
 * 值已经变成了1
 * 5.setTimeout等待时间后，开始执行定时器内部的代码；setState3执行加1操作，紧随其后，打印出console.log(this.state.count)
 * 为2
 * 6.接着往下执行，setState4,加1操作，count的值变成3，console.log输出4
 *
 */
