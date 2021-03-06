// data
const products = [
    { id: 1, description: "Bag Luxe", price: 90+"DT", img: 'assets/img/quarz-luxe.JPG'},
    { id: 2, description: 'Bag Business', price: 80+"DT", img: 'assets/img/curren-business.JPG'},
    { id: 3, description: 'Bag Sport', price: 50+"DT", img: 'assets/img/curren-sport.JPG'},
    { id: 4, description: 'Jaragar Racing', price: 85+"DT", img: 'assets/img/jaragar-racing.JPG'},
    { id: 5, description: 'Bag Hommes', price: 73+"DT", img: 'assets/img/liges-hommes.JPG'},
    { id: 6, description: 'BAg Mechanical', price: 65+"DT", img: 'assets/img/maserati-mechanical.JPG'},
    { id: 7, description: 'Bag Mecanique', price: 45+"DT", img: 'assets/img/montre-mecanique.JPG'},
    { id: 8, description: 'Brand Designer', price: 88+"DT", img: 'assets/img/brand-designer.JPG'},
    { id: 9, description: 'Bago Masculino', price: 64+"DT", img: 'assets/img/relogio-masculino.JPG'},
    { id: 10, description: 'Bag Multifunction', price: 119+"DT", img: 'assets/img/tissot-multifunction.JPG'},
    { id: 11, description: 'BagGold', price: 87+"DT", img: 'assets/img/hiphop-gold.JPG'},
    { id: 12, description: 'Bag Genova', price: 68+"DT", img: 'assets/img/mesh-genova.JPG'},
  ];

//les composants
const Home = {
    template: '#home', 
    name: 'Home',
    data: () => {
      return {
        products, 
        searchKey: '',
        liked: [],
        cart: []
      }
    },
    computed: {
      filteredList() {
        return this.products.filter((product) => {
          return product.description.toLowerCase().includes(this.searchKey.toLowerCase());
        });
      },
      getLikeCookie() {
        let cookieValue = JSON.parse($cookies.get('like'));
        cookieValue == null ? this.liked = [] : this.liked = cookieValue; 
      },
      cartTotalAmount() {     
        let total = 0;
        for (let item in this.cart) {
          total = total + (this.cart[item].quantity * this.cart[item].price);
        }
        return total;
      },
      itemTotalAmount(){
        let itemTotal = 0;
        for (let item in this.cart) {
          itemTotal = itemTotal + (this.cart[item].quantity);
        }
        return itemTotal;
      }
    },
    methods: {
      setLikeCookie() {
        document.addEventListener('input', () => {
          setTimeout(() => {
            let cookieValue = this.liked;
            cookieValue = JSON.stringify(cookieValue)
            $cookies.set('like', cookieValue); 
          }, 300);
        })
      },
      addToCart(product) {
        // check if already in array
        for (let i = 0; i < this.cart.length; i++) {
          if (this.cart[i].id === product.id) {
            return this.cart[i].quantity++ 
          }
        }
        this.cart.push({
          id: product.id,
          img: product.img,
          description: product.description,
          price: product.price,
          quantity: 1
        })
      },
      cartPlusOne(product) {
        product.quantity = product.quantity + 1;
      },
      cartMinusOne(product, id) {
        if (product.quantity == 1) {
          this.cartRemoveItem(id);
        } else {
          product.quantity = product.quantity - 1;
        }
      },
      cartRemoveItem(id) {
        this.$delete(this.cart, id)   
      }
    },
    mounted: function(){
      this.getLikeCookie;
    }
  }
  

const UserSettings = {
    template: '<h1> UserSettings </h1>',
    name: 'UserSettings'
}

const BagList = {
    template: '<h1>  BagList</h1>',
    name: 'BagListList'
}

const ShoppingCart = {
    template: "<h1>  ShoppingCart </h1>",
    name: 'ShoppingCart'
}
//instancier router (les routes)
const router = new VueRouter({
   routes: [
       {path: "/", component: Home, name: 'Home'},
       {path: "/user-settings", component: UserSettings,  name: 'UserSettings'},
       {path: "/bag-list", component: BagList,  name: 'BagListList'},
       {path: "/shopping-cart", component: ShoppingCart, name: 'ShoppingCart'},
   ]
})
//instance de vue
const vue= new Vue({
    router
}).$mount('#app')