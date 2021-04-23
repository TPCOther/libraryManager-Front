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
      <el-table-column label="书名" prop="bname">
         <template #default="scope">
           <span>{{scope.row.bname}}</span>
           <el-input class="cell_input"></el-input>
         </template>
      </el-table-column>
      <el-table-column label="作者" prop="author">
      </el-table-column>
      <el-table-column label="出版日期" prop="Bdate">
      </el-table-column>
      <el-table-column label="数量" prop="amount">
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button type="primary" size="mini" @click="editbook(scope.$index)">修改</el-button>
          <el-button type="danger" size="mini" @click="deleteBook(scope.row.bid)">删除</el-button>
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
    const editbook = (val) => {
      currentRow.value = val
    }
    const rowClassName = (row) => {
      if (currentRow.value === row.rowIndex) {
        return 'currentRow'
      } else { return '' }
    }
    const { keyWord, searchBook, bookList } = useSearchEffect()
    searchBook()
    return { bookList, keyWord, searchBook, editbook, rowClassName }
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

</style>
