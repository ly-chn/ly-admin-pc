// export default  {
//   /**
//    * 组件根目录(否则会生成所有vue文件的web-types)
//    */
//   components: 'src/components/**/*.vue'
//   // /**
//   //  * 监听变更
//   //  */
//   // watch: true
// }
import {WebTypesBuilderConfig} from 'vue-docgen-web-types/types/config'

export default {
  components: 'src/components/**/*.vue'
} as WebTypesBuilderConfig