import {ElMessage} from 'element-plus'

export function todo(...args: any[]) {
  console.log('功能待实现', ...args)
  ElMessage.warning('功能待实现')
}

