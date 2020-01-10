<template>
    <div class="">
        <header class="header">
            <el-menu :default-active="elActiveIndex" class="el-menu-demo" mode="horizontal">
                <el-menu-item index="0">创建新活动</el-menu-item>
                <el-submenu index="1-4">
                    <template slot="title">切换路由</template>
                    <el-menu-item index="1-4-1">home</el-menu-item>
                    <el-menu-item index="1-4-2">award</el-menu-item>
                    <el-menu-item index="1-4-3">rule</el-menu-item>
                </el-submenu>
                <el-menu-item index="2" @click="changeBg">更换背景图</el-menu-item>
                <input type="file" name="" id="" style="display:none;" @change="updatePage" ref="upload-image">
                <el-menu-item index="3">添加路由</el-menu-item>
                <el-menu-item index="4" @click="uploadVnodeList">保存</el-menu-item>
                <el-menu-item index="5">预览</el-menu-item>
            </el-menu>
        </header>
        
        <div class="page" @mousedown.self="mousedown" @mouseup.self="mouseup" :style="page.style">
            <div class="click-area"
                v-for="(vnode, index) in vnodeList"
                :href="vnode.href"
                :style="vnode.style"
                :class="{'active': activeIndex === index }"
                :data-index="index"
                :key="index"
                @click.stop="setArea">
            </div>
        </div>
        
        <section class="card" @mouseenter="showCard" ref="card">
            <el-card>
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="tag" v-if="form.tag">
                    <el-select v-model="form.tag" placeholder="请选择">
                        <el-option label="marquee-vertical" value="marquee-vertical"></el-option>
                        <el-option label="marquee-horizontal" value="marquee-horizontal"></el-option>
                        <el-option label="download-app-list" value="download-app-list"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="key" v-for="(key, index) in filteredForm" :key="index">
                    <el-input v-model="form[key]"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="updateCard">更新</el-button>
                    <el-button type="danger" @click="deleteCard" v-if="activeIndex !== null">删除</el-button>
                </el-form-item>
            </el-form>
            </el-card>
        </section>
        
    </div>
</template>

<script>
import axios from "axios";
let target, startLeft, startTop, endLeft, endTop, targetLeft, targetTop, top, left, width = 0, height = 0, i = 0;
export default {
    name: "HelloWorld",
    components: {
    },
    computed: {
        filteredForm() {
            let keyList = Object.keys(this.form).filter(key => {
                return key !== 'component' && key !== 'style' && key !== 'id' && key !== 'tag';
            })
            return keyList;
        }
    },
    data() {
        return {
            page: (localStorage.page && JSON.parse(localStorage.page)) || {
                height: '100vh',
                bg: 'none'
            },
            elActiveIndex: '0',
            activeIndex: null,
            vnodeList: (localStorage.vnodeList && JSON.parse(localStorage.vnodeList)) || [],
            form: {}
        }
    },
    methods: {
        showPageCard() {
            this.activeIndex = null;
            this.form = this.page;
            this.showCard();
        },
        changeBg() {
            let input = this.$refs['upload-image'];
            input.click();
        },
        showCard() {
            let target = this.$refs['card'];
            target.style.left = '0';
        },
        hideCard() {
            let target = this.$refs['card'];
            target.style.left = '-300px';
        },
        async updatePage(e) {
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
                let image = new Image();
                image.src = res.data;
                let page = {};
                if (image.complete) {
                    page.bg = res.data;
                    page.height = image.height;
                    page.style = `background-image: url(${res.data});height: ${image.height}px`
                    this.page = page;
                } else {
                    image.onload = () => {
                        page.bg = res.data;
                        page.height = image.height;
                        page.style = `background-image: url(${res.data}); height: ${image.height}px`
                        this.page = page;
                    }
                }
                
            });
        },
        deleteCard() {
            //注意，由于vue渲染机制，必须使用新的数组替换原来的
            this.vnodeList.splice(this.activeIndex, 1, {});
            this.activeIndex = null;
            this.hideCard();
        },
        updateCard() {
            let activeIndex = this.activeIndex;

            // 设置页面背景和高度
            if (activeIndex === null) {
                this.page = this.form;
                return;
            }
            this.vnodeList.splice(this.activeIndex, 1, this.form);
            this.hideCard();
        },
        setArea(e) {
            this.showCard();
            let activeIndex = e.currentTarget.dataset.index;
            this.activeIndex = +activeIndex;
            this.form = this.vnodeList[activeIndex];
        },
        mousedown(e) {
            target = e.currentTarget;
            let position = target.getBoundingClientRect();
            targetLeft = position.x;
            targetTop = position.y;
            startTop = event.y;
            startLeft = event.x;
            top = startTop - targetTop;
            left = startLeft - targetLeft
            this.vnodeList.push({
                tag: '请选择',
                id: i,
                href: 'http://www.oppo.com',
                style:  `top: ${top}px; left: ${left}px;`,
                top,
                left
            })
            target.onmousemove = () => {
                endTop = event.y;
                endLeft = event.x;
                width = endLeft - startLeft;
                height = endTop - startTop;
                this.vnodeList[i].style = `top: ${top}px; left: ${left}px; width: ${width}px; height: ${height}px`
            }
        },
        mouseup() {
            target.onmousemove = null;
            if (width <= 0 || height <= 0) {
                this.vnodeList.pop();
                this.showPageCard();
                return;
            }
            this.vnodeList[i].width = width;
            this.vnodeList[i].height = height;
            this.activeIndex = i;
            this.form = this.vnodeList[i];
            this.showCard();
            width = 0;
            height = 0;
            i++;
        },
        uploadVnodeList() {
            console.log(this.vnodeList);
            let vnodeList = this.vnodeList.filter(vnode => {
                return vnode.tag && vnode.style;
            })
            vnodeList.forEach(vnode => {
                let strList = vnode.tag.match(/-[a-z]{1}/g);
                vnode.component = vnode.tag;
                strList.forEach(str => {
                    let bigLetter = str.split('-')[1].toUpperCase();
                    vnode.component = vnode.component.replace(str, bigLetter);
                })
            })
            let data = {
                page: JSON.stringify(this.page),
                vnodeList: JSON.stringify(vnodeList)
            }
            axios({
                url: "/api",
                method: 'post',
                data
            }).then(res => {
                localStorage.page = JSON.stringify(this.page);
                localStorage.vnodeList = JSON.stringify(this.vnodeList);
            })
        },
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header {
    position: fixed;
    top: 0;
    left: 0;
    box-sizing: border-box;
    width: 100%;
    height: 81px;
    padding-bottom: 20px;
    z-index: 99;
    background: #fff;
}
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
.page {
    position: relative;
    max-width: 1080px;
    margin: 81px auto 0;
    background: #42b983;
    min-height: 100vh;
    background-size: cover;
}
.click-area {
    background: rgba(0, 0, 0, .7);
    position: absolute;
}
.click-area.active {
    background: rgba(255, 255, 255, .7)
}
.card {
    position: fixed;
    top: 50%;
    left: -300px;
    transform: translateY(-50%);
    width: 300px;
    text-align: left;
    transition: all .3s ease;
}
.card input {
    display: block;
}
.card img {
    display: block;
    max-height: 60px;
}
.card h3 {
    display: block;
    margin: 10px auto;
}
.card .item {
    margin: 20px auto;
}
</style>
