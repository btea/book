(function(){
    class Select{
        constructor(selector, context){
            if(selector === document || selector === window){
                this.el = selector;
            }
            if(typeof selector === 'string'){
                this.el = document.querySelectorAll(selector)[0];
            }
        }
        isEle(){
            return this.el instanceof HTMLElement || this.el === document || this.el === window;
        }
        on(event, cb){
            if(event === 'load'){
                window.onload = cb;
            }else{
                if(this.el === document && typeof cb !== 'function'){
                    let el = document.querySelectorAll(cb)[0];
                    el.addEventListener(event, cb);
                }else{
                    this.el.addEventListener(event, cb);
                }
            }
        }
        show(){
            if(this.isEle()){
                this.el.style.display = 'block';
            }
            return this;
        }
        hide(){
            if(this.isEle()){
                this.el.style.display = 'none';
            }
            return this;
        }
        click(cb){
            if(!cb){
                this.el.dispatchEvent(this.createEvent('click'));
            }else{
                this.el.addEventListener('click', cb);
            }
            return this;
        }
        mousemove(cb){
            this.el.addEventListener('mousemove', cb);
            // this.el.dispatchEvent(this.createEvent('mousemove'));
            return this;
        }
        keydown(cb){
            this.el.addEventListener('keydown', cb);
            // this.el.dispatchEvent(this.createEvent('keydown'));
            return this;
        }
        createEvent(name){
            let event = document.createEvent('Event');
            event.initEvent(name, true, true);
            return event;
        }
        html(str){
            if(this.isEle){
                if(!str){
                    return this.el.innerHTML;
                }
                this.el.innerHTML = str;
                return this;
            }
        }
        animate(opt, delay, cb){
            if(this.isEle()){
                let el = this.el;
                delay && (el.style.transition = `all ${delay}`);
                Object.keys(opt).map(key => {
                    let v = opt[key];
                    if(typeof v === 'number'){
                        v += 'px';
                    }
                    el.style[key] = v;
                });
                cb && cb();
            }
            return this;
        }
        stop(){
            this.el.style.transition = '';
            return this;
        }
        append(v){
            if(this.isEle()){
                if(typeof v === 'string'){
                    let html = this.el.innerHTML;
                    html += v;
                    this.el.innerHTML = html;
                }
                if(v instanceof HTMLElement){
                    this.el.appendChild(v);
                }
            }
        }
        ajax(opt = {}){
            let type = opt.dataType;
            if(type === 'script'){
                this.loadJavaScript(opt);
            }
            if(type === 'json'){
                this.requestData(opt);
            }
        }
        loadJavaScript(opt){
            let script = document.createElement('script');
            script = opt.url || '';
            document.head.appendChild(script);
        }
        requestData(opt){
            let xhr = new XMLHttpRequest();
            xhr.open(opt.type || 'get', opt.url);
            xhr.responseType = opt.dataType;
            xhr.onreadystatechange = () => {
                if(xhr.readyState === 4 && xhr.status === 200){
                    let result = JSON.stringify(xhr.response);
                    opt.success(result);
                }
            };
            xhr.send();
        }
        getJSON(url, cb){
            let xhr = new XMLHttpRequest();
            xhr.open('get', url);
            xhr.onreadystatechange = () => {
                if(xhr.readyState === 4 && xhr.status === 200){
                    let result = JSON.stringify(xhr.response);
                    cb(result);
                }
            };
            xhr.send();
        }
        each(list, cb){
            for(let i = 0; i < list.length; i++){
                cb(i, list[i], list);
            }
        }
        fadeTo(time, opacity, cb){
            if(this.isEle()){
                this.el.style.opacity = opacity;
                this.el.style.transitionTime = `${time}ms`;
                if(cb){
                    setTimeout(cb, time);
                }
            }
        }
        is(status){
            if(this.isEle()){
                if(status === ':hidden'){
                    return this.getStyle(this.el, 'display') === 'none';
                }
            }
        }
        getStyle(el, attr){
            window.getComputedStyle(el, null)[attr];
        }
        attr(name, val){
            if(this.isEle()){
                if(!val){
                    return this.el.getAttribute(name);
                }
                this.el.setAttribute(name, val);
                return this;
            }
        }
        css(opt, v){
            if(this.isEle()){
                if(typeof opt === 'object'){
                    let el = this.el;
                    for(let key in opt){
                        el.style[key] = opt[key];
                    }
                }else{
                    this.el[opt] = v;
                }
                return this;
            }
        }
        hover(inFunction, outFunction){
            if(this.isEle()){
                this.el.addEventListener('mouseenter', inFunction);
                this.el.addEventListener('mouseleave', outFunction);
                return this;
            }
        }
    }
    var $;
    $ = window.$ = jQuery = function( selector, context ) {
        // The jQuery object is actually just the init constructor 'enhanced'
        // Need init if jQuery is called (just allow error to be thrown if not included)
        return new Select( selector, context );
    }
    $.getJSON = (url, cb) => {
        let xhr = new XMLHttpRequest();
        xhr.open('get', url);
        xhr.onreadystatechange = () => {
        if(xhr.readyState === 4 && xhr.status === 200){
            let result = JSON.stringify(xhr.response);
            cb(result);
        }
        };
        xhr.send();
    };
    $.each = function each(list, cb){
        if(!list){return}
        for(let i = 0; i < list.length; i++){
            cb(i, list[i], list);
        }
    }
})();
