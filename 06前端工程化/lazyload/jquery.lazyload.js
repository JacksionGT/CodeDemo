(function ($) {
    if (!$) {
        console.error("请先引入jQuery")
        return;
    }

    // 节流函数，防止窗体滚动频繁调用检查逻辑
    const decounce = function(fn, delay) {
        let timer = null

        return function() {
            const context = this
            let args = arguments
            clearTimeout(timer) 
            // 每次调用debounce函数都会将前一次的timer清空，确保只执行一次
            timer = setTimeout(() => {
                fn.apply(context, args)
            }, delay)
        }
    }

    // 插件的核心逻辑是判断元素的可见行
    // 元素可见性检查的一些边界情况：检查元素的祖先元素及其本身的visible,dispaly属性及是否在可是区域内
    // 这里只检查其是否在可见区域
    function isElementInViewport (el, offset = 0) {
        const box = el.getBoundingClientRect(),
              top = (box.top >= 0),
              left = (box.left >= 0),
              bottom = (box.bottom <= (window.innerHeight || document.documentElement.clientHeight) + offset),
              right = (box.right <= (window.innerWidth || document.documentElement.clientWidth) + offset);
        return (top && left && bottom && right);
    }

    class Lazyload {
        constructor(){
            this.lazyImages = [];
            this.scrollHandler = null;
        }
        init(){
            this.scrollHandler = decounce(()=>{
                if(this.lazyImages.length > 0){
                    this.lazyImages.forEach(ele=>{
                        if(isElementInViewport(ele) && !ele.hasAttribute('loaded')){
                            // 模拟低网速
                            setTimeout(() => {
                                ele.src = ele.dataset.src;
                                ele.setAttribute("loaded","")
                            }, 300);
                        }
                    })
                }
            },200)
            window.addEventListener('scroll',this.scrollHandler)
        }
        lazy(element){
            if(!this.scrollHandler){
                this.init()
                //首屏加载
                this.scrollHandler();
            }
            if(!this.lazyImages.includes(element)){
                this.lazyImages.push(element);
            }
        }
        destory(){
            this.lazyImages = [];
            window.removeEventListener('scroll',this.scrollHandler)
        }
    }

    // 这里的懒加载是指：在图片元素进入浏览器窗口可是区域时去请求图片资源
    // 插件实现思路：
    // 在window上添加滚动事件
    // 插件中缓存需要懒加载的元素列表
    // 窗体触发滚动事件时执行懒加载检查

    // 单例
    var lazy_instance = new Lazyload();

    var _lazyload = {
        lazyload:function () {
            for (let index = 0; index < this.length; index++) {
                const element = this[index];
                lazy_instance.lazy(element)
            }
            
            //支持链式操作
            return this;
        },
        unlazy:function () {
            lazy_instance.destory();
            
            //支持链式操作
            return this;
        }
    }

    $.fn.extend(_lazyload);

})(this.jQuery)