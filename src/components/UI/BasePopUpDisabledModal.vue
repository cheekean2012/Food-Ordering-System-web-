<template>
    <div :class="{ 'modal': showModal, 'visible': showModal }">
        <div class="modal__content">
            <h1>Error</h1>
            <p>The QR code was not able to proceed. Please request a new QR code from the staff.</p>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    showModal: Boolean,
  },
};
</script>

<style scoped>
.modal {
    visibility: hidden;
    opacity: 0;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(77, 77, 77, .7);
    transition: all .4s;
}

.visible {
    visibility: visible;
    opacity: 1;
}

.modal__content {
    border-radius: 4px;
    position: relative;
    width: 500px;
    max-width: 90%;
    background: #fff;
    padding: 1em 2em;
}
</style>