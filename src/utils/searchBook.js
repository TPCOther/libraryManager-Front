import { get } from './request'
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

export const useSearchEffect = () => {
  const bookList = ref([])
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
