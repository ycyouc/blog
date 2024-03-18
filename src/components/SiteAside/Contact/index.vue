<template>
  <div class="contact-container">
    <ul>
      <li class="contact-info" v-for="(item, i) in info" :key="i">
        <div class="contact-box" v-if="item.url">
          <div class="contact-rect">
            <img :src="item.url" />
          </div>
          <div class="contact-triangle"></div>
        </div>
        <a :href="item.link" class="contact-item">
          <div class="icon">
            <Icon :type="item.type" />
          </div>
          <span class="content">{{ item.data }}</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import Icon from "@/components/Icon";
import { mapState } from "vuex";
export default {
  props: {
    src: {
      type: String,
    },
    link: {
      type: String,
    },
  },
  components: {
    Icon,
  },
  computed: {
    ...mapState("settings", ["data"]),
    info() {
      return [
        {
          type: "github",
          data: this.data.githubName,
          link: this.data.github,
        },
        {
          type: "mail",
          data: this.data.mail,
          link: `mailto:${this.data.mail}`,
        },
        {
          type: "qq",
          data: this.data.qq,
          link: `tencent://message/?Menu=yes&uin=${this.data.qq}&Service=300&sigT=45a1e5847943b64c6ff3990f8a9e644d2b31356cb0b4ac6b24663a3c8dd0f8aa12a595b1714f9d45`,
          url: this.data.qqQrCode,
        },
        {
          type: "weixin",
          data: this.data.weixin,
          link: "",
          url: this.data.weixinQrCode,
        },
      ];
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/global.less";
@import "~@/styles/mixin.less";

a {
  display: flex;
  align-items: center;
  cursor: pointer;
}
.contact-container {
  ul {
    list-style: none;
    padding: 0;
    margin: 0 20px;
    .contact-info {
      color: @lightWords;
      padding: 5px 0;
      font-size: 30px;
      line-height: 30px;
      position: relative;
      &:hover {
        .contact-box {
          transform: scaleY(1);
        }
      }
      .contact-item {
        .icon-container {
          font-size: 26px;
        }
        .content {
          margin-left: 10px;
          font-size: 14px;
        }
      }
      .contact-box {
        position: absolute;
        left: 0;
        top: -115px;
        transform: scaleY(0);
        transform-origin: center bottom;
        transition: 0.3s;
        .contact-rect {
          width: 120px;
          height: 120px;
          background: #fff;
          border-radius: 10px;
          .self-center-flex();
          img {
            width: 80%;
            height: 80%;
          }
        }
        .contact-triangle {
          width: 0;
          height: 0;
          border: 6px solid #fff;
          border-color: #fff transparent transparent transparent;
          margin-left: 45px;
        }
      }
    }
  }
}
</style>