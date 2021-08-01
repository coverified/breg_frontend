<script>
    import { gql } from 'graphql-request';
    import { client } from './common';
    import EntryCard from './EntryCard.svelte';
    import EntryList from './EntryList.svelte';
    import Loader from './Loader.svelte';

    export let listView;
    export let keyword;
    export let limit = 8;
    export let page = 0;
    export let totalResults = 0;
    export let sourceIds = [];
    export let tags = [];
    export let startDate;
    export let endDate;
    export let grid;
    export let allUsedTags = [];

    let searchEntries;

    const query = gql`
        query search(
            $first: Int!
            $skip: Int!
            $tags: [ID!]
            $keyword: String
            $source: [ID!]
            $startDate: String
            $endDate: String
        ) {
            searchEntries(
                first: $first
                skip: $skip
                search: $keyword
                where: {
                    source_id_in: $source
                    tag_id_in: $tags
                    date_gte: $startDate
                    date_lte: $endDate
                }
            )
            {
                results {
                    id
                    name
                    content
                    summary
                    date
                    tags {
                        id
                        name
                    }
                    url {
                        name
                        source {
                            id
                            name
                            acronym
                        }
                    }
                }
                totalResults
            }
        }`;

    const variables = {
        first: limit,
        skip: limit * page,
        tags: tags,
        keyword: keyword ? keyword : undefined,
        source: sourceIds.length ? sourceIds : undefined,
        startDate: startDate ? startDate : undefined,
        endDate: endDate ? endDate : undefined,
    };

    if (page !== -1) {
        client.request(query, variables).then((data) => {
            searchEntries = data;
            totalResults = data.searchEntries.totalResults;
            allUsedTags = data.searchEntries.results;
        });
    }
</script>

{#if searchEntries}
    {#await searchEntries}
        <Loader />
    {:then items}
        {#each items.searchEntries.results as item}
            {#if listView}
                <EntryList {item} />
            {:else}
                <EntryCard {item} {grid} />
            {/if}
        {:else}
            <li class="no-bullet">Keine passenden Suchergebnisse gefunden</li>
        {/each}
    {:catch error}
        <p>Fehler beim laden der Daten</p>
    {/await}
{/if}

<style>
    li.no-bullet {
        grid-column: 1 / -1;
        font-size: 1.5rem;
        margin: 0 auto 3.3125rem;
    }
</style>
