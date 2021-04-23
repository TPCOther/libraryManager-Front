<template>
  <el-card class="card">
    <template #header>新增书籍</template>
    <div class="add">
      <div class="add_item">
      <span class="add_title">书名</span>
      <el-input class="add_input" style="width: 200px" v-model="newBook.bname"></el-input>
      </div>
      <div class="add_item">
      <span class="add_title">作者</span>
      <el-input class="add_input" style="width: 200px" v-model="newBook.author"></el-input>
      </div>
      <div class="add_item">
      <span class="add_title">出版日期</span>
      <el-date-picker
      v-model="newBook.Bdate"
      type="date"
      placeholder="选择日期"
      class="add_date">
      </el-date-picker>
      </div>
      <div class="add_item">
      <span class="add_title">数量</span>
      <el-input class="add_input" style="width: 200px" v-model="newBook.amount"></el-input>
      </div>
      <el-button type="primary" class="add_button" @click="addBook">新增</el-button>
    </div>
  </el-card>
  <el-card class="card" :body-style="{ 'text-align': 'center'}">
    <template #header>书籍管理</template>
    <div class="search">
    <el-input
       prefix-icon="el-icon-search"
       style="width: 20%" v-model="keyWord"
       placeholder="书名模糊搜索"></el-input>
      <el-button type="primary" class="search_button" @click="searchBook">搜索</el-button>
    </div>
    <el-divider></el-divider>
    <el-table
     :row-class-name="rowClassName"
     :data="bookList"
     :row-style="{height: '65px'}"
     style="width: 100%">
      <el-table-column label="书名" min-width="20%">
         <template #default="scope">
           <span class="cell_text">{{scope.row.bname}}</span>
           <el-input class="cell_input" v-model="currentData.bname"></el-input>
         </template>
      </el-table-column>
      <el-table-column label="作者" min-width="20%">
        <template #default="scope">
           <span class="cell_text">{{scope.row.author}}</span>
           <el-input class="cell_input" v-model="currentData.author"></el-input>
         </template>
      </el-table-column>
      <el-table-column label="出版日期" min-width="20%">
        <template #default="scope">
           <span class="cell_text">{{scope.row.Bdate}}</span>
           <el-input type="date" class="cell_input" v-model="currentData.Bdate"></el-input>
         </template>
      </el-table-column>
      <el-table-column label="数量" min-width="20%">
        <template #default="scope">
           <span class="cell_text">{{scope.row.amount}}</span>
           <el-input class="cell_input" v-model="currentData.amount"></el-input>
         </template>
      </el-table-column>
      <el-table-column label="操作" min-width="20%">
        <template #default="scope">
          <el-button type="primary" size="mini"
          @click="editBook(scope)"
          class="cell_button">修改</el-button>
          <el-button type="danger" size="mini"
          @click="deleteBook(scope.row)"
          class="cell_button">删除</el-button>
          <el-button type="primary" size="mini"
          @click="saveEdit(scope.row)"
          class="cell_editbutton">保存</el-button>
          <el-button type="danger" size="mini"
          @click="cancelEdit"
          class="cell_editbutton">取消</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
import { useSearchEffect } from '../utils/searchBook'
import { ref } from 'vue'
import { put, post, del } from '../utils/request'
import { ElMessage, ElMessageBox } from 'element-plus'
import moment from 'moment'

const useEditEffect = () => {
  const currentRow = ref(null)
  const currentData = ref({
    bname: '',
    author: '',
    Bdate: '',
    amount: ''
  })
  const editBook = (val) => {
    currentRow.value = val
    currentData.value = { ...currentRow.value.row }
  }
  const cancelEdit = () => {
    currentRow.value = null
  }
  const saveEdit = async (val) => {
    try {
      const result = await put('/books', currentData.value)
      if (result?.code === 200) {
        ElMessage.success(result.msg)
        val.banme = currentData.value.banme
        val.author = currentData.value.author
        val.Bdate = currentData.value.Bdate
        val.amount = currentData.value.amount
      } else {
        ElMessage.error(result.msg)
      }
    } catch (e) {
      ElMessage.error(e)
    }
    currentRow.value = null
  }
  const rowClassName = (row) => {
    if (currentRow?.value?.$index === row.rowIndex) {
      return 'currentRow'
    } else { return '' }
  }
  return { rowClassName, currentData, editBook, cancelEdit, saveEdit }
}

const useAddEffect = () => {
  const newBook = ref({
    bname: '',
    author: '',
    Bdate: '',
    amount: ''
  })

  const addBook = async () => {
    try {
      newBook.value.Bdate = moment(newBook.value.Bdate).utcOffset(480).format('YYYY-MM-DD')
      const result = await post('/books', newBook.value)
      if (result?.code === 200) {
        ElMessage.success(result.msg)
      } else {
        ElMessage.error(result.msg)
      }
    } catch (e) {
      ElMessage.error(e)
    }
  }

  return { newBook, addBook }
}

export default {
  name: 'Manage',
  setup () {
    const { newBook, addBook } = useAddEffect()
    const { rowClassName, currentData, editBook, cancelEdit, saveEdit } = useEditEffect()
    const { keyWord, searchBook, bookList } = useSearchEffect()

    const deleteBook = (val) => {
      ElMessageBox.confirm('您真的要从书库中删除这本书吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        try {
          const result = await del('/books', val)
          if (result?.code === 200) {
            ElMessage.success(result.msg)
            bookList.value.spilce(bookList.value.indexOf(val), 1)
          } else {
            ElMessage.error(result.msg)
          }
        } catch (e) {
          ElMessage.error(e)
        }
      })
    }

    searchBook()
    return { bookList, keyWord, searchBook, editBook, saveEdit, cancelEdit, rowClassName, currentData, newBook, addBook, deleteBook }
  }
}
</script>

<style lang="scss" scoped>

.card {
  margin-bottom: 20px;
}

.add {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  &_title {
    margin-right: 8px;
  }
  &_item {
    flex: 1;
    min-width: 25%;
    margin-bottom: 16px;
  }
  &_button {
    margin-left: auto;
    margin-right: 24px;
  }
}

.search {
  &_button {
    margin-left: 12px;
  }
}

.cell {
  &_input {
    display: none;
  }
  &_text {
    display: inline;
  }
  &_button {
    display: inline;
  }
  &_editbutton {
    display: none;
  }
}

.currentRow .cell {
  &_input {
    display: inline-block;
    width: 60%;
  }
  &_text {
    display: none;
  }
  &_button {
    display: none;
  }
  &_editbutton {
    display: inline;
  }
}

</style>
