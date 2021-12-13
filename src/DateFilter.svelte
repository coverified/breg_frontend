<script>
    export let startDate;
    export let endDate;

    const today = new Date();
    const sevenDaysAgo = new Date(today - 7 * 24 * 60 * 60 * 1000);
    const thirtyDaysAgo = new Date(today - 30 * 24 * 60 * 60 * 1000);
    const numberOfYearsPastPresets = 2;
    const presets = [];

    presets.push({
        start: new Date(`${today.getFullYear()}-01-01`),
        end: today,
        label: today.getFullYear(),
        value: false,
    });

    for (let i = 1; i <= numberOfYearsPastPresets; i++) {
        const start = new Date(`${today.getFullYear() - i}-01-01`);
        const end = new Date(`${today.getFullYear() - i}-12-31`);

        presets.push({
            start: start,
            end: end,
            label: start.getFullYear(),
            value: false,
        });
    }

    presets.push({
        start: sevenDaysAgo,
        end: today,
        label: 'Letzten 7 Tage',
        value: false,
    });

    presets.push({
        start: thirtyDaysAgo,
        end: today,
        label: 'Letzten 30 Tage',
        value: false,
    });

    const formatDateForDom = date => date.toISOString().slice(0, 10);

    const clearCheckboxes = () => {
        for (let i = 0; i < presets.length; i++) {
            presets[i].value = false;
        }
    }

    const clearDates = () => {
        startDate = '2021-12-09';
        endDate = undefined;
        clearCheckboxes();
    }

    const handlePresetClick = (event, preset) => {
        const hasBeenChecked = event.target.checked;

        clearCheckboxes();

        if (hasBeenChecked) {
            startDate = formatDateForDom(preset.start);
            endDate = formatDateForDom(preset.end);
            preset.value = true;
        } else {
            clearDates();
        }
    };
</script>

{#each presets as preset}
    <li>
        <label>
            <input type="checkbox"
                   bind:checked={preset.value}
                   on:change={e => handlePresetClick(e, preset)}
            />
            {preset.label}
        </label>
    </li>
{/each}
<li>
    <label for="startPeriod" class="date-picker">
        <span>von</span>
        <input
                type="date"
                placeholder="TT.MM.JJJJ"
                id="startPeriod"
                name="startPeriod"
                max={endDate || formatDateForDom(today)}
                bind:value={startDate}
        />
    </label>
    <label for="endPeriod" class="date-picker">
        <span>bis</span>
        <input
                type="date"
                placeholder="TT.MM.JJJJ"
                id="endPeriod"
                name="endPeriod"
                min={startDate}
                max={formatDateForDom(today)}
                bind:value={endDate}
        />
    </label>
    {#if startDate || endDate}
        <button type="button" class=" btn btn-delete" on:click|preventDefault={clearDates}>
            <svg role="presentation">
                <use xlink:href="#close"/>
            </svg>
        </button>
    {/if}
</li>

<style type="text/scss">
    .btn {
        appearance: none;
        background: none;
        position: relative;
        border: 0;
        bottom: -5px;

        svg {
            width: 30px;
            height: 30px;
        }
    }

    .date-picker {
        span {
            font-size: 1.125rem;
        }

        input {
            display: block;
            width: 11.25rem;
            font-size: 1.25rem;
            margin-right: 1.375rem;
            appearance: none;
            background-color: #eeeff1;
            border: none;
            border-bottom: 1px solid #000;
        }
    }

    @media (min-width: 992px) {
    }
</style>
