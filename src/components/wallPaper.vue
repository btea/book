<template>
    <div class="wall-paper">
        <!-- <img src="/public/img/001.jpg" alt=""> -->
        <div class="paper" :class="'paper' + i" v-for="(link, i) in links" :key="link" :style="{backgroundImage: 'url(' + links[i] + ')'}"></div>
    </div>
</template>
<script>
import one from '../../public/img/001.jpg';
import two from '../../public/img/002.jpg';
import three from '../../public/img/003.jpg';
import four from '../../public/img/004.jpg';
import five from '../../public/img/005.jpg';

export default {
    data(){
        return {
            path: '/public/img/00',
            links: [one, two, three, four, five]
        }
    }
}
</script>
<style lang="scss" scoped>
    .wall-paper{
        position: absolute;
        width: 600px;
        height: 300px;
        right: 60px;
        top: 100px;
        background: aqua;
        border: 5px solid;
        border-image: linear-gradient(transparent, #00000070) 10;
        transform: perspective(200px) rotateY(-8deg) skewY(10deg) scale(.9);
        box-shadow: 6px 3px 10px 5px #00000050;
        // img{
        //     width: 100%;
        //     height: 100%;
        // }
        .paper{
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-size: cover;
            opacity: 0;
            transition: all 1s;
            animation: change 20s linear infinite;
        }
        .paper1{
            animation-delay: 4s;
        }
        .paper2{
            animation-delay: 8s;
        }
        .paper3{
            animation-delay: 12s;
        }
        .paper4{
            animation-delay: 16s;
        }
    }
    @keyframes change{
        0%, 20%, 100%{
            opacity: 1;
        }
        40%, 60%, 80%{
            opacity: 0;
        }
    }
</style>