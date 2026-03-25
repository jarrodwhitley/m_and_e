<script setup>
import { computed, ref, watch } from 'vue'

const props = defineProps({
    show: Boolean,
    availableDates: {
        type: Array,
        default: () => []
    },
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
const selectedMonth = ref('')
const selectedDay = ref('')

const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
]

const monthToDaysMap = computed(() => {
    const map = new Map()

    for (const rawDate of props.availableDates) {
        const [rawMonth, rawDay] = String(rawDate).split('-')
        const month = Number(rawMonth)
        const day = Number(rawDay)

        if (!month || !day) {
            continue
        }

        if (!map.has(month)) {
            map.set(month, [])
        }

        const days = map.get(month)
        if (!days.includes(day)) {
            days.push(day)
            days.sort((a, b) => a - b)
        }
    }

    return map
})

const monthOptions = computed(() => [...monthToDaysMap.value.keys()].sort((a, b) => a - b))

const dayOptions = computed(() => {
    const month = Number(selectedMonth.value)
    if (!month || !monthToDaysMap.value.has(month)) {
        return []
    }

    return monthToDaysMap.value.get(month)
})

function initializeSelectedDate() {
    const [rawMonth, rawDay] = String(props.currentDate || '').split('-')
    const currentMonth = Number(rawMonth)
    const currentDay = Number(rawDay)

    if (currentMonth && currentDay && monthToDaysMap.value.get(currentMonth)?.includes(currentDay)) {
        selectedMonth.value = String(currentMonth)
        selectedDay.value = String(currentDay)
        return
    }

    const firstMonth = monthOptions.value[0]
    const firstDay = firstMonth ? monthToDaysMap.value.get(firstMonth)?.[0] : null
    selectedMonth.value = firstMonth ? String(firstMonth) : ''
    selectedDay.value = firstDay ? String(firstDay) : ''
}

watch(() => props.show, (isOpen) => {
    if (!isOpen) {
        return
    }

    initializeSelectedDate()
    selectedPeriod.value = props.currentPeriod || 'am'
})

watch(selectedMonth, () => {
    const dayList = dayOptions.value
    if (!dayList.length) {
        selectedDay.value = ''
        return
    }

    if (!dayList.includes(Number(selectedDay.value))) {
        selectedDay.value = String(dayList[0])
    }
})

const prettyDate = computed(() => {
    if (!selectedMonth.value || !selectedDay.value) {
        return ''
    }

    const monthName = monthNames[Number(selectedMonth.value) - 1] || ''
    return `${monthName} ${Number(selectedDay.value)}`
})

function selectDevotional() {
    if (!selectedMonth.value || !selectedDay.value) {
        return
    }

    emit('select-date', {
        date: `${Number(selectedMonth.value)}-${Number(selectedDay.value)}`,
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

            <label class="field-label" for="devotional-month">Date</label>
            <div class="date-fields">
                <select id="devotional-month" v-model="selectedMonth" class="date-select">
                    <option v-for="month in monthOptions" :key="month" :value="String(month)">
                        {{ monthNames[month - 1] }}
                    </option>
                </select>
                <select id="devotional-day" v-model="selectedDay" class="date-select">
                    <option v-for="day in dayOptions" :key="day" :value="String(day)">
                        {{ day }}
                    </option>
                </select>
            </div>

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
    background: var(--overlay-background);
}

.date-panel {
    width: 100%;
    border-radius: 1.6rem 1.6rem 0 0;
    background: linear-gradient(to bottom, color-mix(in srgb, var(--surface) 85%, var(--surface-secondary)), var(--surface-secondary));
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
    background: color-mix(in srgb, var(--text-secondary) 40%, transparent);
}

.panel-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.55rem;
}

.panel-head h2 {
    margin: 0;
    color: var(--text-primary);
    font-size: 1rem;
}

.close-btn {
    border: 0;
    width: 2rem;
    height: 2rem;
    border-radius: 999px;
    background: var(--button-secondary-background);
    color: var(--button-secondary-text);
    font-size: 1.25rem;
}

.field-label {
    display: block;
    margin-bottom: 0.35rem;
    color: var(--text-secondary);
    font-weight: 600;
}

.date-fields {
    display: grid;
    grid-template-columns: 1.2fr 0.8fr;
    gap: 0.5rem;
}

.date-select {
    width: 100%;
    border: 1px solid var(--border);
    border-radius: 0.8rem;
    padding: 0.7rem 0.8rem;
    font-size: 0.95rem;
    color: var(--text-primary);
    background: var(--surface);
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
    background: var(--button-secondary-background);
    color: var(--button-secondary-text);
    min-height: 2.4rem;
    font-weight: 600;
}

.period-btn.selected {
    background: var(--button-primary);
    color: var(--button-primary-text);
}

.preview {
    margin: 0.7rem 0 0;
    color: var(--text-secondary);
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
    background: var(--button-secondary-background);
    color: var(--button-secondary-text);
}

.primary-btn {
    background: var(--button-primary);
    color: var(--button-primary-text);
}
</style>
