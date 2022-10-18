<template>
    <div class="sidebar">
        <div class="sidebar-content">
            <div class="sidebar-content-item">
                <div class="sidebar-content-item-title">
                    Users
                </div>
            </div>
        </div>
    </div>
    <div class="rest">
        <slot />
    </div>
</template>

<style>
.sidebar {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 10%;
    background-color: #f8f9fa;
    z-index: 100;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transition: all 0.5s ease;
}





.rest {
    position: absolute;
    top: 0;
    left: 10%;
    height: 100%;
    width: 90%;
    transition: all 0.5s ease;
}
</style>