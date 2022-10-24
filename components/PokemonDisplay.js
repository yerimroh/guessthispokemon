// component to display one pokemon 
// gtp stands for 'guess this pokemon'
Vue.component('gtp', {
    template: `
    
    `,
    data() {
        return {
            image: "",
            pokeId: 0,
        }
    }, // data
    created() {

    },  // created
    methods: {

    } // methods
}) // component


// this vue will represent the guessthisfreakinpokemon web application
var display = new Vue({
    el: '#display',
})