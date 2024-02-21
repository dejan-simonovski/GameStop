<template>
  <div>
    <ScoreDisplay :score="score" gameName="Hangman"></ScoreDisplay>
    <div>
      <p>Guess the word:</p>
      <p v-html="displayedWord"></p>
    </div>
    <div>
      <p v-if="!gameOver">Guess a letter or the whole word:</p>
      <input type="text" v-model="input" :disabled="gameOver">
      <button @click="guess" :disabled="gameOver">Guess</button>
    </div>
    <div v-if="gameOver">
      <p v-if="gameWon">You won! 🎉</p>
      <p v-else>You lost! 😢 The word was "{{ word }}".</p>
      <button @click="restartGame">Play Again</button>
    </div>
    <div>
      <p>Already tried letters: {{ triedLetters }}</p>
      <p>Remaining tries: {{ remainingTries }}</p>
    </div>
  </div>
</template>

<script>
import ScoreDisplay from "./Score.vue";
import { addHighScore, getCurrentUser } from '@/auth'

export default {
  components: {
    ScoreDisplay
  },
  data() {
    return {
      word: '',
      guessedLetters: new Set(),
      maxWrongGuesses: 6,
      gameOver: false,
      gameWon: false,
      guessedWords: 0,
      words: ['hangman', 'javascript', 'vue', 'programming', 'computer',
       'elephant', 'pizza', 'guitar', 'sunshine', 'happiness', 'basketball',
        'unicorn', 'oxygen', 'mountain', 'beach', 'umbrella', 'penguin', 'watermelon',
         'chocolate', 'puzzle', 'victory', 'rainbow', 'dragon', 'fireworks', 'moonlight', 
         'butterfly', 'superhero', 'galaxy', 'robot', 'adventure', 'treasure', 'castle', 
         'wizard', 'mermaid', 'narwhal', 'diamond', 'explosion', 'carousel', 'jellyfish', 
         'octopus', 'volcano', 'rocket', 'satellite', 'astronaut'],
      input: '',
      score: 0
    };
  },
  computed: {
    displayedWord() {
    if (this.gameOver) {
      return this.word;
    } else {
      return this.word
        .split('')
        .map(letter => this.guessedLetters.has(letter) ? letter : '_')
        .join(' ');
    }
  },
    triedLetters() {
      return Array.from(this.guessedLetters).join(', ');
    },
    remainingTries() {
      return this.maxWrongGuesses - this.getWrongGuessesCount();
    }
  },
  mounted() {
    this.startNewGame();
  },
  methods: {
    startNewGame() {
      this.word = this.words[Math.floor(Math.random() * this.words.length)];
      this.guessedLetters.clear();
      this.gameOver = false;
      this.gameWon = false;
      this.guessedWords = 0;
    },
    save() {
        const currentUser = getCurrentUser();
        addHighScore("Hangman", currentUser.username, this.score);
        this.score = 0;
    },
    guess() {
      const input = this.input.toLowerCase();
      if (input.length === 1) {
        this.guessLetter(input);
      } else if (input.length > 1) {
        this.guessWord(input);
      }
      this.input = '';

      if (this.maxWrongGuesses - this.getWrongGuessesCount() <= 0) {
          this.gameOver = true;
      }
    },
    guessLetter(letter) {
      this.guessedLetters.add(letter);
      if (!this.guessedLetters.has(letter)) {
        if (!this.word.split('').some(letter => !this.guessedLetters.has(letter))) {
          this.gameWon = true;
          this.gameOver = true;
          this.score++;
        } 
        if (this.guessedLetters.size + this.guessedWords >= this.maxWrongGuesses) {
          this.gameOver = true;
        }
      }
      console.log(this.displayedWord.split('_').length - 1)
      if (this.displayedWord.split('_').length - 1 == 0) {
          this.gameOver = true;
          this.gameWon = true;
          this.score++;
        }
    },
    guessWord(word) {
      if (word === this.word) {
        this.gameWon = true;
        this.gameOver = true;
        this.score++;
      }
      else
      {
        this.guessedWords++;
      }
    },
    restartGame() {
      this.startNewGame();
    },
    getWrongGuessesCount() {
      return Array.from(this.guessedLetters).filter(letter => !this.word.includes(letter)).length + this.guessedWords;
    }
  },
  unmounted() {
    this.save();
  }
};
</script>
