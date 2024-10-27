<script lang="ts" setup>

</script>

<template>
    <header>
        <a :aria-label="$t('components.header.homepage')" :to="'/'" class="homepage-link">
            <img src="@/assets/site-logo.png" alt="Logo" />
        </a>
        <div class="buttons-holder">
            <v-btn color="primary" prepend-icon="mdi-account" size="small" :title="$t('words.login')">{{ $t('words.login') }}</v-btn>
        </div>
    </header>
</template>

<style lang="scss" scoped>
    header {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 0;
        height: 70px;

        .homepage-link {
            display: flex;

            img {
                max-height: 50px;
                width: 100%;
            }
        }
        .buttons-holder {
            button {
                margin-left: 15px;

                .v-btn__content, .v-btn__prepend {
                    color: #FFF;
                    font-weight: 600;
                    text-transform: lowercase;
                }
                .v-btn__prepend {
                    font-size: 15px;
                }
            }
        }
        @media screen and (max-width: 600px) {
            .homepage-link {
                img {
                    max-height: 35px;
                }
            }
        }
    }
</style>
