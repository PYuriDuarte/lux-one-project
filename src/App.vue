<template>  
  <TheNav/>
</template>
<script>
  import TheNav from './components/TheNav.vue';
  import Fav from './components/Fav.vue';

  export default {
    name: 'App',    
    components: {
      TheNav,
      Fav
    },    
  }

</script>

<style lang="scss">  
  
  *{
    font-family: "Inter";
    box-sizing: border-box;
    font-size: 62.5%;
    text-decoration: none;
    margin: 0;
    padding: 0;
  }
  body{
    background: #fff;    
    /* overflow: hidden; */
  }
  .backdrop {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }
  .divRepo{
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: start;
    width: 125.9rem;
    height: 45rem;
    margin: 3rem 0 5rem -2rem;
    div{
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      position: fixed;
      top: 9rem;
      i{
        color: #000;
        font-size: 5rem;
        margin-right: 1rem;
      }
      h3{
        font-family: 'Roboto Mono';
        font-style: normal;
        font-weight: 400;
        font-size: 45px;
        line-height: 59px;
        color: #000000;
      }
    }
    .ulRepo{
      list-style: none !important;
      .aRepo{
        text-decoration: none;
        color: #000;
        font-family: 'Rubik';
        font-style: normal;
        font-weight: 400;
        font-size: 3rem;
        line-height: 4rem;
      }
      .pRepo{
        font-family: 'Rubik';
        font-style: normal;
        font-weight: 300;
        font-size: 2rem;
        line-height: 2.5rem;
        color: #757575;
        
      }
      .spanRepo{
        font-family: 'Rubik';
        font-style: normal;
        font-weight: 300;
        font-size: 1.5rem;
        line-height: 2rem;        
      }
      hr{
        border: 1px solid #000;
      }
    }    
  }
  
  

</style>


