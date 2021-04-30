(function(root) {
	var _ = function(obj) {
		if (obj instanceof _) {
			return obj;
		}

		if (!(this instanceof _)) {
			return new _(obj);
		}
		this._wrapped = obj;
    }
    	//类型检测
	_.isArray = function(array) {
		return toString.call(array) === "[object Array]";
	}

    _.functions = function(obj) {
		var result = [];
		var key;
		for (key in obj) {
			result.push(key);
		}
		return result;
    }
    

	_.each = function(target, callback) {
		var key, i = 0;
		if (_.isArray(target)) {
			var length = target.length;
			for (; i < length; i++) {
				callback.call(target, target[i], i);
			}
		} else {
			for (key in target) {
				callback.call(target, key, target[key]);
			}
		}
	}


	// 在插件内部缓存外部的"_"引用,命名为outer_
	var outer_ = root._;

    // .....Underscore其他代码
    function rejectNaN(array) {
        if(toString.call(array) === "[object Array]"){
            var loop = array.length-1;
            while (loop>=0) {
                if(isNaN(array[loop])){
                    array.splice(loop, 1);
                }
                loop--;
            }
        }
    }
    //纯函数版本
    function rejectNaNFunction(source) {
        if(toString.call(source) === "[object Array]"){
            var array = [].concat(source);
            var loop = array.length-1;
            while (loop>=0) {
                if(isNaN(array[loop])){
                    array.splice(loop, 1);
                }
                loop--;
            }
            return array
        }
        return source;
    }

    _.rejectNaNFunction = rejectNaNFunction

	// 调用noConflict将全局"_"指向outer_, 并返回Underscore
	_.noConflict = function() {
		if ( window._ === _ ) {
			window._ = outer_;
		}

		return _;
    }
    
    	//mixin  
	_.mixin = function(obj) {
		_.each(_.functions(obj), function(name) {
			var func = obj[name];

			_.prototype[name] = function() {
				var args = [this._wrapped];
				push.apply(args, arguments);
				// instance      去重之后的结果
				return result(this, func.apply(this, args));
			}
		});
	}

	_.mixin(_);

	root._ = root.Underscore = _;

})(this);