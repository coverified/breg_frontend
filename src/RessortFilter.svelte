<script>
    import {gql} from 'graphql-request';
    import {client} from './common';
    import Loader from './Loader.svelte';

    export let ressorts = [];

    let allSources;

    const query = gql`{
        allSources {
            id
            name
        }
    }`;

    client.request(query).then((data) => {
        allSources = data.allSources.sort((a, b) => {
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
