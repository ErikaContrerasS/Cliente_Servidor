<script setup lang="ts">
import { useWindowScroll } from '@vueuse/core'
import { computed, ref } from 'vue'

const companySize = ref('')
const businessType = ref('')
const productToDemo = ref('')
const date = ref(new Date())

const { y } = useWindowScroll()

const isStuck = computed(() => {
  return y.value > 30
})
</script>

<template>
  <form class="form-layout" @submit.prevent>
    <div class="form-outer">
      <div :class="[isStuck && 'is-stuck']" class="form-header stuck-header">
        <div class="form-header-inner">
          <div class="left">
            <h3>Emitir Certificado</h3>
          </div>
          <div class="right">
            <div class="buttons">
              <VButton
                icon="lnir lnir-arrow-left rem-100"
                :to="{ name: 'sidebar-layouts-profile-view' }"
                light
                dark-outlined
              >
                Cancel
              </VButton>
              <VButton color="primary" raised> Generar Certificado </VButton>
            </div>
          </div>
        </div>
      </div>
      <div class="form-body">
        <!--Fieldset-->
        <div class="form-fieldset">
          <div class="fieldset-heading">
            <h4>Información personal</h4>
            <p>Ingrese la información del asegurado principal</p>
          </div>

          <div class="columns is-multiline">
            <div class="column is-6">
              <VField>
                <label>Nombre</label>
                <VControl icon="feather:user">
                  <input
                    type="text"
                    class="input"
                    placeholder=""
                    autocomplete="given-name"
                  />
                </VControl>
              </VField>
            </div>
            <div class="column is-6">
              <VField>
                <label>Apellido</label>
                <VControl icon="feather:user">
                  <input
                    type="text"
                    class="input"
                    placeholder=""
                    autocomplete="family-name"
                  />
                </VControl>
              </VField>
            </div>
            <div class="column is-12">
              <VField>
                <label>Email</label>
                <VControl icon="feather:mail">
                  <input
                    type="email"
                    class="input"
                    placeholder=""
                    autocomplete="email"
                    inputmode="email"
                  />
                </VControl>
              </VField>
            </div>
          </div>
        </div>
        <!--Fieldset-->
        <div class="form-fieldset">
          <div class="fieldset-heading">
            <h4>Información de la compañia</h4>
            <p>Ingrese la información de la empresa del asegurado</p>
          </div>

          <div class="columns is-multiline">
            <div class="column is-6">
              <VField>
                <label>Nombre compañia</label>
                <VControl icon="feather:briefcase">
                  <input
                    type="text"
                    class="input"
                    placeholder=""
                    autocomplete="organization"
                  />
                </VControl>
              </VField>
            </div>
            <div class="column is-6">
              <VField>
                <label>Teléfono compañia</label>
                <VControl icon="feather:phone">
                  <input
                    type="tel"
                    class="input"
                    placeholder=""
                    autocomplete="tel"
                    inputmode="tel"
                  />
                </VControl>
              </VField>
            </div>
          </div>
        </div>
        <!--Fieldset-->
        <div class="form-fieldset">
          <div class="fieldset-heading">
            <h4>Seleccione producto</h4>
            <p>Que producto o plan desea seleciconar</p>
          </div>

          <div class="columns is-multiline">
            <div class="column is-6">
              <VField>
                <label>Productos o planes</label>
                <VControl>
                  <Multiselect
                    v-model="productToDemo"
                    placeholder="Seleccione una opción"
                    :options="['Plan A', 'Plan B', 'Plan C']"
                  />
                </VControl>
              </VField>
            </div>
            <div class="column is-6">
              <VDatePicker v-model="date" color="green" trim-weeks>
                <template #default="{ inputValue, inputEvents }">
                  <VField>
                    <label>Fecha de inicio cobertura</label>
                    <VControl icon="feather:calendar">
                      <input
                        class="input"
                        type="text"
                        placeholder="Seleccionar una fecha"
                        :value="inputValue"
                        v-on="inputEvents"
                      />
                    </VControl>
                  </VField>
                </template>
              </VDatePicker>
            </div>
            <div class="column is-12">
              <VField>
                <label>Comentario</label>
                <VControl>
                  <textarea
                    class="textarea"
                    rows="4"
                    placeholder="Deje aqui el comentario del asegurado..."
                    autocomplete="off"
                    autocapitalize="off"
                    spellcheck="true"
                  ></textarea>
                </VControl>
              </VField>
            </div>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<style lang="scss">
@import '../../../../scss/abstracts/mixins';

.is-navbar {
  .form-layout {
    margin-top: 30px;
  }
}

.form-layout {
  max-width: 740px;
  margin: 0 auto;

  .form-outer {
    @include vuero-s-card;

    padding: 0;

    .form-header {
      padding: 12px 20px;
      border-bottom: 1px solid var(--fade-grey-dark-3);
      transition: all 0.3s; // transition-all test

      &.is-stuck {
        background: var(--white);
        padding-right: 80px;
        border-left: 1px solid var(--fade-grey-dark-3);
      }

      .form-header-inner {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .left {
        h3 {
          font-family: var(--font-alt);
          font-size: 1.2rem;
          font-weight: 600;
          line-height: 1.3;
        }

        p {
          font-size: 0.95rem;
        }
      }
    }

    .form-body {
      padding: 20px 40px 40px;
    }
  }
}

.is-dark {
  .form-layout {
    .form-outer {
      @include vuero-card--dark;

      .form-header {
        border-color: var(--dark-sidebar-light-12);

        &.is-stuck {
          background: var(--dark-sidebar);
          border-color: var(--dark-sidebar-light-6);
        }

        .left {
          h3 {
            color: var(--dark-dark-text);
          }
        }
      }

      .form-body {
        .field {
          .control {
            .input,
            .textarea {
              &:focus {
                border-color: var(--primary);
              }
            }
          }
        }
      }
    }
  }
}

@media only screen and (max-width: 767px) {
  .form-layout {
    .form-outer {
      .form-header {
        .form-header-inner {
          flex-direction: column;

          .left {
            text-align: center;
            margin-bottom: 12px;
          }

          .right {
            width: 100%;

            .buttons {
              display: flex;
              justify-content: space-between;
              margin: 0;

              .button {
                margin: 0;
                width: 49%;
              }
            }
          }
        }
      }
    }
  }
}
</style>
