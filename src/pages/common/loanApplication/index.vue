<template>
  <div>
    <NavHeader :title="NavHeader.title" :backApp="true"></NavHeader>
    <div class="loan-channel">
      {{loan_channel}}
    </div>
    <div class="loan-panel">
      <h5 class="loan-panel-title">预计最高可借金额</h5>
      <div class="loan-money">
        <span class="loan-yang">￥</span>
        <span>200000</span>
      </div>
    </div>
    <div class="title">补充资料以继续申请</div>
    <div class="loan-card-detail hairlines flex flex-item flex-justify-between">
      <div class="cardName flex flex-item flex-justify">
        银行卡验证
      </div>
      <div class="no-perfect-Info perfect-info" style="position: relative;" @click="handleSelectBankEvent">

       请选择<i class="icon-youjiantou iconfont"></i>

      </div>
    </div>
    <div class="loan-card-detail hairlines flex flex-item flex-justify-between">
      <div class="cardName flex flex-item flex-justify">
        身份信息验证
      </div>
      <div class="no-perfect-Info perfect-info" style="position: relative;
            ">
        请补充<i class="icon-youjiantou iconfont"></i>

      </div>
      <div class="cardName flex flex-item flex-justify">
        申请验证
      </div>
      <div class="no-perfect-Info perfect-info" style="position: relative;
            ">
        请确认<i class="icon-youjiantou iconfont"></i>

      </div>
    </div>
    <div style="margin-top: 10px">
      <span class="meet-a-problem">申请遇到问题？</span>
    </div>
    <div class="submit-btn">
      <span>提交借款申请</span>
    </div>
    <BankPicker :isShow="BankPicker.isShow" :columns="BankPicker.columns" @onCancel="BankPicker.onCancel"></BankPicker>
  </div>
</template>
<script>
    import NavHeader from '@/common/components/navHeader/index'  //导入公共的title
    import BankPicker from '@/components/bankPicker/index'
    export default {
        name: 'loanApplication',
        components: {
            NavHeader,
            BankPicker
        },
        data() {
            return {
                NavHeader: {
                    title: '借款申请'
                },
                loan_channel: '推荐至 ',
                BankPicker:{
                    isShow:false,
                    columns:['杭州', '宁波', '温州', '嘉兴', '湖州'],
                    onCancel:()=>{
                        this.BankPicker.isShow=false;
                    }
                }
            }
        },
        methods: {
            // 0 失败页面 1 申请页面 2 申请成功页面
            async handleSubmitEvent(){
            },
            handleIssueEvent(){

            },
            handleSelectBankEvent(){
                this.BankPicker.isShow=true;

            }
        },
        created() {

        },
        destroyed() {

        }
    }
</script>
<style scoped lang="scss">
  .loan-channel {
    font-size: 24px;
    color: $color-9;
    width: 100%;
    height: 78px;
    line-height: 78px;
    text-align: center;
  }

  .loan-panel {
    background-color: #fff;
    padding: 0px 30px;

    .t-right {
      text-align: right;
    }

    .loan-term {
      height: 71px;
      line-height: 71px;

      .ft24 {
        font-size: 24px;
      }

      .co-3 {
        color: #333;
      }
    }

    .loan-panel-title {
      font-size: 28px;
      font-weight: 500;
      color: #333;
      padding-top: 25px;
    }

    .loan-money {
      color: #0a81fb;
      font-size: 72px;
      font-weight: bold;
      margin-top: 36px;
      padding-bottom: 45px;

      .loan-yang {
        font-size: 36px;
        font-weight: bold;
      }
    }
  }
  .title{
    width: 100%;
    height: 80px;
    line-height: 80px;
    font-size: 24px;
    text-indent: 30px;
  }
  .loan-card-detail{
    width: 100%;
    height: 80px;
    background-color: $white;
    padding: 0 32px 0 32px;
    box-sizing: border-box;
    font-size: 26px;
  }
  .submit-btn {
    margin: 70px auto 0 auto;
    width: 590px;
    height: 80px;
    line-height: 80px;
    text-align: center;
    background-color: #0a81fb;
    color: #fff;
    font-size: 32px;
    border-radius: 10px;
  }
  .meet-a-problem {
    display: block;
    width: 200px;
    padding-left: 450px;
    padding-top: 10px;
    font-size: 26px;
  }
</style>
