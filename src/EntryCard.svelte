<script>
    import { onMount } from 'svelte';
    import TagButton from './TagButton.svelte';

    export let item;
    export let open = false;
    export let grid;

    const cutContentLength = (text, max = 200) => {
        return text && text.length > max ? text.slice(0, max).split(' ').slice(0, -1).join(' ') + '...' : text;
    };

    function resizeGridItem(item) {
        const rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));
        const rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap'));
        let rowSpan = Math.ceil(
            (item.querySelector('.content').getBoundingClientRect().height + rowGap) / (rowHeight + rowGap)
        );
        item.style.gridRowEnd = 'span ' + rowSpan;
    }

    function resizeAllGridItems() {
        let allItems;
        allItems = grid.getElementsByClassName('item');
        for (let i = 0; i < allItems.length; i++) {
            resizeGridItem(allItems[i]);
        }
    }

    onMount(() => {
        resizeAllGridItems();
        grid.addEventListener('resize', resizeAllGridItems);
        grid.addEventListener('click', resizeAllGridItems);
    });
</script>

{#if item}
    <li
        class="{open ? 'open' : ''}
        {item.url.source.acronym.toLowerCase()}
        item"
    >
        <article>
            <a class="content" href={item.url.name} target="_blank" rel="noopener" title={`Direkt zu "${item.name}"`}>
                <p class="meta">
                    {#if item.url.source.id}
                        <span class="meta__source-icon">
                            <svg role="presentation">
                                <use xlink:href="#{item.url.source.acronym.toLowerCase()}" />
                            </svg>
                        </span>
                    {/if}
                    {#if item.url.source?.name}
                        {item.url.source.name}
                    {/if}
                </p>
                <h1>
                    {item.name}
                </h1>
                {#if item.date}
                    <p class="meta__date">
                        {new Date(item.date).toLocaleDateString()}
                    </p>
                {/if}
                {#if item.content || item.summary}
                    <p class="item_content">
                        {#if open}
                            {#if item.summary}
                                {cutContentLength(item.summary, 420)}
                            {:else}
                                {cutContentLength(item.content, 420)}
                            {/if}
                        {:else if item.summary}
                            {cutContentLength(item.summary)}
                        {:else}
                            {cutContentLength(item.content)}
                        {/if}
                    </p>
                    <button
                        class="btn-more"
                        on:click|preventDefault={() => {
                            open = !open;
                        }}
                    >
                        weitere Informationen
                        <svg role="presentation">
                            <use xlink:href="#chevron" />
                        </svg>
                    </button>
                {/if}
                {#if open}
                    {#each item.tags.slice(0, 5) as tag (tag.id)}
                        <TagButton {tag} />
                    {/each}
                    <button class="btn-link">
                        <svg role="presentation">
                            <use xlink:href="#forward" />
                        </svg>
                        mehr erfahren
                    </button>
                {/if}
            </a>
        </article>
    </li>
{/if}

<style type="text/scss">
    li {
        border-radius: 0.3125rem;
        background-color: #fff;
        overflow: hidden;
        filter: drop-shadow(0 0 0.42rem rgba(0, 0, 0, 0.15));
        position: relative;
    }

    .content {
        display: block;
        text-decoration: none;
        color: #000;
        padding: 0.6875rem 0.625rem 2.5rem 0.625rem;

        &:before {
            content: '';
            display: block;
            position: absolute;
            width: 100%;
            height: calc(100% - 2.625rem);
            left: 0;
            top: 0;
        }
    }

    a:focus-visible {
        outline-offset: -1px;
    }

    h1 {
        font-size: 1.25rem;
        line-height: 1.125;
        margin-top: 0;
        margin-bottom: 0.5rem;
        word-break: break-word;
        hyphens: auto;
    }

    .meta {
        color: var(--color-text-muted);
        display: flex;
        align-items: center;
        font-size: 0.8125rem;

        &__source-icon {
            margin-right: 1rem;

            svg {
                height: 2.125rem;
                width: 2.125rem;
            }
        }

        &__date {
            margin-bottom: 1rem;
        }
    }

    .item_content {
        margin-top: 0.3125rem;
    }

    button {
        appearance: none;
        background: none;
    }

    .btn-link {
        display: block;
        padding: 0.5rem 1.25rem 0.5rem 0.25rem;
        border: solid 1px #a7a7a7;
        position: relative;
        margin-bottom: 1rem;
        font-size: 1.25rem;

        svg {
            color: #0470ad;
            position: relative;
            top: 0.1875rem;
            transform: rotate(230deg);
            width: 1.125em;
            height: 1.125em;
            transition: 0.3s ease-out transform;

            &:hover {
                transform: translate(0.3em, -50%);
            }
        }
    }

    .btn-more {
        background-color: #fff;
        font-size: 0;
        color: transparent;
        height: 2.625rem;
        width: 2.625rem;
        position: absolute;
        border-bottom-right-radius: 0.3125rem;
        right: 0.5rem;
        bottom: 1rem;
        border: 0;
        cursor: pointer;

        svg {
            color: #0470ad;
            width: 1.75rem;
            height: 1.75rem;
            transition: 0.3s ease-out transform;
        }
    }

    .open .btn-more svg {
        transform: rotate(180deg);
    }

    .btn-tag {
        padding: 0.5rem 0.875rem;
        background-color: #bec5c9;
        border: solid 1px #bec5c9;
        font-size: 1.125rem;
        margin: 0px 0.625rem 0.6875rem 0;
        border-radius: 5px;
        letter-spacing: 0.4px;
        cursor: pointer;
    }

    p {
        font-size: 1rem;
        line-height: 1.25rem;
        color: #4c4f50;
    }

    .bmvi {
        background-color: #e6f5fb;
    }

    .bpa {
        background-color: #f3f4d6;
    }

    .aa {
        background-color: #dfd6de;
    }

    .bmas {
        background-color: #fdf1d8;
    }

    .bpb {
        background-color: #f2ccd8;
    }

    .bsi {
        background-color: #cce6e8;
    }

    .ozg {
        background-color: #cce7db;
    }

    .bmbf {
        background-color: #fef9d8;
    }

    .bmu {
        background-color: #dee5d7;
    }

    .bmg {
        background-color: #f5dcd7;
    }

    .bmjv {
        background-color: #ccdbe4;
    }

    .bmvg {
        background-color: #dddfe0;
    }

    @media (min-width: 576px) {
        .btn-link {
            padding: 0.75rem 1.75rem 0.75rem 1rem;
            margin-bottom: 0rem;
        }
    }

    @media (min-width: 768px) {
        h1 {
            font-size: 2rem;
        }
        .content {
            padding: 0.75rem 1.75rem 2.5rem 1.75rem;
        }

        p {
            font-size: 1.25rem;
            line-height: 1.5625rem;
        }

        .meta {
            font-size: 1.125rem;

            &__source-icon {
                svg {
                    height: 3.375rem;
                    width: 3.375rem;
                }
            }
        }
    }

    @media (min-width: 992px) {
    }
</style>
