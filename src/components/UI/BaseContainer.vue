<template>
    <div class="mobile-layout d-flex">
        <div class="page-container">            
            <slot></slot>
        </div>
    </div>
</template>

<style scoped>
.mobile-layout {
    /* flex-direction: column; */
    /* align-items: center;
    justify-content: center; */
    height: 100%;
    /* max-width: 100%; */
    margin: auto;
}

.page-container {
    background: #f5f5f5!important;
    height: 100vh;
    width: 100%;    
}

@media (orientation: landscape) and (min-width: 480px) {
    .mobile-layout {
        max-width: 480px;
    }   
}
</style>