!function(){
    class Select{
        constructor(selector, context){

        }
        isEle(){
            return this.el instanceof HTMLElement;
        }
        on(event, cb){
            this.el.addEventListener(event, cb);
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
            cb();
        }
        animate(opt, delay, cb){
            if(this.isEle()){
                let el = this.el;
                delay && el.style.transition = `all ${delay}`;
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
        }
        loadJavaScript(opt){
            let script = document.createElement('script');
            script = opt.url || '';
            document.head.appendChild(script);
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
    }

    jQuery = function( selector, context ) {
        // The jQuery object is actually just the init constructor 'enhanced'
        // Need init if jQuery is called (just allow error to be thrown if not included)
        return new jQuery.fn.init( selector, context );
    }
}
