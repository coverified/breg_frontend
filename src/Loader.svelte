<script>
    export let timeout = 100;

    let visible = false;

    setTimeout(() => {
        visible = true;
    }, timeout);
</script>

{#if visible}
    <div class="spinner">
        <div class="bounce1"></div>
        <div class="bounce2"></div>
        <div class="bounce3"></div>
    </div>
{/if}

<style type="text/scss">
    .spinner {
        margin: 0 auto;
        width: 4.375rem;
        text-align: center;
        grid-column: 1 / -1;
    }

    .spinner > div {
        width: 1.125rem;
        height: 1.125rem;
        background-color: #333;

        border-radius: 100%;
        display: inline-block;
        -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
        animation: sk-bouncedelay 1.4s infinite ease-in-out both;
    }

    .spinner .bounce1 {
        -webkit-animation-delay: -0.32s;
        animation-delay: -0.32s;
    }

    .spinner .bounce2 {
        -webkit-animation-delay: -0.16s;
        animation-delay: -0.16s;
    }

    @-webkit-keyframes sk-bouncedelay {
        0%, 80%, 100% {
            -webkit-transform: scale(0)
        }
        40% {
            -webkit-transform: scale(1.0)
        }
    }

    @keyframes sk-bouncedelay {
        0%, 80%, 100% {
            -webkit-transform: scale(0);
            transform: scale(0);
        }
        40% {
            -webkit-transform: scale(1.0);
            transform: scale(1.0);
        }
    }
</style>
