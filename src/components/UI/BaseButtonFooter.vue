<template>
    <div class="d-flex footer">
            <button class="btn footer-btn" :disabled="disabled">
                <slot></slot>
            </button>
        </div>
</template>

<script>
    export default {
        props: {
            disabled: {
                type: Boolean,
                default: false,
            },
        },
    }
</script>

<style scoped>
.footer {
        bottom: 0;
        width: 480px;
        height: 50px;
        position: fixed;
        margin: 0 auto;
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;                
    }

    .footer-btn {
        width: 100%;
        color: #fff;
        background-color: #f59b00;
    }

    .footer-btn:hover, .footer-btn:active {
        background-color: #fb8332;
        box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
        color: #fff;
        transition: all 0.2s ease-in-out;
    }
</style>