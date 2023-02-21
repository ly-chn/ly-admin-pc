import {ElMessage} from 'element-plus'

export function lyTodo(...args: any[]) {
  console.log('功能待实现', ...args)
  ElMessage.warning('功能待实现')
}

