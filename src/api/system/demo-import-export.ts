import {rest} from '@/util/rest'
import axios from 'axios'

export const demoImportExportApi = {
  demoImport(file: File) {
    const fd = new FormData()
    fd.append('file', file)
    return rest.post('test-student/import', fd, {responseType: 'blob'})
  },
  demoExport() {
    return rest.get('test-student/export', {responseType: 'blob'})
  }
}

const jpg2png = (file: File)=>{
  const fd = new FormData()
  fd.append('file', file)
  return axios.post('http://xxx:xx/jpg2png', fd, {responseType: 'blob'})
}
