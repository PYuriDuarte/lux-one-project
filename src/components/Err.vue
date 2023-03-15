<template>
  <i class="iconErr bi bi-github"></i>
  <div>
    <span>Desculpe!</span>
    <span>ERRO 404</span>
    <span>Página não encontrada!</span>
    <RouterLink class="homeComing" to="/">INÍCIO</RouterLink>
  </div>
</template>

<style lang="scss" scoped>

  .iconErr{
    font-size: 16.9rem;
    color: #000;
  }
  div{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    span{
      font-family: 'Inter';
      font-style: normal;
      font-weight: 700;
      font-size: 4rem;
      line-height: 5.8rem;
      display: flex;
      align-items: center;
      text-align: center;
      color: #000000;
    }
    .homeComing{
      background-color: #000;
      color: #fff;
      text-decoration: none;
      font-size: 2rem;
      padding: 1rem 4rem;
      border-radius: 5px;
      box-shadow: -2px 4px 4px rgba(0, 0, 0, 0.25);
      animation: shake 5s infinite;
      &:hover{
        font-size: 1.99rem;
        background-color: #111;
        box-shadow: -4px 4px 4px rgba(0, 0, 0, 0.55);
      }
    }
  }

</style>