<script setup>
import { computed, ref, watch } from 'vue'

const props = defineProps({
    show: Boolean,
    currentDate: {
        type: String,
        default: ''
    },
    currentPeriod: {
        type: String,
        default: 'am'
    }
})

const emit = defineEmits(['close', 'select-date', 'go-today'])

const selectedPeriod = ref('am')
const selectedIsoDate = ref('')

const thisYear = new Date().getFullYear()

function toIsoDate(mdDate) {
    if (!mdDate) {
        const now = new Date()
        return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
    }

    const [month, day] = mdDate.split('-').map(Number)
    return `${thisYear}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
}

function toMdDate(isoDate) {
    if (!isoDate) {
        return ''
    }

    const [, month, day] = isoDate.split('-')
    return `${Number(month)}-${Number(day)}`
}

watch(() => props.show, (isOpen) => {
    if (!isOpen) {
        return
    }

    selectedIsoDate.value = toIsoDate(props.currentDate)
    selectedPeriod.value = props.currentPeriod || 'am'
})

const prettyDate = computed(() => {
    if (!selectedIsoDate.value) {
        return ''
    }

    const date = new Date(`${selectedIsoDate.value}T12:00:00`)
    return date.toLocaleDateString(undefined, {
        month: 'long',
        day: 'numeric'
    })
})

function selectDevotional() {
    const mdDate = toMdDate(selectedIsoDate.value)
    if (!mdDate) {
        return
    }

    emit('select-date', {
        date: mdDate,
        period: selectedPeriod.value
    })
}

function chooseToday() {
    emit('go-today')
}
</script>

<template>
    <section class="date-shell" :class="show ? 'is-open' : 'is-closed'">
        <button class="sheet-backdrop" aria-label="Close date picker" @click="emit('close')"></button>
        <div class="date-panel" :class="show ? 'panel-visible' : ''">
            <div class="sheet-handle"></div>
            <div class="panel-head">
                <h2>Jump To Date</h2>
                <button class="close-btn" @click="emit('close')" aria-label="Close date picker">×</button>
            </div>

            <label class="field-label" for="devotional-date">Date</label>
            <input id="devotional-date" v-model="selectedIsoDate" class="date-input" type="date" />

            <div class="period-row">
                <button class="period-btn" :class="selectedPeriod === 'am' ? 'selected' : ''" @click="selectedPeriod = 'am'">Morning</button>
                <button class="period-btn" :class="selectedPeriod === 'pm' ? 'selected' : ''" @click="selectedPeriod = 'pm'">Evening</button>
            </div>

            <p class="preview">{{ prettyDate }} • {{ selectedPeriod === 'am' ? 'Morning' : 'Evening' }}</p>

            <div class="action-row">
                <button class="secondary-btn" @click="chooseToday">Go To Today</button>
                <button class="primary-btn" @click="selectDevotional">Open</button>
            </div>
        </div>
    </section>
</template>

<style scoped>
.date-shell {
    position: absolute;
    inset: 0;
    z-index: 26;
    pointer-events: none;
    display: flex;
    align-items: flex-end;
    opacity: 0;
    visibility: hidden;
    transition: opacity 180ms ease;
}

.date-shell.is-open {
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
}

.sheet-backdrop {
    position: absolute;
    inset: 0;
    border: 0;
    background: rgba(20, 27, 39, 0.26);
}

.date-panel {
    width: 100%;
    border-radius: 1.6rem 1.6rem 0 0;
    background: linear-gradient(to bottom, #f9fbfc, #eef3f7);
    box-shadow: 0 -14px 36px rgba(23, 33, 48, 0.25);
    padding: 0.7rem 0.9rem 1.1rem;
    transform: translateY(calc(100% + 1rem));
    transition: transform 260ms ease;
}

.panel-visible {
    transform: translateY(0);
}

.sheet-handle {
    width: 3rem;
    height: 0.34rem;
    border-radius: 999px;
    margin: 0.15rem auto 0.75rem;
    background: rgba(105, 123, 137, 0.24);
}

.panel-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.55rem;
}

.panel-head h2 {
    margin: 0;
    color: #2a4255;
    font-size: 1rem;
}

.close-btn {
    border: 0;
    width: 2rem;
    height: 2rem;
    border-radius: 999px;
    background: #dae5ec;
    color: #243a4b;
    font-size: 1.25rem;
}

.field-label {
    display: block;
    margin-bottom: 0.35rem;
    color: #335266;
    font-weight: 600;
}

.date-input {
    width: 100%;
    border: 1px solid #bed0dd;
    border-radius: 0.8rem;
    padding: 0.7rem 0.8rem;
    font-size: 0.95rem;
    color: #23394a;
    background: #f8fcff;
}

.period-row {
    margin-top: 0.6rem;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.5rem;
}

.period-btn {
    border: 0;
    border-radius: 0.75rem;
    background: #d3dee8;
    color: #21384a;
    min-height: 2.4rem;
    font-weight: 600;
}

.period-btn.selected {
    background: #7083bc;
    color: #ffffff;
}

.preview {
    margin: 0.7rem 0 0;
    color: #4f687b;
    font-size: 0.85rem;
}

.action-row {
    margin-top: 0.75rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.5rem;
}

.secondary-btn,
.primary-btn {
    border: 0;
    border-radius: 0.75rem;
    min-height: 2.45rem;
    font-weight: 600;
}

.secondary-btn {
    background: #d5e0e8;
    color: #24394a;
}

.primary-btn {
    background: #7083bc;
    color: #ffffff;
}
</style>
