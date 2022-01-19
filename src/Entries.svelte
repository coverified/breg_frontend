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
    export let scrollToTop = () => {};

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
                    img
                    url {
                        name
                        source {
                            id
                            name
                            colorCode
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
        searchEntries = client.request(query, variables).then((data) => {
            totalResults = data.searchEntries.totalResults;
            allUsedTags = data.searchEntries.results;
            return data;
        });
        scrollToTop();
    }
</script>

{#await searchEntries}
    <Loader />
{:then data}
    {#if data?.searchEntries?.results}
        {#each data.searchEntries.results as item}
            {#if listView}
                <EntryList {item} />
            {:else}
                <EntryCard {item} {grid} />
            {/if}
        {:else}
            <li class="no-bullet">Keine passenden Suchergebnisse gefunden</li>
            <li class="no-bullet small">Bitte beachten Sie, dass Ihnen aktuell nur Ergebnisse aus der aktuellen Legislaturperiode (Beginn am 08.12.2021) angezeigt werden. Für eine erweiterte Ausgabe passen Sie bitte den Suchzeitraum im Menü an.</li>
        {/each}
    {/if}
{:catch error}
    <p>Fehler beim laden der Daten</p>
{/await}

<style>
    li.no-bullet {
        grid-column: 1 / -1;
        font-size: 1.5rem;
        margin: 0 auto 3.3125rem;
    }

    li.small {
        font-size: .75rem;
        text-align: center;
    }
</style>
