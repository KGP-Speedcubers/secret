<script>
// @ts-nocheck

    import { onMount } from "svelte";
    import axios from "axios";
    import BACKEND_URL from "../../env";
    let email = "";
    let username = "";
    let password = "";
    let message = "";
  
    const handleSignup = async () => {
      try {
        const response = await axios.post(BACKEND_URL +  '/register', {
          email,
          username,
          password,
        });
        message = "User registered successfully";
      } catch (error) {
        message = "Error registering user:";
      }
    };
  </script>
  
  <div>
    <h2>Signup</h2>
    <input
      type="email"
      placeholder="Email"
      bind:value={email}
    />
    <input
      type="text"
      placeholder="Username"
      bind:value={username}
    />
    <input
      type="password"
      placeholder="Password"
      bind:value={password}
    />
    <button on:click={handleSignup}>Signup</button>
    {#if message}
      <p>{message}</p>
    {/if}
  </div>
  