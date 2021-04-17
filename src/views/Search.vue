<template>
  <el-card :body-style="{ 'text-align': 'center'}" class="card">
    <template #header>书籍查询</template>
    <div class="search">
      <el-input
       prefix-icon="el-icon-search"
       style="width: 20%" v-model="keyWord"
       placeholder="书名模糊搜索"></el-input>
      <el-button type="primary" class="search_button" @click="searchBook">搜索</el-button>
    </div>
  </el-card>
  <el-card shadow="hover" class="card" v-for="item in bookList" :key="item.bid">
    <div class="result">
      <el-image class="result_img" :src="'http://lib.cqu.edu.cn/images/default-cover5.png'"></el-image>
      <div class="result_info">
        <span class="result_info_header">{{item.bname}}</span>
        <span class="result_info_title">作者: <a class="result_info_text"> {{item.author}}</a></span>
        <span class="result_info_title">出版日期: <a class="result_info_text"> {{item.Bdate}}</a></span>
        <span class="result_info_title">馆藏余量: <a class="result_info_text"> {{item.amount}}</a></span>
      </div>
      <el-button type="primary" class="result_button" @click="borrowBook(item.bid)">借书</el-button>
   </div>
  </el-card>
</template>

<script>
import { ref } from 'vue'
import { get, post } from '../utils/request'
import { ElMessage } from 'element-plus'

const useSearchEffect = () => {
  const bookList = ref({})
  const keyWord = ref('')
  const searchBook = async () => {
    try {
      const result = await get('/books', { name: keyWord.value })
      if (result?.code === 200) {
        bookList.value = result.data
        console.log(bookList)
      } else {
        ElMessage.error('搜索失败')
      }
    } catch (e) {
      ElMessage.error(e)
    }
  }
  return { keyWord, searchBook, bookList }
}

const useBorrowEffect = () => {
  const borrowBook = async (bid) => {
    try {
      const result = await post('/borrow', { uid: localStorage.uid, bid: bid })
      if (result?.code === 200) {
        ElMessage.success(result.msg)
      } else {
        ElMessage.error(result.msg)
      }
    } catch (e) {
      ElMessage.error(e)
    }
  }

  return borrowBook
}

export default {
  name: 'Search',
  setup () {
    const { keyWord, searchBook, bookList } = useSearchEffect()
    const borrowBook = useBorrowEffect()
    return { keyWord, searchBook, bookList, borrowBook }
  }
}
</script>

<style lang="scss" scoped>

.card {
  margin-bottom: 20px;
}

.search {
  &_button {
    margin-left: 12px;
  }
}

.result{
  display: flex;
  align-items: center;
  margin: 16px 24px;
  &_info {
    text-align: left;
    margin-left: 24px;
    &_header {
      font-size: 20px;
      display: block;
      font-weight: bold;
      margin-bottom: 16px;
    }
    &_title {
      display: block;
      margin-bottom: 12px;
      font-weight: bold;
    }
    &_text {
      color: #606266;
      font-weight: normal;
    }
  }
  &_button {
    margin-left: auto;
    height: 10%;
  }
}

</style>
