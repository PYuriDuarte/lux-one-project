<template>
  <section class="sectionContainer">
    <div class="divIfBtn">
      <RouterLink class="ifBtn" to="/">INÍCIO</RouterLink>
      <RouterLink class="ifBtn" to="/">FAVORITOS</RouterLink>
    </div>    
    <div class="divCardProfile">
      <img class="card-img" :src="user.avatar_url" :alt="user.login"> 
      <h3>{{ user.name }}</h3>
      <span>{{ user.login }}</span>
      <p>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="icon / organization">
        <path id="icon" fill-rule="evenodd" clip-rule="evenodd" d="M10 3H14C15.1046 3 16 3.89543 16 5V6H20C21.1046 6 22 6.89543 22 8V19C22 20.1046 21.1046 21 20 21H4C2.89543 21 2 20.1046 2 19V8C2 6.89543 2.89543 6 4 6H8V5C8 3.89543 8.89543 3 10 3ZM4 8H8H16H20V13H13H11H4V8ZM4 19V15H11V16H13V15H20V19H4ZM14 5V6H10V5H14Z" fill="black"/>
        </g>
        </svg>
        {{ user.company }}
      </p>  
      <p>
        <img src="../assets/location.png"/>
        {{ user.location }}
      </p>
      <p>
        <img src="../assets/repository.png"/>
        {{ user.public_repos }}
      </p>  
      <p>
        <img src="../assets/followers.png"/>
        {{ user.followers }}
      </p>       
    </div>
    <div class="divRepos">
      <ul class="ulRepos">
        <li v-for="(repo, index) in reposToShow" :key="repo.id">
          <a class="aRepos" :href="repo.html_url">{{ repo.name }}</a>
          <p class="pRepos">{{ repo.description }}</p>
          <span class="spanRepos"><i class="starCount bi bi-star"></i>{{ repo.stargazers_count }}</span>
          <button class="btnFavs"><i class="starFav bi bi-star"></i></button>
          <hr/>
        </li>
      </ul>
      <button class="btnMore" v-if="showMoreButton" @click="showMore">Ver mais repositórios</button>
      <button class="btnMore" v-if="showLessButton" @click="showLess">Ver menos repositórios</button>
    </div>
  </section>  
</template>
<script>
export default {
  data() {
    return {
      user: {},
      repos: [],
      startIndex: 0,
      endIndex: 4,
    };
  },
  computed: {
    reposToShow() {
      return this.repos.slice(this.startIndex, this.endIndex);
    },
    showMoreButton() {
      return this.endIndex < this.repos.length;
    },
    showLessButton() {
      return this.endIndex > this.repos.length;
    },
  },
  created() {
    this.fetchUser();
    this.fetchRepos();
  },
  methods: {
    async fetchUser() {
      const response = await fetch(`https://api.github.com/users/${this.$route.params.login}`);
      if (response.ok) {
        this.user = await response.json();
      }
    },
    async fetchRepos() {
      const response = await fetch(`https://api.github.com/users/${this.$route.params.login}/repos`);
      if (response.ok) {
        this.repos = await response.json();
      }
    },
    showMore() {
      this.startIndex += 4;
      this.endIndex += 4;
    },
    showLess() {
      this.endIndex -= 4;
    },
  },
};
</script>

<style lang="scss" scoped>

  .sectionContainer{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 5rem;
    .divIfBtn{
      position: fixed;
      display: flex; 
      align-items: center;
      text-align: center;  
      gap: 3.2rem;
      top: 3.1rem;
      right: 6.2rem;  
      .ifBtn{
        text-decoration: none;
        color: #000;
        font-family: 'Inter';
        font-style: normal;
        font-weight: 700;
        font-size: 2rem;
        line-height: 2rem;
      }
    }
    .divCardProfile{
      background: #D9D9D9;
      border-radius: 5px;
      font-size: 4rem;
      height: 52rem;
      width: 28rem;
      font-family: 'Rubik';
      font-style: normal;
      color: #000;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      flex-direction: column;
      margin: 3rem;
      .card-img{
        width: 25rem;
        box-shadow: 0px 0px 4px #000;
        border-radius: 5px;
        margin: 0 1.5rem;
      }
      h3{
        margin-top: 1rem;
        margin-left: 1.5rem;
        font-size: 3.6rem;
      }
      span{
        margin: -1rem 0 2rem 1.5rem;        
        font-size: 2.4rem;
        color: #757575;
      }
      p{
        margin: 1rem 0 -.5rem 1.5rem;        
        font-size: 2rem;
        color: #757575;
      }
    }
    .divRepos{
      display: flex;
      flex-direction: column;
      justify-content: center;
      text-align: start;
      width: 125.9rem;
      height: 45rem;
      margin: 3rem 0 5rem -2rem;
      .btnMore{
        position: fixed;
        width: 27rem;
        height: 4.6rem;
        left: 67.3rem;
        top: 56rem;
        background: #FFF;
        border: 2px solid #000;
        border-radius: 10px;
        color: #000;
        font-family: 'Rubik';
        font-style: normal;
        font-weight: 400;
        font-size: 2rem;
        line-height: 2.8rem;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        z-index: 20;
      }
      .ulRepos{
        list-style: none !important;
        .aRepos{
          text-decoration: none;
          color: #000;
          font-family: 'Rubik';
          font-style: normal;
          font-weight: 400;
          font-size: 3rem;
          line-height: 4rem;
        }
        .pRepos{
          font-family: 'Rubik';
          font-style: normal;
          font-weight: 300;
          font-size: 2rem;
          line-height: 2.5rem;
          color: #757575;
          
        }
        .spanRepos{
          font-family: 'Rubik';
          font-style: normal;
          font-weight: 300;
          font-size: 1.5rem;
          line-height: 2rem; 
          .starCount{
            font-size: 1.4rem;
            margin-right: .9rem;
          }
        }
        .btnFavs{
          background-color: transparent;          
          color: #000;
          position: relative;
          i{
            position: absolute;
            top: -10rem;
            right: -85rem;
            font-size: 2.8rem;
          }
        }
        hr{
          width: 85rem;        
          border: 1px solid #000;
        }
      }    
    }
  }
  
</style>
