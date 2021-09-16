<script>
    import { gql } from 'graphql-request';
    import { client } from './common';
    import Loader from './Loader.svelte';
    import TagButton from './TagButton.svelte';

    let allTags;

    const query = gql`
        {
            allTags(where: { highlighted: true }, orderBy: { name: asc }) {
                name
                id
            }
        }
    `;

    client.request(query).then((data) => {
        allTags = data;
    });
</script>

<div class="search__tags">
    <p>Häufige Themen</p>
    {#if allTags}
        {#await allTags}
            <Loader />
        {:then tags}
            {#each tags.allTags as tag (tag.id)}
                <TagButton {tag} />
            {:else}
                <p>Keine häufigen Themen gefunden</p>
            {/each}
        {:catch error}
            <p>Fehler beim laden der häufigen Themen</p>
        {/await}
    {/if}
</div>

<style type="text/scss">
    .search {
        &__tags {
            margin-top: 1.625rem;

            p {
                color: #4d4f50;
                letter-spacing: 0.4px;
                font-size: 1.125rem;
                margin-top: 0.875rem;
                margin-bottom: 0.625rem;
            }

            &-controls {
                display: flex;
                align-items: center;
                font-size: 1.5rem;
            }
        }
    }

    @media (min-width: 992px) {
        .search {
            &__tags {
                p {
                    margin-top: 0.5rem;
                }
            }
        }
    }
</style>
