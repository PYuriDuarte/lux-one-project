<template>
  <section>
    <i v-if="searchSuccessful" class="mainIcon bi bi-github"></i>

    <button class="btnFavMain" @click="selectNav = true; getFavBtn()" :class="selectNav ? 'red' : ''">FAVORITOS</button>
    <button class="btnIncMain" @click="selectNav = true; reloadPage()" :class="!selectNav ? 'red' : ''">INÍCIO</button>

    <div v-if="showAlert" class="showAlert">
      <i class="alertImg bi bi-exclamation-circle-fill"></i>
      <h3>Desculpe!</h3>
      <p>Não foi possível encontrar o repositório ou usuário desejado!</p>
      <button class="btnCerto" @click="btnCerto">Certo</button>
    </div>

    <div v-if="naoSearchSuccessful" class="backdrop"></div>

    <div class="btn-home" v-if="searchSuccessful">
      <button @click="select = true" :class="select ? 'activ' : 'norm'">Repositório</button>
      <button  @click="select = false" :class="!select ? 'activ' : 'norm'">Usuário</button> 
    </div>

    <div>    
      <div class="inputDiv" v-if="searchSuccessful">
        <input class="barSrc" @keyup="handleSearch" v-model="username" type="text" placeholder="Buscar..." />
        <button class="btnSrc" @click="handleSearchBtn"><i class="searchButton bi bi-search"></i></button>
      </div>

      <div v-if="showFavorites" class="divRepo">

        <div>
          <i class="iconFav bi bi-github"></i>
          <h3>Repositórios Favoritos</h3>
        </div>
        
        <ul class="ulRepo">
          <li v-for="(obj, index) in favoriteRepos" :key="obj.id">
            <a class="aRepo" target="_blank" :href="obj.html_url">{{ obj.name }}</a>          
            <p class="pRepo">{{ obj.description }}</p>
            <span class="spanRepo"><i class="starCount bi bi-star"></i>{{ obj.stargazers_count }}</span>
            <button class="btnFav" @click="removeFromFavorites(obj)"><i class="yellowStar starFav bi bi-star"></i>Remover</button>
            <hr/>
          </li>
        </ul>
      </div>
      
      <div class="divRepo">
        <ul class="ulRepo">
          <li v-for="(obj, index) in reposToShow" :key="obj.id">
            <a class="aRepo" target="_blank" :href="obj.html_url">{{ obj.name }}</a>          
            <p class="pRepo">{{ obj.description }}</p>
            <span class="spanRepo"><i class="starCount bi bi-star"></i>{{ obj.stargazers_count }}</span>
            <button class="btnFav" @click="addToFavorites(obj)"><i :class="yellow ? `yellowStar${index}` : ''" class="starFav bi bi-star"></i>Favoritar</button>
            <hr/>
          </li>
        </ul>
      </div>

      <div v-if="repos.length > 4 && !showMoreRep">
        <button class="btnMore" @click="showMoreRep = true">Ver mais</button>
      </div>
    
      <div v-if="repos.length > 4 && showMoreRep">
        <button class="btnMore" @click="showMoreRep = false">Ver menos</button>
      </div>
      
      <ul class="ulUse" v-if="users.length">        
        <li class="liUse" v-for="(user, index) in userToShow" :key="user.id">          
          <RouterLink class="aUse" :to="'/user/' + user.login">
            <img class="card-img" :src="user.avatar_url" :alt="user.login">
            <p>{{ user.login }}</p>
          </RouterLink>
        </li>
      </ul>
      
      <div v-if="users.length > 3 && !showMoreUse">
        <button class="btnMore" @click="showMoreUse = true">Ver mais</button>
      </div>
    
      <div v-if="users.length > 3 && showMoreUse">
        <button class="btnMore" @click="showMoreUse = false">Ver menos</button>
      </div>      

    </div>
  </section>
</template>



<script>
import 'bootstrap-icons/font/bootstrap-icons.css'

export default {
  components: {
    
  },
  data() {
    return {
      username: '',
      select: true,
      selectNav: false,
      repos: [],
      users: [],
      showAlert: false,
      searchSuccessful: true,
      naoSearchSuccessful: false,
      showMoreRep: false,
      showMoreUse: false,
      showFavorites: false,
      favoriteRepos: [],
      yellow: false,
    }
  },
  computed: {
    reposToShow() {
      return this.showMoreRep ? this.repos.slice(0, 8) : this.repos.slice(0, 4);
    },
    userToShow() {
      return this.showMoreUse ? this.users.slice(0, 6) : this.users.slice(0, 3);
    }
  },
  methods: {
    async getRepos(username) {
      try {
        const response = await fetch(`https://api.github.com/users/${username}/repos?direction=desc`);
        const data = await response.json();
        if (data.message === 'Not Found') {
          this.showAlert = true;
          this.naoSearchSuccessful = true;
          this.repos = [];
        } else {
          this.showAlert = false;
          this.repos = data;
          console.log(data);
          this.searchSuccessful = false;
        }
      } catch (error) {
        console.error(error);
      }
    },
    async searchUsers(username) {
      try {
        const response = await fetch(`https://api.github.com/search/users?q=${username}`);
        const data = await response.json();
        if (data.message === 'Not Found') {
          this.showAlert = true;
          this.naoSearchSuccessful = true;
          this.users = [];
        } else if (data.total_count === 0) {
          this.$router.push('/err');
        } else {
          this.showAlert = false;
          this.users = data.items;
          console.log(data);
          this.searchSuccessful = false;
        }
      } catch (error) {
        console.error(error);
      }
    },
    addToFavorites(repo) {
      if (!this.favoriteRepos.includes(repo)) {
        this.favoriteRepos.push(repo);
        this.yellow = true
      }
    },
    getFavBtn(){
      if(this.showFavorites === false && this.favoriteRepos.length >=1){
        this.showFavorites = true
      } else {
        this.showFavorites = false
      }
    },
    removeFromFavorites(repo) {
      const index = this.favoriteRepos.indexOf(repo);
      if (index !== -1) {
        this.favoriteRepos.splice(index, 1);
      }
    },
    async getFavoriteRepos() {
      for (const repo of this.favoriteRepos) {
        try {
          const response = await fetch(`https://api.github.com/repos/${repo.owner.login}/${repo.name}`);
          const data = await response.json();
          console.log(data);
          }catch (error) {
          console.error(error);
          }
        }
      },
    handleSearch(event) {
      if (event.keyCode === 13) {          
        if(this.select){
          this.getRepos(this.username)
        } else{            
          this.searchUsers(this.username);
        }
      }
    },
    handleSearchBtn(){
      if(this.select){
          this.getRepos(this.username)
        } else{            
          this.searchUsers(this.username);
        }
    },
    btnCerto() {
      this.showAlert = false
      this.naoSearchSuccessful = false
    },
    reloadPage() {
      location.reload();
    },
  },
  watch: {
    favoriteRepos: {
      handler() {
        this.getFavoriteRepos();
      },
      deep: true,
    },
  },
};
</script>

<style lang="scss" scoped>

  section{
    position: fixed;
    top: 12rem;
    right: 5.5rem;
  }
  
  .yellowStar{
    color: yellow !important;
  }
  .yellowStar0{
    color: yellow !important;
  }
  .yellowStar1{
    color: yellow !important;
  }
  .yellowStar2{
    color: yellow !important;
  }
  .yellowStar3{
    color: yellow !important;
  }
  .yellowStar4{
    color: yellow !important;
  }
  .btnFav{
    display: flex;
    position: absolute;
    margin-left: 122rem;
    margin-top: -10rem;
    background: transparent;
    .starFav{
      color: #000;
      font-size: 4rem;
    }
  }
  .mainIcon{
    font-size: 18rem;
    color: #000;
    position: relative;
    top: -1rem;
  }
  .btnIncMain{
    background: transparent;
    color: #000;
    font-size: 2rem;
    font-style: normal;
    font-weight: 700;
    line-height: 2.4rem;
    display: flex;
    align-items: center;
    text-align: center;
    position: absolute;
    top: -10.4rem;
    right: 13rem;
  }
  .red{
    color: #FF0000 !important;
  }
  .btnIncMain:hover{
    border-color: #D9D9D9;
  }
  .btnFavMain{
    background: transparent;
    color: #000;
    font-style: normal;
    font-weight: 700;
    font-size: 2rem;
    line-height: 2rem;
    display: flex;
    align-items: center;
    text-align: center;
    position: absolute;
    top: -10.2rem;
    right: -1.4rem;    
  }
  .btnFavMain:hover{
    border-color: #D9D9D9;
  }
  .showAlert{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    opacity: 1;
    position: absolute;
    width: 40rem;
    height: 48rem;
    left: 42rem;
    top: 0;
    background: #fff;
    border-radius: 1.5rem;
    .alertImg{
      margin-top: -7rem;
      color: #FF0000;
      font-size: 10rem;
      z-index: 2;
    }
    h3{
      margin-top: 1rem;
      font-size: 4rem;
    }
    p{
      display: flex;
      flex-flow: wrap;
      width: 35rem;
      font-size: 2rem;
      margin-top: 6rem;
    }
    .btnCerto{
      margin-bottom: -5rem;
      margin-top: 3rem;
      display: flex;
      text-align: center;
      align-items: center;
      justify-content: center;
      background-color: #FF0000;
      width: 19.4rem;
      height: 7.2rem;
      border-radius: 1rem;
      font-family: 'Inter';
      font-style: normal;
      font-weight: 600;
      font-size: 40px;
      line-height: 48px;
      display: flex;
      align-items: center;
      text-align: center;
    }
  }
  .ulUse{
    margin: -50rem 0 0 0;
    display: flex;
    flex-direction: column;
    gap: 2rem;    
    .liUse{
      margin-left: -1rem;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      width: 120rem;
      height: 17rem;
      background: #FFF;
      box-shadow: 0px 0px 10px 10px rgba(0, 0, 0, 0.1);
      border-radius: 10px;
      .aUse{
        display: flex;
        text-decoration: none;
        p{
          margin-left: 1rem;
          font-family: 'Rubik';
          font-style: normal;
          font-weight: 300;
          font-size: 3.6rem;
          line-height: 4.3rem;
          color: #000;          
        }
        
        .card-img{
          width: 14.4rem;
          margin-left: 1.5rem;
          box-shadow: 0px 0px 4px #000;
          border-radius: 5px;
        }
      }
    }
  }
  .starCount{
    color: #000;
    font-size: 1.6rem;
    margin-right: 1rem;
  }
  .btnMore{
    position: fixed;
    width: 16.8rem;
    height: 4.6rem;
    left: 57.3rem;
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

  .btn-home button{
    margin: -3rem 2.2rem;
    font-family: Inter;
    font-style: normal;
    font-weight: 700;
    font-size: 2.0rem;
    line-height: 2.4rem;
    display: inline-flex;    
    justify-content: center;
    align-items: center;
    text-align: center;
    border: 2px solid #000;
    border-radius: 5px;
    background: #fff;
    color: #000;
    width: 18.6rem;
    height: 5.1rem;
    cursor: pointer;
  }
  button.activ{
    background: #000;
    color: white;    
  }
  

  .inputDiv{
    margin: 6rem auto;
    border: solid 2px #000;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 1rem;
    width: 78rem;
    height: 7.1rem;
    .barSrc{
      width: 70rem;
      height: 7.1rem;
      background-color: transparent;
      border: none;
      outline: none;
      color: #000;
      font-family: Inter;
      font-style: normal;
      font-weight: 400;
      font-size: 2.4rem;
      line-height: 2.9rem;
      &::placeholder{
        color: #000; 
      }      
    }
    .btnSrc {
      margin: .5rem auto;
      background-color: transparent;
      color: #000;      
      .searchButton{
        font-size: 3.5rem;
      }
    }
  }

</style>

