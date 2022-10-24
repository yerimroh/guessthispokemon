// component to display one pokemon 
// gtp stands for 'guess this pokemon'
Vue.component('gtp', {
    template: `
    <div id = "pokemonDisplay">
    <h3>Score: {{score}}</h3>
    <img v-if = "isRevealedFunc()" id = "afterReveal" v-bind:src="pokeImage"/><br> <br>
    <img v-if = "isRevealedFunc() == false" id = "beforeReveal" v-bind:src="pokeImage"/><br> <br>

    
    <form v-if = "isRevealedFunc() == false" class="submit_answer" @submit.prevent="onSubmit">
    <label for = "userAnswer">Your Answer: </label>
    <input id = "userAnswer" v-model = "userAnswer">
    <input class="button" type="submit" value="Check Answer"> 
    </form>

    <button @click="nextPokemon()">Next Pokemon</button>

    <p>{{answer}}</p>
    </div>
    `,
    data() {
        return {
            pokeImage: "", // image link
            userAnswer: "",
            answer: "", 
            current_Pokemon: {}, // information about this pokemon
            pokeId: 0,
            ifRevealed: false,
            score: 0,
        }
    }, // data
    created() {
        this.loadPokemon() // call this function when application is started
    },  // created
    methods: {
        // this method loads one image of a pokemon at a time, along with the name
        async loadPokemon() {
            // reset everything
            this.ifRevealed = false;
            this.userAnswer = "";

            // pick a random pokemon by randomly generating an id
            this.pokeId = Math.floor(Math.random() * 906); // 905 pokemons total (at least for the sake of the images)

            
            // GET https://pokeapi.co/api/v2/pokemon/id 
            // used to fetch the information of a pokemon (the name, in this case)
            let response = await axios.get('https://pokeapi.co/api/v2/pokemon/' + this.pokeId);

            this.answer = response.data.name; // save the json info to a variable

            // console.log(this.pokeId); 


            // GET https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/{id}.png
            // used to fetch the image of a pokemon
            this.pokeImage = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/' + this.pokeId + '.png'


        }, // loadPokemon
        compareAnswer() {
            this.userAnswer = this.userAnswer.toLowerCase(); // the application should check the answer disregarding the case (case insensitive)
            return this.userAnswer === this.answer;
            // get the input from the input text field and match it with the name 
        }, // compareAnswer
        onSubmit() {
            if(!this.compareAnswer()) {
                alert('Incorrect!')
                this.userAnswer = "" // reset the input box
            } else { // if correct
                alert('Congratulation! You guessed the pokemon.')
                this.revealAnswer()
                this.score += 1;
                this.userAnswer = "" // reset the input box
            } // if-else
        }, // onSubmit
        revealAnswer() {
            this.ifRevealed = true;
        }, // revealAnswer
        isRevealedFunc() {
            return this.ifRevealed;
        }, // isRevealedFunc
        nextPokemon() {
            this.loadPokemon()
        } // nextPokemon




    } // methods
}) // component


// this vue will represent the guessthisfreakinpokemon web application
var display = new Vue({
    el: '#display',
})