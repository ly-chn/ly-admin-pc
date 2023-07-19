import {rest} from '@/util/rest'

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
