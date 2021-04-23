<template>
  <el-card class="card">
    <template #header>新增书籍</template>
    <div class="add">
      <div class="add_item">
      <span class="add_title">书名</span>
      <el-input class="add_input" style="width: 200px"></el-input>
      </div>
      <div class="add_item">
      <span class="add_title">作者</span>
      <el-input class="add_input" style="width: 200px"></el-input>
      </div>
      <div class="add_item">
      <span class="add_title">出版日期</span>
      <el-date-picker
      v-model="value1"
      type="date"
      placeholder="选择日期"
      class="add_date">
      </el-date-picker>
      </div>
      <div class="add_item">
      <span class="add_title">数量</span>
      <el-input class="add_input" style="width: 200px"></el-input>
      </div>
      <el-button type="primary" class="add_button">新增</el-button>
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
           <el-input class="cell_input" v-model="currentData.Bdate"></el-input>
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
          @click="deleteBook(scope.row.bid)"
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
export default {
  name: 'Manage',
  setup () {
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
    const saveEdit = (val) => {
      val.banme = currentData.value.banme
      val.author = currentData.value.author
      val.Bdate = currentData.value.Bdate
      val.amount = currentData.value.amount
      currentRow.value = null
    }
    const rowClassName = (row) => {
      if (currentRow?.value?.$index === row.rowIndex) {
        return 'currentRow'
      } else { return '' }
    }
    const { keyWord, searchBook, bookList } = useSearchEffect()
    searchBook()
    bookList.value = [{
      bname: '机器学习',
      author: '周志华',
      Bdate: '2016-07-02',
      amount: '2'
    },
    {
      bname: '三体',
      author: '刘慈欣',
      Bdate: '2016-07-02',
      amount: '2'
    }]
    return { bookList, keyWord, searchBook, editBook, saveEdit, cancelEdit, rowClassName, currentData }
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
    display: inline;
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
