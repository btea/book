<template>
    <div class="app">
        <div class="banner">
            <router-link class="route" v-for="path in routerData" :to="path.path" :key="path.path">{{path.name}}</router-link>
        </div>
        <router-view></router-view>
        <div class="change-box"></div>
        <div class="btn-box">按钮</div>
        <div class="download">下载</div>
        <wall-paper></wall-paper>
    </div>
</template>
<script>
import wallPaper from './components/wallPaper'
export default {
    components: {
        wallPaper
    },
    data(){
        return {
            routerData: [
                {path: '/', name: '默认路由'},
                {path: '/A', name: '这是路由A'},
                {path: '/B', name: '这是路由B'},
            ]
        }
    }
}
</script>
<style lang="scss" scoped>
    .app{
        @mixin radius($v){
            width: 200px;
            height: 40px;
            line-height: 40px;
            text-align: center;
            margin: 10px auto;
            border-radius: $v;
            background: #6cf;
            cursor: pointer;
            position: relative;
            color: #ffffff;
        }
        text-align: center;
        h1{
            text-align: center;
        }
        .banner{
            text-align: center;
            .route{
                margin: 0 20px;
                display: inline-block;
                height: 40px;
                line-height: 40px;
                text-decoration: none;
                position: relative;
                color: #000000;
                // &:link {color: #FF0000}
                // &:visited {color: #00FF00}
                // &:hover {color: #FF00FF}
                &::after{
                    content: '';
                    position: absolute;
                    left: 100%;
                    bottom: 0;
                    width: 0;
                    height: 2px;
                    background: aqua;
                    transition: all .2s linear;
                }
                &:hover::after{
                    left: 0;
                    width: 100%;
                }
            }
            .route:hover ~ .route::after{
                left: 0;
            }
        }
        .change-box{
            width: 200px;
            height: 200px;
            margin: auto;
            position: relative;
            background: aqua;
            &::before, &::after{
                content: '';
                position: absolute;
                top: -5px;
                right: -5px;
                bottom: -5px;
                left: -5px;
                z-index: -1;
                animation: move 5s linear infinite; 
            }
            &::before{
                background: #00FF00;
            }
            &::after{
                background: linear-gradient(rgb(102, 112, 255), rgb(102, 207, 255), rgb(102, 255, 230),rgb(102, 255, 127),rgb(209, 255, 102));;
                animation-delay: -2.5s;
            }
            &:hover::before,&:hover::after{
                animation-play-state: paused;
            }
            @keyframes move{
                0%, 100%{
                    clip: rect(0 210px 5px 0);
                }
                25%{
                    clip: rect(0 210px 210px 205px);
                }
                50%{
                    clip: rect(205px 210px 210px 0);
                }
                75%{
                    clip: rect(0 5px 210px 0);
                }
            }
        }

        .btn-box{
            @include radius(20px);
            &::after{
                content: '';
                position: absolute;
                top: 50%;
                left: 0;
                width: 0;
                height: 0;
                border-radius: 50%;
                box-shadow: 0 0 45px 24px #ffffff;
                animation: change 1.5s linear infinite;
            }
        }
        .btn{
            width: 200px;
            height: 40px;
            margin: 10px auto;
            border-radius: 20px;
            background: #6cf;
            cursor: pointer;
            position: relative;
            &::after{
            content: '';
                // background: linear-gradient(0deg,rgba(255, 255, 255, 0),rgba(255, 255, 255, 0.7),rgba(255, 255, 255, 0)); 
                // transform: skewx(-25deg);
                background: radial-gradient(circle at 30px 20px, #ffffff50, transparent); 
                transition: all .5s; 
                // transform: skewx(-25deg);
                width: 90px; 
                height: 90px; 
                position: absolute; 
                left: 0; 
                top: -50%;
                border-radius: 90px;
                animation: change 1.5s linear infinite;
            }
        }
        .download{
            @include radius(20px);
            &::after{
                content: '';
                position: absolute;
                height: 100%;
                width: 20px;
                left: 0;
                box-shadow: 0 0 10px 5px #ffffff30;
                background: #ffffff30;
                transform: skewX(-25deg);
                animation: change 1.5s infinite linear;
            }
        }
        @keyframes change{
            0%{
                left: 0;
            }
            49%{
                opacity: 1;
            }
            50%,100%{
                left: 100%;
                opacity: 0;
            }
        }
    }
</style>