<script>
    import { tagFilters, clearTags } from './stores.js';
    import TagButton from './TagButton.svelte';
    import { gql } from 'graphql-request';
    import { client } from './common';

    export let keyword = undefined;
    export let ressorts = [];
    export let startDate;
    export let endDate;

    let value;
    let activeTags;
    let input;
    let autocomplete;

    const query = gql`
        query autocomplete($value: String!) {
            autocompleteSearchTerm(search: $value)
        }
    `;

    $: value &&
        client.request(query, { value }).then((data) => {
            autocomplete = value ? data : [];
        });

    const unsubscribe = tagFilters.subscribe((value) => {
        activeTags = value;
    });

    const handleSubmit = () => {
        keyword = value;
    };

    const handleKeyup = (event) => {
        if (event?.code === 'Enter') {
            event.preventDefault();
            input.blur();
            keyword = value;
        }
    };

    const handleReset = () => {
        value = undefined;
        keyword = undefined;
        startDate = undefined;
        endDate = undefined;
        ressorts = [];
        clearTags();
    };
</script>

<div class="form__container">
    {#each activeTags as tag (tag.id)}
        <TagButton {tag} />
    {/each}
    <form on:submit|preventDefault={handleSubmit}>
        <input
            type="search"
            class="form__field"
            placeholder="Suchbegriff eingeben"
            list="searchTerms"
            bind:value
            bind:this={input}
            on:keyup|preventDefault={handleKeyup}
        />
        <datalist id="searchTerms">
            {#if autocomplete}
                {#await autocomplete then data}
                    {#each data.autocompleteSearchTerm as term}
                        <option value={term} />{/each}
                {/await}
            {/if}
        </datalist>
        {#if value !== undefined || activeTags.length !== 0}
            <button
                type="reset"
                class="btn btn-delete"
                title="Suche zurücksetzen"
                on:click|preventDefault={handleReset}
            >
                <svg role="presentation">
                    <use xlink:href="#close" />
                </svg>
            </button>
        {/if}
        <button type="submit" class="btn btn-search" title="Suchen">
            <svg role="presentation">
                <use xlink:href="#search" />
            </svg>
        </button>
    </form>
</div>

<style type="text/scss">
    .form__container {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        border-bottom: 1px solid #000;
    }

    form {
        display: flex;
        position: relative;
        flex-basis: 300px;
        flex-grow: 1;
    }

    .form__field {
        flex-basis: 100%;
        border: 0;
        margin-bottom: 0;
        outline: 0;
        font-size: 1.5625rem;
        color: #000;
        padding: 0;
        background: transparent;
        transition: border-color 0.2s;

        &::placeholder {
            color: #63686a;
        }

        &::-webkit-calendar-picker-indicator,
        &::-webkit-search-cancel-button,
        &::-webkit-search-results-button,
        &::-webkit-search-results-decoration {
            display: none !important;
        }
    }

    .btn {
        appearance: none;
        background: none;
        margin-bottom: 0;
        position: relative;
        border: 0;
        padding-bottom: 0.75rem;

        svg {
            color: #0470ad;
            width: 30px;
            height: 30px;
        }
    }

    .btn-delete {
        font-weight: bold;
    }

    .btn-search {
        right: 0;
    }

    @media (min-width: 992px) {
        .form__container {
            flex-direction: row;

            &__field {
                padding: 0 0 0.75rem 0;
            }
        }
    }
</style>
