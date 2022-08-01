<script>
import { SearchForm, ScaleTool } from '@/components'
export default {
  components: {
    SearchForm,
    ScaleTool
  },
  data() {
    return {
      size: 'normal'
    }
  },
  render() {
    return (
      <div class="container">
        <div class="top">
          <SearchForm></SearchForm>
          <ScaleTool onChange={(index) => (this.szie = index === 0 ? 'normal' : 'lg')} />
        </div>
      </div>
    )
  }
}
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
