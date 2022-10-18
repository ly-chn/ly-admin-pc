import type {Plugin} from 'vue'

export type SFCWithInstall<T> = T & Plugin
export const withInstall = <T extends Record<string, any>>(
  comp: T
) => {
  (comp as SFCWithInstall<T>).install = (app): void => {
    app.component(comp.name, comp)
  }
  return comp as SFCWithInstall<T>
}
