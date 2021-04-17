<template>
  <el-card :body-style="{ display: 'flex' }">
    <template #header>当前借阅</template>
    <div class="borrow">
      <div class="borrow_num"> 0 </div>
      <div class="borrow_text">已借阅</div>
    </div>
    <el-divider direction="vertical" class="divider"></el-divider>
     <div class="expire">
      <div class="expire_num"> 0 </div>
      <div class="expire_text">已超期</div>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'My'
}
</script>

<style lang="scss" scoped>
.borrow, .expire {
  width: 50%;
  text-align: center;

  &_num {
    font-size: 24px;
    margin-bottom: 16px;
    color: #409EFF;
  }
}

.expire_num {
  color: #F56C6C;
}

.divider {
  height: auto;
}
</style>
