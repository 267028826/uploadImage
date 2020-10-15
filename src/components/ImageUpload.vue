<template>
  <div>
    <van-tabs
      v-model="active"
      sticky
    >
      <van-tab title="维修前">
        <div class="pictureForm">
          <van-uploader
            v-model="before_repair"
            :before-read="beforeRead"
            @delete="deletePicture"
            :max-size="fileSize"
            @oversize="oversize"
            :max-count="maxFileCount"
            multiple
          />
          <van-cell-group>
            <van-button
              @click="uploadPicture('before_repair')"
              size="large"
              type="primary"
              class="pictureButton"
            >上传图片(1)</van-button>
          </van-cell-group>
        </div>
      </van-tab>
      <van-tab title="维修前拆机">
        <div class="pictureForm">
          <van-uploader
            v-model="before_repair_part"
            :before-read="beforeRead"
            @delete="deletePicture"
            :max-size="fileSize"
            @oversize="oversize"
            :max-count="maxFileCount"
            multiple
          />
          <van-cell-group>
            <van-button
              @click="uploadPicture('before_repair_part')"
              size="large"
              type="primary"
              class="pictureButton"
            >上传图片(2)</van-button>
          </van-cell-group>
        </div>
      </van-tab>
      <van-tab title="维修后">
        <div class="pictureForm">
          <van-uploader
            v-model="after_repair"
            :before-read="beforeRead"
            @delete="deletePicture"
            :max-size="fileSize"
            @oversize="oversize"
            :max-count="maxFileCount"
            multiple
          />
          <van-cell-group>
            <van-button
              @click="uploadPicture('after_repair')"
              size="large"
              type="primary"
              class="pictureButton"
            >上传图片(3)</van-button>
          </van-cell-group>
        </div>
      </van-tab>
      <van-tab title="发票">
        <div class="pictureForm">
          <van-uploader
            v-model="invoice"
            :before-read="beforeRead"
            @delete="deletePicture"
            :max-size="fileSize"
            @oversize="oversize"
            :max-count="maxFileCount"
            multiple
          />
          <van-cell-group>
            <van-button
              @click="uploadPicture('invoice')"
              size="large"
              type="primary"
              class="pictureButton"
            >上传图片(4)</van-button>
          </van-cell-group>
        </div>
      </van-tab>
    </van-tabs>
    <van-popup
      v-model="showOverlay"
      :close-on-click-overlay="false"
    >
      <van-loading
        size="24px"
        type="spinner"
        color="#1989fa"
        vertical
        style="background-color: rgba(0, 0, 0, 0.7)"
      >上传中...</van-loading>
    </van-popup>
  </div>
</template>

<script>
import {
  queryPicture,
  RemovePicture,
  UploadPicture
} from '../api/OrderOperate'
export default {
  name: 'ImageUpload',
  data () {
    return {
      active: 0,
      fileSize: 5 * 1024 * 1024,
      maxFileCount: 50,
      before_repair: [],
      before_repair_part: [],
      after_repair: [],
      invoice: [],
      showOverlay: false
    }
  },
  created () {
    var orderId = this.$route.params.orderId
    queryPicture(orderId)
      .then(response => {
        if (response.status === 200) {
          if (response.data.success) {
            this.before_repair = response.data.data.before_repair
            this.before_repair_part = response.data.data.before_repair_part
            this.after_repair = response.data.data.after_repair
            this.invoice = response.data.data.invoice
          } else {
            this.$toast(response.data.text)
          }
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  methods: {
    beforeRead (files) {
      if (files instanceof Array) {
        for (var i = 0; i < files.length; i++) {
          var bz = this.checkFileType(files[i])
          if (!bz) {
            return bz
          }
        }
      } else {
        return this.checkFileType(files)
      }
      return true
    },
    checkFileType (file) {
      if (!file.type.startsWith('image')) {
        this.$toast('请上传 jpg 格式图片')
        return false
      }
      return true
    },
    oversize (file) {
      this.$toast('单个文件大小必须小于5M')
    },
    deletePicture (file) {
      if (file.Id != null || file.Id !== undefined) {
        RemovePicture(file.Id)
          .then(response => {
            if (response.status === 200) {
              if (response.data.success) {
                this.before_repair = response.data.data.before_repair
                this.before_repair_part = response.data.data.before_repair_part
                this.after_repair = response.data.data.after_repair
                this.invoice = response.data.data.invoice
              } else {
                this.$toast(response.data.text)
              }
            }
          })
          .catch(function (error) {
            console.log(error)
          })
      }
    },
    uploadPicture (type) {
      var files = this[type]
      var params = new FormData()
      var fileList = []
      for (var i = 0; i < files.length; i++) {
        if (!(files[i].Id != null || files[i].Id !== undefined)) {
          fileList.push(files[i].file)
          params.append(type, files[i].file)
        }
      }
      if (fileList.length === 0) {
        this.$toast('请选择要上传的图片')
        return false
      }
      params.append(type, fileList)
      var orderId = this.$route.params.orderId
      params.append('orderId', orderId)
      this.showOverlay = true
      UploadPicture(params)
        .then(response => {
          this.showOverlay = false
          if (response.status === 200) {
            if (response.data.success) {
              this.$toast('上传成功')
              this[type] = response.data.data
            } else {
              this.$toast(response.data.text)
            }
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}
</script>
<style>
#app {
  margin-top: 0px;
}
.pictureForm {
  margin: 10px;
  margin-bottom: 60px;
}
.pictureButton {
  position: fixed !important;
  bottom: 10px;
  left: 10px;
  width: calc(100% - 20px) !important;
}
</style>
