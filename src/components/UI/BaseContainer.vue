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
    margin: auto;
}

.page-container {
    background: #f5f5f5!important;
    min-height: 100vh;
    width: 100%;    
    display: flex;
    flex-direction: column;
}

@media (orientation: landscape) and (min-width: 480px) {
    .mobile-layout {
        max-width: 480px;
    }   
}

@media (orientation: portrait) and (min-width: 480px) {
    .mobile-layout {
        max-width: 480px;
    }   
}
</style>