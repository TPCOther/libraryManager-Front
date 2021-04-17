<template>
  <el-card class="card">
    <template #header>当前借阅</template>
    <el-table
     :data="borrowData.filter(item => item.returnDate === null)"
     style="width: 100%">
      <el-table-column
      prop="Bname"
      label="书名"></el-table-column>
      <el-table-column
      prop="borrowDate"
      label="借出日期"></el-table-column>
      <el-table-column
      label="状态">
      <template #default="scope">
        <el-tag v-if=" calDate(scope.row.borrowDate) > 0" type="success">剩余{{calDate(scope.row.borrowDate)}}天</el-tag>
        <el-tag v-else type="danger">逾期{{-calDate(scope.row.borrowDate)}}天</el-tag>
      </template>
      </el-table-column>
      <el-table-column
      label="操作">
      <template #default="scope">
        <el-button type="primary" size="small" @click="returnBook(scope.row.RID, scope.row.BID)">还书</el-button>
      </template>
      </el-table-column>
    </el-table>
  </el-card>
  <el-card>
    <template #header>借阅历史</template>
    <el-table
     :data="borrowData.filter(item => item.returnDate !== null)"
     style="width: 100%">
      <el-table-column
      prop="Bname"
      label="书名"></el-table-column>
      <el-table-column
      prop="borrowDate"
      label="借出日期"></el-table-column>
      <el-table-column
      prop="returnDate"
      label="归还日期">
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
import { ref } from 'vue'
import { get, put } from '../utils/request'
import { ElMessage } from 'element-plus'

const useBorrowEffect = () => {
  const borrowData = ref([])
  const searchBorrow = async () => {
    try {
      const result = await get('/borrow', { uid: localStorage.uid })
      if (result?.code === 200) {
        borrowData.value = result.data
      } else {
        ElMessage.error(result.msg)
      }
    } catch (e) {
      ElMessage.error(e)
    }
  }
  return { borrowData, searchBorrow }
}

const useReturnEffect = () => {
  const returnBook = async (rid, bid) => {
    try {
      const result = await put('/borrow', { rid: rid, bid: bid })
      if (result?.code === 200) {
        ElMessage.success(result.msg)
      } else {
        ElMessage.error(result.msg)
      }
    } catch (e) {
      ElMessage.error(e)
    }
  }

  return returnBook
}

export default {
  name: 'Borrow',
  setup () {
    const { borrowData, searchBorrow } = useBorrowEffect()
    const returnBook = useReturnEffect()
    const calDate = (borrowDate) => { return parseInt(30 - (new Date().getTime() - new Date(borrowDate).getTime()) / (1000 * 60 * 60 * 24)) }
    searchBorrow()
    return { borrowData, calDate, returnBook }
  }
}
</script>

<style>
.card {
  margin-bottom: 20px;
}

</style>
