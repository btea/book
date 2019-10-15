<template>
    <div class="wall-paper">

    </div>
</template>
<style lang="scss" scoped>
    .wall-paper{
        position: absolute;
        width: 600px;
        height: 300px;
        right: 100px;
        top: 100px;
        background: aqua;
        border: 5px solid;
        border-image: linear-gradient(transparent, #00000070) 10;
        transform: perspective(200px) rotateY(-8deg) skewY(10deg) scale(.9);
        box-shadow: 6px 3px 10px 5px #00000050;
    }
</style>