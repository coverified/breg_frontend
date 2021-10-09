<script>
    import { gql } from 'graphql-request';
    import { client } from './common';
    import Loader from './Loader.svelte';

    export let ressorts = [];

    let allSources;

    const query = gql`
        {
            allSources(orderBy: { name: asc }) {
                id
                name
            }
        }
    `;

    allSources = client.request(query).then((data) => {
        return data.allSources;
    });

    const handleSourceKlick = (e, source) => {
        if (e.target.checked) {
            if (!ressorts.includes(source.id)) {
                ressorts = [...ressorts, source.id];
            }
        } else {
            ressorts = ressorts.filter((item) => item !== source.id);
        }
    };
</script>

{#await allSources}
    <Loader />
{:then items}
    {#each items as item (item.id)}
        <li>
            <input
                type="checkbox"
                id={item.id}
                on:change={(e) => {
                    handleSourceKlick(e, item);
                }}
            />
            <label for={item.id}>
                {item.name}
            </label>
        </li>
    {:else}
        <li>Keine Ressorts gefunden</li>
    {/each}
{:catch error}
    <li>Fehler beim laden der Ressorts</li>
{/await}

<style type="text/scss">
    input {
        margin-top: 0.4375rem;
    }

    li {
        display: grid;
        grid-template-columns: 26px 1fr;
        grid-gap: 0.625rem;
    }
</style>
