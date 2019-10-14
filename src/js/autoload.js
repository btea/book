
import '@/css/waifu';
//加载waifu.css
// $("<link>").attr({ href: live2d_path + "waifu.css", rel: "stylesheet" }).appendTo("head");

import '@/js/live2d.min';
//加载live2d.min.js
// $.ajax({
	// url: live2d_path + "live2d.min.js",
	// dataType: "script",
	// cache: true
// });

import '@/js/waifu-tips';
//加载waifu-tips.js
// $.ajax({
	// url: live2d_path + "waifu-tips.js",
	// dataType: "script",
	// cache: true
// });

class Drag{
  constructor(el, point){
      /**
       * @params el 需要拖拽移动的元素
       * @params point 只允许拖拽的区域，若未传有效值，则整个元素均为可拖拽区域
       * 
      */
      this.status = false;
      this.x = 0; // mousedown事件触发时初始x值
      this.y = 0; 
      this.tx = 0; // 元素目前已经移动的x轴方向距离
      this.ty = 0; 
      this.vx = 0; // mousemove事件触发时x轴方向的移动的真实值
      this.vy = 0;
      this.pro = Object.prototype;
      this.initElement(el, point);
  }
  initElement(el, point){
      this.el = this.getElement(el);
      this.point = this.getElement(point);
      this.elementEvent();
      
      this.initLimit(this.el);
  }
  getElement(el){
      if(!el){return}
      if(el instanceof Element){
          return el;
      }
      if(typeof el === 'string'){
          return document.querySelectorAll(el)[0];
      }
      if(el[0] instanceof Element){
          return this.getElement(el[0]);
      }
      return void 0;
  }
  elementEvent(){
      let el;
      el = this.point || this.el;
      el.addEventListener('mousedown', (e) => {
          this.x = e.pageX;
          this.y = e.pageY;
          this.status = true;
      });
      document.addEventListener('mouseup', () => {
          this.status = false;
          this.tx = this.vx;
          this.ty = this.vy;
      });
      document.addEventListener('mousemove', (e) => {
          if(this.status){
              this.elementMove(e);
              // this.throttle(this.elementMove, 100, e)();
          }
      })
  }
  elementMove(e){
      let $x = e.pageX;
      let $y = e.pageY;
      this.vx = this.tx + $x - this.x;
      this.vy = this.ty + $y - this.y;
      // 禁止拖拽至视图区域外
      this.limit();

      this.el.style.transform = `translateX(${this.vx}px) translateY(${this.vy}px)`;
  }
  limit(){
    if(this.vx <= 0){
      this.vx = 0;
    }
    if(this.vx >= this.maxW - this.width){
      this.vx = this.maxW - this.width;
    }
    if(this.vy >= 0){
      this.vy = 0;
    }
    if(Math.abs(this.vy) > this.maxH - this.height){
      this.vy = -(this.maxH - this.height);
    }
  }
  initLimit(el){
    let w, h;
    w = parseInt(this.getStyle(el, 'width'));
    h = parseInt(this.getStyle(el, 'height'));
    this.width = w;
    this.height = h;
    this.maxW = window.innerWidth;
    this.maxH = window.innerHeight;
  }
  getStyle(el, attr){
    return window.getComputedStyle(el, null)[attr];
  }
  throttle(fn, t, e){
      let timer;
      return () => {
          if(timer){
              clearTimeout(timer);
          }
          timer = setTimeout(() => {
              fn.call(this, e)
          }, t);
      }
  }
}

if(!document.querySelector('#waifu')){
  setTimeout(() => {
    new Drag(document.querySelector('#waifu'));
  }, 2000)
}

console.log(`%c
  く__,.ヘヽ.        /  ,ー､ 〉
           ＼ ', !-─‐-i  /  /´
           ／｀ｰ'       L/／｀ヽ､
         /   ／,   /|   ,   ,       ',
       ｲ   / /-‐/  ｉ  L_ ﾊ ヽ!   i
        ﾚ ﾍ 7ｲ｀ﾄ   ﾚ'ｧ-ﾄ､!ハ|   |
          !,/7 '0'     ´0iソ|    |
          |.从"    _     ,,,, / |./    |
          ﾚ'| i＞.､,,__  _,.イ /   .i   |
            ﾚ'| | / k_７_/ﾚ'ヽ,  ﾊ.  |
              | |/i 〈|/   i  ,.ﾍ |  i  |
             .|/ /  ｉ：    ﾍ!    ＼  |
              kヽ>､ﾊ    _,.ﾍ､    /､!
              !'〈//｀Ｔ´', ＼ ｀'7'ｰr'
              ﾚ'ヽL__|___i,___,ンﾚ|ノ
                  ﾄ-,/  |___./
                  'ｰ'    !_,.:
`, `color: aqua;`);