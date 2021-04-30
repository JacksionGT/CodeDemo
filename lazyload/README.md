# Lazyload插件练习心得

## 插件需求
图片懒加载（LazyLoad）一直是前端的优化方案之一。
其核心思想是：先将img标签中的src链接设为同一张图片，真正的图片地址存储在img标签的自定义属性中。当js监听到该图片元素进入可视窗口时，将自定义属性中的地址存储到src属性中。
请基于jQuery开发一个懒加载插件，并提交你的代码。
## 什么是Lazyload？
Lazyload可以翻译成懒加载，或者延迟加载
### 懒加载的目的是什么
计算机系统中的IO操作是一种非常消耗资源（CUP计算,内存控件，网络带宽，硬盘读写等）的操作。请求网络资源是前端页面加载中非常重要且频繁的IO操作，懒加载的目的就是要减少这种不必要的资源消耗。当一个网页呈现到设备上时，用户从页面顶部开始往底部开始浏览，一旦用户中途离开了当前页面，那么未被浏览的页面部分所加载的内容(图片，饰品，文本等)是没有意义的。懒加载的功能则将内容延迟请求，当用户即将可能浏览到相应的页面内容时才去加载。这样做既加快页面加载速度，又减少了不必要的网络资源请求。从而优加快了网页呈现给用户的速度，优化了网页浏览体验。
### 需求分析
从上面的场景不难看出，这个功能的核心逻辑就是判断元素的可见行。即相关资源是否在浏览过程中进入到了浏览器窗口的可视区域或即将进入到可视区域。因此这里有两种延迟加载策略出现
* 元素进入可视区域后加载相关资源
这种策略的优点是能够最大化减少网络请求。能够节省用户的手机流量。缺点是用户可能会感觉到请求资源所过程中所带来的卡顿，牺牲了部分用户体验作为代价
* 元素即将进入可视区域加载相关资源
这种策略能够在减少网络请求的情况下，又有不错的用户体验。缺点就是，用户没有浏览即将进入可视区域的内容时，造成了这部分内容的无意义加载。建议在PC站点上使用这种策略
### 需求实现

#### 兼容性优先的实现方案大致步骤
* 在window上添加滚动事件
* 插件中缓存需要懒加载的元素列表
* 窗体触发滚动事件时执行懒加载检查
#### 激进的实现方案
* 使用IntersectionObserver  Web API，当元素进入可视区域时触发回调来加载资源
* 考虑当浏览器不支持此API时的降级解决方按（上面的解决方案）

### 可能会用到的技术

#### 函数节流
当用户频繁滚动页面时，懒加载检查就会被非常频繁地触发，这种频繁地检查是不必要地。这时设置一个阈值，当用户停止操作地时间超过这个阈值时，程序再去执行懒加载检查函数。这种操作被称为函数节流。

#### 获取元素与可视窗口地位置
对需要加载地资源承载元素（img，video,audio,div等）调用`getBoundingClientRect`方法。这个方法返回一个[DOMRect对象](https://developer.mozilla.org/zh-CN/docs/Mozilla/Tech/XPCOM/Reference/Interface/nsIDOMClientRect)，DOMRect 对象包含了一组用于描述边框的只读属性——left、top、right和bottom，单位为像素。除了 width 和 height 外的属性都是相对于视口的左上角位置而言的。更多关于这个方法返回值的信息参考[MDN中描述其值的部分](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect#Returns)。方法返回信息如下：
``` javascript
var rect = document.querySelector("#img").getBoundingClientRect();
JSON.stringify($0.getBoundingClientRect(),null,4);
// ---->
{
    "x": 911,
    "y": 152,
    "width": 100,
    "height": 100,
    "top": 152,
    "right": 1011,
    "bottom": 252,
    "left": 911
}
```

#### IntersectionObserver接口
IntersectionObserver接口 (从属于Intersection Observer API) 提供了一种异步观察目标元素与其祖先元素或顶级文档视窗(viewport)交叉状态的方法。祖先元素与视窗(viewport)被称为根(root)。
[Intersection Observer API](https://developer.mozilla.org/zh-CN/docs/Web/API/Intersection_Observer_API)

[IntersectionObserver接口的使用](https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver)



## 总结
插件封装是一件充满艺术创造的事情，因为艺术永远无法做到完美。这个插件也是如此，应该还有更加简洁的实现方式。










