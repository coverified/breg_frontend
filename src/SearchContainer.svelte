<script>
    import SearchField from './SearchField.svelte';
    import TagSelect from './TagSelect.svelte';
    import Filter from './Filter.svelte';

    export let keyword = undefined;
    export let selected = false;
    export let ressorts;
    export let tags;
    export let endDate;
    export let startDate;
    export let allUsedTags;
</script>

<div class="search__container">
    <p class="text-muted">Suche</p>
    <div class="search__input">
        <SearchField bind:keyword bind:ressorts bind:startDate bind:endDate />
        {#if keyword !== undefined || tags.length}
            <Filter bind:ressorts bind:tags bind:startDate bind:endDate {allUsedTags} />
        {:else}
            <TagSelect />
        {/if}
    </div>
</div>

<style type="text/scss">
    .search {
        &__container {
            background-color: #eeeff1;
            padding: 0.875rem 1.875rem 2.5rem 2.8125rem;
        }

        &__input {
            position: relative;
            width: 100%;
        }
    }

    .text-muted {
        font-size: 1rem;
        color: #004b76;
        margin-bottom: 1.375rem;
        margin-top: 0;
    }

    @media (max-width: 992px) {
        .search {
            &__container {
                padding: 1.625rem 0.75rem 1.375rem 1.5rem;
            }
        }
    }

    @media (max-width: 768px) {
    }
</style>
