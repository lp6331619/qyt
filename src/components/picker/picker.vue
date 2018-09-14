<template>
  <div class="picker">
    <mt-picker :showToolbar="true" class="pickerBox" :value-key="config.name" :slots="config.dataBox" @change="onValuesChange">
      {{lang.set}}{{config.title}}
      <el-button @click="countrysSub()" type="primary" size="mini" class="pull-right">确定</el-button>
    </mt-picker>
    <div class="bg" @click="close()"></div>
  </div>
</template> 

<script>
export default {
  name: 'menu',
  props:{
    config:{

    }
  },
  created(){
    console.log(this.config)
  },
  data () {
    return {
        select:[],
    }
  },
  methods: {
    onValuesChange(picker, values) {
      // picker.setSlotValue(1, values[0]);
      this.select = values
    },
    countrysSub:function(){
      this.$emit('selectPicker',this.select,this.config.state);
    },
    close:function(){
      this.$emit('closePicker');
    }
  },
  components: {

  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss"  scoped>
 
</style>
