# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## react17（react16.3 开始变更，react17 版本后正式移除丢弃的那几个钩子）生命周期钩子的变化

### 主要变化

#### 一、创建阶段

1.1 react@16.3之前的 componentWillMount 被移除，取代它的是静态有返回值的方法 static getDerivedStateFromProps
1.2 componentDidMount 不变

#### 二、更新阶段

2.1 componentWillReceiveProps 被移除，他的功能被合并到 getDerivedStateFromProps
2.2 shouldComponentUpdate(props,state) 如果是当前组件的 state 变化引起更新，这个钩子的 state 将返回更新后的数据对象；
2.3 如果是父组件给子组件传递的 props 变化，执行了 shouldComponentUpdate,这个 props 参数中拿到的是新属性

#### 三、更新阶段生命周期钩子执行的变化

##### 16.3 版本以前

3.1 父组件给子组件传递的属性值发生变化，引起的组件更新；钩子执行顺序：componentWillReceiveProps
---shouldComponentUpdate---componentWillUpdate---render---ComponentDidUpdate
3.2 当前组件自身的 state 变化，引起的组件更新；shouldComponentUpdate---componentWillUpdate
---render---ComponentDidUpdate

##### 16.3 以后的版本

3.1 父组件给子组件传递的属性值变化，引起的组件更新；钩子执行顺序：getDerivedStateFromProps---shouldComponentUpdate
---render---getSnapshotBeforeUpdate---componentDidUpdate;注意 render 函数的执行提到了替代 componentWillUpdate 的 getSnapshotBeforeUpdate 的前面

3.2 注意：

-   getSnapshotBeforeUpdate(){
-   // 任何返回值都可以作为 ComponentDidUpdate(prevProps,prevState,third)的第三个参数
-   return this.myRef.current.scrollHeight;
-   }
-   componentDidUpdate(prevProps,prevState,third) {
    // 第三参数 third，是生命周期钩子 getSnapshotBeforeUpdate()的返回值
-   }

## setState 的同步/异步的使用场景

### 异步使用

-   在 React 生命周期钩子和 onClick、onFocus 等合成事件中，对 setState 进行封装了一层，isBatchingUpdates 可以置为 true(isBatchingUpdates 默认为 false),即“上锁”，则组件更新需要等待，表现为异步，这也是我们常用的场景

-   在 setTimeout、setInterval、addEventListener 等原生 dom 事件中，isBatchingUpdates 标识始终为 false,在这些函数中使用 setState，则表现为同步
