<template>
  <nav>
    <button class="btnMain" @click="reloadPage()"></button>    
    <RouterLink class="linkGithubS" to="/"><h1>Github <span>Search</span></h1></RouterLink>
    <div class="divLinkNav">
      <RouterLink @click="select = true" class="displayNone" :class="select ? 'activ' : 'norm'" to="/">INÍCIO</RouterLink>
      <RouterLink @click="select = false" class="displayNone" :class="!select ? 'activ' : 'norm'" to="/favorites">FAVORITOS</RouterLink>        
    </div>
  </nav>
  <RouterView/>  
</template>

<script>

  export default {

    data() {
      return {      
        select: true,
      }
    },

    methods: {
      handleSelect(){
        if(this.select){
            this.select = false;
          }else{            
            this.select = true;
          }
      },
      reloadPage() {
        location.reload();
      },
    },
}

</script>

<style lang="scss" scoped>

  nav{
    display: flex;
    position: fixed;    
    top: 2rem;
    left: 3rem;
    margin: -2.2rem 0 2rem -4.5rem;
    width: 136rem;
    height: 84px;
    background: #D9D9D9;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    .linkGithubS{
      color: #000;
      text-decoration: none;
    }
    h1{
      width: 29.8rem;
      height: 8.4rem;
      font-family: 'Inter';      
      font-weight: 700;
      font-size: 3.2rem;
      line-height: 3.9rem;
      display: flex;
      align-items: center;
      text-align: center;
      margin: 0 4rem;
      span{
      margin: 0 1.2rem;
      font-size: 3.2rem;
      font-weight: 500;      
      font-style: italic;
      transform: skew(-15deg);
      }      
    }
    .btnMain{
        position: absolute;
        height: 100%;
        width: 30rem;
        bottom: 0;
        left: 2rem;
        background-color: transparent;
        z-index: 2;
        &:hover{
          border-color: #D9D9D9;
        }
      }
    .divLinkNav{
      width: 39.1rem;
      height: 8.6rem;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 3rem;
      margin-left: 60rem;   
      .activ{
        text-decoration: none;
        color: red;
        font-size: 2rem;
        font-family: 'Inter';
        font-style: normal;
        font-weight: 700;
        line-height: 2.4rem;
        display: flex;
        align-items: center;
        text-align: center;
      }
      .norm{
        color: #000;
        text-decoration: none;
        font-size: 2rem;
        font-style: normal;
        font-weight: 700;
        line-height: 2.4rem;
        display: flex;
        align-items: center;
        text-align: center;
      }
      .displayNone{
        opacity: 0;
      }
    }
    
    
    
  }
</style>