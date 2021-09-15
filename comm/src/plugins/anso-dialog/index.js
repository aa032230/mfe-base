import ansoDialog from './src/dialog.js'
export default {
  install(ctx) {
    ctx.prototype.ansoDialog = ansoDialog(ctx)
  } 
}