import { FileSystemWatcher, workspace } from 'vscode'

export type WatchCallback = (watcher: FileSystemWatcher) => void

class Watcher extends Set<WatchCallback> {
  watcher?: FileSystemWatcher

  constructor (public path: string) {
    super()
  }

  add (value: WatchCallback): this {
    if (this.size === 0) {
      this.watcher = workspace.createFileSystemWatcher(this.path)
    }
    value(this.watcher as FileSystemWatcher)
    return super.add(value)
  }

  delete (value: WatchCallback): boolean {
    const deleted = super.delete(value)
    if (this.size === 0) {
      this.watcher?.dispose()
    }
    return deleted
  }

  setPath (newPath: string): void {
    this.path = newPath
    this.watcher?.dispose()
    this.watcher = workspace.createFileSystemWatcher(this.path)
    this.forEach(watcherCallback => {
      watcherCallback(this.watcher as FileSystemWatcher)
    })
  }
}

export default Watcher
