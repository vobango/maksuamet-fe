<template>
  <div>Message: {{ message }}</div>
</template>

<script>
import superagent from 'superagent';


  export default {
    name: 'Home',
    data: () => ({
      message: 'asd'
    }),
created: function() {
  superagent.get('http://localhost:8001/api/test')
  .withCredentials()
    .then((res) => {
      this.message = res.body?.message || 'oh no'
    })
}
  }
</script>
