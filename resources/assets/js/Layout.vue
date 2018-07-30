<template>
    <div class="container">
        <top-header />
        <router-view />
        <navigation :init-form-fields="getFormFields" />
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';

    import TopHeader from './components/TopHeader';
    import Navigation from './components/Navigation';
    export default {
        components:{
            TopHeader,
            Navigation
        },
        computed:{
            ...mapGetters([
                'isConfLoaded',
                'getFormFields',
                'getFields',
                'getRegionList',
                'getAreaList',
            ])
        }
    }
</script>