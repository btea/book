<template>
    <div class="app">
        <!-- <div class="banner">
            <router-link class="route" v-for="path in routerData" :to="path.path" :key="path.path">{{path.name}}</router-link>
        </div>
        <router-view></router-view> -->
        <div class="change-box"></div>
        <div class="btn"></div>
    </div>

</template>
<script>
export default {
    data(){
        return {
            routerData: [
                {path: '/', name: '默认模块'},
                {path: '/A', name: 'A'},
                {path: '/B', name: 'B'},
            ]
        }
    }
}
</script>
<style lang="less" scoped>
    .app{
        text-align: center;
        h1{
            text-align: center;
        }
        .banner{
            text-align: center;
            .route{
                margin: 0 20px;
                &:link {color: #FF0000}
                &:visited {color: #00FF00}
                &:hover {color: #FF00FF}
            }
        }
        .change-box{
            width: 200px;
            height: 200px;
            margin: auto;
            position: relative;
            background: aqua;
            --w: -5px;
            &::before, &::after{
                content: '';
                position: absolute;
                top: var(--w);
                right: var(--w);
                bottom: var(--w);
                left: var(--w);
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

        .btn{
            width: 200px;
            height: 40px;
            margin: 10px auto;
            border-radius: 20px;
            background: #6cf;
            cursor: pointer;
            position: relative;
        }
        .btn:after{
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
        @keyframes change{
            0%{
                left: 0;
            }
            50%,100%{
                left: 100%;
            }
        }
    }
</style>