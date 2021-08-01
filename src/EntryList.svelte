<script>
    export let item;
    export let open = false;

    const cutContentLength = (text, max = 150) => {
        return text && text.length > max ? text.slice(0, max).split(' ').slice(0, -1).join(' ') + '...' : text;
    };
</script>

{#if item}
    <li class={open ? 'open' : ''}>
        <article>
            <a class="content" href={item.url.name} target="_blank" rel="noopener" title={`Direkt zu "${item.name}"`}>
                <p class="meta">
                    {#if item.date}
                        {new Date(item.date).toLocaleDateString()}
                    {/if}
                    {#if item.date && item.url.source?.name}
                        &nbsp;|&nbsp;
                    {/if}
                    {#if item.url.source?.name}
                        {item.url.source.name}
                    {/if}
                </p>
                <h1>
                    {item.name}
                </h1>
                {#if item.content || item.summary}
                    <div class="item_content">
                        <p>
                            {#if open}
                                {#if item.summary}
                                    {cutContentLength(item.summary, 500)}
                                {:else}
                                    {cutContentLength(item.content, 500)}
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
                    </div>
                {/if}
                {#if open}
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

<style type="scss">
    li {
        background-color: #fff;
        overflow: hidden;
        border-bottom: 1px solid #979797;
        position: relative;
        margin-bottom: 1.6875rem;
    }

    .content {
        display: block;
        text-decoration: none;
        color: #000;
        padding: 0 0 1.125rem 0;
    }

    .content:before {
        content: '';
        display: block;
        position: absolute;
        width: 100%;
        height: calc(100% - 2.625rem);
        left: 0;
        top: 0;
    }

    h1 {
        font-size: 1.5rem;
        line-height: 1.125;
        font-weight: normal;
        margin-top: 0;
        margin-bottom: 0.2em;
        word-break: break-word;
        hyphens: auto;
    }

    a:focus-visible {
        outline-offset: -1px;
    }

    .meta {
        color: #0071ad;
        font-size: 0.875rem;
        margin-top: 0;
        margin-bottom: 0.625rem;
    }

    .btn-link {
        display: inline-block;
        background: none;
        appearance: none;
        font-size: 1.25rem;
        padding: 0.75rem 1.75rem 0.75rem 1rem;
        border: solid 1px #a7a7a7;
        position: relative;

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
        appearance: none;
        background: none;
        font-size: 0;
        color: transparent;
        height: 2.625rem;
        width: 2.625rem;
        position: relative;
        margin-left: auto;
        border: 0;
        cursor: pointer;

        svg {
            color: #0470ad;
            width: 2rem;
            height: 2rem;
            transition: 0.3s ease-out transform;
        }
    }

    .open .btn-more svg {
        transform: rotate(180deg);
    }

    p {
        line-height: 1.32;
    }

    .item_content {
        display: flex;
        align-items: flex-end;

        p {
            color: #4c4f50;
            margin-right: 0.975rem;
        }
    }

    @media (min-width: 768px) {
        .content {
            padding: 0 2rem 1.25rem 2.375rem;
        }
    }

    @media (min-width: 992px) {
        li {
            margin-bottom: 2.25rem;
        }

        .meta {
            font-size: 1.375rem;
            margin-bottom: 0.625rem;
        }

        h1 {
            font-size: 2rem;
        }

        .content {
            font-size: 1.25rem;
        }
    }
</style>
