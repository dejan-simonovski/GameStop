<template>
    <div class="login-container">
      
      <div v-if="!showAddUserForm">
        <h2>Login</h2>
        <!-- Login Form -->
        <div class="form-group">
          <input v-model="username" type="text" class="form-control" placeholder="Username">
        </div>
        <div class="form-group">
          <input v-model="password" type="password" class="form-control" placeholder="Password">
        </div>
        <button @click="login" class="btn btn-primary">Login</button>
        <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
      </div>
      <div v-else>
        <!-- Add User Form -->
        <h2>Register</h2>
        <div class="form-group">
          <input v-model="newUsername" type="text" class="form-control" placeholder="New Username">
        </div>
        <div class="form-group">
          <input v-model="newPassword" type="password" class="form-control" placeholder="New Password">
        </div>
        <button @click="addUser" class="btn btn-success">Create account</button>
      </div>
      <!-- Toggle Button -->
      <button @click="toggleForm" style="margin:20px">{{ showAddUserForm ? 'Login' : 'Register' }}</button>
    </div>
  </template>
  
  <script>
  import { login, addUser } from '@/auth'; // Import the login and addUser functions from auth.js
  
  export default {
    data() {
      return {
        username: '',
        password: '',
        newUsername: '',
        newPassword: '',
        errorMessage: '',
        showAddUserForm: false // Toggle state for showing the add user form
      };
    },
    methods: {
      login() {
        if (this.username.trim() === '' || this.password.trim() === '') {
          this.errorMessage = 'Please enter both username and password';
          return;
        }
        
        if (login(this.username, this.password)) {
          // Redirect to the home page after successful login
          this.$router.push('/');
        } else {
          this.errorMessage = 'Invalid username or password';
        }
      },
      addUser() {
        if (this.newUsername.trim() === '' || this.newPassword.trim() === '') {
          this.errorMessage = 'Please enter both new username and password';
          return;
        }
        
        // Add the new user
        addUser(this.newUsername, this.newPassword);
        this.errorMessage = 'New user added successfully';
        // Optionally clear the form fields after adding the user
        this.newUsername = '';
        this.newPassword = '';
      },
      toggleForm() {
        // Toggle the state to show/hide the add user form
        this.showAddUserForm = !this.showAddUserForm;
        // Clear any error message when toggling forms
        this.errorMessage = '';
      }
    }
  };
  </script>
  
  <style scoped>
  .login-container {
    max-width: 300px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f9f9f9;
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  .form-control {
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .btn {
    display: inline-block;
    padding: 10px 20px;
    font-size: 16px;
    border: none;
    border-radius: 5px;
    background-color: rgb(255, 83, 53);
    color: #fff;
    cursor: pointer;
  }
  
  .btn:hover {
    background-color: red;
  }
  
  .error {
    color: red;
    margin-top: 10px;
  }
  </style>
  