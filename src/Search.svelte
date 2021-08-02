<script>
    import Entries from './Entries.svelte';
    import Icons from './Icons.svelte';
    import Pagination from './Pagination.svelte';
    import SearchContainer from './SearchContainer.svelte';
    import { tagFilters } from './stores.js';
    import { frontendUrl } from './common.js';

    let totalResults = 0;
    let allUsedTags = [];
    let listView = false;
    let ressorts = [];
    let grid;
    let activeTags;
    let selection;
    let tags = [];

    const changeSources = (ressorts) => {
        currentPage = -1;
        setTimeout(() => {
            currentPage = 0;
        }, 1);
        return ressorts ? ressorts : '';
    };

    const changeStartDate = (startDate) => {
        currentPage = -1;

        setTimeout(() => {
            currentPage = 0;
        }, 1);

        return startDate ? startDate : '';
    };

    const changeEndDate = (endDate) => {
        currentPage = -1;

        setTimeout(() => {
            currentPage = 0;
        }, 1);

        return endDate ? endDate : '';
    };

    const changeTag = (tags) => {
        currentPage = -1;

        setTimeout(() => {
            currentPage = 0;
        }, 1);

        return tags ? tags : '';
    };

    const changeEntries = (keyword) => {
        currentPage = -1;

        setTimeout(() => {
            currentPage = 0;
        }, 1);

        return keyword;
    };

    const searchTag = (activeTags) => {
        currentPage = -1;

        setTimeout(() => {
            currentPage = 0;
            tags = activeTags.map((item) => item.id);
        }, 1);
    };

    const setCurrentPage = (currentPage) => {
        currentPage = currentPage;

        return currentPage;
    };

    const unsubscribe = tagFilters.subscribe((value) => {
        activeTags = value;
    });

    $: activeTags = searchTag(activeTags);
    $: keyword = changeEntries(keyword);
    $: ressorts = changeSources(ressorts);
    $: tags = changeTag(tags);
    $: endDate = changeEndDate(endDate);
    $: startDate = changeStartDate(startDate);
    $: currentPage = setCurrentPage(currentPage);
</script>

<Icons />

<section>
    <header>
        <div class="intro">
            <div class="breadcrumb">Pilotprojekt: Netzwerk für digitale Aufklärung</div>
            <h1>Die erweiterte Suche der Bundesregierung – <br />intelligent, zentral, auf einen Blick</h1>
            <p>
                Ob Digitalisierung, Klimaschutz oder Bildung – ab sofort sind diese Themen an einem Ort gebündelt. Die
                neue Suche auf www.bundesregierung.de durchsucht die Websites mehrerer Ministerien und Behörden
                automatisiert und gibt die Ergebnisse zu den gewünschten Themen direkt aus. Damit ist die Antwort auf
                Ihre Frage an alle Institutionen nur noch einen Klick entfernt.
            </p>
        </div>
        <SearchContainer bind:keyword bind:tags bind:ressorts bind:startDate bind:endDate {allUsedTags} />
    </header>
    <main>
        {#if keyword !== undefined || tags.length}
            <div class="selection" bind:this={selection}>
                {#if totalResults !== '' && totalResults !== undefined && totalResults !== 0}
                    <p>
                        {#if totalResults >= 10000}
                            Mehr als
                        {/if}
                        {new Intl.NumberFormat().format(totalResults)} Artikel gefunden
                    </p>
                    <div class="selection__icons">
                        <button
                            title="Zur Listenansicht wechseln"
                            on:click={() => {
                                listView = true;
                            }}
                        >
                            <svg role="presentation" class={listView ? 'active' : ''}>
                                <use xlink:href="#icon_list" />
                            </svg>
                        </button>
                        <button
                            title="Zur Kachelansicht wechseln"
                            on:click={() => {
                                listView = false;
                            }}
                        >
                            <svg role="presentation" class={!listView ? 'active' : ''}>
                                <use xlink:href="#icon_boxes" />
                            </svg>
                        </button>
                    </div>
                {/if}
            </div>
            <ul class={listView ? 'list-view' : 'grid-view'} bind:this={grid}>
                {#key currentPage}
                    <Entries
                        {listView}
                        {keyword}
                        {startDate}
                        {endDate}
                        {grid}
                        {tags}
                        sourceIds={ressorts}
                        limit={8}
                        page={currentPage}
                        bind:totalResults
                        bind:allUsedTags
                    />
                {/key}
            </ul>
            {#if totalResults && totalResults !== '' && totalResults > 8}
                <ul class="pagination">
                    <Pagination {totalResults} bind:currentPage {selection} />
                </ul>
            {/if}
        {:else}
            <div class="project__container">
                <div class="bg">
                    <h2 class="h1">Das Projekt: Netzwerk für digitale Aufklärung</h2>
                    <p>
                        Digitalisierung, Nachhaltigkeit, Innovation, Europa. Die Themen der Regierungsbehörden sind so
                        vielfältig wie die Interessen der Bevölkerung. Und: viele diese Themen werden von mehreren
                        Ressorts bearbeitet. Damit Sie sich schnell und einfach zu Ihren Lieblingsthemen informieren
                        können, finden Sie hier das Netzwerk für digitale Aufklärung. Hier werden die Inhalte der
                        teilnehmenden Ressorts zentral gebündelt und zur Verfügung gestellt. Damit stehen Ihnen
                        vielfältige Inhalte auf einen Klick zur Verfügung. Das Spannende daran: Wir entwickeln diesen
                        Prototypen gemeinsam weiter. Mit Ihrem Feedback können wir die Software nah an Ihren
                        Bedürfnissen ausrichten und so immer weiter verbessern. Probieren Sie es gern aus!
                    </p>
                    <p>
                        Die Teile des Codes, die frei zugänglich sind, finden Sie hier:
                    </p>
                    <a href="https://github.com/coverified" title="CoVerified GitHub" rel="noopener" target="_blank">
                        <span class="link">
                            <svg role="presentation">
                                <use xlink:href="#forward" />
                            </svg>
                            zum Open Source Code
                        </span>
                    </a>
                </div>
                <img src="{frontendUrl}/heroteaser.jpg" alt="Das Projekt: Netzwerk für digitale Aufklärung" />
                <div class="ressorts__container">
                    <h2>Wir sind Teil des Pilotprojekts</h2>
                    <div class="img_container">
                        <img
                            src="{frontendUrl}/DigStMin.svg"
                            alt="Die Beauftragte der Bundesregierung für Digitalisierung"
                        />
                        <img src="{frontendUrl}/AA.svg" alt="Auswärtiges Amt" />
                        <img src="{frontendUrl}/BMAS.svg" alt="Bundesministerium für Arbeit und Soziales" />
                        <img src="{frontendUrl}/BPA.svg" alt="Presse- und Informationsamt der Bundesregierung" />
                        <img
                            src="{frontendUrl}/BMVI.svg"
                            alt="Bundesministerium für Verkehr und digitale Infrastruktur"
                        />
                        <img src="{frontendUrl}/BpB.svg" alt="Bundeszentrale für politische Bildung" />
                    </div>
                </div>
            </div>
        {/if}
    </main>
</section>

<style type="text/scss">
    :global(.root),
    :global(:root) {
        --color-primary: #003366;
        --color-tag-bg: #f0f0f0;
        --color-text: #011321;
        --color-text-muted: #4c4f50;
        --color-text-on-primary: #ffffff;
        --color-text-meta: #0071ad;

        all: unset;
        box-sizing: border-box;
        line-height: 1.6525;
        -webkit-font-smoothing: antialiased;

        h1,
        h2 {
            line-height: 1.25;
        }
    }

    :global(.root),
    :global(.root *),
    :global(*),
    :global(*:before),
    :global(*:after) {
        box-sizing: border-box;
        font-family: inherit;
    }

    header {
        .intro {
            h1 {
                font-size: 2rem;
                margin-top: 0;
            }

            .breadcrumb {
                margin-bottom: 0.5rem;
            }

            p {
                font-size: 1.25rem;
            }

            padding: 0 1.375rem 0 1.0625rem;
            margin-bottom: 2.375rem;
            margin-top: 2.375rem;
        }
    }

    .project__container {
        font-size: 1.25rem;
        margin-top: 2.5rem;

        .bg {
            color: #fff;
            padding: 2.5rem 1.5625rem 3rem 2.1875rem;
            background-color: #0c7799;
        }

        h2 {
            font-size: 2rem;
            margin-top: 0;
            margin-bottom: 1.1875rem;
        }

        a {
            display: inline-block;
            color: #fff;
            text-decoration: underline;
        }

        img {
            max-width: 100%;
        }

        .link {
            display: inline-block;
            padding: 0.625rem 1.25rem 0.625rem 1.125rem;
            border: solid 1px #fff;
            position: relative;
            margin-bottom: 1rem;
            margin-top: 0.625rem;
        }

        .ressorts__container {
            margin-top: 1.5rem;
            padding-left: 1rem;
            padding-right: 1rem;

            h2 {
                margin-bottom: 2.5rem;
            }

            .img_container {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                grid-template-rows: repeat(3, 1fr);
                grid-gap: 1rem;
            }
        }

        a,
        .link {
            svg {
                color: #fff;
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
    }

    ul {
        list-style: none;
    }

    ul.pagination {
        display: flex;
        padding: 0 1.5rem;
        letter-spacing: 0.44px;
        font-size: 1.25rem;
    }

    ul.list-view {
        list-style: none;
        margin: 2.5rem 0;
        padding: 0 1.5rem;
    }

    ul.grid-view {
        display: grid;
        grid-template-columns: minmax(auto, 1fr);
        justify-content: center;
        padding: 0 1.5rem;
        margin: 2rem 0 7rem 0;
        grid-gap: 1rem;
        grid-auto-rows: 1rem;
    }

    button {
        padding: 0.5rem 0.875rem;
        background-color: #bec5c9;
        border: solid 1px #bec5c9;
        font-size: 1.125rem;
        margin: 1rem;
        border-radius: 3px;
        cursor: pointer;
    }

    .pagination {
        padding: 0 1rem;
    }

    .selection {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 2.5rem;
        padding: 0 1.5rem;

        p {
            font-size: 1rem;
            text-transform: uppercase;
            letter-spacing: 0.36px;
            font-weight: bold;
            margin: 0;
        }

        &__icons {
            display: flex;

            button {
                padding: 0;
                background: transparent;
                margin: 0;
                width: 3rem;
                height: 3.25rem;
                border: none;

                svg {
                    width: 2.625rem;
                    height: 2.625rem;
                    color: #4d4f50;

                    &.active {
                        color: #0470ad;
                    }
                }
            }
        }
    }

    @media (min-width: 576px) {
    }

    @media (min-width: 768px) {
        ul.grid-view {
            display: grid;
            grid-gap: 1.5rem;
            margin-bottom: 2rem;
            grid-template-columns: repeat(2, minmax(auto, 25rem));
        }

        .project__container {
            .ressorts__container {
                margin-top: 4.25rem;
                padding-right: 4.375rem;
                padding-left: 4.375rem;

                .img_container {
                    grid-template-columns: repeat(3, 1fr);
                    grid-template-rows: repeat(2, 1fr);
                }
            }
        }
    }

    @media (min-width: 992px) {
        header {
            .intro {
                max-width: 50.4375rem;
                margin: 1.625rem auto 3.75rem auto;
            }
        }

        .selection {
            p {
                font-size: 1.5rem;
                letter-spacing: 0.53px;
            }

            &__icons {
                button {
                    width: 4rem;
                    height: 4rem;

                    svg {
                        width: 3.75rem;
                        height: 3.75rem;
                        color: #4d4f50;
                    }
                }
            }
        }

        ul.list-view {
            margin: 2.5rem 0;
        }
    }

    @media (min-width: 1200px) {
        .project__container {
            padding: 3.125rem 5.25rem 2.8125rem 5.25rem;
        }
    }
</style>
