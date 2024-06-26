<script lang="ts">
    import { Times } from "../utils/stores";
    import { displayedTime } from "../utils/timer";
</script>

<main>
    <div class="times-list">
        <footer>
            {#each $Times as Time}
                <button>{displayedTime(Time)}</button>
            {/each}
        </footer>
    </div>
</main>

<style>
    .times-list {
        background-color: #0d0d0d;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
    }
</style>