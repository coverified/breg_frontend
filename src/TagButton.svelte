<script>
    import { tagFilters, toggleTag } from './stores.js';

    export let tag;

    let selected = false;

    const handleClick = () => {
        toggleTag(tag);
    };

    const unsubscribe = tagFilters.subscribe((tags) => {
        const tagSet = new Set(tags.map((tag) => tag.id));
        selected = tagSet.has(tag.id);
    });
</script>

<button class={`btn${selected ? ' btn--active' : ''}`} on:click|preventDefault={handleClick}>
    {tag.name}
    {#if selected}
        <svg role="presentation">
            <use xlink:href="#close" />
        </svg>
    {/if}
</button>

<style type="text/scss">
    .btn {
        padding: 0.5rem 0.875rem;
        background-color: #bec5c9;
        border: solid 1px #bec5c9;
        color: var(--color-body);
        font-size: 1.125rem;
        margin: 0px 0.625rem 0.625rem 0;
        border-radius: 3px;
        cursor: pointer;
        position: relative;

        &:focus-visible {
            outline-offset: 5px;
        }
    }

    .btn--active {
        position: relative;
        background-color: #0470ad;
        border: solid 1px #0470ad;
        padding-right: 2.25rem;
        color: #fff;
        font-family: inherit;

        svg {
            position: absolute;
            right: 0.75rem;
            top: 50%;
            width: 1.125rem;
            height: 1.125rem;
            transform: translateY(-50%);
        }
    }
</style>
