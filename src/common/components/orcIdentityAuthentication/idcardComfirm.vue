<template>
    <div class="informationPop" v-if="visible">
        <div class="pop-content">
            <div class="pop-body">
                <h3 class="pop-title">请核对身份证信息</h3>
                <p class="pop-note">如有错误请重新扫描</p>
                <p class="pop-note-red">如有错误请重新扫描</p>
                <ul class="content">
                    <li class="item">
                        <span class="item-note">真实姓名：</span>
                        <!--            <div class="input-bar" v-if="isEdit">-->
                        <!--              <input type="text" class="input" v-model.trim="selfRealName" @focus="inputFn('focus')" @blur="inputFn('blur')"/>-->
                        <!--            </div>-->
                        <!--            <div class="input-bar" v-else>-->
                        <div class="input-bar">
                            <!--              <img class="edit-icon" src="~@/image/idCard/name-edit.png" @click="changeEdit"/>-->
                            <span class="input">{{realName}}</span>
                        </div>

                    </li>
                    <li class="item">
                        <span class="item-note">身份证号：</span>
                        <span class="name">{{idNumber}}</span>
                    </li>
                </ul>
            </div>
            <div class="pop-foot">
                <div class="again btn" @click="again">重新扫描</div>
                <span class="line"></span>
                <div class="confirm btn" @click="confirm">确认无误</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'idcardComfirm',
        data () {
            return {
                isEdit: false,
                selfRealName: ''
            }
        },
        props: {
            visible: {
                type: Boolean,
                default: false
            },
            realName: {
                type: String,
                default: ''
            },
            idNumber: {
                type: String,
                default: ''
            }
        },
        methods: {
            inputFn (type) {
                window.scrollTo(0, 0)
                if (type === 'blur') {
                    const selfRealName = this.selfRealName
                    this.$emit('popInputChange', selfRealName)
                    setTimeout(() => { this.isEdit = false }, 100)
                } else {
                    this.selfRealName = ''
                }
            },
            changeEdit () {
                this.isEdit = true
            },
            // 从新扫描
            again () {
                this.$emit('again')
            },
            confirm () {
                this.$emit('confirm')
            }
        }
    }
</script>

<style scoped lang="scss">
    .informationPop {
        position: fixed;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        background: rgba(0,0,0,0.5);
        z-index: 100;
        .pop-content{
            position: absolute;
            width: 540px;
            border-radius: 8px;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
            background-color: #fff;
            box-sizing: border-box;
            .pop-body{
                padding: 30px;
                border-bottom: 1px solid #ccc;
                .pop-title{
                    text-align: center;
                    line-height: 1.5;
                    font-size: 36px;
                    font-weight: bold;
                    color: #333;
                }
                .pop-note{
                    text-align: center;
                    line-height: 1.5;
                    font-size: 26px;
                    color: #999;
                }
                .pop-note-red{
                    text-align: center;
                    line-height: 1.5;
                    font-size: 36px;
                    font-weight: bold;
                    color: #f00;
                    margin-bottom: 20px;
                }
                .content{
                    .item{
                        display: flex;
                        margin-bottom: 25px;
                        .item-note{
                            line-height: 40px;
                            font-size: 26px;
                            color: #333;
                            margin-right: 20px;
                        }
                        .input-bar{
                            flex: 1;
                            position: relative;
                            .edit-icon{
                                position: absolute;
                                right:10px;
                                top:8px;
                                height: 24px;
                            }
                            .input{
                                border: none;
                                outline: none;
                                width: 100%;
                                line-height: 40px;
                            }
                        }
                        .name{
                            line-height: 40px;
                            font-size: 26px;
                            color: #333;
                            margin-right: 20px;
                        }
                    }
                }
            }
            .pop-foot{
                display: flex;
                .btn{
                    flex: 1;
                    text-align: center;
                    line-height: 80px;
                    font-size: 30px;
                    color:#333;
                    &.confirm{
                        color: $primary;
                    }
                }
                .line{
                    width: 1px;
                    background-color: #ccc;
                    height: 80px;
                }
            }
        }
    }
</style>
