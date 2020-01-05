<template>
    <div>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
            <el-menu-item index="1">添加背景图</el-menu-item>
            <el-submenu index="2-4">
                <template slot="title">添加组件</template>
                <el-menu-item index="2-4-1">marquee</el-menu-item>
                <el-menu-item index="2-4-2">download-app-list</el-menu-item>
                <el-menu-item index="2-4-3">download-app-btn</el-menu-item>
            </el-submenu>
            <el-menu-item index="3">添加路由</el-menu-item>
            <el-submenu index="4-4">
                <template slot="title">切换路由</template>
                <el-menu-item index="4-4-1">home</el-menu-item>
                <el-menu-item index="4-4-2">award</el-menu-item>
                <el-menu-item index="4-4-3">rule</el-menu-item>
            </el-submenu>
        </el-menu>
        <Home />
        <input type="file" name id accept="image/*" @change="getImages" />
        <button type="submit" @click="uploadImages">提交</button>
        <img :src="image" alt srcset />
    </div>
</template>

<script>
import { uploadImages } from "../api/";
import Home from "../../template/views/home.vue";
import axios from "axios";
export default {
    name: "HelloWorld",
    components: {
        Home
    },
    data() {
        return {
            image: "",
            activeIndex: "0"
        };
    },
    created() {
        this.createElement();
    },
    methods: {
        async uploadImages() {
            let res = await uploadImages();
            /* eslint-disable*/
            console.log(res);
        },
        async getImages(e) {
            let image = e.target.files[0];
            let formData = new FormData();
            formData.append("image", image);
            axios({
                url: "/api",
                method: "post",
                data: formData,
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }).then(res => {
                /* eslint-disable*/
                console.log(res);
                this.image = res.data;
            });
        },
        createElement() {
            /* eslint-disable*/
            console.log("zhixingdam");
            let body = document.querySelector("body");
            let div;
            let top11;
            let left11;
            let top1;
            let left1;
            body.onmousedown = () => {
                div = document.createElement("div");
                body.appendChild(div);
                top11 = event.y;
                left11 = event.x;
                div.style.cssText += `
                    position: absolute;
                    top: ${top11}px;
                    left: ${left11}px;
                    background: rgba(0, 0, 0, .7);`;
                body.onmousemove = () => {
                    top1 = event.y;
                    left1 = event.x;
                    div.style.cssText += `
                        width: ${left1 - left11}px;
                        height: ${top1 - top11}px;`;
                };
            };
            body.onmouseup = () => {
                body.onmousemove = null;
            };
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
    margin: 40px 0 0;
}
ul {
    list-style-type: none;
    padding: 0;
}
li {
    display: inline-block;
    margin: 0 10px;
}
a {
    color: #42b983;
}
</style>
