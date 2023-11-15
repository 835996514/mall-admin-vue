<template>
  <div class="register">
    <i class="el-icon-s-custom"></i>
    <el-form
      :model="formData"
      :rules="rules"
      label-position="left"
      label-width="65px"
      ref="form"
      class="form"
    >
      <el-form-item
        label="用户名"
        prop="username"
      >
        <el-input
          v-model="formData.username"
          placeholder="请输入用户名"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="密码"
        prop="password"
      >
        <el-input
          v-model="formData.password"
          prop="password"
          placeholder="请输入密码"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item
        label="头像"
        prop="icon"
      >
        <el-upload
          class="avatar-uploader"
          action="#"
          :show-file-list="false"
          :http-request="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          drag
          ref="upload"
        >
          <img
            v-if="imageUrl"
            :src="imageUrl"
            class="avatar"
          >
          <i
            v-else
            class="el-icon-plus avatar-uploader-icon"
          ></i>
        </el-upload>
      </el-form-item>
      <el-form-item
        label="邮件"
        prop="email"
      >
        <el-input
          v-model="formData.email"
          placeholder="请输入邮件"
          type="email"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="昵称"
        prop="nick_name"
      >
        <el-input
          v-model="formData.nick_name"
          placeholder="请输入昵称"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <div class="button">
          <el-button
            type="primary"
            @click="submitForm()"
          >提交</el-button>
          <el-button @click="resetForm()">重置</el-button>
        </div>
      </el-form-item>
      <span
        class="goLogin"
        @click="goPath()"
      >已有账号?请登录</span>
    </el-form>
  </div>
</template>

<script>
import { createAdmin } from "@/api/login";

export default {
  name: "register",
  data() {
    return {
      formData: {
        username: "",
        password: "",
        icon: "",
        email: "",
        nick_name: "",
      },
      uploadFile: null,
      rules: {
        username: [
          { required: true, $message: "请输入用户名", trigger: "blur" },
          { min: 5, max: 11, message: "长度在5到11个字符", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        nick_name: [
          { min: 2, max: 5, message: "长度在2到5之个字符", trigger: "blur" },
        ],
      },
      imageUrl: "",
    };
  },
  methods: {
    handleAvatarSuccess(res) {
      this.imageUrl = URL.createObjectURL(res.file);
      this.uploadFile = res.file;
    },
    beforeAvatarUpload(file) {
      const format = file.type === "image/jpeg" || file.type === "image/png";
      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!format) {
        this.$message.error("上传头像图片只能是 jpg 或 png 格式！");
      }
      if (!isLt5M) {
        this.$message.error("上传头像图片大小不能超过 5MB!");
      }
      return format && isLt5M;
    },
    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          const fd = new FormData()
          let {username,password,email,nick_name} = this.formData
          fd.append('username',username)
          fd.append('password',password)
          fd.append('email',email)
          fd.append('nick_name',nick_name)
          fd.append('file',this.uploadFile)
          createAdmin(fd)
            .then((res) => {
              this.$confirm(
                "用户:" + res.data.username + " 注册成功! 是否直接登录",
                "提示",
                {
                  confirmButtonText: "确定",
                  cancelButtonText: "返回登录页",
                  type: "info",
                  center: true,
                }
              )
                .then(() => {
                  this.$store.dispatch("Login", res.data).then(() => {
                    this.$message({
                      type: "success",
                      message: "登录成功！",
                    });
                    this.$router.push("/");
                  });
                })
                .catch(() => {
                  this.$router.push("/login");
                });
            })
            .catch((err) => {
              console.log("register faild, {}", err.msg);
            });
        } else {
          this.$message.error("请按要求填写用户信息！");
          return false;
        }
      });
    },
    resetForm() {
      this.$refs.form.resetFields();
      this.imageUrl = "";
      this.$refs.upload.clearFiles();
    },
    goPath() {
      this.$emit("select", "login");
    },
  }
};
</script>

<style scoped lang="less">
.register {
  width: 400px;
  height: 680px;
  margin: 0 auto;
  margin-top: 120px;
  border-radius: 10px;
  background-color: #1e3a49;
  opacity: 0.8;
  overflow: hidden;
  i {
    font-size: 84px;
    width: 84px;
    display: block;
    margin: 0 auto;
    padding: 10px;
  }
  .form {
    padding: 20px 50px 50px 50px;
  }
  .el-input {
    width: 225px;
  }
  .button {
    padding-left: 20px;
  }
  .goLogin {
    margin-left: -40px;
    font-weight: bold;
    &:hover {
      cursor: pointer;
      color: #409eff;
    }
  }
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  height: 180px;
}
</style>

<style scoped>
.register >>> .el-upload .el-upload-dragger {
  width: 200px;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
</style>