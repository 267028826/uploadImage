<template>
  <van-panel
    :title="orderItem.Code"
    :status="orderItem.ServiceStatus"
  >
    <van-cell>
      <span>姓名:{{ orderItem.ContactName }}</span>
      <span>电话:{{ orderItem.Phone }}</span>
    </van-cell>
    <van-cell>
      <span>品牌:{{ orderItem.Brand }}</span>
      <span>型号:{{ orderItem.ProductModel }}</span>
    </van-cell>
    <van-cell>
      <span>SN:{{ orderItem.Sn }}</span>
    </van-cell>
    <van-cell>
      <span>{{ orderItem.ProductHitch }}</span>
    </van-cell>
    <div
      slot="footer"
      style="text-align:right"
    >
      <!-- <van-button
        size="small"
        type="danger"
        :to="{name: 'imageupload',params: {orderId: orderItem.Id}}"
      >上传图片</van-button> -->
      <van-button
        size="small"
        type="danger"
        @click="uploadClick(orderItem.Id)"
      >上传图片</van-button>
    </div>
  </van-panel>
</template>
<script>
export default {
  name: 'ServiceOrderItem',
  props: {
    orderItem: null
  },
  created () {},
  methods: {
    uploadClick: function (id) {
      this.$emit('uploadClick', id)
    },
    details: function (id) {
      this.$router.push({
        name: 'imageupload',
        params: {
          orderId: id
        }
      })
    }
  }
}
</script>
