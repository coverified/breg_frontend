<script>
    import RessortFilter from './RessortFilter.svelte';
    import TagButton from './TagButton.svelte';
    import DateFilter from './DateFilter.svelte';

    export let ressorts;
    export let tags;
    export let startDate;
    export let endDate;
    export let allUsedTags = [];

    let ressortFilter = false;
    let tagFilter = false;
    let dateFilter = false;
    let filteroptionen = false;

    const setTags = (allUsedTags) => {
        const tagSet = new Set();
        const tagArr = [];

        allUsedTags.forEach((entry) => {
            entry.tags.forEach((tag) => {
                if (!tagSet.has(tag.id)) {
                    tagSet.add(tag.id);
                    tagArr.push(tag);
                }
            });
        });

        // sort alphabetically by name
        tagArr.sort((a, b) => {
            const nameA = a.name.toUpperCase(); // ignore upper and lowercase
            const nameB = b.name.toUpperCase(); // ignore upper and lowercase

            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }

            // names must be equal
            return 0;
        });

        return tagArr;
    };

    $: allTags = setTags(allUsedTags);
</script>

<div class="filter__container">
    <button
        on:click|preventDefault={() => {
            ressortFilter ? (ressortFilter = !ressortFilter) : '';
            dateFilter ? (dateFilter = !dateFilter) : '';
            tagFilter ? (tagFilter = !tagFilter) : '';
            filteroptionen = !filteroptionen;
        }}
        class={`d-mobile-only ${filteroptionen ? 'active' : ''}`}
    >
        Filteroptionen
    </button>
    <button
        on:click|preventDefault={() => {
            ressortFilter ? (ressortFilter = !ressortFilter) : '';
            dateFilter ? (dateFilter = !dateFilter) : '';
            tagFilter = !tagFilter;
        }}
        class={`tag ${tagFilter ? 'active' : ''} ${filteroptionen ? 'd-flex' : 'd-mobile-none'}`}
    >
        Thema
    </button>
    {#if tagFilter}
        <ul class={`filter filter__results ${tagFilter ? 'd-block' : ''}`}>
            {#each allTags as tag (tag.id)}
                <TagButton {tag} />
            {/each}
        </ul>
    {/if}
    <button
        on:click|preventDefault={() => {
            tagFilter ? (tagFilter = !tagFilter) : '';
            dateFilter ? (dateFilter = !dateFilter) : '';
            ressortFilter = !ressortFilter;
        }}
        class={`ressort ${ressortFilter ? 'active' : ''} ${filteroptionen ? 'd-flex' : 'd-mobile-none'}`}
    >
        Ressorts
    </button>
    <ul class={`filter__results filter ${ressortFilter ? 'd-block' : 'd-none'}`}>
        <RessortFilter bind:ressorts />
    </ul>
    <button
        on:click|preventDefault={() => {
            tagFilter ? (tagFilter = !tagFilter) : '';
            ressortFilter ? (ressortFilter = !ressortFilter) : '';
            dateFilter = !dateFilter;
        }}
        class={`date ${dateFilter ? 'active' : ''} ${filteroptionen ? 'd-flex' : 'd-mobile-none'}`}
    >
        Zeitraum
    </button>
    <ul class={`filter filter__results date ${dateFilter ? 'd-block' : 'd-none'}`}>
        <DateFilter bind:startDate bind:endDate />
    </ul>
</div>

<style type="text/scss">
    :global(.filter__container input[type='checkbox']) {
        height: 1.25rem;
        width: 1.25rem;
        margin-top: 0.3125rem;
        margin-right: 0.75rem;
        width: 1.375rem;
        height: 1.375rem;
        background-color: #eeeff1;
    }

    :global(.filter__container label) {
        display: inline-block;
        font-size: 1.25rem;
    }

    .filter__results {
        margin-top: 1.625rem;
        padding-left: 0;
        list-style: none;
        animation: growDown 300ms ease-in-out forwards;
        transform-origin: top center;
        margin-bottom: 1.25rem;

        li {
            align-items: center;
            opacity: 1;
        }
    }

    .filter__container {
        margin-top: 1.875rem;

        &__btns {
            list-style: none;
            margin-left: 0;
            padding-left: 0;
            display: flex;
            flex-direction: column;

            li {
                position: relative;

                button {
                    font-size: 1.5rem;
                }
            }
        }

        button {
            appearance: none;
            background-color: #eeeff1;
            position: relative;
            width: 100%;
            font-size: 1.5rem;
            margin-bottom: 1rem;
            border: 0;
            cursor: pointer;
            text-align: left;
            padding-bottom: 0;
            padding-left: 0;

            &:after {
                content: '';
                border: solid #333;
                border-width: 0 3px 3px 0;
                display: inline-block;
                padding: 0.3125rem;
                position: relative;
                top: 0.3125rem;
                margin-left: auto;
                transform: rotate(45deg);
                transition: transform 0.3s cubic-bezier(0.39, 0.575, 0.565, 1);
            }

            &.active {
                &:after {
                    transform: rotate(225deg);
                    transition: transform 0.3s cubic-bezier(0.39, 0.575, 0.565, 1);
                }
            }
        }
    }

    .d-mobile-none {
        display: none;
    }

    .d-mobile-only {
        display: flex;
    }

    .d-block {
        display: block;
    }

    .d-flex {
        display: flex;
    }

    .d-none {
        display: none;
    }

    @keyframes growDown {
        0% {
            transform: scaleY(0);
        }
        80% {
            transform: scaleY(1.1);
        }
        100% {
            transform: scaleY(1);
        }
    }

    @media (min-width: 768px) {
        :global(.filter__container label) {
            font-size: 1.375rem;
        }

        .d-mobile-only {
            display: none;
        }

        .d-mobile-none {
            display: block;
        }

        .tag {
            grid-area: tag;
        }
        .ressort {
            grid-area: ressort;
        }

        .date {
            grid-area: date;
        }

        .filter {
            grid-area: filter-label;
            padding-left: 0;
        }

        .filter__container {
            display: grid;
            grid-template-columns: 11.25rem 11.25rem 1fr;
            grid-template-rows: 1fr;
            gap: 0px 0px;
            grid-template-areas:
                'tag ressort date'
                'filter-label filter-label filter-label';

            button {
                width: 8.5rem;

                &:after {
                    top: -0.25rem;
                    right: -1.25rem;
                }
            }
        }
    }

    @media (min-width: 992px) {
    }
</style>
