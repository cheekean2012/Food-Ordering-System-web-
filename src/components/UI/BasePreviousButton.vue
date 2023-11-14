<template>
    <div class="previous-btn">
        <i class="fa-solid fa-chevron-left previous-icon" style="color: #f59b00;"></i>
    </div>
</template>

<style scoped>

.previous-btn {
        background-color: #fff;      
        border: 1px solid #f59b00;
        border-radius: 50%;
        position: absolute;
        top: 0;
        left: 0;
        margin: 1rem;
        cursor: pointer;
        padding: 0 !important;
    }

    .previous-btn i.previous-icon {
        padding: 0.5rem 0.8rem;
        transition: all 0.2s ease-in-out;        
    }

        .previous-btn:hover, .previous-btn:active {
            background-color: #f59b00;
            box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;        
            transition: all 0.2s ease-in-out;
            border-color: #fff;
        }

        .previous-btn i.previous-icon:hover, .previous-btn i.previous-icon:active {
            color: #fff !important;                      
        }
</style>