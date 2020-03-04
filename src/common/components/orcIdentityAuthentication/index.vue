<!--这是所有页面的入口页，在这个页面进行判断跳转什么的，获取accessToken ,apiGateway 网关-->
<template>
    <div class="identityAuthentication">
        <NavHeader :title="title" :selfBack="true" @backPage="backPage"></NavHeader>
        <div class="header-box col flex-item-start flex-justify-start">
            <div class="title">
                请上传身份证
            </div>
            <div class="main-box row flex-item flex-justify">
                <div class="item col flex-item flex-justify-start">
                    <div class="item-top" @click="idCardFrontClicked" v-if="!identityInfo.idCardFrontPhoto">
                        <img src="~image/idCard/idCardFront.png" alt="">
                    </div>
                    <div class="item-top" v-else>
                        <img :src="identityInfo.idCardFrontPhoto" alt="">
                    </div>
                    <div class="item-bottom">
                        点击上传人面像
                    </div>
                </div>
                <div class="item col flex-item flex-justify-start">
                    <div class="item-top" @click="idCardBackClicked" v-if="!identityInfo.idCardBackPhoto">
                        <img src="~image/idCard/idCardBack.png" alt="">
                    </div>
                    <div class="item-top" v-else>
                        <img :src="identityInfo.idCardBackPhoto" alt="">
                    </div>
                    <div class="item-bottom">
                        点击上传人国徽面
                    </div>
                </div>
            </div>

        </div>
        <div class="error-hint-box col flex-item-start flex-justify-start">
            <div class="hint-title">
                错误提示
            </div>
            <div class="hint-container row flex-item flex-justify">
                <div class="hint-item col flex-item flex-justify-start">
                    <div class="hint-top">
                        <img src="~image/idCard/id_suc.png" alt="">
                    </div>
                    <div class="hint-bottom">
                        标准
                    </div>
                </div>

                <div class="hint-item col flex-item flex-justify-start">
                    <div class="hint-top">
                        <img src="~image/idCard/id_error1.png" alt="">
                    </div>
                    <div class="hint-bottom">
                        边框缺失
                    </div>
                </div>

                <div class="hint-item col flex-item flex-justify-start">
                    <div class="hint-top">
                        <img src="~image/idCard/id_error2.png" alt="">
                    </div>
                    <div class="hint-bottom">
                        照片模糊
                    </div>
                </div>

                <div class="hint-item col flex-item flex-justify-start">
                    <div class="hint-top">
                        <img src="~image/idCard/id_error3.png" alt="">
                    </div>
                    <div class="hint-bottom">
                        闪光强烈
                    </div>
                </div>

            </div>
        </div>

        <div class="submit" @click="handleSubmitEvent">
            确认提交
        </div>

        <idcard-comfirm @popInputChange="popInputChange"
                        @again="again"
                        @confirm="confirm"
                        :visible="identityFrontStatus"
                        :realName="identityInfo.realName"
                        :idNumber="identityInfo.idNumber"/>

    </div>
</template>

<script>
    import {
        idCardFrontInfoNew,
        idCardBackInfoNew,
        idCardORC
    } from '@/common/native/index'
    import NavHeader from '@/common/components/navHeader/index'  //导入公共的title
    import {validIDNumber, validName, validDate, validBirth} from '@/common/utils/idcardValidate' //导入省份证校验规则
    import IdcardComfirm from './idcardComfirm'
    import {API_KEY, API_SECRET} from '@/common/utils/nativeKey'
    export default {
        name: "identityAuthentication",
        data() {
            return {
                title: '身份认证',
                identityInfo: {
                    idCardFrontPhoto: '', // 身份证人像面
                    idFrontBase64: '',
                    idCardBackPhoto: '', // 身份证国徽面
                    idBackBase64: '', // 身份证国徽面
                    realName: '', // 真实姓名
                    idNumber: '', // 身份证号码
                    birth: '', // 生日
                    nation: '', // 民族
                    idAddress: '', // 地址
                    signOrg: '',
                    effectTime: '', // 身份证有效期
                    faceRecognition: '', // 身份证人脸识别
                    faceRecognitionSimilarity: '',
                    livingProvince: '',
                    livingCity: '',
                    livingDistrict: '',
                    livingAddress: '',
                    highestDegree: '',
                    maritalStatus: '',
                    facePic: '',
                    fileJson: {},
                    delta: ''
                },
                identityFrontStatus: false, //身份证 正面
                isCheckIdentityFront: false, //校验正面信息
                isCheckIdentityBack: false, //校验身份证背面
            }
        },
        created() {
        },
        components: {
            NavHeader,
            IdcardComfirm
        },
        methods: {
            backPage(){
                this.$emit('onBackPage');
            },
            // 确认无误 编辑姓名
            popInputChange(name) {
                this.identityInfo.realName = name
            },
            again() {
                // 重新扫描 不显示图片
                this.identityInfo.idCardFrontPhoto = '';
                this.identityInfo.idFrontBase64 = '';
                this.isCheckIdentityFront = false;
                this.identityFrontStatus = false;
            },
            confirm() {
                this.identityFrontStatus = false
            },
            // 身份证人像
            idCardFrontClicked() {
                idCardFrontInfoNew({
                    success: res => {
                        this.identityInfo.idCardFrontPhoto = `data:image/png;base64,${res.thumbnail}` // 身份证正面图片
                        this.identityInfo.idFrontBase64 = res.thumbnail; //身份证转换成base64;
                        // 用图片获取身份信息 正面  正面照和人脸抠图
                        this.checkIdCardFrontInfoFn(res.path)
                    },
                    error: err => {
                        this.$toast(err || '系统错误');
                        this.identityFrontStatus = false
                    }
                })
            },
            // 身份证国徽面
            idCardBackClicked() {
                let {idCardFrontPhoto} = this.identityInfo;
                // 如果未传身份证正面
                if (!idCardFrontPhoto) {
                    this.$toast('请先拍摄身份证正面！');
                    return false
                }
                idCardBackInfoNew({
                    success: res => {
                        this.identityInfo.idCardBackPhoto = `data:image/png;base64,${res.thumbnail}` // 身份证正面图片
                        this.identityInfo.idBackBase64 = res.thumbnail;
                        this.checkIdCardBackInfoFn(res.path);
                    },
                    error: err => {
                        console.log(err)
                    }
                })
            },
            // 身份证 正面 详细信息
            checkIdCardFrontInfoFn(path) {
                const dic = {
                    api_key: API_KEY,
                    api_secret: API_SECRET,
                    path
                }
                idCardORC(dic, {
                    success: (res) => {
                        console.log('显示身份证信息弹窗')
                        console.log(res)
                        // 显示身份证信息弹窗
                        const realName = res.name.result
                        const idNumber = res.idcard_number.result
                        const birth = `${res.birth_year.result}年${res.birth_month.result}月${res.birth_day.result}日`
                        const nation = res.nationality.result
                        const idAddress = res.address.result
                        if (!validName(realName) || !validIDNumber(idNumber) || !validBirth(birth)) {
                            this.identityInfo.idCardFrontPhoto = "";
                            this.identityInfo.idFrontBase64 = "";
                            this.$toast('身份证信息无效，请重新扫描')
                            return false
                        }
                        // 获取身份证图片和身份证信息
                        this.identityInfo.realName = realName
                        this.identityInfo.idNumber = idNumber
                        this.identityInfo.birth = birth
                        this.identityInfo.nation = nation
                        this.identityInfo.idAddress = idAddress
                        this.identityFrontStatus = true
                        this.isCheckIdentityFront = true;
                    },
                    error: (err) => {
                        this.$toast('身份证信息无效，请重新扫描');
                        this.identityInfo.idCardFrontPhoto = "";
                        this.identityInfo.idFrontBase64 = "";
                        this.isCheckIdentityFront = false;
                        console.log(err)
                    }
                })
            },
            // 身份证 反面 详细信息
            checkIdCardBackInfoFn(path) {
                const dic = {
                    api_key: API_KEY,
                    api_secret: API_SECRET,
                    path
                }
                idCardORC(dic, {
                    success: (res) => {
                        const signOrg = res.issued_by.result
                        const effectTime = `${res.valid_date_start.result}-${res.valid_date_end.result}`
                        // if (!validDate(effectTime)) {
                        //     this.identityInfo.idCardBackPhoto="";
                        //     this.$toast('身份证有效期无效，请重新扫描！')
                        //     return
                        // }
                        this.identityInfo.signOrg = signOrg; // 签发机关
                        this.identityInfo.effectTime = effectTime;
                        this.isCheckIdentityBack = true;
                    },
                    error: (err) => {
                        this.identityInfo.idCardBackPhoto = "";
                        this.identityInfo.idBackBase64 = "";
                        this.isCheckIdentityBack = false;
                        this.$toast(err || '系统错误');
                    }
                })
            },
            async handleSubmitEvent() {
                let {idCardFrontPhoto, idCardBackPhoto, idFrontBase64, idBackBase64} = this.identityInfo;
                if (!idCardFrontPhoto || !idCardBackPhoto || !idFrontBase64 || !idBackBase64) {
                    this.$toast('请先选择身份证信息！')
                    return false
                }
                ;
                if (!this.isCheckIdentityFront || !this.isCheckIdentityBack) {
                    this.$toast('身份证信息不合法，请重新上传')
                    return false
                }
                ;
                let {effectTime, idAddress, signOrg} = this.identityInfo;
                if (!effectTime || !idAddress || !signOrg) {
                    this.$toast('身份信息不全，请重新上传');
                    return false;
                }
                ;

                let userInfo = {
                    effectTime,
                    idAddress,
                    signOrg,
                    idFront: idFrontBase64,
                    idBack: idBackBase64
                };
                this.$emit('onGetIdCardInfo',{idCardFrontFile:idFrontBase64,idCardBackFile:idBackBase64});
            }
        }
    }
</script>

<style scoped lang="scss">
    .header-box {
        width: 100%;
        height: 336px;
        background: $white;
        margin-top: 25px;

        .title {
            margin-top: 30px;
            font-size: 30px;
            font-family: PingFang SC;
            font-weight: 500;
            color: $color-3;
            padding-left: 30px;
        }
    }

    .main-box {
        margin-top: 24px;
        width: 100%;

        .item {
            width: 275px;
            height: 220px;

            &:first-of-type {
                margin-right: 12px;
            }

            .item-top {
                width: 275px;
                height: 168px;
                overflow: hidden;

                img {
                    display: block;
                    width: 100%;
                    height: 100%;
                }
            }

            .item-bottom {
                margin-top: 16px;
                font-size: 26px;
                font-family: PingFang SC;
                font-weight: 400;
                color: $color-6;
            }
        }
    }

    .error-hint-box {
        margin-top: 20px;
        width: 100%;
        height: 280px;
        background: $white;

        .hint-title {
            margin-top: 30px;
            padding-left: 30px;
            font-size: 30px;
            font-family: PingFang SC;
            font-weight: 500;
            color: $color-3;
        }

        .hint-container {
            margin-top: 30px;
            width: 100%;
            height: 160px;

            .hint-item {
                width: 125px;
                height: 160px;
                margin-right: 19px;

                &:last-of-type {
                    margin-right: 0;
                }

                .hint-top {
                    width: 125px;
                    height: 107px;
                    overflow: hidden;

                    img {
                        display: block;
                        width: 100%;
                        height: 100%;
                    }
                }

                .hint-bottom {
                    margin-top: 11px;
                    font-size: 26px;
                    font-family: PingFang SC;
                    font-weight: 400;
                    color: $color-6;
                }
            }

        }
    }

    .submit {
        margin-top: 49px;
        margin-left: 30px;
        width: 580px;
        height: 80px;
        line-height: 80px;
        background: #0A81FB;
        border-radius: 40px;

        font-size: 30px;
        font-family: PingFang SC;
        font-weight: 500;
        color: $white;

        text-align: center;
    }

</style>
