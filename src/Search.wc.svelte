<svelte:options tag="coverified-breg-search"/>

<script>
    import {onMount} from 'svelte';
    import Search from './Search.svelte';

    const styles = `{{{###STYLES###}}}`;
    let me;

    onMount(() => {
        const styleElement = document.createElement('style');

        styleElement.textContent = styles;
        me.appendChild(styleElement);
    });
</script>

<div class="root" bind:this={me}>
    <Search/>
</div>
