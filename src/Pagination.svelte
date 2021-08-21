<script>
    export let currentPage = 0;
    export let totalResults;
    export let selection;

    let per_page = 8;

    $: num_items = totalResults;
    $: num_pages = Math.ceil(totalResults / per_page);

    let arr_pages = [];

    function buildArr(c, n) {
        if (n <= 7) {
            return [...Array(n)].map((_, i) => i + 1);
        } else {
            if (c < 4 || c > n - 2) {
                return [1, 2, 3, 4, 5, '—', n - 2, n - 1, n];
            } else if (c + 3 === n) {
                return [1, '—', c, c + 1, c + 2, c + 3];
            } else {
                return [1, '—', c, c + 1, c + 2, '—', n];
            }
        }
    }

    function setArrPages() {
        arr_pages = buildArr(currentPage, num_pages);
    }

    $: if (num_items) {
        num_pages = Math.ceil(num_items / per_page);
        currentPage = 0;
        setArrPages();
    }

    function setCurrent(i) {
        if (isNaN(i)) return;
        currentPage = i;
        setArrPages();
        return currentPage;
    }

    function scroll(selection) {
        // account for sticky header size
        window.scrollTo({
            top: window.scrollY + selection.getBoundingClientRect().y,
            left: 0,
            behavior: 'smooth',
        });
    }
</script>

{#each arr_pages as i}
    <li class={i === currentPage + 1 ? 'active' : ''}>
        {#if i != '—'}
            <button
                title="Zur Seite {i} wechseln"
                on:click={() => {
                    setCurrent(i - 1);
                    scroll(selection);
                }}
            >
                {i}
            </button>
        {:else}
            <button disabled>
                {i}
            </button>
        {/if}
    </li>
{/each}
{#if num_pages > 1 && currentPage + 1 !== num_pages}
    <button
        title="Zur nächsten Seite wechseln"
        class="page_forward"
        on:click|preventDefault={() => {
            setCurrent(currentPage + 1);
            scroll(selection);
        }}
    >
        <span>
            <svg role="presentation">
                <use xlink:href="#forward" />
            </svg>
        </span>
    </button>
{/if}

<style type="text/scss">
    li {
        margin-right: 0.625rem;
    }

    button {
        border: 0;
        padding: 0;
        margin: 0;
        color: #000;
        background: none;
        font-size: 1.25rem;
        display: flex;
        justify-content: center;
        align-items: center;

        svg {
            width: 1.375rem;
            height: 1.375rem;
        }
    }

    .active {
        box-shadow: inset 0 -0.1em 0 currentColor;
    }
</style>
