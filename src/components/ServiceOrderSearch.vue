<template>
  <div>
    <van-search
      v-model="queryString"
      ref='search'
      placeholder="请输入工单号/手机号/客户姓名"
      show-action
      shape="round"
      @search="query"
    >
      <div
        slot="action"
        @click="query"
      >搜索</div>
    </van-search>
    <service-order-item
      v-for="order in orderList"
      :key="order.Id"
      :order-item="order"
      @uploadClick="showPopup"
    ></service-order-item>
    <van-popup
      :overlay="false"
      v-model="show"
      :lazy-render="true"
      position="top"
      closeable
      close-icon="close"
      close-icon-position="top-left"
      :style="{ height: '100%', width: '100%' }"
      transition="bounce"
    >
      <van-nav-bar
        title="图片上传"
        @click-left="onClickLeft"
      >
        <van-icon
          name="cross"
          slot="left"
        />
      </van-nav-bar>
      <popup-image-upload
        v-if="show"
        :order-id="uploadOrderId"
      />
    </van-popup>
  </div>
</template>
<script>
import { queryApi } from '../api/OrderOperate'
import ServiceOrderItem from './ServiceOrderItem'
import PopupImageUpload from './PopupImageUpload'
export default {
  name: 'ServiceOrderSearch',
  data () {
    return {
      queryString: '',
      orderList: [],
      show: false,
      uploadOrderId: 5
    }
  },
  components: {
    'service-order-item': ServiceOrderItem,
    'popup-image-upload': PopupImageUpload
  },
  methods: {
    query: function () {
      console.log(this.$refs.search)
      var queryString = this.queryString
      if (queryString === null || queryString.trim() === '') {
        this.$toast('输入查询条件2')
        return
      }
      queryApi(queryString).then(response => {
        if (response.status === 200) {
          if (response.data.success) {
            if (response.data.data.length > 0) {
              this.orderList = response.data.data
            } else {
              this.$toast('未查找到相应工单')
            }
          } else {
            this.$toast(response.data.text)
          }
        }
      })
    },
    details: function (id) {
      this.$router.push({
        name: 'imageupload',
        params: {
          orderId: id
        }
      })
    },
    onClickLeft: function () {
      this.show = false
      this.uploadOrderId = null
    },
    showPopup (id) {
      this.show = true
      this.uploadOrderId = id
    }
  }
}
</script>
<style scoped>
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-out 0.5s;
}
@keyframes bounce-in {
  0% {
    transform: scale(0.7);
    opacity: 0.3;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
@keyframes bounce-out {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
