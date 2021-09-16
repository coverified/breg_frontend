<script>
    import {gql} from 'graphql-request';
    import {client} from './common';
    import Loader from './Loader.svelte';

    export let ressorts = [];

    let allSources;

    const query = gql`{
        allSources(orderBy: { name: asc }) {
            id
            name
        }
    }`;

    client.request(query).then((data) => {
        allSources = data.allSources;
    });

    const handleSourceKlick = (e, source) => {
        if (e.target.checked) {
            if (!ressorts.includes(source.id)) {
                ressorts = [...ressorts, source.id];
            }
        } else {
            ressorts = ressorts.filter(item => item !== source.id);
        }
    }
</script>

{#if allSources}
    {#await allSources}
        <Loader/>
    {:then items}
        {#each items as item (item.id)}
            <li>
                <label for={item.id}>
                    <input type="checkbox" id={item.id} on:change={e => {
                        handleSourceKlick(e, item);
                    }}/>
                    {item.name}
                </label>
            </li>
        {:else}
            <li>Keine Ressorts gefunden</li>
        {/each}
    {:catch error}
        <li>Fehler beim laden der Ressorts</li>
    {/await}
{/if}
