<template>
    <div>
        <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
        >
            <el-menu-item index="1">添加背景图</el-menu-item>
            <el-submenu index="2-4">
                <template slot="title">添加组件</template>
                <el-menu-item index="2-4-1">marquee</el-menu-item>
                <el-menu-item index="2-4-2">download-app-list</el-menu-item>
                <el-menu-item index="2-4-3">download-app-btn</el-menu-item>
            </el-submenu>
            <el-menu-item index="3">添加路由</el-menu-item>
        </el-menu>
        <input type="file" name id accept="image/*" @change="getImages" />
        <button type="submit" @click="uploadImages">提交</button>
        <img :src="image" alt srcset />
    </div>
</template>

<script>
import { uploadImages } from "../api/";
import axios from "axios";
export default {
    name: "HelloWorld",
    data() {
        return {
            image: ""
        };
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
