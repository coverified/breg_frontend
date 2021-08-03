<script>
    export let startDate;
    export let endDate;

    let firstDate;
    let secondDate;
    let start;
    let end;
    let year2021 = false;
    let year2020 = false;
    let year2019 = false;
    let lastSevenDays = false;
    let lastThirtyDays = false;

    function formatDate(date) {
        // add leading zeroes to single-digit day/month
        let d = date;
        let year = new Date();
        // take last 2 digits of every component
        d = ['0' + (d.getMonth() + 1), '0' + d.getDate()].map((component) => component.slice(-2));
        // join the components into date
        return year.getFullYear() + '-' + d.slice(0, 3).join('-');
    }

    const today = new Date();
    const todayFormatted =
        today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);
    const pastSevenDays = formatDate(new Date(new Date().setDate(new Date().getDate() - 7)));
    const pastThirtyDays = formatDate(new Date(new Date().setDate(new Date().getDate() - 30)));

    function setStartDate(firstDate) {
        startDate = firstDate;
        return startDate;
    }

    function setEndDate(secondDate) {
        endDate = secondDate;
        return endDate;
    }

    const handleChange = (checkedDate, firstDate, secondDate) => {
        let firstDateIso = new Date(firstDate).toISOString();
        let secondDateIso = new Date(secondDate).toISOString();

        // Reset Dates and Btns
        start.value = '';
        end.value = '';
        setStartDate('');
        setEndDate('');
        year2021 = false;
        year2020 = false;
        year2019 = false;
        lastSevenDays = false;
        lastThirtyDays = false;
        // Set Dates
        start.value = firstDate;
        end.value = secondDate;
        setStartDate(firstDateIso);
        setEndDate(secondDateIso);
        // Reset all if box is unchecked
        checkedDate ? handleFullClear() : '';
    };

    function handleFullClear() {
        start.value = '';
        end.value = '';
        setStartDate('');
        setEndDate('');
        year2021 = false;
        year2020 = false;
        year2019 = false;
        lastSevenDays = false;
        lastThirtyDays = false;
    }
</script>

<li>
    <label>
        <input
            type="checkbox"
            on:change={() => handleChange(year2021, '2021-01-01', todayFormatted)}
            bind:checked={year2021}
        />
        2021
    </label>
</li>
<li>
    <label>
        <input
            type="checkbox"
            on:change={() => handleChange(year2020, '2020-01-01', '2020-12-31')}
            bind:checked={year2020}
        />
        2020
    </label>
</li>
<li>
    <label>
        <input
            type="checkbox"
            on:change={() => handleChange(year2019, '2019-01-01', '2019-12-31')}
            bind:checked={year2019}
        />
        2019
    </label>
</li>
<li>
    <label>
        <input
            type="checkbox"
            on:change={() => handleChange(lastSevenDays, pastSevenDays, todayFormatted)}
            bind:checked={lastSevenDays}
        />
        Letzten 7 Tage
    </label>
</li>
<li>
    <label>
        <input
            type="checkbox"
            on:change={() => handleChange(lastThirtyDays, pastThirtyDays, todayFormatted)}
            bind:checked={lastThirtyDays}
        />
        Letzten 30 Tage
    </label>
</li>
<li>
    <label for="startPeriod" class="date-picker">
        <span>von</span>
        <input
            type="date"
            placeholder="TT.MM.JJJJ"
            id="startPeriod"
            name="startPeriod"
            bind:this={start}
            bind:value={firstDate}
            on:blur={() => setStartDate(firstDate)}
        />
    </label>
    <label for="endPeriod" class="date-picker">
        <span>bis</span>
        <input
            type="date"
            placeholder="TT.MM.JJJJ"
            id="endPeriod"
            name="endPeriod"
            bind:this={end}
            bind:value={secondDate}
            on:blur={() => setEndDate(secondDate)}
        />
    </label>
    {#if startDate || endDate}
        <button type="button" class=" btn btn-delete" on:click|preventDefault={handleFullClear}>
            <svg role="presentation">
                <use xlink:href="#close" />
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
